'use client';

import { useState } from 'react';
import BetForm from './components/BetForm';
import BetList from './components/BetList';
import { Bet, CreateBetInput } from './types/bet';

export default function Home() {
  const [bets, setBets] = useState<Bet[]>([]);

  const handleCreateBet = (betInput: CreateBetInput) => {
    const newBet: Bet = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user1', // In a real app, this would come from authentication
      ...betInput,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setBets((prevBets) => [newBet, ...prevBets]);
  };

  const handleStatusChange = (betId: string, newStatus: 'won' | 'lost') => {
    setBets((prevBets) =>
      prevBets.map((bet) =>
        bet.id === betId
          ? { ...bet, status: newStatus, updatedAt: new Date() }
          : bet
      )
    );
  };

  const calculateStats = () => {
    return bets.reduce(
      (acc, bet) => {
        acc.totalBets += 1;
        acc.totalStake += bet.amount;

        if (bet.status === 'won') {
          acc.wonBets += 1;
          acc.totalReturn += bet.amount * bet.odds;
        } else if (bet.status === 'lost') {
          acc.lostBets += 1;
        }

        return acc;
      },
      {
        totalBets: 0,
        wonBets: 0,
        lostBets: 0,
        totalStake: 0,
        totalReturn: 0,
      }
    );
  };

  const stats = calculateStats();
  const profit = stats.totalReturn - stats.totalStake;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Wettbot</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Neue Wette</h2>
            <BetForm onSubmit={handleCreateBet} />
            
            <div className="mt-8 bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Statistiken</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gesamte Wetten</p>
                  <p className="text-lg font-medium">{stats.totalBets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gewonnene Wetten</p>
                  <p className="text-lg font-medium text-green-600">{stats.wonBets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verlorene Wetten</p>
                  <p className="text-lg font-medium text-red-600">{stats.lostBets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ausstehende Wetten</p>
                  <p className="text-lg font-medium text-yellow-600">
                    {stats.totalBets - (stats.wonBets + stats.lostBets)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gesamteinsatz</p>
                  <p className="text-lg font-medium">{stats.totalStake.toFixed(2)}€</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gewinn/Verlust</p>
                  <p className={`text-lg font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {profit.toFixed(2)}€
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Meine Wetten</h2>
            <BetList bets={bets} onStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </main>
  );
} 