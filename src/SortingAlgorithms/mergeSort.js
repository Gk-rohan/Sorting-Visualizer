export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, start, end, auxiliaryArray, animations) 
  {
    if (start < end) {
      const middle = Math.floor((start + end) / 2);
      mergeSortHelper(auxiliaryArray, start, middle, mainArray, animations);
      mergeSortHelper(auxiliaryArray, middle + 1, end, mainArray, animations);
      doMerge(mainArray, start, middle, end, auxiliaryArray, animations);
    }
    else{
      return;
    }
  }
  
function doMerge(array, start, middle, end, auxiliaryArray, animations)
{
  let i = start;
  let j = start;
  let k = middle + 1;
  while(j <= middle && k <= end){

    animations.push([j, k]);
    animations.push([j, k]);
    if(auxiliaryArray[j] <= auxiliaryArray[k]){
      animations.push([i, auxiliaryArray[j]]);
      array[i++] = auxiliaryArray[j++];
    }
    else{
      animations.push([i, auxiliaryArray[k]]);
      array[i++] = auxiliaryArray[k++];
    }
  }
  while(j <= middle){
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([i, auxiliaryArray[j]]);
    array[i++] = auxiliaryArray[j++];
  }
  while(k <= end){
    animations.push([k, k]);
    animations.push([k, k]);
    animations.push([i, auxiliaryArray[k]]);
    array[i++] = auxiliaryArray[k++];
  }
}