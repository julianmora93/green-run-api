import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { StateEnum } from "../utils/state.enum";
import { OperationEnum } from "../utils/operation.enum";
import { TransactionEntity } from "./transaction.entity";

@Entity({ name: 'transaction_type' })
export class TransactionTypeEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    description!: string;

    @Column({
        type: 'enum',
        enum: OperationEnum
    })
    operation!: OperationEnum;

    @Column({
        type: 'enum',
        enum: StateEnum
    })
    state!: StateEnum;

    @OneToMany(_ => TransactionEntity, transactionType => transactionType.transactionType)
    transactionTypeTransaction?: TransactionEntity[];
}