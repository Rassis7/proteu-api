import { addDays, isWeekend, subDays } from 'date-fns';

export function addBusinessDays(date: Date, days: number) {
  let finalDate = date;
  let remainingDays = days;

  while (remainingDays > 0) {
    finalDate = addDays(finalDate, 1);

    if (!isWeekend(finalDate)) {
      remainingDays--;
    }
  }

  return finalDate;
}

export function addOrSubDays(date: Date, days: number) {
  return days > 0 ? addDays(date, days) : subDays(date, days * -1);
}
