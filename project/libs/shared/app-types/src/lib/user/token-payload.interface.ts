import { UserRole } from '@project/shared/app-types';

export interface TokenPayloadInterface {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
}
