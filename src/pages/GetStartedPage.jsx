import React from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Wallet, UserPlus, LogIn, CheckCircle, Zap, Shield } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import WalletConnection from '@/components/dashboard/WalletConnection';
    import { useWallet } from '@/contexts/WalletContext';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import AuthForm from '@/components/auth/AuthForm';
    import { useTranslation } from 'react-i18next';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

    const StepCard = ({ icon, title, description, isCompleted, isActive, children }) => (
      <motion.div
        animate={{ scale: isActive ? 1.02 : 1, y: isActive ? -5 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card className={`transition-all duration-500 ${isActive ? 'border-primary shadow-md' : ''}`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${isCompleted ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : icon}
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          {isActive && (
            <CardContent>
              <div className="mt-2 pt-4 border-t">
                {children}
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    );

    export default function GetStartedPage() {
      const { isConnected } = useWallet();
      const { user } = useAuth();
      const { t } = useTranslation();

      const isWalletConnected = isConnected;
      const isUserAuthenticated = !!user;

      const steps = [
        {
          id: 'connect_wallet',
          icon: <Wallet className="w-6 h-6" />,
          title: t('getStartedPage.step1Title'),
          description: t('getStartedPage.step1Desc'),
          isCompleted: isWalletConnected,
          isActive: !isWalletConnected,
          content: <WalletConnection />
        },
        {
          id: 'create_account',
          icon: <UserPlus className="w-6 h-6" />,
          title: t('getStartedPage.step2Title'),
          description: t('getStartedPage.step2Desc'),
          isCompleted: isUserAuthenticated,
          isActive: isWalletConnected && !isUserAuthenticated,
          content: <AuthForm />
        },
        {
          id: 'access_platform',
          icon: <LogIn className="w-6 h-6" />,
          title: t('getStartedPage.step3Title'),
          description: t('getStartedPage.step3Desc'),
          isCompleted: isUserAuthenticated,
          isActive: isWalletConnected && isUserAuthenticated,
          content: (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('getStartedPage.allSetTitle')}</h3>
              <p className="text-muted-foreground mb-4">{t('getStartedPage.allSetDesc')}</p>
              <Link to="/dashboard">
                <Button className="w-full">
                  <Zap className="w-5 h-5 mr-2" />
                  {t('getStartedPage.accessPlatform')}
                </Button>
              </Link>
            </div>
          )
        }
      ];

      return (
        <>
          <Helmet>
            <title>{t('getStartedPage.metaTitle')}</title>
            <meta name="description" content={t('getStartedPage.metaDescription')} />
          </Helmet>

          <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="container mx-auto max-w-3xl">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground title-glow">
                  {t('getStartedPage.title')}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('getStartedPage.subtitle')}
                </p>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {steps.map((step) => (
                  <StepCard 
                    key={step.id}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    isCompleted={step.isCompleted}
                    isActive={step.isActive}
                  >
                    {step.content}
                  </StepCard>
                ))}
              </motion.div>

              <motion.div
                className="mt-12 bg-green-50 border border-green-200 p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="text-green-800 font-semibold">{t('getStartedPage.securityTitle')}</h3>
                </div>
                <ul className="space-y-2 text-green-700 text-sm">
                  {[t('getStartedPage.securityDesc1'), t('getStartedPage.securityDesc2'), t('getStartedPage.securityDesc3')].map((desc, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </>
      );
    }