import React from 'react';
    import { Helmet } from 'react-helmet';
    import { useTranslation } from 'react-i18next';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

    const ProtectedPage = () => {
      const { t } = useTranslation();
      const { user } = useAuth();

      return (
        <>
          <Helmet>
            <title>{t('protectedPage.metaTitle')}</title>
            <meta name="description" content={t('protectedPage.metaDescription')} />
          </Helmet>
          <div className="container mx-auto px-4 py-12">
            <Card className="max-w-xl mx-auto bg-slate-900/50 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-emerald-400">
                  {t('protectedPage.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h1 className="text-xl mb-4">{t('protectedPage.welcome')}, {user?.user_metadata?.full_name || user?.email}</h1>
                  <p>{t('protectedPage.message')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      );
    };

    export default ProtectedPage;