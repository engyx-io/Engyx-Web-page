import React from 'react';
import { networkOptions } from '@/components/admin/asset-wizard/constants';

const SummaryStep = ({ formData }) => (
  <div className="space-y-4 text-white">
    <h3 className="text-lg font-bold text-emerald-400">Resumen de la Emisión</h3>
    <ul className="space-y-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
      <li><strong>Nombre:</strong> {formData.assetName || 'N/A'}</li>
      <li><strong>Símbolo:</strong> {formData.assetSymbol || 'N/A'}</li>
      <li><strong>Tipo:</strong> {formData.tokenType || 'N/A'}</li>
      <li><strong>Suministro Total:</strong> {formData.totalSupply || 'N/A'}</li>
      <li><strong>Precio (USDC):</strong> {formData.price || 'N/A'}</li>
      <li><strong>Soft Cap (USDC):</strong> {formData.softCap || 'N/A'}</li>
      <li><strong>Hard Cap (USDC):</strong> {formData.hardCap || 'N/A'}</li>
      <li><strong>Inversión Mín/Máx:</strong> {formData.minInvestment} / {formData.maxInvestment}</li>
      <li><strong>Fechas:</strong> {new Date(formData.startDate).toLocaleString()} a {new Date(formData.endDate).toLocaleString()}</li>
      <li><strong>Wallet Emisora:</strong> <span className="break-all">{formData.walletAddress || 'N/A'}</span></li>
      <li><strong>Red:</strong> {networkOptions.find(n => n.value === formData.network)?.label || 'N/A'} (ChainId: {formData.chainId})</li>
      <li><strong>Tokens Pago:</strong> {formData.paymentTokens.join(', ')}</li>
      <li><strong>URL Documentación:</strong> <span className="break-all">{formData.documentationUrl || 'N/A'}</span></li>
      <li><strong>Logo:</strong> {formData.logoFile?.name || 'No cargado'}</li>
      <li><strong>Doc. Legal:</strong> {formData.legalDocFile?.name || 'No cargado'}</li>
    </ul>
    <p className="text-amber-400/80 text-xs pt-4">Al continuar, se realizará una transacción en la blockchain para crear el contrato del activo digital. Esta acción es irreversible.</p>
  </div>
);

export default SummaryStep;