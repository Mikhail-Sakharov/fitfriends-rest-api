import {Injectable} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {OrdersService} from 'src/orders/orders.service';
import {GymOrderRdo} from 'src/rdo/gym-order.rdo';
import {OrderRdo} from 'src/rdo/order.rdo';

@Injectable()
export class UserPurchasesService {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  public async getPurchases(traineeId: string) {
    const myTrainings = await this.ordersService.getTrainingPurchases(traineeId);
    const myTransformedTrainings = fillObject(OrderRdo, myTrainings) as unknown as OrderRdo[];
    
    const myGyms = await this.ordersService.getGymPurchases(traineeId);
    const myTransformedGyms = fillObject(GymOrderRdo, myGyms) as unknown as GymOrderRdo[];

    const myPurchases = [...myTransformedTrainings, ...myTransformedGyms];

    return myPurchases;
  }

  public async getBalance(traineeId: string) {
    const myTrainings = await this.ordersService.getTrainingPurchases(traineeId);
    const myTransformedTrainings = fillObject(OrderRdo, myTrainings) as unknown as OrderRdo[];
    
    const myGyms = await this.ordersService.getGymPurchases(traineeId);
    const myTransformedGyms = fillObject(GymOrderRdo, myGyms) as unknown as GymOrderRdo[];

    const balance = {
      trainings: myTransformedTrainings.map((training) => ({
        trainingId: training.training.id,
        trainingsQuantity: training.quantity
      })),
      gyms: myTransformedGyms.map((gym) => ({
        gymId: gym.gym.id,
        gymQuantity: gym.quantity
      }))
    };

    return balance;
  }
}
