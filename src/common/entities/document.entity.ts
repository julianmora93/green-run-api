import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { StateEnum } from "../utils/state.enum";

@Entity({ name: 'documents' })
export class DocumentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    description!: string;

    @Column()
    acronym!: string;

    @Column({
        type: 'enum',
        enum: StateEnum
    })
    state!: StateEnum;
}