import {ClassConstructor, plainToInstance} from 'class-transformer';
import {DAYS_IN_A_WEEK, DayNumberMap, HOURS_IN_A_DAY, LOCAL_TIMEZONE_OFFSET_IN_HOURS, MILLISECONDS_IN_AN_HOUR, MILLISECONDS_IN_A_DAY, MILLISECONDS_IN_A_MINUTE, MILLISECONDS_IN_A_SECOND, MINUTES_IN_AN_HOUR, SECONDS_IN_A_MINUTE} from 'src/app.constant';

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const getCurrentWeekRange = () => {
  const now = new Date();
  const wholeWeekDaysPastInMilliseconds = (DayNumberMap[now.getDay()] - 1) * MILLISECONDS_IN_A_DAY;
  const amountOfHoursFromCurrentDayStart = (now.getHours() - LOCAL_TIMEZONE_OFFSET_IN_HOURS) * MILLISECONDS_IN_AN_HOUR;
  const amountOfMinutesFromCurrentHourStart = now.getMinutes() * MILLISECONDS_IN_A_MINUTE + now.getSeconds() * MILLISECONDS_IN_A_SECOND + now.getMilliseconds();
  const startDateInMilliseconds = now.getTime() - wholeWeekDaysPastInMilliseconds - amountOfHoursFromCurrentDayStart - amountOfMinutesFromCurrentHourStart;
  const startDate = new Date(startDateInMilliseconds);

  const wholeNumbersOfDaysToTheEnd = (DAYS_IN_A_WEEK - DayNumberMap[now.getDay()]) * MILLISECONDS_IN_A_DAY;
  const wholeNumbersOfHoursToTheEndOfDay = (HOURS_IN_A_DAY - now.getHours() + 2) * MILLISECONDS_IN_AN_HOUR;
  const wholeNumbersOfMinutesToTheEndOfHour = (MINUTES_IN_AN_HOUR - now.getMinutes() - 1) * MILLISECONDS_IN_A_MINUTE;
  const wholeNumbersOfSecondsToTheEndOfHour = (SECONDS_IN_A_MINUTE - now.getSeconds() - 1) * MILLISECONDS_IN_A_SECOND;
  const endDateInMilliseconds = now.getTime() + wholeNumbersOfDaysToTheEnd + wholeNumbersOfHoursToTheEndOfDay + wholeNumbersOfMinutesToTheEndOfHour + wholeNumbersOfSecondsToTheEndOfHour;
  const endDate = new Date(endDateInMilliseconds);

  return {
    startDate,
    endDate
  };
};
