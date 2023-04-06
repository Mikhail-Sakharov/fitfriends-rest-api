import {ApiProperty} from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({
    description: 'The addressee MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  public addresseeId: string;

  @ApiProperty({
    description: 'The sender MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  public senderId: string;

  @ApiProperty({
    description: 'The name of the sender',
    example: 'John'
  })
  public senderName: string;
}
