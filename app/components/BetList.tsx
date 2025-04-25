'use client';

import { Bet } from '../types/bet';

interface BetListProps {
  bets: Bet[];
  onStatusChange?: (betId: string, newStatus: 'won' | 'lost') => void;
}

export default function BetList({ bets, onStatusChange }: BetListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'text-green-600';
      case 'lost':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {bets.map((bet) => (
        <div key={bet.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold">{bet.description}</p>
              <p className="text-sm text-gray-500">
                Einsatz: {bet.amount.toFixed(2)}€ | Quote: {bet.odds.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Möglicher Gewinn: {(bet.amount * bet.odds).toFixed(2)}€
              </p>
              <p className="text-xs text-gray-400">
                Erstellt am: {formatDate(bet.createdAt)}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <span className={`font-medium ${getStatusColor(bet.status)}`}>
                {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
              </span>
              {bet.status === 'pending' && onStatusChange && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onStatusChange(bet.id, 'won')}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                  >
                    Gewonnen
                  </button>
                  <button
                    onClick={() => onStatusChange(bet.id, 'lost')}
                    className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Verloren
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 