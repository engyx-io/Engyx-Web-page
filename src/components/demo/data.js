import React from 'react';
import { Sun, Wind, Droplets } from 'lucide-react';

export const initialDemoStats = {
  totalEnergy: 15420,
  totalRevenue: 2850000,
  totalInvestors: 1247,
  avgROI: 18.5,
  co2Avoided: 8750,
  treesEquivalent: 12500,
  activePlants: 3
};

export const plantsData = [
  {
    id: 1,
    name: "Solar Atacama I",
    type: "Solar",
    location: "Chile",
    capacity: "150 MW",
    status: "Operativa",
    energyToday: "1,250 kWh",
    revenue: "$45,200",
    efficiency: 94,
    icon: Sun,
    color: "emerald"
  },
  {
    id: 2,
    name: "Eólica Patagonia",
    type: "Eólica",
    location: "Argentina",
    capacity: "200 MW",
    status: "Operativa",
    energyToday: "1,850 kWh",
    revenue: "$62,800",
    efficiency: 87,
    icon: Wind,
    color: "teal"
  },
  {
    id: 3,
    name: "Hidrógeno Verde",
    type: "Hidrógeno",
    location: "España",
    capacity: "100 MW",
    status: "Mantenimiento",
    energyToday: "0 kWh",
    revenue: "$0",
    efficiency: 0,
    icon: Droplets,
    color: "blue"
  }
];

export const portfolioData = {
  totalInvested: 25000,
  currentValue: 29500,
  totalReturns: 4500,
  roi: 18,
  tokens: {
    GXP: 15000,
    ENGYX: 8500,
    SOLAR: 12000
  },
  rewards: 1250
};