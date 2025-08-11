import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Cookie, HelpCircle, ListChecks, Users, Settings, Gavel, RefreshCw, Mail } from 'lucide-react';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

    const CookiePolicyPageEs = () => {
      const sections = [
        {
          icon: HelpCircle,
          title: "1. ¿Qué son las cookies?",
          content: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten reconocer tu navegador, recordar tus preferencias, y ofrecer una mejor experiencia de usuario."
        },
        {
          icon: ListChecks,
          title: "2. ¿Qué tipos de cookies usamos?",
          table: {
            headers: ["Tipo de cookie", "Finalidad"],
            rows: [
              ["Estrictamente necesarias", "Permiten el funcionamiento básico del sitio (ej. acceso seguro, navegación)"],
              ["De rendimiento", "Recogen datos anónimos sobre el uso del sitio para mejorar su funcionamiento"],
              ["De funcionalidad", "Recuerdan tus preferencias (idioma, región, login)"],
              ["De marketing y análisis", "Permiten personalizar anuncios o analizar el comportamiento de usuarios con herramientas como Google Analytics"]
            ]
          }
        },
        {
          icon: Users,
          title: "3. Cookies de terceros",
          content: "Podemos utilizar herramientas externas como:",
          items: [
            "Google Analytics (analítica web)",
            "Meta Pixel (retargeting y anuncios)",
            "Sumsub (para el proceso de KYC)",
            "Coinbase Commerce (procesamiento de pagos)"
          ],
          footer: "Estas herramientas también pueden colocar cookies en tu dispositivo. Consulta sus respectivas políticas para más detalles."
        },
        {
          icon: Settings,
          title: "4. Gestión de cookies",
          content: "Tienes derecho a:",
          items: [
            "Aceptar o rechazar cookies no esenciales desde nuestro banner de consentimiento.",
            "Cambiar tus preferencias en cualquier momento desde el panel de configuración de cookies.",
            "Eliminar cookies desde tu navegador:"
          ],
          subItems: [
            "Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos del sitio",
            "Safari: Preferencias > Privacidad > Gestionar datos del sitio web",
            "Firefox: Opciones > Privacidad y seguridad > Cookies y datos del sitio"
          ]
        },
        {
          icon: Gavel,
          title: "5. Base legal (GDPR y CCPA)",
          items: [
            "Bajo el GDPR (UE), almacenamos cookies no esenciales solo con tu consentimiento.",
            "Bajo la CCPA (EE.UU.), los usuarios de California pueden rechazar la venta o compartición de datos."
          ]
        },
        {
          icon: RefreshCw,
          title: "6. Cambios a esta política",
          content: "ENGYX puede modificar esta política en cualquier momento. Se recomienda revisar esta página regularmente. Las modificaciones entrarán en vigor tan pronto como se publiquen."
        },
        {
          icon: Mail,
          title: "7. Contacto",
          content: "Para ejercer tus derechos o realizar consultas, contáctanos en:",
          contact: {
            email: "legal@engyx.io",
            address: "Engyx Digital Energy Inc., Delaware, USA."
          }
        }
      ];

      return (
        <>
          <Helmet>
            <title>Política de Cookies - ENGYX</title>
            <meta name="description" content="Política de Cookies de Engyx Digital Energy. Entiende cómo y por qué usamos cookies en nuestro sitio." />
          </Helmet>
          <div className="pt-24 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-foreground title-glow">
                  🍪 Política de Cookies
                </h1>
                <p className="text-lg text-muted-foreground mb-6">Última actualización: 01 de julio de 2025</p>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Esta Política de Cookies explica cómo <strong>Engyx Digital Energy Inc.</strong> ("ENGYX", "nosotros", "nuestro") utiliza cookies y tecnologías similares en su sitio web <a href="https://engyx.io" className="text-primary hover:underline">https://engyx.io</a>. Al continuar navegando por este sitio, aceptas el uso de cookies conforme a esta política.
                </p>
              </motion.div>

              <div className="space-y-12">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <motion.section
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Card className="shadow-soft-md">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-foreground">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {section.content && <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>}
                            
                            {section.items && (
                                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                                {section.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            )}

                            {section.subItems && (
                                <ul className="space-y-1 list-disc list-inside text-muted-foreground/80 ml-6 mt-2">
                                {section.subItems.map((item, i) => <li key={i}><code className="text-sm bg-secondary px-1 py-0.5 rounded">{item}</code></li>)}
                                </ul>
                            )}

                            {section.table && (
                                <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                    <tr>
                                        {section.table.headers.map((header, i) => (
                                        <th key={i} className="border-b-2 p-3 text-sm font-semibold text-foreground uppercase tracking-wider">{header}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {section.table.rows.map((row, i) => (
                                        <tr key={i} className="border-b">
                                        <td className="p-3 text-foreground"><strong>{row[0]}</strong></td>
                                        <td className="p-3 text-muted-foreground">{row[1]}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                </div>
                            )}

                            {section.footer && <p className="text-muted-foreground leading-relaxed mt-4">{section.footer}</p>}

                            {section.contact && (
                                <div className="mt-4 space-y-2">
                                <a href={`mailto:${section.contact.email}`} className="text-primary hover:text-primary/80 transition-colors duration-300 block">
                                    {section.contact.email}
                                </a>
                                <p className="text-muted-foreground">{section.contact.address}</p>
                                </div>
                            )}
                        </CardContent>
                      </Card>
                    </motion.section>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      );
    };

    export default CookiePolicyPageEs;