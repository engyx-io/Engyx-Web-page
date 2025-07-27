import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LegalDocsStep = ({ formData, handleFileChange }) => (
  <div className="space-y-4">
    <Label htmlFor="legalDocFile" className="text-emerald-200">Enviar Documento Legal de Tokenización</Label>
    <p className="text-xs text-emerald-200/60">Importa tu documentación legal de emisión de Activo Digital</p>
    <Input id="legalDocFile" name="legalDocFile" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="bg-black/50 border-emerald-500/30 file:text-emerald-300 file:border-0 file:bg-black/50 file:px-4 file:py-2 file:mr-4 file:rounded-l-md hover:file:bg-emerald-500/20 cursor-pointer" />
    {formData.legalDocFile && <p className="text-sm text-emerald-300 mt-2">Archivo seleccionado: {formData.legalDocFile.name}</p>}
  </div>
);

export default LegalDocsStep;