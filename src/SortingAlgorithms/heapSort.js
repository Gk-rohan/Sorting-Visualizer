export function getHeapSortAnimations(array){
    const animations = [];
    heapSort(array,animations);
    return animations;
}

function swap(array,firstIdx,secondIdx){
    const temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
}

function heapSort(array,animations){
    var last = array.length;
    
    for(let i = Math.floor(array.length/2) - 1; i >= 0; i--){
        heapDown(array,array.length,i,animations);
    }

    for(let k = array.length -1; k > 0; k--){
        animations.push([0,k,'max']);
        animations.push([0,k,'max']);
        swap(array,0,k);
        heapDown(array,k,0,animations);
    }
    animations.push([0,0,'max']);
    animations.push([0,0,'max']);
    //check to see if array is sorted so we know if animations are broken or if the array isnt sorted properly
    var arrayS = "[";
    for(let j = 0; j < array.length; j++){
            arrayS += array[j].toString() + ",";
    }
    arrayS += "]";
    console.log(arrayS);
}

function heapDown(arr, length, index,animations){
    var largest = index;
    var left = 2 * index + 1;
    var right = 2 * index + 2;

    if(left < length && arr[left] > arr[largest]){
        largest = left;
    }

    if(right < length && arr[right] > arr[largest]){
        largest = right;
    }

    if(largest !== index){
        animations.push([index,largest,'reg']);
        animations.push([index,largest, 'reg']);
        swap(arr,largest,index);
        heapDown(arr,length,largest,animations);
    }
}
