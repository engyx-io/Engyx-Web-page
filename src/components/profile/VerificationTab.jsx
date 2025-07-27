import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Loader2, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
    import { useTranslation } from 'react-i18next';

    export default function VerificationTab({ userProfile }) {
      const { t } = useTranslation();
      const [loading, setLoading] = useState(false);

      const verificationLink = "https://in.sumsub.com/websdk/p/sbx_uni_AL8Y3rAD946QY5AH";

      const handleStartVerification = () => {
        setLoading(true);
        window.open(verificationLink, '_blank', 'noopener,noreferrer');
        setTimeout(() => setLoading(false), 1000);
      };

      const VerificationStatus = () => {
        const status = userProfile?.verification_status;
        let Icon, text, colorClass, description;

        switch (status) {
          case 'verified':
            Icon = ShieldCheck;
            text = t('profile.verificationTab.status.verified');
            colorClass = 'text-emerald-500';
            description = t('profile.verificationTab.status.verifiedDesc');
            break;
          case 'pending':
            Icon = ShieldAlert;
            text = t('profile.verificationTab.status.pending');
            colorClass = 'text-yellow-500';
            description = t('profile.verificationTab.status.pendingDesc');
            break;
          case 'rejected':
            Icon = ShieldX;
            text = t('profile.verificationTab.status.rejected');
            colorClass = 'text-red-500';
            description = t('profile.verificationTab.status.rejectedDesc');
            break;
          default:
            Icon = ShieldX;
            text = t('profile.verificationTab.status.notVerified');
            colorClass = 'text-muted-foreground';
            description = t('profile.verificationTab.status.notVerifiedDesc');
            break;
        }

        return (
          <div className="text-center p-8 bg-muted/50 rounded-lg border">
            <Icon className={`w-16 h-16 mx-auto mb-4 ${colorClass}`} />
            <h3 className={`text-2xl font-bold ${colorClass}`}>{text}</h3>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>
        );
      };

      return (
        <div className="bg-card p-8 rounded-xl border">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t('profile.verificationTab.title')}</h2>
          
          <div className="mb-8">
            <VerificationStatus />
          </div>

          {(!userProfile.verification_status || userProfile.verification_status === 'not_verified' || userProfile.verification_status === 'rejected') && (
            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                {t('profile.verificationTab.description')}
              </p>
              <Button
                onClick={handleStartVerification}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {t('profile.verificationTab.startVerification')}
              </Button>
            </div>
          )}
        </div>
      );
    }