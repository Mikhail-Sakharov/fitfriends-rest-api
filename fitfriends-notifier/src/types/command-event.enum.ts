import {Status} from './status.enum';

export enum CommandEvent {
  AddFriend = 'addFriend',
  RemoveFriend = 'removeFriend',
  CreateNewTraining = 'createNewTraining',
  CreateCoach = 'createCoach',
  TrainingRequest = 'trainingRequest',
  TrainingRequestAcception = 'trainingRequestAcception',
  TrainingRequestRejection = 'trainingRequestRejection'
}

export const CommandEventMap = {
  [Status.Accepted]: CommandEvent.TrainingRequestAcception,
  [Status.Rejected]: CommandEvent.TrainingRequestRejection
};
