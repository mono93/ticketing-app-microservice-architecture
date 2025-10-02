import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@mstickets93/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

const handleShowOrder = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate("ticket");

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  res.send(order);
};

router.get("/api/orders/:orderId", requireAuth, handleShowOrder);

export { router as showOrderRouter };
