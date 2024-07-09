const array1 = [1,2,3];
const array2 = [4,5,6];

const copiedArray = [...array1];
console.log(`Copied Array:`, copiedArray);

const combinedArray = [...array1,...array2];
console.log('Combined Array:', combinedArray);

const newArray = [0, ...array1,4];
console.log(['New Array:', newArray]);