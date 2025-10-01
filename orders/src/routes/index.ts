import express, { Request, Response } from 'express';
import { createOrderRouter } from './createOrder';
import { showOrderRouter } from './showTicket';
import { deleteOrderRouter } from './deleteOrder';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  res.send({});
});

export { createOrderRouter, showOrderRouter, deleteOrderRouter, router as indexOrderRouter };
