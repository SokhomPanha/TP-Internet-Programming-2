import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
// import { CategoryResolver } from './resolvers/category.resolver';
// import { ProductResolver } from './resolvers/product.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';
import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';

@Module({
  imports: [CategoryModule, ProductModule],
  // providers: [CategoryResolver  , ProductResolver],
  providers: [ProductCodeFirstResolver, CategoryCodeFirstResolver],
})
export class GraphqlModule {}

