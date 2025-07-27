import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { KeyRound, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updateUserPassword, session } = useAuth();
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!session) {
      toast({ title: "Sesión no válida", description: "El enlace de recuperación puede haber expirado. Por favor, inténtalo de nuevo.", variant: "destructive" });
      navigate('/comenzar');
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: 'Las contraseñas no coinciden', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await updateUserPassword(password);
    setLoading(false);

    if (!error) {
      setSuccess(true);
      setTimeout(() => navigate('/comenzar'), 3000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Restablecer Contraseña - ENGYX</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-8 rounded-xl tech-border">
            {success ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-emerald-100 mb-2">¡Contraseña Cambiada!</h1>
                <p className="text-emerald-200/70">Tu contraseña se ha actualizado. Serás redirigido para iniciar sesión.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h1 className="text-3xl font-bold text-emerald-100">Restablecer Contraseña</h1>
                  <p className="text-emerald-200/70">Crea una nueva contraseña para tu cuenta.</p>
                </div>

                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-emerald-200">Nueva Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-black/50 border-emerald-500/30 focus:border-emerald-400"
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-emerald-200">Confirmar Nueva Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-black/50 border-emerald-500/30 focus:border-emerald-400"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Guardar Nueva Contraseña' }
                  </Button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}