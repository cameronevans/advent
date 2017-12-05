const _ = require('lodash');
const {a,b,d} = require('./code.js');

const isAnagram = (a, b) => {
  if (a.length !== b.length) {
    return false;
  } else {
    let bArray = b.split('');
    let matchesFound = 0;
    _.map(a, (letterA, key) => {
      const matched = [];
      _.map(bArray, (letterB, key) =>{
        if (letterA === letterB) {
          matchesFound++;
          matched.push(key);
          return;
        }
      });
      _.pullAt(bArray, matched);
    });
    if (matchesFound === a.length) {
      return true;
    } else {
      return false;
    }
  }
}

const one = (code, iterator = 1) => {
  let x = 0;
  _.map(code, (value, key) => {
    next = key + iterator;
    if (next >= code.length) {
      next = next - code.length;
    }
    if (value === code[next]) {
      x = x + parseInt(value);
    }
  });

  return x;
};


const two = (code) => {
  let x = 0;
  code.forEach((line) => {
    // x = x + (_.max(line) - _.min(line));
    line.forEach((value, key) => {
      for (let i = key + 1; i < line.length; i++) {
        let next = line[i];
        if (value % next === 0) {
          x = x + (value / next);
          return;
        } else if(next % value === 0) {
          x = x + (next / value);
          return;
        }
      }
    });
  });

  return x;
};

const four = (code) => {
  let x = 0;
  code.forEach((passphrase) => {
    const wordArray = passphrase.split(' ');
    let valid = true;
    wordArray.forEach((word, key) => {
      for (let i = key + 1; i < wordArray.length; i++) {
        if (word === wordArray[i] || isAnagram(word, wordArray[i])) {
          valid = false;
          return;
        }
      }
    });
    if (valid) {
      x++;
    }
  });

  return x;
}


let answer = 0;
answer = one(a);
answer = one(a, a.length/2);
answer = two(b);
answer = four(d);

console.log(`answer: ${answer}`);
