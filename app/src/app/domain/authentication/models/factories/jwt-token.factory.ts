import { JwtToken } from '../class/jwt-token.model';

export class JWTTokenFactory {
  static build(
    isAuthenticated: boolean = false,
    token: string = null
  ): JwtToken {
    return {
      isAuthenticated: isAuthenticated,
      token: token,
    };
  }
}
