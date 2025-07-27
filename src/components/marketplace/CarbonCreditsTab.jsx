import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Leaf, ShoppingCart, Info, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarbonCreditCard = ({ credit, handleFeatureClick }) => {
  return (
    <motion.div
      className="bg-card border rounded-xl overflow-hidden flex flex-col group"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
    >
      <div className="relative">
        <img src={credit.image_url || 'https://images.unsplash.com/photo-1528194822445-4a36a3a03c7a?q=80&w=2070&auto=format&fit=crop'} alt={credit.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-foreground">
          Vintage {credit.vintage_year}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-foreground mb-1">{credit.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{credit.project_type}</p>
        <p className="text-sm text-muted-foreground flex-grow mb-4">{credit.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground">Price/Ton</p>
            <p className="font-bold text-primary">${credit.price_per_ton.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Available</p>
            <p className="font-bold text-foreground">{credit.quantity_available.toLocaleString()} Tons</p>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <Button className="w-full" onClick={handleFeatureClick}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Credits
          </Button>
          <Button variant="outline" className="w-full" onClick={handleFeatureClick}>
            <Info className="w-4 h-4 mr-2" />
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function CarbonCreditsTab({ handleFeatureClick }) {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const fetchCredits = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('carbon_credits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCredits(data);
    } catch (error) {
      toast({
        title: "Error fetching carbon credits",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (credit.description && credit.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || credit.project_type === filterType;
    return matchesSearch && matchesType;
  });

  const projectTypes = [...new Set(credits.map(c => c.project_type))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Carbon Credits Marketplace</h2>
        <Link to="/certify-carbon">
          <Button>
            <Award className="mr-2 h-4 w-4" />
            Certificar Proyecto
          </Button>
        </Link>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search credits by name or description..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Project Types</SelectItem>
            {projectTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-card p-6 rounded-xl h-[450px] animate-pulse"></div>
          ))}
        </div>
      ) : filteredCredits.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCredits.map(credit => (
            <CarbonCreditCard key={credit.id} credit={credit} handleFeatureClick={handleFeatureClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Leaf className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-xl font-semibold text-foreground">No Carbon Credits Found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </motion.div>
  );
}