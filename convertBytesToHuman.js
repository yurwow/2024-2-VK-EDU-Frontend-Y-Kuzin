/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof bytes === 'number' && bytes >= 0) {
      if (bytes < 1024) return `${bytes} B`
      else if (bytes >= 1048576) {
          let megabyte = ((bytes / 1024) / 1024).toFixed(2);
          return `${+megabyte} MB`
      } else {
          let kilobyte = (bytes / 1024).toFixed(2);
          return `${+kilobyte} KB`
      }
  }
  else return false
}
