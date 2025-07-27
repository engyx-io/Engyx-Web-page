import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NetworkStep = ({ formData, handleSelectChange, networkOptions }) => (
  <div className="space-y-4">
    <Label htmlFor="network" className="text-emerald-200">Selecciona la Red Blockchain</Label>
    <Select name="network" value={formData.network} onValueChange={(value) => handleSelectChange('network', value)}>
      <SelectTrigger className="w-full bg-black/50 border-emerald-500/30 focus:border-emerald-400"><SelectValue placeholder="Elige una red..." /></SelectTrigger>
      <SelectContent>
        {networkOptions.map(net => <SelectItem key={net.value} value={net.value}>{net.label} (chainId: {net.chainId})</SelectItem>)}
      </SelectContent>
    </Select>
    {formData.chainId && <p className="text-xs text-emerald-300/70">Chain ID seleccionada: {formData.chainId}</p>}
  </div>
);

export default NetworkStep;