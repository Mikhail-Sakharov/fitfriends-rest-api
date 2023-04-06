export interface Review {
  _id?: string;
  createdAt?: string;
  trainingId: string;
  userId: string;
  userName: string;
  userAvatarPath: string;
  text: string;
  rating: number;
}
