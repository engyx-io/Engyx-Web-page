import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, ImageOff, PlusCircle } from "lucide-react";
import { Link } from 'react-router-dom';

export default function ProjectList({ projects, onEdit, onDelete, onCreate }) {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'for_sale':
        return <span className="px-2 py-1 text-xs font-medium text-emerald-100 bg-emerald-500/30 rounded-full">En Venta</span>;
      case 'in_development':
        return <span className="px-2 py-1 text-xs font-medium text-yellow-100 bg-yellow-500/30 rounded-full">En Desarrollo</span>;
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium text-blue-100 bg-blue-500/30 rounded-full">Activa</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium text-gray-100 bg-gray-500/30 rounded-full">{status}</span>;
    }
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center p-12 glass-card rounded-xl tech-border">
        <h3 className="text-xl font-bold text-emerald-100 mb-2">No hay proyectos</h3>
        <p className="text-emerald-200/70 text-sm mb-6">
          Actualmente no hay proyectos creados.
        </p>
        <Button onClick={onCreate} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
          <PlusCircle className="w-4 h-4 mr-2" />
          Crear Proyecto
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-xl tech-border overflow-x-auto">
      <div className="flex justify-end mb-4">
        <Button onClick={onCreate} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
          <PlusCircle className="w-4 h-4 mr-2" />
          Crear Proyecto
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-emerald-500/20 hover:bg-emerald-500/5">
            <TableHead className="text-emerald-200">Imagen</TableHead>
            <TableHead className="text-emerald-200">Nombre Activo Digital</TableHead>
            <TableHead className="text-emerald-200">Estado</TableHead>
            <TableHead className="text-emerald-200">Tipo</TableHead>
            <TableHead className="text-emerald-200">Tipo Tokenización</TableHead>
            <TableHead className="text-emerald-200">Red</TableHead>
            <TableHead className="text-emerald-200">Ubicación</TableHead>
            <TableHead className="text-right text-emerald-200">ROI (%)</TableHead>
            <TableHead className="text-right text-emerald-200">% Ing. Tokenizar</TableHead>
            <TableHead className="text-center text-emerald-200">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="border-emerald-500/10 hover:bg-emerald-500/10">
              <TableCell>
                {project.image_url ? (
                  <img src={project.image_url} alt={project.digital_asset_name} className="w-20 h-12 object-cover rounded-md" />
                ) : (
                  <div className="w-20 h-12 bg-black/30 rounded-md flex items-center justify-center">
                    <ImageOff className="w-6 h-6 text-emerald-200/50" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium text-white">{project.digital_asset_name}</TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell className="text-emerald-300 capitalize">{project.type}</TableCell>
              <TableCell className="text-emerald-300 truncate max-w-[150px]">{project.tokenization_type || 'N/A'}</TableCell>
              <TableCell className="text-emerald-300 truncate max-w-[150px]">{project.smart_contract_network || 'N/A'}</TableCell>
              <TableCell className="text-emerald-300">{project.location}</TableCell>
              <TableCell className="text-right text-emerald-300 mono">{project.roi}</TableCell>
              <TableCell className="text-right text-emerald-300 mono">{project.progress}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link to={`/project/${project.id}`}>
                    <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-200 hover:bg-blue-500/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(project)} className="text-emerald-400 hover:text-emerald-200 hover:bg-emerald-500/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(project.id)} className="text-red-400 hover:text-red-200 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}