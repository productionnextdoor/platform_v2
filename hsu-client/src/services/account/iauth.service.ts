export abstract class IAuthService {
  abstract authenticate(email: string, password: string, rememberMe?: boolean, redirectUrl?: string): void;
  abstract isTokenValid(): boolean;
  abstract logout(): void;
}
