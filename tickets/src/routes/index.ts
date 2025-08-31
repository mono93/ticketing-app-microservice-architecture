import { createTicketRouter } from "./createTicket";
import { showTicketRouter } from "./showTicket";
import { updateTicketRouter } from "./updateTicket";

import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export { createTicketRouter, showTicketRouter, updateTicketRouter, router as indexTicketRouter };
