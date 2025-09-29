import { LoginResponse } from '../login-response.model';
import { Session } from '../session.model';
import { UserMapper } from './user.mapper';

export class SessionMapper {
  static fromLoginResponse(res: LoginResponse): Session {
    return new Session(
      UserMapper.fromLoginResponse(res),
      res.accessToken,
      res.refreshToken
    );
  }
}
