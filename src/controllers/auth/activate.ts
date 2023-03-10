import { Handler } from 'express';
import { activate } from '../../services/user/activate';

export const handleActivation: Handler = (req, res, next) => {
  const { link: activationLink } = req.params;

  activate(activationLink)
    .then(() => res.redirect(process.env.CLIENT_URL || ''))
    .catch(next);
};
