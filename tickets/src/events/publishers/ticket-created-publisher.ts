import { Publisher, Subjects, TicketCreatedEvent } from "@mstickets93/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  
}