import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class NotificationRdo {
  @ApiProperty({
    description: 'The unique MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The date of the notification entry creation',
    example: '2023-03-14T16:58:30.805Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'The addressee MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Expose()
  public addresseeId: string;

  @ApiProperty({
    description: 'The sender MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Expose()
  public senderId: string;

  @ApiProperty({
    description: 'The name of the sender',
    example: 'John'
  })
  @Expose()
  public senderName: string;

  @ApiProperty({
    description: 'The text of the notification',
    example: 'John  удалил(а) вас из друзей'
  })
  @Expose()
  public text: string;
}
