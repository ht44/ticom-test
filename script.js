'use strict';

const fs = require('fs');
const path = require('path');
const mergesort = require('./mergesort');
const Queue = require('./queue');
const dir = './files';

getFiles(dir);

function getFiles(dir) {
  let result = [],
      queue = new Queue();

  queue.enqueue(dir);

  while (queue._back > 0) {

    let current = queue.dequeue(),
        children;

    if (fs.statSync(current).isDirectory()) {
      children = fs.readdirSync(current);

      for (let i = 0; i < children.length; i++) {
        let p = path.resolve(current, children[i]);
        queue.enqueue(p);
      }

    } else {
      result.push(getSerialNum(current));
    }

  }

  Promise.all(result).then(values => {
    findDuplicates(values);
  }).catch(err => {
    console.log(err);
  });

}

function getSerialNum(file) {
  let match;
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, str) => {
      if (err) {
        reject(err);
      }
      match = str.match(/[A-Z]{2}\-\d{4}/);
      resolve({n: file, s:match[0]});
    });
  });
}

function findDuplicates(arr) {

  let result = [];
  arr = mergesort(arr);

  for (let i = 0; i < arr.length; i++) {

     if (i === 0) {
       if (arr[i].s === arr[i + 1].s) {
         result.push(path.basename(arr[i].n));
       }
     } else if (i === arr.length - 1) {
       if (arr[i].s === arr[i - 1].s) {
         result.push(path.basename(arr[i].n));
       }
     } else {
       if (arr[i].s === arr[i + 1].s || arr[i].s === arr[i - 1].s) {
         result.push(path.basename(arr[i].n));
       }
     }

  }

  console.log(result);
  return result;

}
