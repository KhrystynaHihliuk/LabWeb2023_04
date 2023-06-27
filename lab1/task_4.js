// JavaScript program to find the most frequent element in an array
function mostFrequent(arr, n) {

    let maxcount = 0;
    let element_having_max_freq;
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (arr[i] == arr[j])
                count++;
        }

        if (count > maxcount) {
            maxcount = count;
            element_having_max_freq = arr[i];
        }
    }

    return element_having_max_freq;
}

let arr = [50, 50, 40, 40, 50, 50, 30];
let n = arr.length;
console.log(mostFrequent(arr, n));
