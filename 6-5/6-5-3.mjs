let sum = 0
let cnt = 0
for (let i = 1; i <= 100; i++) {
if (sum >= 50) {
break
}
if (i % 2 == 0){
sum += i
}
cnt = cnt + 1
console.log(sum,cnt)
}