import React from 'react';
    import { Label } from "@/components/ui/label";
    import { Input } from "@/components/ui/input";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Textarea } from "@/components/ui/textarea";

    const LegalInfoForm = ({ formData, handleNestedChange }) => {
      
      const handleSelectChange = (name, value) => {
        handleNestedChange(name, value);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleNestedChange(name, value);
      };

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="offering_memorandum" className="text-emerald-200">Memorando de Oferta (PPM)</Label>
              <Textarea id="offering_memorandum" name="offering_memorandum" value={formData.offering_memorandum || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="revenue_contract" className="text-emerald-200">Contrato de Ingresos</Label>
              <Textarea id="revenue_contract" name="revenue_contract" value={formData.revenue_contract || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ppa_details" className="text-emerald-200">Detalles del Contrato PPA</Label>
              <Textarea id="ppa_details" name="ppa_details" value={formData.ppa_details || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legal_opinion" className="text-emerald-200">Opinión Legal</Label>
              <Input id="legal_opinion" name="legal_opinion" value={formData.legal_opinion || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spv_info" className="text-emerald-200">Información de la SPV</Label>
              <Input id="spv_info" name="spv_info" value={formData.spv_info || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="legal_basis" className="text-emerald-200">Base Legal de Emisión</Label>
              <Select name="legal_basis" value={formData.legal_basis || ''} onValueChange={(value) => handleSelectChange('legal_basis', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30"><SelectValue placeholder="Seleccione base legal" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reg D 506(c)">Reg D 506(c) (EE.UU.)</SelectItem>
                  <SelectItem value="Reg CF">Reg CF (EE.UU.)</SelectItem>
                  <SelectItem value="Reg S">Reg S (fuera de EE.UU.)</SelectItem>
                  <SelectItem value="MiFID II">MiFID II (UE)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    };

    export default LegalInfoForm;