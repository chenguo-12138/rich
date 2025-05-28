/*
 * @Author: zhanghongwei
 * @Date: 2021-10-19 15:07:26
 * @Last Modified by: zhanghongwei
 * @Last Modified time: 2022-03-11 13:43:41
 */
function randomWord(random = false, min = 6, max = 6) {
  let string = '';
  let range = min;
  let array = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  // 随机产生
  if (random) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    let position = Math.round(Math.random() * (array.length - 1));
    string += array[position];
  }
  return string;
}

//获取hashcode
function getHashCode(len: number = 12) {
  return randomWord(false, len, len);
}

export default {
  getHashCode,
};
