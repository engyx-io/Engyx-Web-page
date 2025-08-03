import React, { useState, useEffect } from 'react';
    import { Button } from "@/components/ui/button";
    import { toast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { useWallet } from '@/contexts/WalletContext';
    import { Loader2, ArrowLeft, ArrowRight, Check, Sparkles, X } from 'lucide-react';
    import { AnimatePresence, motion } from 'framer-motion';
    import { supabase } from '@/lib/customSupabaseClient';
    import { ethers } from 'ethers';

    import StepIndicator from '@/components/admin/asset-wizard/StepIndicator';
    import NetworkStep from '@/components/admin/asset-wizard/NetworkStep';
    import PaymentStep from '@/components/admin/asset-wizard/PaymentStep';
    import WalletStep from '@/components/admin/asset-wizard/WalletStep';
    import AssetInfoStep from '@/components/admin/asset-wizard/AssetInfoStep';
    // import OfferInfoStep eliminado
    import LegalDocsStep from '@/components/admin/asset-wizard/LegalDocsStep';
    import SummaryStep from '@/components/admin/asset-wizard/SummaryStep';
    import { STEPS, networkOptions } from '@/components/admin/asset-wizard/constants';
    import { uploadFile } from '@/components/admin/asset-wizard/utils';

    export default function CreateAssetWizard({ onSuccess, onCancel }) {
      const { user } = useAuth();
      const { getSignerAddress, walletAddress: connectedWalletAddress } = useWallet();
      const [currentStep, setCurrentStep] = useState('network');
      const [formData, setFormData] = useState({
        network: 'sepolia',
        paymentTokens: ['USDC'],
        walletAddress: '',
        assetName: '',
        assetSymbol: '',
        totalSupply: '',
        logoFile: null,
        legalDocFile: null,
        chainId: 'aa36a7',
        documentationUrl: '',
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      useEffect(() => {
        if (connectedWalletAddress) {
          setFormData(prev => ({ ...prev, walletAddress: connectedWalletAddress }));
        }
      }, [connectedWalletAddress]);

      const handleNext = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex < STEPS.length - 1) {
          setCurrentStep(STEPS[currentIndex + 1].id);
        }
      };

      const handleBack = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex > 0) {
          setCurrentStep(STEPS[currentIndex - 1].id);
        }
      };
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSelectChange = (name, value) => {
        if (name === 'network') {
            const selectedNetwork = networkOptions.find(opt => opt.value === value);
            setFormData(prev => ({ ...prev, network: value, chainId: selectedNetwork?.chainId || '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
      };

      const handlePaymentTokenChange = (token) => {
        setFormData(prev => {
          const currentTokens = prev.paymentTokens || [];
          const newTokens = currentTokens.includes(token)
            ? currentTokens.filter(t => t !== token)
            : [...currentTokens, token];
          return { ...prev, paymentTokens: newTokens };
        });
      };

      const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
          setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
      };

      const handleSubmit = async () => {
        setIsSubmitting(true);
        toast({
          title: "Procesando Emisión de Activo",
          description: "Preparando la transacción con Brickken...",
        });

        const signerAddress = await getSignerAddress();
        if (!signerAddress) {
            toast({ title: "Error", description: "La dirección del firmante (signer) no está disponible. Conecta tu wallet.", variant: "destructive" });
            setIsSubmitting(false);
            return;
        }

        try {
            const selectedNetwork = networkOptions.find(opt => opt.chainId === formData.chainId);
            const blockchainName = selectedNetwork?.value;

            if (!blockchainName) {
                throw new Error("No se pudo determinar el nombre de la blockchain a partir del Chain ID.");
            }

            const prepareBody = {
                method: "newTokenization",
                signerAddress: signerAddress,
                chainId: formData.chainId,
                blockchain: blockchainName,
                name: formData.assetName,
                tokenizerEmail: "exequiel@engyx.io",
                symbol: formData.assetSymbol,
                supplyCap: formData.totalSupply,
                url: formData.documentationUrl,
            };

            const { data: prepareData, error: prepareError } = await supabase.functions.invoke('prepare-api-transaction', { 
                body: prepareBody
            });

            if (prepareError || (prepareData && (prepareData.error || prepareData.errors))) {
              const errorMsg = prepareError?.message || prepareData.error?.message || (prepareData.errors && prepareData.errors.messages) || "Error desconocido al preparar la transacción.";
              throw new Error(errorMsg);
            }
            
            toast({
                title: "Transacción Preparada",
                description: "Por favor, revisa y firma la transacción en tu wallet.",
            });
            
            const transactionsToSign = prepareData.transactions;
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const signedTransactions = [];

            for (const tx of transactionsToSign) {
                const txToSign = { ...tx };
                delete txToSign.from;
                const signedTx = await signer.signTransaction(txToSign);
                signedTransactions.push(signedTx);
            }
            
            toast({
                title: "Transacciones firmadas",
                description: "Enviando confirmación a Brickken...",
            });
            
            const sendBody = {
                signedTransactions: signedTransactions
            };

            const { data: sendData, error: sendError } = await supabase.functions.invoke('send-api-transaction', {
                body: sendBody
            });
            
            if (sendError || (sendData && (sendData.error || sendData.errors))) {
                const errorMsg = sendError?.message || sendData.error?.message || (sendData.errors && sendData.errors.messages) || "Error desconocido al enviar la transacción.";
                throw new Error(errorMsg);
            }
            
            const contractAddress = sendData?.contract_address || prepareData.contract_address;
            if (!contractAddress) {
                throw new Error("No se pudo obtener la dirección del contrato de la respuesta de la API.");
            }

            const logoUrl = await uploadFile(formData.logoFile, 'digital_asset_logos', user.id);
            const legalDocUrl = await uploadFile(formData.legalDocFile, 'digital_asset_documents', user.id);
            
            const { error: dbError } = await supabase.from('digital_assets').insert({
                user_id: user.id,
                asset_name: formData.assetName,
                asset_symbol: formData.assetSymbol,
                network: formData.chainId,
                payment_tokens: formData.paymentTokens,
                wallet_address: formData.walletAddress,
                logo_url: logoUrl,
                legal_doc_url: legalDocUrl,
                contract_address: contractAddress,
                status: 'emitted',
            });

            if (dbError) throw dbError;

            toast({
                title: "¡Activo Emitido y Guardado!",
                description: `Contrato: ${contractAddress}.`,
                className: "bg-emerald-600 border-emerald-500 text-white",
            });
            onSuccess();

        } catch (error) {
            console.error("Error during tokenization:", error);
            toast({ title: "Error durante la emisión", description: error.message, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
      };

      const renderStepContent = () => {
        const stepProps = {
          formData,
          handleInputChange,
          handleSelectChange,
          handlePaymentTokenChange,
          handleFileChange,
          networkOptions
        };
        switch (currentStep) {
          case 'network': return <NetworkStep formData={formData} handleSelectChange={handleSelectChange} networkOptions={networkOptions} />;
          case 'payment': return <PaymentStep formData={formData} handlePaymentTokenChange={handlePaymentTokenChange} />;
          case 'wallet': return <WalletStep formData={formData} />;
          case 'assetInfo': return <AssetInfoStep formData={formData} handleInputChange={handleInputChange} />;
          case 'legalDocs': return <LegalDocsStep formData={formData} handleFileChange={handleFileChange} />;
          case 'summary': return <SummaryStep formData={formData} />;
          default: return null;
        }
      };

      return (
        <div className="glass-card text-white p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-blue-400 flex items-center gap-2"><Sparkles /> Emisión de Activo Digital</h2>
            <Button variant="ghost" size="icon" onClick={onCancel} className="text-slate-400 hover:text-white hover:bg-slate-700/50">
              <X size={20} />
            </Button>
          </div>
          <p className="text-blue-200/70 mb-6">
            Sigue los pasos para emitir un nuevo activo digital en la plataforma.
          </p>
          
          <div className="py-6">
            <StepIndicator currentStep={currentStep} />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="min-h-[250px] p-4 bg-black/20 rounded-lg"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between pt-4">
            {currentStep !== 'network' ? (
              <Button type="button" variant="outline" onClick={handleBack} className="border-slate-500/50 text-slate-300 hover:bg-slate-500/10" disabled={isSubmitting}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            ) : <div />}
            
            {currentStep !== 'summary' ? (
              <Button type="button" onClick={handleNext} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Emitiendo...</> : <><Check className="mr-2 h-4 w-4" /> Sí, continuar y emitir</>}
              </Button>
            )}
          </div>
        </div>
      );
    }