import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { paymentTokenOptions } from '@/components/admin/asset-wizard/constants';

// Solo props mínimos: formData, handlePaymentTokenChange
const PaymentStep = ({ formData, handlePaymentTokenChange }) => (
  <div className="space-y-4">
    <Label className="text-emerald-200">Tokens de Pago Habilitados</Label>
    <div className="flex flex-wrap gap-2 p-2 rounded-md bg-black/50 border border-emerald-500/30">
      {paymentTokenOptions.map(token => (
        <Button
          key={token}
          type="button"
          variant={formData.paymentTokens.includes(token) ? "secondary" : "outline"}
          onClick={() => handlePaymentTokenChange(token)}
          className={`text-xs h-8 ${formData.paymentTokens.includes(token) ? 'bg-emerald-500/80 text-white border-emerald-500' : 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10'}`}
        >
          {token}
        </Button>
      ))}
    </div>
  </div>
);

export default PaymentStep;