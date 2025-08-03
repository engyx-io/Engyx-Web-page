import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Solo props mínimos: formData, handleInputChange, handleFileChange
const AssetInfoStep = ({ formData, handleInputChange, handleFileChange }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="assetName" className="text-emerald-200">Nombre del Activo Digital</Label>
      <Input id="assetName" name="assetName" value={formData.assetName} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="assetSymbol" className="text-emerald-200">Símbolo del Activo Digital</Label>
      <Input id="assetSymbol" name="assetSymbol" value={formData.assetSymbol} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" placeholder="Ej: MI-TOKEN" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="totalSupply" className="text-emerald-200">Suministro Total</Label>
      <Input id="totalSupply" name="totalSupply" type="number" value={formData.totalSupply} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="documentationUrl" className="text-emerald-200">URL de la Documentación del Token</Label>
      <Input id="documentationUrl" name="documentationUrl" value={formData.documentationUrl} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" placeholder="https://example.com/token-docs.pdf" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="logoFile" className="text-emerald-200">Importa el logotipo de tu Activo Digital</Label>
      <Input id="logoFile" name="logoFile" type="file" onChange={handleFileChange} accept="image/*" className="bg-black/50 border-emerald-500/30 file:text-emerald-300 file:border-0 file:bg-black/50 file:px-4 file:py-2 file:mr-4 file:rounded-l-md hover:file:bg-emerald-500/20 cursor-pointer" />
    </div>
  </div>
);

export default AssetInfoStep;