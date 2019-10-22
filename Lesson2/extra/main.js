let num = 266219;

num = multiplyMemberOfNumber(num);
console.log('num: ', num);
num = num**3;
console.log('num: ', showTwoFirstNumber(num));

function multiplyMemberOfNumber(n) {
    if (n > 10) {
        return (n % 10 *multiplyMemberOfNumber(Math.trunc(n/10)));
    } else {
        return n;
    }
}

function showTwoFirstNumber (n) {
    return Math.trunc(num / 10 ** (String(num).length - 2));
}