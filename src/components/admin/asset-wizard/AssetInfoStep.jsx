import React from 'react';
    import { Label } from "@/components/ui/label";
    import { Input } from "@/components/ui/input";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

    const AssetInfoStep = ({ formData, handleInputChange, handleSelectChange, handleFileChange }) => (
      <div className="space-y-4">
        <div className="space-y-2"><Label htmlFor="assetName" className="text-emerald-200">Nombre del Activo Digital</Label><Input id="assetName" name="assetName" value={formData.assetName} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" /></div>
        <div className="space-y-2"><Label htmlFor="assetSymbol" className="text-emerald-200">Símbolo del Activo Digital</Label><Input id="assetSymbol" name="assetSymbol" value={formData.assetSymbol} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" placeholder="Ej: MI-TOKEN" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="totalSupply" className="text-emerald-200">Suministro Total</Label><Input id="totalSupply" name="totalSupply" type="number" value={formData.totalSupply} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
            <div className="space-y-2"><Label htmlFor="decimals" className="text-emerald-200">Decimales</Label><Input id="decimals" name="decimals" type="number" value={formData.decimals} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="tokenType" className="text-emerald-200">Tipo de Token</Label>
            <Select name="tokenType" value={formData.tokenType} onValueChange={(value) => handleSelectChange('tokenType', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2"><Label htmlFor="documentationUrl" className="text-emerald-200">URL de la Documentación del Token</Label><Input id="documentationUrl" name="documentationUrl" value={formData.documentationUrl} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" placeholder="https://example.com/token-docs.pdf" /></div>
        <div className="space-y-2"><Label htmlFor="walletAddress" className="text-emerald-200">Wallet Emisora (issuer)</Label><Input id="walletAddress" name="walletAddress" value={formData.walletAddress} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" placeholder="0x..."/></div>
        <div className="space-y-2"><Label htmlFor="logoFile" className="text-emerald-200">Importa el logotipo de tu Activo Digital</Label><Input id="logoFile" name="logoFile" type="file" onChange={handleFileChange} accept="image/*" className="bg-black/50 border-emerald-500/30 file:text-emerald-300 file:border-0 file:bg-black/50 file:px-4 file:py-2 file:mr-4 file:rounded-l-md hover:file:bg-emerald-500/20 cursor-pointer" /></div>
      </div>
    );

    export default AssetInfoStep;