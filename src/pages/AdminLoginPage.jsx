import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (!error) {
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Bienvenido al panel de administración.',
      });
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - ENGYX</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-8 rounded-xl tech-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-bold text-emerald-100">Acceso de Administrador</h1>
              <p className="text-emerald-200/70">Inicia sesión para gestionar la plataforma.</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-emerald-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@engyx.xyz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/50 border-emerald-500/30 focus:border-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-emerald-200">Contraseña</Label>
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
              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600" disabled={loading}>
                {loading ? 'Iniciando...' : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}