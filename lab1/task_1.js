const hexDigits = "0123456789abcdef";
const numDigits = 6;

let hexString = "";
for (let i = 0; i < numDigits; i++) {
    hexString += hexDigits[Math.floor(Math.random() * hexDigits.length)];
}

console.log(hexString);

/*
num=(min,max)=>{
    let number_10= Math.random() * (max - min) + min;

    console.log("task_1 "+number_10.toString(16));

}
let min=0
let max=1000
num(min,max);*/
