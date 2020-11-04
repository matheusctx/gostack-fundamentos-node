import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  total: number;
}

interface RequestTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    { title, value, type }: RequestTransaction,
    { total }: Balance,
  ): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is not valid');
    }

    if (type === 'outcome' && total < value) {
      throw Error('This value exceeds the total cash');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
