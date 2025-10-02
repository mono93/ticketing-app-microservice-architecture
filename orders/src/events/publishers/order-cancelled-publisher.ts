import { Subjects, Publisher, OrderCancelledEvent } from '@mstickets93/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
