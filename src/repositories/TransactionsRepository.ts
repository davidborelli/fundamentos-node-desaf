import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (sum: number, proximo: Transaction) => {
        if (proximo.type === 'income') {
          return sum + proximo.value;
        }

        return sum;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (sum: number, proximo: Transaction) => {
        if (proximo.type === 'outcome') {
          return sum + proximo.value;
        }

        return sum;
      },
      0,
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
