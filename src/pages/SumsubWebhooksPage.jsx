import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileJson, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const statusConfig = {
  GREEN: {
    variant: 'default',
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: <CheckCircle className="mr-2 h-4 w-4" />,
    label: 'Aprobado'
  },
  RED: {
    variant: 'destructive',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: <XCircle className="mr-2 h-4 w-4" />,
    label: 'Rechazado'
  },
  pending: {
    variant: 'secondary',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: <Clock className="mr-2 h-4 w-4" />,
    label: 'Pendiente'
  },
  default: {
    variant: 'outline',
    className: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    icon: <AlertTriangle className="mr-2 h-4 w-4" />,
    label: 'Desconocido'
  }
};

const getStatusBadge = (status) => {
  const config = statusConfig[status] || statusConfig.default;
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default function SumsubWebhooksPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('sumsub_verification_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error al cargar eventos',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Webhooks de Sumsub - ENGYX</title>
        <meta name="description" content="Registro de eventos de webhooks de verificación de Sumsub." />
      </Helmet>
      <div className="min-h-screen bg-[#0A0F1A] text-white p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <FileJson className="w-10 h-10 text-emerald-400" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Webhooks de Sumsub</h1>
              <p className="text-slate-400 mt-1">Registro de eventos de verificación de identidad.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#10172A]/80 backdrop-blur-sm border border-slate-800 rounded-xl shadow-lg"
          >
            <ScrollArea className="h-[70vh]">
              <Table>
                <TableHeader className="sticky top-0 bg-[#10172A]/90">
                  <TableRow className="border-slate-800">
                    <TableHead className="text-white">ID de Aplicante</TableHead>
                    <TableHead className="text-white">Tipo de Evento</TableHead>
                    <TableHead className="text-white">Estado</TableHead>
                    <TableHead className="text-white text-right">Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-400 py-10">
                        Cargando eventos...
                      </TableCell>
                    </TableRow>
                  ) : events.length > 0 ? (
                    events.map((event) => (
                      <TableRow key={event.id} className="border-slate-800 hover:bg-slate-800/50">
                        <TableCell className="font-mono text-sm text-slate-300">{event.applicant_id}</TableCell>
                        <TableCell>{event.event_type}</TableCell>
                        <TableCell>{getStatusBadge(event.review_status)}</TableCell>
                        <TableCell className="text-right text-slate-400">
                          {new Date(event.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-400 py-10">
                        No se han encontrado eventos.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}