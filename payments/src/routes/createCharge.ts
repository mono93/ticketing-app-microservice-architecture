import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@mstickets93/common";
import { Order } from "../models/order";

const router = express.Router();

const createChargeValidation = [
  body("token").not().isEmpty(),
  body("orderId").not().isEmpty(),
];

const handleCreateCharge = async (req: Request, res: Response) => {
  const { token, orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError("Cannot pay for an cancelled order");
  }

  res.send({ success: true });
};

router.post(
  "/api/payments",
  requireAuth,
  createChargeValidation,
  validateRequest,
  handleCreateCharge
);

export { router as createChargeRouter };
