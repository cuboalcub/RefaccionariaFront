import { LoginResponse } from '../login-response.model';
import { Session } from '../session.model';

export class SessionMapper {
  static fromLoginResponse(res: LoginResponse): Session {
    return new Session(
      res.accessToken,
      res.refreshToken ?? null,
      res.user.id,
      res.user.isAdmin,
      res.user.isStaff
    );
  }

  static fromJSON(json: any): Session {
    return new Session(
      json.accessToken,
      json.refreshToken,
      json.userId,
      json.isAdmin,
      json.isStaff
    );
  }

  static toJSON(session: Session): any {
    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      userId: session.userId,
      isAdmin: session.isAdmin,
      isStaff: session.isStaff,
    };
  }
}
