import {Duration} from 'src/types/duration.enum';
import {Entity} from 'src/types/entity.interface';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {Training} from 'src/types/training.interface';

export class UserEntity implements Training, Entity<Training> {
  public _id?: string;
  public createdAt?: string;
  public title: string;
  public bgImageUrl: string;
  public level: TrainingLevel;
  public type: TrainingType;
  public duration: Duration;
  public price?: number;
  public caloriesCount: number;
  public description: string;
  public gender: TrainingGenderType;
  public videoUrl: string;
  public rating?: number;
  public coachId: string;
  public isSpecialOffer?: boolean;

  constructor(training: Training) {
    this.fillEntity(training);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(training: Training) {
    this._id = training._id;
    this.createdAt = training.createdAt;
    this.title = training.title;
    this.bgImageUrl = training.bgImageUrl;
    this.level = training.level;
    this.type = training.type;
    this.duration = training.duration;
    this.price = training.price;
    this.caloriesCount = training.caloriesCount;
    this.description = training.description;
    this.gender = training.gender;
    this.videoUrl = training.videoUrl;
    this.rating = training.rating;
    this.coachId = training.coachId;
    this.isSpecialOffer = training.isSpecialOffer;
  }
}
