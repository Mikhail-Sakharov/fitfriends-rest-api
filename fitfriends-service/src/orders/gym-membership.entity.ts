import {Entity} from 'src/types/entity.interface';
import {GymMembership} from 'src/types/gym-membership.interface';
import {PaymentMethod} from 'src/types/order.interface';

export class GymMembershipEntity implements GymMembership, Entity<GymMembership> {
  public gymId: string;
  public price: number;
  public quantity: number;
  public totalOrderPrice: number;
  public paymentMethod: PaymentMethod;
  public traineeId: string;

  constructor(gymMembership: GymMembership) {
    this.fillEntity(gymMembership);
  }

  toObject(): GymMembership {
    return {...this};
  }

  fillEntity(gymMembership: GymMembership) {
    this.gymId = gymMembership.gymId;
    this.price = gymMembership.price;
    this.quantity = gymMembership.quantity;
    this.totalOrderPrice = gymMembership.totalOrderPrice;
    this.paymentMethod = gymMembership.paymentMethod;
    this.traineeId = gymMembership.traineeId;
  }
}
