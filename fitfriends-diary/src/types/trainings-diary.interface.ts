export interface TrainingsDiary {
  _id?: string;
  createdAt?: string;
  trainingId: string;
  trainingTitle: string;
  userId: string;
  caloriesCount: number;
  duration: number;
}
