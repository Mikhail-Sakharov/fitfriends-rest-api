export interface NewTrainingEmailData {
  sendTo: string | string[];
  subscriberName: string;
  coachId: string;
  coachName: string;
  trainingType: string;
  trainingTitle: string;
  trainingDescription: string;
  trainingGender: string;
  trainingLevel: string;
  trainingDuration: string;
  trainingCaloriesCount: number;
  trainingPrice: number;
}
