export interface Bet {
  id: string;
  userId: string;
  amount: number;
  odds: number;
  description: string;
  status: 'pending' | 'won' | 'lost';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBetInput {
  amount: number;
  odds: number;
  description: string;
} 