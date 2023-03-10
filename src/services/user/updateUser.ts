import { UserDto } from '../../dtos/user-dto';
import { userModel } from '../../models/user-model';
import { User } from '../../types';
import { findRefreshToken } from '../token/findToken';
import { validateRefreshToken } from '../token/validateAccessToken';

export const updateUser = async (userId: number, data: Partial<User>, refreshToken: string): Promise<User> => {
  const validatedUserData = validateRefreshToken(refreshToken);
  const tokenData = await findRefreshToken(refreshToken);

  if (!validatedUserData || !tokenData) {
    throw new Error('Unauthorized');
  }

  const user = await userModel.findOneAndUpdate({ userId }, data, { new: true });

  if (!user) {
    throw new Error('Not Found');
  }

  const userData = new UserDto(user);

  return userData;
};
