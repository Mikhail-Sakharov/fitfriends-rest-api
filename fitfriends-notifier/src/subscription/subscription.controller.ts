import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';

@Controller('subscription')
export class SubscriptionController {

  @EventPattern({cmd: CommandEvent.CreateNewTraining})
  public async registerNewBlogUser(title: string) {
    console.log(title);
  }
}
