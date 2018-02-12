let tempArry = [1, 2, 3, 4, 5];

// for 
/* for (let i = 0; i < tempArry.length; i++) {
	console.log(tempArry[i]);
} */

/* for (let i = tempArry.length; i--;) {
	console.log(tempArry[i]); //结果依次为5,4,3,2,1
} */

/* for (let i = 0, len = tempArry.length; i < len; i++) {
	console.log(tempArry[i]);
} */

/* tempArry.forEach((value, key, arry) => {
	console.log(value);
	console.log(key);
	console.log(arry);
}) */

/* let tempArryMap = tempArry.map((value, key, arry) => {
	console.log(value);
	console.log(key);
	console.log(arry);
	return value + 1;
})
console.log(tempArry);
console.log(tempArryMap); */

/* let tempArryFilter = tempArry.filter((value, key, arry) => {
	console.log(value);
	console.log(key);
	console.log(arry);
	if (value === 5) {
		return false;
	}
	return true;
})
console.log(tempArry); // [1, 2, 3, 4, 5]
console.log(tempArryFilter); // [1, 2, 3, 4]
 */
let tempArryReduce = tempArry.reduce((count, value,key,arry)=> {
  console.log(count);  // 依次为  0,1,3,6,10
  console.log(value);  // 依次为 1,2,3,4,5
  console.log(key);  // 0,1,2,3,4
  console.log(arry)  // 始终为 [1,2,3,4,5]
  return count + value;
},0);
console.log(tempArry); // 结果为 [1, 2, 3, 4, 5]
console.log(tempArryReduce)  // 结果为 16

/* let tempArrySome = tempArry.some((value,key,arry)=> {  
  console.log(value);  // 依次为 1,2,3 
  console.log(key);   // 0,1,2
  console.log(arry) // 始终为[1, 2, 3, 4, 5]
  return value === 3;
});
console.log(tempArry); // [1, 2, 3, 4, 5]
console.log(tempArrySome)  // true */

/* let tempArryEvery = tempArry.every((value,key,arry)=> {  
  console.log(value);  // 1
  console.log(key);   // 0
  console.log(arry) // 始终为[1, 2, 3, 4, 5]
  return value === 3;
});
console.log(tempArry); // [1, 2, 3, 4, 5]
console.log(tempArryEvery)  // false */

/* let tempArryIndexOf = tempArry.indexOf(3);
console.log(tempArry); // [1, 2, 3, 4, 5]
console.log(tempArryIndexOf)  // 2 */

/* // tempArry = [1,2,3,4,5,4,3,4,5]
let tempArryLastIndexOf = tempArry.lastIndexOf(5);
console.log(tempArry); // [1,2,3,4,5,4,3,4,5]
console.log(tempArryLastIndexOf)  // 8 */

/* var a = [];
a['b'] = 2;
a['c'] = 3;
console.log(a);     //结果为[ b: 2 ]
console.log(a[0]);  //结果为undefined */

/* for (let key in tempArry) {
	console.log(key); // 依次输出 0,1,2,3,4
} */

/* let tempArryIn = {
	'1': 'a',
	'2': 'b',
	'3': 'c'
};
for (let key in tempArryIn) {
	console.log(key); // 依次输出 1,2,3
} */

/* for(let value of tempArry) {
	console.log(value); // 依次输入 1,2,3,4,5
} */

