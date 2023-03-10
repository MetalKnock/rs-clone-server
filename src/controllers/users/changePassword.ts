import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { MS_IN_A_MONTH } from '../../constants';
import { UserSchema } from '../../models/types';
import { changePassword } from '../../services/user/changePassword';
import { handleError } from '../../utils';

export const handleChangePassword: Handler = (req, res, next) => {
  const { refreshToken } = req.cookies as { refreshToken?: string };

  if (!refreshToken) {
    throw new Error('Unauthorized');
  }

  const errors = validationResult(req);
  const { userId, password } = req.body as Pick<UserSchema, 'userId' | 'password'>;

  if (!errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  changePassword(userId, password, refreshToken)
    .then((userData) => {
      res.cookie('refreshToken', userData.refreshToken, { maxAge: MS_IN_A_MONTH, httpOnly: true });
      res.send(userData);
    })
    .catch(next);
};
