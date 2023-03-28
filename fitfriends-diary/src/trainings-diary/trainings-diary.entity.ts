import {Duration} from 'src/types/duration.enum';
import {Entity} from 'src/types/entity.interface';
import {TrainingsDiary} from 'src/types/trainings-diary.interface';

export class TrainingsDiaryEntity implements TrainingsDiary, Entity<TrainingsDiary> {
  public trainingId: string;
  public trainingTitle: string;
  public userId: string;
  public caloriesCount: number;
  public duration: Duration;

  constructor(trainingsDiary: TrainingsDiary) {
    this.fillEntity(trainingsDiary);
  }

  toObject(): TrainingsDiary {
    return {...this};
  }

  fillEntity(trainingsDiary: TrainingsDiary) {
    this.trainingId = trainingsDiary.trainingId;
    this.trainingTitle = trainingsDiary.trainingTitle;
    this.userId = trainingsDiary.userId;
    this.caloriesCount = trainingsDiary.caloriesCount;
    this.duration = trainingsDiary.duration;
  }
}