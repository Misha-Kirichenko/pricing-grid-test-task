import { ONE_DAY } from 'src/common/constants/time.constant';
import { WeekDays } from 'src/common/enums';
import { TDatesObj } from 'src/common/types';

export const generateDatesObj = (
  dateFrom: string,
  dateTo: string,
): TDatesObj => {
  const start = new Date(dateFrom);
  const end = new Date(dateTo);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const startMs = start.getTime();
  const endMs = end.getTime();
  const dates = {};
  for (let i = startMs; i < endMs + ONE_DAY; i += ONE_DAY) {
    const date = new Date(i);
    const weekDay = WeekDays[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    dates[formattedDate] = weekDay;
  }
  return dates;
};
