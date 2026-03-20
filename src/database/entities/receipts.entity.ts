import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('receipts')
export class  Receipt{
    @PrimaryGeneratedColumn()
    receiptId: String;

    @Column()
    name: String;

    @Column({type: 'timestamp'})
    issuedAt: Date;

    @Column('decimal', {precision: 10, scale: 2})
    price: number;
}