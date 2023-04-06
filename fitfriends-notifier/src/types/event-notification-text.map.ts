import {CommandEvent} from './command-event.enum';
import {NotificationText} from './notification-text.enum';

export const EventNotificationTextMap = {
  [CommandEvent.AddFriend]: NotificationText.AddFriend,
  [CommandEvent.RemoveFriend]: NotificationText.RemoveFriend,
  [CommandEvent.TrainingRequest]: NotificationText.TrainingRequest,
  [CommandEvent.TrainingRequestAcception]: NotificationText.TrainingRequestAcception,
  [CommandEvent.TrainingRequestRejection]: NotificationText.TrainingRequestRejection,
};
