import { Publisher, OrderCreatedEvent, Subjects } from '@mstickets93/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
