/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

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
  expect(convertBytesToHuman(1024)).toBe('1 KB');
  expect(convertBytesToHuman(1023)).toBe('1023 B');
  expect(convertBytesToHuman(5)).toBe('5 B');
  expect(convertBytesToHuman(0)).toBe('0 B');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(1048576)).toBe('1 MB');
  expect(convertBytesToHuman(1572864)).toBe('1.5 MB');
  expect(convertBytesToHuman(1073741824)).toBe('1 GB');
  expect(convertBytesToHuman(1605351520)).toBe('1.5 GB');
  expect(convertBytesToHuman(1099511627776)).toBe('1 TB');
  expect(convertBytesToHuman(1688849860263936)).toBe('1.5 PB');
});
