import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useWallet } from '@/contexts/WalletContext';
import StakingPools from '@/components/dashboard/staking/StakingPools';
import MyStakesList from '@/components/dashboard/staking/MyStakesList';
import NewStakePanel from '@/components/dashboard/staking/NewStakePanel';
import StakingBenefitsCard from '@/components/dashboard/staking/StakingBenefitsCard';
import WalletConnection from '@/components/dashboard/WalletConnection';
export default function StakingTab() {
  const {
    user
  } = useAuth();
  const {
    isConnected,
    walletAddress
  } = useWallet();
  const [stakingAmount, setStakingAmount] = useState(1000);
  const [selectedPeriod, setSelectedPeriod] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [unstakingId, setUnstakingId] = useState(null);
  const [stakingPools, setStakingPools] = useState([]);
  const [myStakes, setMyStakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const poolsPromise = supabase.rpc('get_staking_pool_stats').order('duration_months', {
      ascending: true
    });
    let stakesPromise;
    if (user) {
      stakesPromise = supabase.from('user_stakes').select('*, staking_pools(name, apy)').eq('user_id', user.id).order('start_date', {
        ascending: false
      });
    } else {
      stakesPromise = Promise.resolve({
        data: [],
        error: null
      });
    }
    const [poolsResult, stakesResult] = await Promise.all([poolsPromise, stakesPromise]);
    if (poolsResult.error) {
      toast({
        title: "Error",
        description: "Could not load staking plans.",
        variant: "destructive"
      });
      console.error("Error fetching pools:", poolsResult.error);
    } else {
      setStakingPools(poolsResult.data);
      if (poolsResult.data.length > 0 && !poolsResult.data.some(p => p.duration_months === selectedPeriod)) {
        setSelectedPeriod(poolsResult.data[0].duration_months);
      }
    }
    if (stakesResult.error) {
      toast({
        title: "Error",
        description: "Could not load your stakes.",
        variant: "destructive"
      });
    } else {
      setMyStakes(stakesResult.data);
    }
    setLoading(false);
  }, [user, selectedPeriod]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleStake = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to stake.",
        variant: "destructive"
      });
      return;
    }
    if (!walletAddress) {
      toast({
        title: "Error",
        description: "Could not detect your wallet address. Please reconnect.",
        variant: "destructive"
      });
      return;
    }
    const selectedPool = stakingPools.find(p => p.duration_months === selectedPeriod);
    if (!selectedPool) return;
    if (stakingAmount < selectedPool.min_stake) {
      toast({
        title: "Insufficient amount",
        description: `The minimum for this plan is ${selectedPool.min_stake.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    const startDate = new Date();
    const endDate = new Date(new Date().setMonth(startDate.getMonth() + selectedPeriod));
    const {
      error
    } = await supabase.from('user_stakes').insert({
      user_id: user.id,
      user_wallet: walletAddress,
      pool_id: selectedPool.id,
      amount: stakingAmount,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      status: 'active',
      rewards_earned: 0
    });
    setIsProcessing(false);
    if (error) {
      toast({
        title: "Staking Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Staking successful!",
        description: `You have locked ${stakingAmount.toLocaleString()} $ENGYX for ${selectedPeriod} months with ${selectedPool.apy}% APR`
      });
      fetchData();
    }
  };
  const handleUnstake = async stakeId => {
    if (!user) return;
    setUnstakingId(stakeId);
    setIsProcessing(true);
    const {
      error
    } = await supabase.from('user_stakes').update({
      status: 'completed'
    }).match({
      id: stakeId,
      user_id: user.id
    });
    setIsProcessing(false);
    setUnstakingId(null);
    if (error) {
      toast({
        title: "Error unstaking",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Unstaking successful!",
        description: "Your tokens have been released and rewards transferred."
      });
      fetchData();
    }
  };
  if (!isConnected) {
    return <div className="py-12">
        <div className="bg-card p-8 rounded-xl border max-w-lg mx-auto">
          <WalletConnection />
        </div>
      </div>;
  }
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }} className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Staking $ENGYX</h2>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StakingPools stakingPools={stakingPools} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} loading={loading} />
          <MyStakesList myStakes={myStakes} isUnstaking={isProcessing} unstakingId={unstakingId} handleUnstake={handleUnstake} loading={loading} isLoggedIn={!!user} />
        </div>

        <div className="space-y-6">
          <NewStakePanel stakingAmount={stakingAmount} setStakingAmount={setStakingAmount} selectedPeriod={selectedPeriod} stakingPools={stakingPools} isStaking={isProcessing} handleStake={handleStake} />
          <StakingBenefitsCard />
        </div>
      </div>
    </motion.div>;
}