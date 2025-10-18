import { Subjects, Publisher, PaymentCreatedEvent } from '@mstickets93/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
