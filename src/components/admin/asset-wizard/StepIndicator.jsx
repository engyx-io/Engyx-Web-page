import React from 'react';
import { Check } from 'lucide-react';
import { STEPS } from '@/components/admin/asset-wizard/constants';

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center space-x-2 mb-8 overflow-x-auto pb-2">
    {STEPS.map((step, index) => {
      const stepIndex = STEPS.findIndex(s => s.id === currentStep);
      const isActive = index === stepIndex;
      const isCompleted = index < stepIndex;
      const Icon = step.icon;

      return (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center flex-shrink-0 w-24">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isActive ? 'bg-blue-500 border-blue-400 text-white scale-110' : 
                isCompleted ? 'bg-emerald-500 border-emerald-400 text-white' : 
                'bg-slate-700 border-slate-600 text-slate-400'
              }`}
            >
              {isCompleted ? <Check size={20} /> : <Icon size={20} />}
            </div>
            <p className={`mt-2 text-xs text-center transition-colors duration-300 ${isActive ? 'text-blue-300 font-semibold' : 'text-slate-400'}`}>{step.title}</p>
          </div>
          {index < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-600'}`} />}
        </React.Fragment>
      );
    })}
  </div>
);

export default StepIndicator;