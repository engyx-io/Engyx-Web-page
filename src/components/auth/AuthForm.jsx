import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AuthForm() {
  const { t } = useTranslation('common');
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPasswordForEmail } = useAuth();
  const { toast } = useToast();

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (!error) {
      toast({
        title: t('auth.loginSuccessTitle'),
        description: t('auth.loginSuccessDesc'),
      });
    }
    setLoading(false);
  };
  
  const handleRegister = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: t('common.error'),
        description: t('auth.passwordsDoNotMatch'),
        variant: 'destructive'
      });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, { data: { full_name: fullName } });
    setLoading(false);
    if (!error) {
      toast({
        title: t('auth.registerSuccessTitle'),
        description: t('auth.registerSuccessDesc')
      });
      setView('login');
    }
  };
  
  const handleForgotPassword = async e => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPasswordForEmail(email);
    setLoading(false);
    if (!error) {
      toast({
        title: t('auth.passwordRecoverySentTitle'),
        description: t('auth.passwordRecoverySentDesc')
      });
      setView('login');
    }
  };

  if (view === 'forgotPassword') {
    return (
      <div className="w-full">
        <h3 className="text-xl font-semibold text-white text-center mb-1">{t('auth.resetPasswordTitle')}</h3>
        <p className="text-emerald-200/70 text-center mb-4 text-sm">{t('auth.resetPasswordDesc')}</p>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-emerald-200/80">{t('common.email')}</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-black/50 border-emerald-500/30 text-white" autoComplete="email" />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('auth.sendRecoveryEmail')}
          </Button>
          <Button variant="link" onClick={() => setView('login')} className="w-full text-emerald-400">
            {t('auth.backToLogin')}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex border-b border-emerald-500/20 mb-4">
        <button onClick={() => setView('login')} className={`flex-1 py-2 text-sm font-medium transition-colors ${view === 'login' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-emerald-200/70 hover:text-emerald-100'}`}>
          {t('auth.login')}
        </button>
        <button onClick={() => setView('register')} className={`flex-1 py-2 text-sm font-medium transition-colors ${view === 'register' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-emerald-200/70 hover:text-emerald-100'}`}>
          {t('auth.register')}
        </button>
      </div>
      
      <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="space-y-4">
        {view === 'register' && (
          <div>
            <Label htmlFor="fullName" className="text-emerald-200/80">{t('auth.fullName')}</Label>
            <Input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="bg-black/50 border-emerald-500/30 text-white" autoComplete="name" />
          </div>
        )}
        <div>
          <Label htmlFor="email" className="text-emerald-200/80">{t('common.email')}</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-black/50 border-emerald-500/30 text-white" autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="password" className="text-emerald-200/80">{t('common.password')}</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-black/50 border-emerald-500/30 text-white" autoComplete={view === 'login' ? "current-password" : "new-password"} />
        </div>
        {view === 'register' && (
          <div>
            <Label htmlFor="confirmPassword" className="text-emerald-200/80">{t('auth.confirmPassword')}</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="bg-black/50 border-emerald-500/30 text-white" autoComplete="new-password" />
          </div>
        )}
        <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500" disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {view === 'login' ? t('auth.loggingIn') : t('auth.registering')}</> : view === 'login' ? t('auth.login') : t('auth.createAccount')}
        </Button>
      </form>

      {view === 'login' && (
        <div className="text-center mt-4">
          <Button variant="link" onClick={() => setView('forgotPassword')} className="text-sm text-emerald-400 hover:text-emerald-300">
            {t('auth.forgotPassword')}
          </Button>
        </div>
      )}
    </div>
  );
}