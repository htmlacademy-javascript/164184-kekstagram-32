/*function isMaxLengthString(string, length) {
  return string.length <= length;
}

isMaxLengthString('проверяемая строка', 20);

function isPalindromeString(string) {
  return string.replaceAll(' ', '').split('').reverse().join('').toLowerCase() === string.replaceAll(' ', '').toLowerCase();
}

isPalindromeString('топот');

function givesNumbers(string) {
  let stingOfNumbers = '';
  [...string.toString().replaceAll(' ', '')].forEach((element) => {
    stingOfNumbers += !Number.isNaN(Number(element)) ? element : '';
  });
  return Number(stingOfNumbers);
}

givesNumbers('ECMAScript 2022');*/

// const outOfTime = (startWorkDay, endWorkDay, startMeeting, duration) => {
//   const arrStartWorkDay = startWorkDay.split(':');
//   const arrEndWorkDay = endWorkDay.split(':');
//   const arrStartMeeting = startMeeting.split(':');

//   const startWorkDayMinutes = (Number(arrStartWorkDay[0]) * 60) + Number(arrStartWorkDay[1]);
//   const endWorkDayMinutes = (Number(arrEndWorkDay[0]) * 60) + Number(arrEndWorkDay[1]);
//   const startMeetingMinutes = (Number(arrStartMeeting[0]) * 60) + Number(arrStartMeeting[1]);

//   if (startMeetingMinutes >= startWorkDayMinutes && startMeetingMinutes <= endWorkDayMinutes) {
//     if (startMeetingMinutes + duration <= endWorkDayMinutes) {
//       return true;
//     }
//   }
//   return false;
// };

// outOfTime('8:00', '17:30', '08:00', 900);

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
// имяФункции('08:00', '17:30', '14:00', 90); // true
// имяФункции('8:0', '10:0', '8:0', 120);     // true
// имяФункции('08:00', '14:30', '14:00', 90); // false
// имяФункции('14:00', '17:30', '08:0', 90);  // false
// имяФункции('8:00', '17:30', '08:00', 900); // false
