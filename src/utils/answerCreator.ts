import { Response } from 'express';

export const ErrorResponse = {
  notFound: (res: Response, message: string) => res.status(404).json({ error: true, message }),
  serverError: (res: Response, message: string) => res.status(500).json({ error: true, message }),
  badRequest: (res: Response, message: string) => res.status(400).json({ error: true, message }),
  unauthorized: (res: Response, message: string) => res.status(401).json({ error: true, message }),
  forbidden: (res: Response, message: string) => res.status(403).json({ error: true, message }),
};

export const SuccessResponse = {
  dataObject: (res: Response, data: object) => res.status(200).json({ success: true, data }),
  dataArray: (res: Response, data: any[]) => res.status(200).json({ success: true, data }),
  messageOk: (res: Response, message: string) => res.status(200).json({ success: true, message }),
  createdOk: (res: Response, message: string) => res.status(201).json({ error: true, message }),
};

export default {
  error: ErrorResponse,
  success: SuccessResponse,
}