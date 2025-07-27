import React from 'react';
    import { Label } from "@/components/ui/label";
    import { Input } from "@/components/ui/input";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Textarea } from "@/components/ui/textarea";

    const TechnicalInfoForm = ({ formData, handleNestedChange }) => {

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
            <div className="space-y-2">
              <Label htmlFor="token_address" className="text-emerald-200">Dirección del Token</Label>
              <Input id="token_address" name="token_address" value={formData.token_address || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="token_standard" className="text-emerald-200">Norma del Token</Label>
              <Select name="token_standard" value={formData.token_standard || ''} onValueChange={(value) => handleSelectChange('token_standard', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30"><SelectValue placeholder="Seleccione una norma" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ECR-3643">ECR-3643</SelectItem>
                  <SelectItem value="ERC-1400">ERC-1400</SelectItem>
                  <SelectItem value="ERC-20">ERC-20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="distribution_mechanism" className="text-emerald-200">Mecanismo de Distribución</Label>
              <Select name="distribution_mechanism" value={formData.distribution_mechanism || ''} onValueChange={(value) => handleSelectChange('distribution_mechanism', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30"><SelectValue placeholder="Seleccione un mecanismo" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-chain">On-chain</SelectItem>
                  <SelectItem value="airdrop">Airdrop</SelectItem>
                  <SelectItem value="staking">Staking</SelectItem>
                  <SelectItem value="vesting">Vesting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jurisdiction_restriction" className="text-emerald-200">Restricción de Jurisdicción</Label>
              <Input id="jurisdiction_restriction" name="jurisdiction_restriction" value={formData.jurisdiction_restriction || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="governance_participation" className="text-emerald-200">Participación de Gobernanza</Label>
              <Textarea id="governance_participation" name="governance_participation" value={formData.governance_participation || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
          </div>
        </div>
      );
    };

    export default TechnicalInfoForm;