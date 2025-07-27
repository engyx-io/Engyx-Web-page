import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const OfferInfoStep = ({ formData, handleInputChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2"><Label htmlFor="price" className="text-emerald-200">Precio (USDC)</Label><Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
        <div className="space-y-2"><Label htmlFor="softCap" className="text-emerald-200">Soft Cap (minCap)</Label><Input id="softCap" name="softCap" type="number" value={formData.softCap} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
        <div className="space-y-2"><Label htmlFor="hardCap" className="text-emerald-200">Hard Cap (maxCap)</Label><Input id="hardCap" name="hardCap" type="number" value={formData.hardCap} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
        <div className="space-y-2"><Label htmlFor="minInvestment" className="text-emerald-200">Inversión Mínima (USDC)</Label><Input id="minInvestment" name="minInvestment" type="number" value={formData.minInvestment} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
        <div className="space-y-2"><Label htmlFor="maxInvestment" className="text-emerald-200">Inversión Máxima (USDC)</Label><Input id="maxInvestment" name="maxInvestment" type="number" value={formData.maxInvestment} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2"><Label htmlFor="startDate" className="text-emerald-200">Fecha de Inicio</Label><Input id="startDate" name="startDate" type="datetime-local" value={formData.startDate} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
        <div className="space-y-2"><Label htmlFor="endDate" className="text-emerald-200">Fecha de Fin</Label><Input id="endDate" name="endDate" type="datetime-local" value={formData.endDate} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" /></div>
    </div>
  </div>
);

export default OfferInfoStep;