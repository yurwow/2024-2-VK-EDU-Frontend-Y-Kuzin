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
    const array = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let index = 0;
    if (typeof bytes === 'number' && bytes >= 0 && bytes !== Infinity) {
        const oneKilobyte = 1024;
        for (let i = 0; bytes >= oneKilobyte; i++) {
            bytes /= oneKilobyte;
            index++;
        }
        return `${+bytes.toFixed(2)} ${array[index]}`;
    }
    else return false;
}
