import { Args, Mutation, Parent, ResolveField, Resolver, Query } from "@nestjs/graphql";
import { CategoryService } from "src/category/category.service";
import { ProductService } from "src/product/product.service";

@Resolver('Product')
export class ProductResolver {
    constructor(
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService,
    ){}
    @Query('products')
    products() {
        return this.productService.findAll();
    }

    @Query('product')
    product(@Args('id') id: string) {
        // GraphQL ID comes as string; convert if needed
        return this.productService.findOne(Number(id));
    }

    @Mutation('createProduct')
    createProduct(
        @Args('name') name: string,
        @Args('price') price: number,
        @Args('categoryId') categoryId: number,
    ){
        return this.productService.create({name, price, categoryId: Number(categoryId),

        });
    }

    @ResolveField('category')
    category(@Parent() product: any){
        return this.categoryService.findOne(product.categoryId);
    }

}