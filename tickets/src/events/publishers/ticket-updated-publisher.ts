import { Publisher, Subjects, TicketUpdatedEvent } from "@mstickets93/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  
}