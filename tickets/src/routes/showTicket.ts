import express, { Request, Response } from "express";
import { NotFoundError } from "@mstickets93/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

const handleCreateTicket = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).send(ticket);
};

router.get("/api/tickets/:id", handleCreateTicket);

export { router as showTicketRouter };
