export abstract class IPermissionManagerService {
  public abstract isGranted(permission: string): boolean;
  public abstract isGrantedAny(permissions: string[]): boolean;
}
