'use strict';

function mergesort(arr) {
  let left, right;
  if (arr.length < 2) return arr;
  left = [],
  right = [];
  for (let i = 0; i < arr.length; i++) {
    i < arr.length / 2 ? left.push(arr[i]) : right.push(arr[i]);
  }
  left = mergesort(left);
  right = mergesort(right);
  return merge(left, right);
}

function merge(left, right) {
  let result = [],
      i = 0,
      j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  while(i < left.length) {
    result.push(left[i]);
    i++;
  }
  while(j < right.length) {
    result.push(right[j]);
    j++;
  }
  return result;
}

module.exports = mergesort;
