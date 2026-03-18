import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const rep = context.switchToHttp().getRequest<Request & { header: any}>();
        const apikey = rep.headers['x-api-key'];

        if (!apikey || apikey !== process.env.API_KEY){
            throw new UnauthorizedException('Invalid API key');
        }
        return true;
    }
    
}