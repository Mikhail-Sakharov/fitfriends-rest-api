export interface Review {
  _id?: string;
  createdAt?: string;
  trainingId: string;
  userId: string;
  text: string;
  rating: number;
}
