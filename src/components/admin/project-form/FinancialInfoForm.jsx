import React from 'react';
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    
    const FinancialInfoForm = ({ formData, handleNestedChange }) => {
      
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
              <Label htmlFor="operator" className="text-emerald-200">Entidad Operadora</Label>
              <Input id="operator" name="operator" value={formData.operator || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" placeholder="Ej. ACME Energy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current_status" className="text-emerald-200">Estado Actual del Activo</Label>
              <Select name="current_status" value={formData.current_status || ''} onValueChange={(value) => handleSelectChange('current_status', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-emerald-500/50 text-white">
                  <SelectItem value="in_operation">En Operación</SelectItem>
                  <SelectItem value="in_construction">En Construcción</SelectItem>
                  <SelectItem value="financed">Financiado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cod_date" className="text-emerald-200">Fecha de Operación (COD)</Label>
              <Input id="cod_date" name="cod_date" type="date" value={formData.cod_date || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_model" className="text-emerald-200">Modelo de Negocio</Label>
              <Select name="business_model" value={formData.business_model || ''} onValueChange={(value) => handleSelectChange('business_model', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30">
                  <SelectValue placeholder="Seleccione un modelo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-emerald-500/50 text-white">
                  <SelectItem value="PPA">PPA</SelectItem>
                  <SelectItem value="netbilling">Netbilling</SelectItem>
                  <SelectItem value="merchant">Merchant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="energy_sale_price" className="text-emerald-200">Tarifa Venta Energía (USD/kWh)</Label>
              <Input id="energy_sale_price" name="energy_sale_price" type="number" value={formData.energy_sale_price || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" placeholder="Ej. 0.15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue_projections" className="text-emerald-200">Ingresos Proyectados (Anual USD)</Label>
              <Input id="revenue_projections" name="revenue_projections" type="number" value={formData.revenue_projections || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" placeholder="Ej. 500000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment_frequency" className="text-emerald-200">Periodicidad de Pago</Label>
              <Select name="payment_frequency" value={formData.payment_frequency || ''} onValueChange={(value) => handleSelectChange('payment_frequency', value)}>
                <SelectTrigger className="w-full bg-black/50 border-emerald-500/30">
                  <SelectValue placeholder="Seleccione periodicidad" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-emerald-500/50 text-white">
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="annually">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="smart_contract_address" className="text-emerald-200">Dirección Smart Contract</Label>
              <Input id="smart_contract_address" name="smart_contract_address" value={formData.smart_contract_address || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" placeholder="0x..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="explorer_link" className="text-emerald-200">Enlace Explorador</Label>
              <Input id="explorer_link" name="explorer_link" value={formData.explorer_link || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" placeholder="https://etherscan.io/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract_audit" className="text-emerald-200">Auditoría Contrato (URL)</Label>
              <Input id="contract_audit" name="contract_audit" value={formData.contract_audit || ''} onChange={handleInputChange} className="bg-black/50 border-emerald-500/30" placeholder="https://audits.com/..." />
            </div>
          </div>
        </div>
      );
    };
    
    export default FinancialInfoForm;