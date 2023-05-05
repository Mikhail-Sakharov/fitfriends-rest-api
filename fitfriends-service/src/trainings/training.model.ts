import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Training} from 'src/types/training.interface';
import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

@Schema({
  collection: 'fitfriends-trainings',
  timestamps: true
})
export class TrainingModel extends Document implements Training {
  @Prop({
    required: true
  })
  public title: string;

  @Prop({
    required: true
  })
  public bgImageUrl: string;

  @Prop({
    required: true
  })
  public level: TrainingLevel;

  @Prop({
    required: true
  })
  public type: TrainingType;

  @Prop({
    required: true
  })
  public duration: Duration;

  @Prop({
    default: 0
  })
  public price?: number;

  @Prop({
    required: true
  })
  public caloriesCount: number;

  @Prop({
    required: true
  })
  public description: string;

  @Prop({
    required: true
  })
  public gender: TrainingGenderType;

  @Prop({
    default: ''
  })
  public videoUrl?: string;

  @Prop({
    default: 0
  })
  public rating?: number;

  @Prop({
    required: true
  })
  public coachId: string;

  @Prop({
    default: false
  })
  public isSpecialOffer?: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);
