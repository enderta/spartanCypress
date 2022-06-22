
//Given a sentence, create a function which shifts the first letter of each word to the next word in the sentence (shifting right).


let shiftSentece=(str)=>{

    let arr = str.split(" ");
    let newArr = [];
    for(let i=0;i<arr.length;i++){
        let newWord = arr[i].slice(1)+arr[i][0];
        newArr.push(newWord);
    }
    return newArr.join(" ");
    
}
console.log(shiftSentece("create a function"));