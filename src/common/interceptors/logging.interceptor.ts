// import {
//     CallHandler,
//     ExecutionContext,
//     Injectable,
//     NestInterceptor,
// } from '@nestjs/common'
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//     intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
//         const rep = context.switchToHttp().getRequest();
//         const { method, url } = rep;

//         const start = Date.now();
//         return next.handle().pipe(
//             tap(() => {
//                 const ms = Date.now() - start;
//                 console.log(`[HTTP] ${method} ${url} - ${ms}ms`);
//             }),
//         );
//     }
// }


import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'; // Needed for GraphQL
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let method: string;
        let url: string;

        // 1. Determine if this is a GraphQL or HTTP request
        if (context.getType<string>() === 'graphql') {
            const gqlContext = GqlExecutionContext.create(context);
            const info = gqlContext.getInfo();
            const req = gqlContext.getContext().req;
            
            // For GraphQL, we log the Operation Type (Query/Mutation) and the Field Name
            method = info.operation.operation.toUpperCase(); 
            url = info.fieldName; 
        } else {
            // Standard HTTP logic
            const req = context.switchToHttp().getRequest();
            if (req) {
                method = req.method;
                url = req.url;
            }
        }

        const start = Date.now();
        return next.handle().pipe(
            tap(() => {
                const ms = Date.now() - start;
                console.log(`[${context.getType().toUpperCase()}] ${method} ${url} - ${ms}ms`);
            }),
        );
    }
}