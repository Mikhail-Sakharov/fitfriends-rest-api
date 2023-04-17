import {ForbiddenException, Injectable} from '@nestjs/common';
import CreateOrderDto from 'src/dto/create-order.dto';
import {OrderRdo} from 'src/rdo/order.rdo';
import {OrderEntity} from './order.entity';
import {OrdersRepository} from './orders.repository';
import {GymMembershipEntity} from './gym-membership.entity';
import {CreateGymOrderDto} from 'src/dto/create-gym-order.dto';
import {GymMembershipRepository} from './gym-membership.repository';
import {GetOrdersQuery} from 'src/query/get-orders.query';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly gymMembershipRepository: GymMembershipRepository
  ) {}

  public async getOrdersWithStatistics(orders: OrderRdo[]) {
    if (orders.length !== 0) {
      const activeOrders = orders.filter((order) => order.isCompleted === false);
      const trainingsInActiveOrders = activeOrders.map((order) => order.training.id);
      const trainingsIdsSet = new Set(trainingsInActiveOrders);
      const trainingsMap = new Map();

      trainingsIdsSet.forEach((trainingId) => trainingsMap.set(trainingId, {
        totalSoldQuantity: orders.filter((order) => order.training.id === trainingId).reduce((res, order) => res + order.quantity, 0),
        totalSoldAmountOfMoney: orders.filter((order) => order.training.id === trainingId).reduce((res, order) => res + order.totalOrderPrice, 0)
      }));

      const ordersWithStatistics = activeOrders.map((order) => ({
        ...order,
        statistics: trainingsMap.get(order.training.id)
      }));

      return ordersWithStatistics;
    }
  }

  public async createOrder(dto: CreateOrderDto & {traineeId: string}) {
    const orderEntity = new OrderEntity(dto);
    const order = await this.ordersRepository.create(orderEntity);
    return order;
  }

  public async createGymOrder(dto: CreateGymOrderDto & {traineeId: string}) {
    const gymMembershipEntity = new GymMembershipEntity(dto);
    const order = await this.gymMembershipRepository.create(gymMembershipEntity);
    return order;
  }

  public async getOrders(coachId: string, query?: GetOrdersQuery) {
    const orders = await this.ordersRepository.find(coachId, query);    
    return orders;
  }

  public async getTrainingPurchases(traineeId: string) {
    const purchases = await this.ordersRepository.getTrainingPurchases(traineeId);    
    return purchases;
  }

  public async getGymPurchases(traineeId: string) {
    const purchases = await this.gymMembershipRepository.find(traineeId);    
    return purchases;
  }

  public async showOrder(id: string, coachId: string) {
    const order = await this.ordersRepository.findById(id);

    if(order.coachId !== coachId) {
      throw new ForbiddenException('Access denied');
    }

    return order;
  }

  public async deactivateOrder(id: string) {
    const order = await this.ordersRepository.findById(id);

    const orderEntity = new OrderEntity({...order, isCompleted: true});
    const deactivatedOrder = await this.ordersRepository.update(id, orderEntity);

    return deactivatedOrder;
  }

  public async incrementTrainingsCount(trainingId: string, traineeId: string) {
    const trainingOrder = await this.ordersRepository.findById(trainingId);
    if (trainingOrder.traineeId !== traineeId) {
      throw new ForbiddenException('Access denied');
    }
    const quantity = trainingOrder.quantity + 1;
    const orderEntity = new OrderEntity({...trainingOrder, quantity});
    await this.ordersRepository.update(trainingId, orderEntity);
  }

  public async incrementGymsCount(gymId: string, traineeId: string) {
    const gymMembership = await this.gymMembershipRepository.findById(gymId);
    if (gymMembership.traineeId !== traineeId) {
      throw new ForbiddenException('Access denied');
    }
    const quantity = gymMembership.quantity + 1;
    const gymMembershipEntity = new GymMembershipEntity({...gymMembership, quantity});
    await this.gymMembershipRepository.update(gymId, gymMembershipEntity);
  }

  public async decrementTrainingsCount(trainingId: string, traineeId: string) {
    const trainingOrder = await this.ordersRepository.findById(trainingId);
    if (trainingOrder.traineeId !== traineeId) {
      throw new ForbiddenException('Access denied');
    }
    if (trainingOrder.quantity > 0) {
      const quantity = trainingOrder.quantity - 1;
      const orderEntity = new OrderEntity({...trainingOrder, quantity});
      await this.ordersRepository.update(trainingId, orderEntity);
    } else {
      const orderEntity = new OrderEntity({...trainingOrder, isCompleted: true});
      await this.ordersRepository.update(trainingId, orderEntity);
    }
  }

  public async decrementGymsCount(gymId: string, traineeId: string) {
    const gymMembership = await this.gymMembershipRepository.findById(gymId);
    if (gymMembership.traineeId !== traineeId) {
      throw new ForbiddenException('Access denied');
    }
    if (gymMembership.quantity > 0) {
      const quantity = gymMembership.quantity - 1;
      const gymMembershipEntity = new GymMembershipEntity({...gymMembership, quantity});
      await this.gymMembershipRepository.update(gymId, gymMembershipEntity);
    } else {
      const gymMembershipEntity = new GymMembershipEntity({...gymMembership, isCompleted: true});
      await this.gymMembershipRepository.update(gymId, gymMembershipEntity);
    }
  }
}
