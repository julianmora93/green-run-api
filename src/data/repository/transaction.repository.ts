import { AppDataSource } from "../data.source";
import { TransactionEntity } from "../entities/transaction.entity";
import { TransactionTypeEntity } from "../entities/transaction.type.entity";
import { UserEntity } from "../entities/user.entity";

export class TransactionRepository {

    static async createTransaction(user: UserEntity, transactionType: TransactionTypeEntity, amount: number, oldBalance: number, newBalance: number): Promise<TransactionEntity | null>{
        const transactionRepo = AppDataSource.getRepository(TransactionEntity);
        const newTransaction: TransactionEntity = transactionRepo.create();
        newTransaction.user = user;
        newTransaction.transactionType = transactionType;
        newTransaction.amount = amount;
        newTransaction.oldBalance = oldBalance;
        newTransaction.newBalance = newBalance;
        newTransaction.createdAt = new Date();
        return await transactionRepo.save(newTransaction);
    }

}