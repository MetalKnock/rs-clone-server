import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const addUser: Handler = (_req, res) => {
  res.status(StatusCodes.BAD_REQUEST).end();
};
