import { JwtToken } from '../class/jwt-token.model';

export class JWTTokenFactory {
  static build(token: string = null): JwtToken {
    return {
      isAuthenticated: token != null,
      token: token,
    };
  }
}
