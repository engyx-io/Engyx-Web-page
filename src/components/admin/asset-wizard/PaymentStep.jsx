import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { paymentTokenOptions } from '@/components/admin/asset-wizard/constants';


const PaymentStep = ({ formData, handlePaymentTokenChange }) => (
  <div className="space-y-4">
    <Label className="text-emerald-200">Tokens de Pago Habilitados</Label>
    <div className="flex flex-wrap gap-3 p-2 rounded-md bg-black/50 border border-emerald-500/30">
      {paymentTokenOptions.map(token => (
        <Button
          key={token.symbol}
          type="button"
          variant={formData.paymentTokens.includes(token.symbol) ? "secondary" : "outline"}
          onClick={() => handlePaymentTokenChange(token.symbol)}
          className={`flex flex-col items-start text-xs h-14 w-32 px-3 py-2 ${formData.paymentTokens.includes(token.symbol) ? 'bg-emerald-500/80 text-white border-emerald-500' : 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10'}`}
        >
          <span className="font-bold text-base">{token.symbol}</span>
          <span className="text-xs opacity-80">{token.name}</span>
          <span className="text-[10px] opacity-60">{token.description}</span>
        </Button>
      ))}
    </div>
  </div>
);

export default PaymentStep;