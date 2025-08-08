import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { FileText, UserCheck, LayoutGrid, TrendingUp, Copyright, ShieldOff, ShieldCheck, RefreshCw, Gavel, Mail, Shield } from 'lucide-react';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

    const TermsPageEs = () => {
      const sections = [
        {
          icon: LayoutGrid,
          title: "1. Descripción del Servicio",
          content: <p className="text-foreground leading-relaxed">ENGYX ofrece una plataforma descentralizada que permite la adquisición de tokens vinculados a activos sustentables. A través de tecnologías blockchain y contratos inteligentes, los usuarios pueden participar en la financiación de proyectos de energía limpia, créditos de carbono y otros activos digitales.</p>
        },
        {
          icon: FileText,
          title: "2. Naturaleza del Token",
          content: (
            <>
              <p className="font-bold text-foreground">ENGYX Token no está registrado como valor mobiliario ante la SEC ni ante ninguna autoridad financiera europea. La venta de tokens está limitada a jurisdicciones donde su comercialización esté legalmente permitida.</p>
              <p className="mt-2 text-foreground leading-relaxed">ENGYX Token no representa participación accionaria, dividendos, ni derechos de gobernanza corporativa, y debe ser considerado un <strong>utility token</strong> o token de acceso, salvo que se indique lo contrario bajo las regulaciones locales.</p>
            </>
          )
        },
        {
          icon: UserCheck,
          title: "3. Elegibilidad",
          content: (
            <>
              <p className="text-foreground leading-relaxed">Para usar nuestros servicios, debes:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground leading-relaxed">
                <li>Ser mayor de 18 años</li>
                <li>No residir en países sancionados por OFAC, la UE o Naciones Unidas</li>
                <li>No estar incluido en listas AML/PEP</li>
                <li>Cumplir con los requisitos legales locales de tu país</li>
              </ul>
              <p className="mt-2 text-foreground leading-relaxed">Nos reservamos el derecho de denegar el acceso a la plataforma a cualquier persona que incumpla estas condiciones.</p>
            </>
          )
        },
        {
          icon: ShieldCheck,
          title: "4. Cumplimiento KYC y AML",
          content: (
            <>
              <p className="text-foreground leading-relaxed">Todos los usuarios deben completar un proceso de verificación de identidad (<strong>KYC</strong>) proporcionado por nuestro socio Sumsub. Este proceso está diseñado para cumplir con:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground leading-relaxed">
                <li><strong>La Ley de Secreto Bancario (BSA)</strong> y normativa de <strong>FinCEN</strong> en EE.UU.</li>
                <li><strong>La 6ª Directiva AML (AMLD6)</strong> en la Unión Europea</li>
                <li>Controles de sanciones y validaciones PEP/AML</li>
              </ul>
              <p className="mt-2 text-foreground leading-relaxed">ENGYX podrá rechazar solicitudes o suspender cuentas en caso de no superar estos procesos o presentar datos inexactos.</p>
            </>
          )
        },
        {
          icon: TrendingUp,
          title: "5. Riesgos Asociados",
          content: (
            <>
              <p className="text-foreground leading-relaxed">La adquisición de tokens conlleva riesgos significativos, incluyendo:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground leading-relaxed">
                <li>Pérdida total de la inversión</li>
                <li>Volatilidad del mercado cripto</li>
                <li>Cambios regulatorios que afecten la operación del proyecto</li>
              </ul>
              <p className="mt-2 text-foreground leading-relaxed">Recomendamos realizar una evaluación de riesgos independiente y, si es necesario, consultar a asesores legales y financieros antes de participar.</p>
            </>
          )
        },
        {
          icon: Gavel,
          title: "6. Jurisdicción y Regulación",
          content: (
            <>
              <p className="text-foreground leading-relaxed">ENGYX opera conforme a las leyes de Delaware, EE.UU., y se esfuerza por cumplir con regulaciones relevantes de:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground leading-relaxed">
                <li>🇺🇸 Estados Unidos: SEC, FinCEN, IRS, CFTC</li>
                <li>🇪🇺 Unión Europea: MiCA, AMLD6, GDPR</li>
              </ul>
              <p className="mt-2 text-foreground leading-relaxed">Sin embargo, es tu responsabilidad asegurarte de que el uso de esta plataforma no infringe las leyes de tu país de residencia.</p>
            </>
          )
        },
        {
          icon: Shield,
          title: "7. Política de Protección de Datos (Resumen)",
          content: (
            <>
              <p className="text-foreground leading-relaxed">Nos comprometemos a proteger tu información personal conforme a:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground leading-relaxed">
                <li><strong>Reglamento General de Protección de Datos (GDPR)</strong> – UE</li>
                <li><strong>California Consumer Privacy Act (CCPA)</strong> – EE.UU.</li>
              </ul>
              <p className="mt-2 text-foreground leading-relaxed">Consulta nuestra <Link to="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link> para más detalles.</p>
            </>
          )
        },
        {
          icon: ShieldOff,
          title: "8. Limitación de Responsabilidad",
          content: (
            <>
              <p className="text-foreground leading-relaxed">ENGYX no se hace responsable por:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground leading-relaxed">
                <li>Pérdida de claves privadas o acceso a wallets</li>
                <li>Daños económicos derivados de la compra de tokens</li>
                <li>Fallas técnicas, interrupciones del sistema o vulnerabilidades en contratos inteligentes</li>
              </ul>
            </>
          )
        },
        {
          icon: Copyright,
          title: "9. Propiedad Intelectual",
          content: <p className="text-foreground leading-relaxed">Todo el contenido, logotipos, código fuente y documentación en el sitio son propiedad de ENGYX Digital Assets Inc., salvo que se indique lo contrario. Está prohibida su reproducción sin autorización.</p>
        },
        {
          icon: RefreshCw,
          title: "10. Modificaciones",
          content: <p className="text-foreground leading-relaxed">Podemos actualizar estos Términos y Condiciones en cualquier momento. Te notificaremos por correo electrónico o a través del sitio web. El uso continuado del sitio tras los cambios constituye tu aceptación.</p>
        },
        {
          icon: Mail,
          title: "11. Contacto",
          content: <p className="text-foreground leading-relaxed">Para ejercer tus derechos o realizar consultas, contáctanos en:</p>,
          contact: {
            email: "legal@engyx.io",
            address: "ENGYX Digital Assets Inc., Delaware, USA."
          }
        }
      ];

      return (
        <>
          <Helmet>
            <title>Términos y Condiciones - ENGYX</title>
            <meta name="description" content="Términos y Condiciones de uso para la plataforma ENGYX Digital Assets." />
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
                  Términos y Condiciones de Uso
                </h1>
                <p className="text-lg text-muted-foreground mb-6">Última actualización: 01 de julio de 2025</p>
                <p className="text-foreground max-w-3xl mx-auto">
                  Bienvenido a <a href="https://engyx.io" className="text-primary hover:underline">https://engyx.io</a>, una plataforma operada por <strong>ENGYX Digital Assets Inc</strong>, con sede en Delaware, Estados Unidos. Al acceder o utilizar este sitio, aceptas cumplir estos Términos y Condiciones de Uso, así como nuestra Política de Privacidad y cualquier normativa aplicable.
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
                      <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-foreground">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-foreground">
                            {section.content}
                            {section.contact && (
                                <div className="mt-4 space-y-2">
                                <a href={`mailto:${section.contact.email}`} className="text-primary hover:text-primary/80 transition-colors duration-300 block">
                                    {section.contact.email}
                                </a>
                                <p className="text-foreground">{section.contact.address}</p>
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

    export default TermsPageEs;