import { Request, Response } from 'express';

interface IUser {
  id: number;
  username: string;
}

const users: IUser[] = [
  { id: 1, username: 'user' },
  { id: 2, username: 'admin'},
];

export const getAll = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const addNew = (req: Request, res: Response) => {
  users.push(req.body);
  res.status(201).json({ succeed: true, count: users.length });
};

export const editOne = (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === +req.params.id);
  users[index] = { ...users[index], ...req.body };
  res.status(200).json(users[index]);
};

export const deleteOne = (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === +req.params.id);
  users[index] = { ...users[index], ...req.body };
  users.splice(index, 1);
  res.status(201).json({ succeed: true, count: users.length });
};

export default {
  getAll,
  addNew,
  editOne,
  deleteOne,
};