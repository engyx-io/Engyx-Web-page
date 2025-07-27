import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Search, Sun, Wind, Droplets, ArrowRight, ArrowLeft } from 'lucide-react';

const ExchangeTab = ({ tokens, loading, handleFeatureClick }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 10;

  const getPlantIcon = (type) => {
    switch (type) {
      case 'solar': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'wind': return <Wind className="w-5 h-5 text-blue-500" />;
      case 'hydro': return <Droplets className="w-5 h-5 text-cyan-500" />;
      default: return <Sun className="w-5 h-5 text-gray-500" />;
    }
  };

  const sortedAndFilteredTokens = useMemo(() => {
    let filtered = tokens.filter(token => 
      (token.digital_asset_name && token.digital_asset_name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (token.digital_asset_symbol && token.digital_asset_symbol.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (filterType !== 'all') {
      filtered = filtered.filter(token => token.type === filterType);
    }
    return filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tokens, searchTerm, filterType, sortConfig]);

  const paginatedTokens = useMemo(() => {
    const startIndex = (currentPage - 1) * tokensPerPage;
    return sortedAndFilteredTokens.slice(startIndex, startIndex + tokensPerPage);
  }, [sortedAndFilteredTokens, currentPage]);

  const totalPages = Math.ceil(sortedAndFilteredTokens.length / tokensPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('marketplace.exchangeTitle')}</h2>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder={t('marketplace.searchPlaceholder')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full md:w-64" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t('marketplace.filter.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('marketplace.filter.all')}</SelectItem>
                <SelectItem value="solar">{t('marketplace.filter.solar')}</SelectItem>
                <SelectItem value="wind">{t('marketplace.filter.wind')}</SelectItem>
                <SelectItem value="hydro">{t('marketplace.filter.hydro')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50">
                  <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('digital_asset_name')}>{t('marketplace.table.name')}</TableHead>
                  <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('digital_asset_symbol')}>{t('marketplace.table.symbol')}</TableHead>
                  <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('tokenization_type')}>{t('marketplace.table.tokenizationType')}</TableHead>
                  <TableHead className="text-foreground cursor-pointer" onClick={() => handleSort('smart_contract_network')}>{t('marketplace.table.network')}</TableHead>
                  <TableHead className="text-right text-foreground cursor-pointer" onClick={() => handleSort('token_price')}>{t('marketplace.table.lastPrice')}</TableHead>
                  <TableHead className="text-right text-foreground cursor-pointer" onClick={() => handleSort('change24h')}>{t('marketplace.table.change24h')}</TableHead>
                  <TableHead className="text-right text-foreground cursor-pointer" onClick={() => handleSort('volume24h')}>{t('marketplace.table.volume24h')}</TableHead>
                  <TableHead className="text-right text-foreground cursor-pointer" onClick={() => handleSort('marketCap')}>{t('marketplace.table.marketCap')}</TableHead>
                  <TableHead className="text-center text-foreground">{t('marketplace.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={9} className="text-center h-24 text-muted-foreground">{t('marketplace.table.loading')}</TableCell></TableRow>
                ) : paginatedTokens.length > 0 ? (
                  paginatedTokens.map(token => (
                    <TableRow key={token.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Link to={`/project/${token.id}`} className="flex items-center gap-3 group">
                          {getPlantIcon(token.type)}
                          <p className="font-bold text-foreground group-hover:text-primary transition-colors">{token.digital_asset_name}</p>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <p className="font-mono text-muted-foreground">{token.digital_asset_symbol || 'N/A'}</p>
                      </TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[150px]">{token.tokenization_type || 'N/A'}</TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[150px]">{token.smart_contract_network || 'N/A'}</TableCell>
                      <TableCell className="text-right font-mono text-foreground">${token.token_price?.toFixed(2)}</TableCell>
                      <TableCell className={`text-right font-mono ${token.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="flex items-center justify-end gap-1">
                          {token.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {token.change24h.toFixed(2)}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-foreground">${token.volume24h.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</TableCell>
                      <TableCell className="text-right font-mono text-foreground">${token.marketCap.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-4 transition-all duration-300 transform hover:scale-105" onClick={handleFeatureClick}>{t('marketplace.table.buy')}</Button>
                          <Button size="sm" variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-600 rounded-full px-4 transition-all duration-300 transform hover:scale-105" onClick={handleFeatureClick}>{t('marketplace.table.sell')}</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={9} className="text-center h-24 text-muted-foreground">{t('marketplace.table.noResults')}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <ArrowLeft className="w-4 h-4 mr-1" /> {t('marketplace.pagination.previous')}
              </Button>
              <span className="text-sm text-muted-foreground">{t('marketplace.pagination.pageInfo', { currentPage, totalPages })}</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                {t('marketplace.pagination.next')} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExchangeTab;