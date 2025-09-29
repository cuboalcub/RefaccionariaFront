import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionService } from "@/core/services/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private sessionService: SessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const session = this.sessionService.getSession();
        if (session) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${session.accessToken}`)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
    