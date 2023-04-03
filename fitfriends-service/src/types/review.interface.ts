export interface Review {
  _id?: string;
  createdAt?: string;
  trainingId: string;
  userId: string;
  text: string; // 100 - 1024
  rating: number; // 1 - 5
}
