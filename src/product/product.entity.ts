import { Entity, PrimaryGeneratedColumn , Column, ManyToOne, JoinColumn } from "typeorm";
import { Category} from "../category/category.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    price: number;

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}