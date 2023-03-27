import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {TrainingsDiary} from 'src/types/trainings-diary.interface';

@Schema({
  collection: 'trainings-diary',
  timestamps: true
})
export class TrainingsDiaryModel extends Document implements TrainingsDiary {
  @Prop({
    required: true
  })
  public trainingId: string;

  @Prop({
    required: true
  })
  public trainingTitle: string;

  @Prop({
    required: true
  })
  public userId: string;

  @Prop({
    required: true
  })
  public caloriesCount: number;

  @Prop({
    required: true
  })
  public duration: number;
}

export const TrainingsDiarySchema = SchemaFactory.createForClass(TrainingsDiaryModel);
