/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

const kilobyte = 1024;

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBeFalsy();
  expect(convertBytesToHuman("string")).toBeFalsy();
  expect(convertBytesToHuman("")).toBeFalsy();
  expect(convertBytesToHuman(false)).toBeFalsy();
  expect(convertBytesToHuman(true)).toBeFalsy();
  expect(convertBytesToHuman(NaN)).toBeFalsy();
  expect(convertBytesToHuman(Infinity)).toBeFalsy();
  expect(convertBytesToHuman("5")).toBeFalsy();
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(kilobyte)).toBe('1 KB');
  expect(convertBytesToHuman(kilobyte - 1)).toBe('1023 B');
  expect(convertBytesToHuman(5)).toBe('5 B');
  expect(convertBytesToHuman(0)).toBe('0 B');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(kilobyte ** 2)).toBe('1 MB');
  expect(convertBytesToHuman(kilobyte ** 2 * 1.5)).toBe('1.5 MB');
  expect(convertBytesToHuman(kilobyte ** 3)).toBe('1 GB');
  expect(convertBytesToHuman(kilobyte ** 3 * 1.5)).toBe('1.5 GB');
  expect(convertBytesToHuman(kilobyte ** 4)).toBe('1 TB');
  expect(convertBytesToHuman(kilobyte ** 5 * 1.5)).toBe('1.5 PB');
});
