import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/bubbleSort.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/quickSort.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/heapSort.js';

const PRIMARY_COLOR = '#778899';
const SECONDARY_COLOR = 'red';
const TERTIARY_COLOR = 'gold';

var animations = [];

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
        animations = [];
    }

    resetArray(){
        const array = [];
        var numBars = window.innerWidth * 0.15;
        var maxHeight = window.innerHeight * 0.85;
        for(let i = 0; i < numBars; i++){
            array.push(randomIntInInterval(5,maxHeight));
        }
        animations = [];
        this.setState({array});
        this.resetColors();
    }

    toggleButtons(select){
        const newBtn = document.getElementById('new-array-btn');
        const mergeBtn = document.getElementById('merge-sort-btn');
        const quickBtn = document.getElementById('quick-sort-btn');
        const heapBtn = document.getElementById('heap-sort-btn');
        const bubbleBtn = document.getElementById('bubble-sort-btn');
        mergeBtn.disabled = select;
        newBtn.disabled = select;
        quickBtn.disabled = select;
        heapBtn.disabled = select;
        bubbleBtn.disabled = select;
    }

    mergeSort(){
        this.fixArrayBars();
        this.toggleButtons(true);
        var time = 0;
        animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            time = i * 4;
            setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            }, i * 4);
        } 
        else {
                time = i * 4;
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * 4);
            }
        }
        setTimeout(() => {
            this.toggleButtons(false);
        }, time);
    }
    quickSort(){
        this.fixArrayBars();
        this.toggleButtons(true);
        var time = 0;
        animations = getQuickSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const[firstIdx,secondIdx,desc] = animations[i];
            if(desc === 'pivotChange'){
                time = i * 15;
                setTimeout(() => {
                    arrayBars[firstIdx].style.backgroundColor = TERTIARY_COLOR;
                }, i * 15);
            }
            else if(desc === 'pivotRevert'){
                time = i * 15;
                setTimeout(() => {
                    arrayBars[firstIdx].style.backgroundColor = PRIMARY_COLOR;
                }, i * 15);
            }
            else if(desc === 'swapColor'){
                time = i * 15;
                const barOne = arrayBars[firstIdx];
                const barTwo = arrayBars[secondIdx];
                setTimeout(() => {
                    barOne.style.backgroundColor = SECONDARY_COLOR;
                    barTwo.style.backgroundColor = SECONDARY_COLOR;
                }, i * 15);
            }
            else{
                const barOne = arrayBars[firstIdx];
                const barTwo = arrayBars[secondIdx];
                time = i * 15;
                setTimeout(() => {
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                    barOne.style.backgroundColor = PRIMARY_COLOR;
                    barTwo.style.backgroundColor = PRIMARY_COLOR;
                }, i * 15);
            }
        }
       
        setTimeout(() => {
            this.toggleButtons(false);
        }, time); 
    }
    heapSort(){
        this.fixArrayBars();
        this.toggleButtons(true);
        var time = 0;
        var timedelay = window.innerWidth < 500 ? 15 : 3;
        animations = getHeapSortAnimations(this.state.array);
        let counter = 1;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < animations.length; i++){
            const[firstIdx,secondIdx,desc] = animations[i];
            const barOne = arrayBars[firstIdx];
            const barTwo = arrayBars[secondIdx];
            if(i % 2 === 0 && desc === 'reg'){
                time = i* timedelay;
                setTimeout(() => {
                    barOne.style.backgroundColor = SECONDARY_COLOR;
                    barTwo.style.backgroundColor = SECONDARY_COLOR;
                    var tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                }, i * timedelay);
            }
            else if(i % 2 === 1 && desc === 'reg'){
                time = i* timedelay;
                setTimeout(() => {
                    barOne.style.backgroundColor = PRIMARY_COLOR;
                    barTwo.style.backgroundColor = PRIMARY_COLOR;
                }, i * timedelay);
            }

            if(desc === 'max' && i % 2 === 0){
                time = i* timedelay;
                setTimeout(() => {
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                    arrayBars[arrayBars.length - counter].style.backgroundColor = 'green';
                    counter++;
                }, i * timedelay);
            }

        }

        setTimeout(() => {
            this.toggleButtons(false);
        }, time); 
    }

    resetColors(){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i =0; i < arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }
    bubbleSort(){
        this.fixArrayBars();
        this.toggleButtons(true);
        var time = 0;
        animations = getBubbleSortAnimations(this.state.array);
        var timedelay = window.innerWidth < 500 ? 7 : 1;
        let counter = 1;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i =0; i < animations.length; i++){
            const [barOneIdx,desc] = animations[i];
            const barOne = arrayBars[barOneIdx];
            const barTwo = arrayBars[barOneIdx+1];
            time = i * timedelay;
            if(desc === 'swap'){
                setTimeout(() => {
                    const tempHeight = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = tempHeight;
                }, i * timedelay);
            }
            else{
                time = i * timedelay;
                setTimeout(() => {
                    arrayBars[arrayBars.length - counter].style.backgroundColor = 'green';
                    counter++;
                }, i * timedelay);
            }
        }
        setTimeout(() => {
            this.toggleButtons(false);
        }, time)
    }

    fixArrayBars(){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i =0; i < arrayBars.length; i++){
            if(parseInt(arrayBars[i].style.height, 10) !== this.state.array[i]){
                arrayBars[i].style.height = this.state.array[i].toString() + "px";
            }
        }
    }

    render(){
        const {array} = this.state;

        return(
            <div className="array-container">
               {array.map((value,idx) =>(
                   <div className = "array-bar" key={idx} style={{height:`${value}px`}}>
                   </div>
               ))}
               <div className="buttons-container">
                <button id="new-array-btn" onClick={() => this.resetArray()} >Generate New Array</button>
                <button id="merge-sort-btn" onClick={() => this.mergeSort()} >Merge Sort</button>
                <button id="quick-sort-btn" onClick={() => this.quickSort()} >Quick Sort</button>
                <button id="heap-sort-btn" onClick={() => this.heapSort()} >Heap Sort</button>
                <button id="bubble-sort-btn" onClick={() => this.bubbleSort()} >Bubble Sort</button>
               </div>
            </div>
        );
    }
}

function randomIntInInterval(min,max){
    //inclusive of max and min
    return Math.floor(Math.random() * (max - min + 1) + 1);
}