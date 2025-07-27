import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Copy, ImageOff, FileText } from "lucide-react";
import { toast } from '@/components/ui/use-toast';

export default function DigitalAssetsList({ assets, onDelete }) {

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado", description: "La dirección del contrato ha sido copiada." });
  };

  if (!assets || assets.length === 0) {
    return (
      <div className="text-center p-12 glass-card rounded-xl tech-border">
        <h3 className="text-xl font-bold text-emerald-100 mb-2">No hay activos digitales</h3>
        <p className="text-emerald-200/70 text-sm mb-6">
          Crea tu primer activo digital desde la pestaña "Creación de Activos".
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-xl tech-border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-emerald-500/20 hover:bg-emerald-500/5">
            <TableHead className="text-emerald-200">Logo</TableHead>
            <TableHead className="text-emerald-200">Nombre del Activo</TableHead>
            <TableHead className="text-emerald-200">Símbolo</TableHead>
            <TableHead className="text-emerald-200">Red</TableHead>
            <TableHead className="text-emerald-200">Dirección del Contrato</TableHead>
            <TableHead className="text-emerald-200">Documento Legal</TableHead>
            <TableHead className="text-center text-emerald-200">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id} className="border-emerald-500/10 hover:bg-emerald-500/10">
              <TableCell>
                {asset.logo_url ? (
                  <img src={asset.logo_url} alt={asset.asset_name} className="w-12 h-12 object-cover rounded-full" />
                ) : (
                  <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center">
                    <ImageOff className="w-6 h-6 text-emerald-200/50" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium text-white">{asset.asset_name}</TableCell>
              <TableCell className="text-emerald-300 mono">{asset.asset_symbol}</TableCell>
              <TableCell className="text-emerald-300">{asset.network}</TableCell>
              <TableCell className="text-emerald-300 mono truncate max-w-[200px]">
                {asset.contract_address ? (
                  <div className="flex items-center gap-2">
                    <span>{asset.contract_address}</span>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(asset.contract_address)} className="text-emerald-400 hover:text-emerald-200 h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-slate-400 text-xs">No disponible</span>
                )}
              </TableCell>
              <TableCell>
                {asset.legal_doc_url ? (
                  <a href={asset.legal_doc_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="text-blue-300 border-blue-500/50 hover:bg-blue-500/10">
                      <FileText className="h-4 w-4 mr-2" /> Ver Documento
                    </Button>
                  </a>
                ) : (
                  <span className="text-slate-400 text-xs">No disponible</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onDelete(asset.id)} className="text-red-400 hover:text-red-200 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}