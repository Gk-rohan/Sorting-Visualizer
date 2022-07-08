export function getQuickSortAnimations(array){
    const animations = [];
    quickSort(array,0,array.length-1,animations);
    return animations;
}

function quickSort(array,left,right,animations){
    let index = partition(array,left,right,animations);
    if(left < index - 1){
        quickSort(array,left,index-1,animations);
    }
    if(index < right){
        quickSort(array,index,right,animations);
    }
}

function partition(array,left,right,animations){
    let pivotIndex = Math.floor((left+right)/2);
    let pivot = array[pivotIndex];
    animations.push([pivotIndex,pivotIndex,'pivotChange']);
    while (left <= right){
        while(pivot > array[left]){
            left++;
        }
        while(pivot < array[right]){
            right--;
        }
        if(left <= right){
            animations.push([left,right,'swapColor']);
            animations.push([left,right,'swap']);
            swap(array,left,right);
            left++;
            right--;
        }
    }
    animations.push([pivotIndex,pivotIndex,'pivotRevert']);
    return left;
}

function swap(array,firstIdx,secondIdx){
    const temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
}