function isMaxLengthString(string, length) {
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

givesNumbers('ECMAScript 2022');

