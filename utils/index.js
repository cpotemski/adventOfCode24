const arraySum = (arr) => arr.reduce((a,b) => a + b, 0);
const arrayProd = (arr) => arr.reduce((a,b) => a * b, 1);
const arrayUnique = (value, index, self) => self.indexOf(value) === index;
const toIntArray = (arr) => arr.map(el => parseInt(el))
const to2DArray = (data, separator = "") => data.split("\n").filter(a => !!a).map(line => line.split(separator))
const transpose2DArray = a => a[0].map((_, c) => a.map(r => r[c]));
const reverse = str => str.split("").reverse().join("");

module.exports = {
    arraySum,
    arrayProd,
    arrayUnique,
    toIntArray,
    to2DArray,
    transpose2DArray,
    reverse
}
