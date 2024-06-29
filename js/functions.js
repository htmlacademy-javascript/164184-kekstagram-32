function isMaxLengthString(string, length) {
  return string.length <= length;
}

function isPalindromeString(string) {
  return string.replaceAll(' ', '').split('').reverse().join('').toLowerCase() === string.replaceAll(' ', '').toLowerCase();
}

function givesNumbers(string) {
  let stingOfNumbers = '';
  [...string.toString().replaceAll(' ', '')].forEach((element) => {
    stingOfNumbers += !Number.isNaN(Number(element)) ? element : '';
  });
  return Number(stingOfNumbers);
}

