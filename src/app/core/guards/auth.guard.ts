import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "@/core/services/session.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router) {}

    canActivate(): boolean {
        if (this.sessionService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}