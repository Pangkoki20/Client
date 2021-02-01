function isPrime(n) {
  if (n == 1) {
    return false;
  }
  for (let i = 2; i <= n; i++) {
    if (n % i == 0 && n != i) {
      return false;
    }
  }
  return true;
}

// Main program
let primeNumbers = [];
for (let i = 1; i <= 50; i++) {
  if (isPrime(i)) {
    primeNumbers.push(i);
  }
}

console.log("Prime numbers from 1 to 50:");
console.log(primeNumbers.join(", "));
console.log(primeNumbers.length + " numbers in total");
