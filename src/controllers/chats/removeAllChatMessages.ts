import { Handler } from 'express';
import { removeAllChatMessages } from '../../services/chat/removeAllChatMessages';
import { handleValidationResult } from '../../utils';

export const handleRemoveAllChatMessages: Handler = (req, res, next): void => {
  const isValid = handleValidationResult(req, res);

  if (!isValid) {
    return;
  }

  const { id } = req.params;

  removeAllChatMessages(id)
    .then(() => {
      res.end();
    })
    .catch((e) => next(e));
};
