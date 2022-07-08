export function getBubbleSortAnimations(array){
    const animations = [];
    let numSwaps;
    let numRuns = 1;
    do{
        numSwaps = 0;
        for(let i = 0; i < array.length -1; i++){
            if(array[i] > array[i+1]){
                animations.push([i,'swap']);
                swap(array,i,i+1);
                numSwaps++;
            }
        }
        animations.push([0,'last']);
        numRuns++;
    }while(numSwaps !== 0);

    while(numRuns <= array.length){
        animations.push([array.length-numRuns,'last']);
        numRuns++;
    }

    return animations;
}
function swap(array,firstIdx,secondIdx){
    const temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
}