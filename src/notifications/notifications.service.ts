import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    notify(event: String, payload: any){
        console.log(`[NOTIFY] ${event}`, payload);
        return {ok: true};
    }
}
