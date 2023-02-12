import { Handler } from 'express';
import { validationResult } from 'express-validator';
import { updateUser } from '../../services/user/updateUser';
import { User } from '../../types';
import { handleError } from '../../utils';

export const handleUpdateUser: Handler = (req, res, next) => {
  const { refreshToken } = req.cookies as { refreshToken?: string };

  if (!refreshToken) {
    throw new Error('Unauthorized');
  }

  const errors = validationResult(req);
  const { id } = req.params;

  if (id == null || !errors.isEmpty()) {
    const data = handleError(req.originalUrl, 400, errors.array());
    res.status(data.status).send(data);
    return;
  }

  const data = req.body as Partial<User>;

  updateUser(id, data, refreshToken)
    .then((userData) => res.send(userData))
    .catch((e) => next(e));
};