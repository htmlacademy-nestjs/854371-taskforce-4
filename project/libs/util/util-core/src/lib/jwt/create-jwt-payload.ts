import { TokenPayloadInterface, UserInterface } from '@project/shared/app-types';

export function createJwtPayload(user: UserInterface): TokenPayloadInterface {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  };
}
