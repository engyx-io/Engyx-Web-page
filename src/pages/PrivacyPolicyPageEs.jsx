import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Shield, Database, Gavel, Globe, Users, FileText, Lock, Clock, Mail } from 'lucide-react';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

    const PrivacyPolicyPageEs = () => {
      const sections = [
        {
          icon: Shield,
          title: "Introducción",
          content: "Engyx Digital Energy (“nosotros”, “nuestro”) se compromete a proteger tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando interactúas con nuestros servicios en https://engyx.io."
        },
        {
          icon: Database,
          title: "Qué datos recopilamos",
          subsections: [
            {
              title: "Datos personales:",
              items: [
                "Nombre completo",
                "Fecha de nacimiento",
                "Nacionalidad",
                "Dirección residencial",
                "Correo electrónico y wallet",
                "Documentación oficial (pasaporte, DNI, licencia de conducir)",
                "Imagen biométrica (selfie)"
              ]
            },
            {
              title: "Datos técnicos:",
              items: [
                "Dirección IP, navegador, sistema operativo",
                "Registros de actividad en la plataforma",
                "Información de transacciones en la blockchain (cuando se vincula a un usuario)"
              ]
            }
          ]
        },
        {
          icon: Gavel,
          title: "Base legal para el tratamiento de datos (GDPR)",
          content: "Procesamos tus datos personales bajo las siguientes bases legales:",
          items: [
            "Consentimiento explícito (Art. 6.1.a)",
            "Cumplimiento de obligaciones legales (KYC/AML)",
            "Interés legítimo (seguridad, prevención de fraude)"
          ]
        },
        {
          icon: FileText,
          title: "Cómo usamos tu información",
          items: [
            "Verificar tu identidad (KYC/AML)",
            "Procesar tus compras y asignación de tokens",
            "Cumplir con obligaciones legales en EE. UU. y la UE",
            "Analizar el uso de la plataforma para mejorarla"
          ]
        },
        {
          icon: Users,
          title: "Con quién compartimos tus datos",
          content: "Podemos compartir tu información con:",
          items: [
            "Proveedores de verificación: (ej., Sumsub)",
            "Plataformas de pago: (ej., Coinbase Commerce)",
            "Autoridades reguladoras, si lo exige la ley"
          ],
          footer: "Nunca vendemos tus datos a terceros."
        },
        {
          icon: Users,
          title: "Derechos del usuario (GDPR/CCPA)",
          content: "Tienes derecho a:",
          items: [
            "Acceder, corregir o eliminar tus datos",
            "Oponerte al tratamiento o solicitar la restricción",
            "Retirar tu consentimiento en cualquier momento",
            "Portar tus datos a otro proveedor (derecho a la portabilidad)",
            "Presentar una queja ante una autoridad de protección de datos"
          ]
        },
        {
          icon: Clock,
          title: "Retención de datos",
          items: [
            "Conservamos tus datos durante 5 años después de la última actividad, para el cumplimiento de AML.",
            "Los datos anonimizados pueden ser utilizados para análisis sin restricciones de tiempo."
          ]
        },
        {
          icon: Lock,
          title: "Seguridad",
          content: "Implementamos medidas técnicas y organizativas (cifrado, auditorías, control de acceso) para proteger tus datos."
        },
        {
          icon: Globe,
          title: "Transferencias internacionales",
          content: "Si tus datos se almacenan fuera del EEE, utilizamos cláusulas contractuales estándar aprobadas por la Comisión Europea y políticas conformes a la CCPA en EE. UU."
        },
        {
          icon: Mail,
          title: "Contacto",
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
            <title>Política de Privacidad - ENGYX</title>
            <meta name="description" content="Política de Privacidad de Engyx Digital Energy. Conoce cómo protegemos y gestionamos tus datos personales." />
          </Helmet>
          <div className="pt-24 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground title-glow">
                  Política de Privacidad
                </h1>
                <p className="text-lg text-muted-foreground">Última actualización: 01 de julio de 2025</p>
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

                          {section.subsections && section.subsections.map((sub, i) => (
                            <div key={i} className="mt-4">
                              <h3 className="text-lg font-semibold text-foreground mb-2">{sub.title}</h3>
                              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                                {sub.items.map((item, j) => <li key={j}>{item}</li>)}
                              </ul>
                            </div>
                          ))}

                          {section.footer && <p className="text-muted-foreground leading-relaxed mt-4 font-semibold">{section.footer}</p>}

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

    export default PrivacyPolicyPageEs;