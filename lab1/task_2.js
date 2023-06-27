function insertString(original, insert, index) {
    if (index > original.length) {
        return original + insert;
    }

    return original.slice(0, index) + insert + original.slice(index);
}

const original = 'Ще не вмерла ні слава,ні воля';
const insert = 'України ';
const index = 13;

const result = insertString(original, insert, index);

console.log(result);
