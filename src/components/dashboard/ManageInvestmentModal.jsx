import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap, TrendingUp, Calendar, Hash, DollarSign, ExternalLink, Gift, Coins } from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value, valueClass = 'text-emerald-400' }) => (
  <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
    <div className="flex items-center space-x-3">
      <Icon className="w-4 h-4 text-emerald-300/70" />
      <span className="text-emerald-200/80">{label}</span>
    </div>
    <span className={`font-mono text-sm ${valueClass}`}>{value}</span>
  </div>
);

export default function ManageInvestmentModal({ isOpen, onClose, investment, handleFeatureClick }) {
  if (!investment) return null;

  const { projects: project } = investment;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-emerald-400">Gestionar Inversión</DialogTitle>
          <DialogDescription className="text-emerald-200/70">
            Detalles de tu inversión en {project.name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <InfoRow icon={Zap} label="Proyecto" value={project.name} />
          {project.token_name && <InfoRow icon={Coins} label="Token" value={`$${project.token_name}`} valueClass="text-teal-400" />}
          <InfoRow icon={Hash} label="Tokens Comprados" value={investment.tokens_purchased.toLocaleString()} />
          <InfoRow icon={DollarSign} label="Monto Invertido (USD)" value={`${investment.amount_usd.toLocaleString()}`} />
          
          <div className="py-2 border-b border-emerald-500/10">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <TrendingUp className="w-4 h-4 text-emerald-300/70" />
                    <span className="text-emerald-200/80">ROI por rendimiento</span>
                </div>
                <span className="font-mono text-sm text-teal-400">{`${project.roi}%`}</span>
            </div>
            <p className="text-xs text-emerald-200/60 mt-1 pl-7">Inversiones con retornos basados en la producción energética real.</p>
          </div>

          <InfoRow icon={Calendar} label="Fecha de Inversión" value={new Date(investment.purchased_at).toLocaleDateString()} />
          <InfoRow icon={Zap} label="Estado del Proyecto" value={project.status.replace('_', ' ')} valueClass="capitalize" />
        </div>
        
        <DialogFooter className="pt-4 flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex gap-2">
              <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 flex-1" onClick={handleFeatureClick}>
                <Gift className="w-4 h-4 mr-2" />
                Reclamar Recompensas
              </Button>
              <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 flex-1" onClick={handleFeatureClick}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver en Explorer
              </Button>
          </div>
           <Button onClick={onClose} variant="secondary" className="w-full sm:w-auto">Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}