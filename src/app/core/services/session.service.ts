import { Injectable } from "@angular/core";
import { Session } from "../models/auth/session.model";

@Injectable({ providedIn: "root" })
export class SessionService {
    private readonly STORAGE_KEY = "session";

    setSession(session: Session): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    }

    getSession(): Session | null {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? Session.fromJSON(JSON.parse(data) as Session) : null;
    }

    clearSession(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    isLoggedIn(): boolean {
        return this.getSession() !== null;
    }
}