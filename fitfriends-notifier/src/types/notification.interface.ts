export interface Notification {
  _id?: string;
  createdAt?: string;
  addresseeId: string;
  senderId: string;
  text: string;
}
