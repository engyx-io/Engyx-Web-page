import React from 'react';
    import { Label } from "@/components/ui/label";
    import { Input } from "@/components/ui/input";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Button } from "@/components/ui/button";
    import { Upload, Trash2, Loader2, ImageOff } from 'lucide-react';

    const paymentTokensOptions = ['USDT', 'USDC', 'EURC'];

    const GeneralInfoForm = ({ 
      formData, 
      handleInputChange, 
      handleDigitalAssetChange,
      digitalAssets,
      imagePreview,
      handleImageUpload,
      removeImage,
      uploading
    }) => {
        
      const handleSelectChange = (name, value) => {
        handleInputChange({ target: { name, value } });
      };

      const handlePaymentTokenChange = (token) => {
        const currentTokens = formData.accepted_payment_tokens || [];
        const newTokens = currentTokens.includes(token)
          ? currentTokens.filter(t => t !== token)
          : [...currentTokens, token];
        handleInputChange({ target: { name: 'accepted_payment_tokens', value: newTokens } });
      };
      
      const isEquity = formData.tokenization_type === 'Equity Digital Asset';
      const progressLabel = isEquity ? '% de Proyecto Tokenizado' : '% de Ingresos a Tokenizar';
      const fundingLabel = isEquity ? '% Financiado' : '% Ingresos Vendidos';

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="digital_asset_id" className="text-emerald-200">Activo Digital</Label>
              <Select name="digital_asset_id" value={formData.digital_asset_id || ''} onValueChange={handleDigitalAssetChange}>
                  <SelectTrigger className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400"><SelectValue placeholder="Selecciona un activo..."/></SelectTrigger>
                  <SelectContent>
                      {digitalAssets && digitalAssets.map(asset => (
                          <SelectItem key={asset.id} value={asset.id}>{asset.asset_name}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-emerald-200">Ubicación</Label>
              <Input id="location" name="location" value={formData.location || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" placeholder="Escribe una dirección..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="text-emerald-200">Tipo</Label>
              <Select name="type" value={formData.type || 'solar'} onValueChange={(value) => handleSelectChange('type', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="solar">Solar</SelectItem><SelectItem value="wind">Eólico</SelectItem><SelectItem value="hydro">Hidroeléctrico</SelectItem><SelectItem value="green_hydrogen">Hidrógeno Verde</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-emerald-200">Estado</Label>
              <Select name="status" value={formData.status || 'for_sale'} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="for_sale">En Venta</SelectItem><SelectItem value="in_development">En Desarrollo</SelectItem><SelectItem value="active">Activa</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-emerald-200">Capacidad (MW)</Label>
              <Input id="capacity" name="capacity" type="number" value={formData.capacity || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenization_type" className="text-emerald-200">Tipo de Tokenización</Label>
              <Select name="tokenization_type" value={formData.tokenization_type || 'Revenue Digitalization'} onValueChange={(value) => handleSelectChange('tokenization_type', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Revenue Digitalization">Revenue Digitalization</SelectItem><SelectItem value="Equity Digital Asset">Equity Digital Asset</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress" className="text-emerald-200">{progressLabel}</Label>
              <Input id="progress" name="progress" type="number" value={formData.progress || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="funding" className="text-emerald-200">{fundingLabel}</Label>
              <Input id="funding" name="funding" type="number" value={formData.funding || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roi" className="text-emerald-200">ROI (%)</Label>
              <Input id="roi" name="roi" type="number" step="0.1" value={formData.roi || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="token_price" className="text-emerald-200">Precio del Token ($)</Label>
              <Input id="token_price" name="token_price" type="number" step="0.01" value={formData.token_price || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokens_available" className="text-emerald-200">Tokens Disponibles</Label>
              <Input id="tokens_available" name="tokens_available" type="number" value={formData.tokens_available || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_start" className="text-emerald-200">Inicio Estimado</Label>
              <Input id="estimated_start" name="estimated_start" type="date" value={formData.estimated_start || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smart_contract_network" className="text-emerald-200">Red del Contrato Inteligente</Label>
              <Select name="smart_contract_network" value={formData.smart_contract_network || 'BNB'} onValueChange={(value) => handleSelectChange('smart_contract_network', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BNB">BNB</SelectItem>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Base">Base</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Ethereum Sepolia">Ethereum Sepolia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-200">Tokens de Pago Habilitados</Label>
              <div className="flex flex-wrap gap-2 p-2 rounded-md bg-black/50 border border-emerald-500/30">
                {paymentTokensOptions.map(token => (
                  <Button
                    key={token}
                    type="button"
                    variant={formData.accepted_payment_tokens && formData.accepted_payment_tokens.includes(token) ? "secondary" : "outline"}
                    onClick={() => handlePaymentTokenChange(token)}
                    className={`text-xs h-8 ${formData.accepted_payment_tokens && formData.accepted_payment_tokens.includes(token) ? 'bg-emerald-500/80 text-white border-emerald-500' : 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10'}`}
                  >
                    {token}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="highlights" className="text-emerald-200">Destacados (separados por coma)</Label>
              <Input id="highlights" name="highlights" value={formData.highlights || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image" className="text-emerald-200">Imagen del Proyecto</Label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-20 bg-black/30 rounded-md flex items-center justify-center overflow-hidden border border-emerald-500/30">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Vista previa" className="w-full h-full object-cover" />
                  ) : (
                    <ImageOff className="w-8 h-8 text-emerald-200/50" />
                  )}
                </div>
                <div className="flex-grow">
                  <Input id="image" type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                  <div className="flex gap-2">
                    <Button type="button" onClick={() => document.getElementById('image').click()} disabled={uploading} className="w-full">
                      {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                      {uploading ? 'Subiendo...' : 'Cambiar Imagen'}
                    </Button>
                    {imagePreview && (
                      <Button type="button" variant="destructive" onClick={removeImage} disabled={uploading}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default GeneralInfoForm;