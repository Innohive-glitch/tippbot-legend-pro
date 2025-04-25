'use client';

import { useState } from 'react';
import { CreateBetInput } from '../types/bet';

interface BetFormProps {
  onSubmit: (bet: CreateBetInput) => void;
}

export default function BetForm({ onSubmit }: BetFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [odds, setOdds] = useState<number>(1);
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, odds, description });
    setAmount(0);
    setOdds(1);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Wetteinsatz (€)
        </label>
        <input
          type="number"
          id="amount"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="odds" className="block text-sm font-medium text-gray-700">
          Quote
        </label>
        <input
          type="number"
          id="odds"
          min="1"
          step="0.01"
          value={odds}
          onChange={(e) => setOdds(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Beschreibung
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Wette platzieren
      </button>
    </form>
  );
} 