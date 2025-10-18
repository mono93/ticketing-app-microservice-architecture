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
import { stripe } from "../stripe";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { Payment } from "../models/payment";

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
  /*****
   * Deprecated method
   * TODO need to update using payment intent
  const charge = await stripe.charges.create({
    currency: "usd",
    amount: order.price * 100,
    source: token,
  });
   */
  const payment = Payment.build({
    orderId,
    stripeId: 'random charge id',
  });
  await payment.save();
  new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    stripeId: payment.stripeId,
  });
};

router.post(
  "/api/payments",
  requireAuth,
  createChargeValidation,
  validateRequest,
  handleCreateCharge
);

export { router as createChargeRouter };
