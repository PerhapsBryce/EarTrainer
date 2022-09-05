let currentNote = '';
let currentAcc = '';

const keyChoice = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const sharpExcl = ['E', 'B'];
const flatExcl  = ['C', 'F']
const accChoice = ['sharp', 'natural', 'flat'];

let answerList = [];

let fileName ='';

function playAudio(fileName){
    var audio = new Audio(fileName);
    audio.play();
}

function resetAnim(){
    const guessDisplay = document.getElementById('curr-guess-screen');
    guessDisplay.style.animation = 'reset 2s'
}

function correctGuess(){
    const guessDisplay = document.getElementById('curr-guess-screen');
    guessDisplay.style.animation = 'correctGuess 2s'
}

function wrongGuess(){
    const guessDisplay = document.getElementById('curr-guess-screen');
    guessDisplay.style.animation = 'wrongGuess 2s'
}

function contains(answerList, userGuess){
    const len = answerList.length;
    if(len == 1){
        if(
            answerList[0][0] == userGuess[0] &&
            answerList[0][1] == userGuess[1]
        ){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        if(
            answerList[0][0] == userGuess[0] &&
            answerList[0][1] == userGuess[1] ||
            answerList[1][0] == userGuess[0] &&
            answerList[1][1] == userGuess[1]
        ){
            return true;
        }
        else{
            return false;
        }
    }
}

function randNote(){

    keyIndex = Math.floor(Math.random() * keyChoice.length);
    accIndex = Math.floor(Math.random() * accChoice.length);
    newKey = keyChoice[keyIndex];
    newAcc = accChoice[accIndex];
    // alert(newKey);
    // alert(newAcc);

    if(newAcc != 'natural'){

        let currAns = [];
        
        if(sharpExcl.includes(newKey) && newAcc == 'sharp'){
            newAcc = accChoice[1];
            let currAns = [];

            currAns.push(newKey);
            currAns.push(newAcc);
    
            answerList.push(currAns);
        }
        else if(flatExcl.includes(newKey) && newAcc == 'flat'){
            newAcc = accChoice[1];
            let currAns = [];

            currAns.push(newKey);
            currAns.push(newAcc);
    
            answerList.push(currAns);
        }
        else{
            

            currAns.push(newKey);
            currAns.push(newAcc);

            answerList.push(currAns);
            currAns = [];

            if(newAcc == 'sharp'){
                currAns.push(keyChoice[(keyIndex + 8) % 7]);
                currAns.push('flat');
            }
            else if(newAcc == 'flat'){
                currAns.push(keyChoice[(keyIndex + 6) % 7]);
                currAns.push('sharp');
            }

            answerList.push(currAns);                       
        }
    }
    else{
        let currAns = [];

        currAns.push(newKey);
        currAns.push(newAcc);

        answerList.push(currAns);
    }

    fileName = 'audio/' + answerList[0][0] + answerList[0][1] + '.mp3';
    playAudio(fileName);
    // alert(fileName);

    // if(answerList.length == 1){
    //     alert(answerList[0][0]);
    //     alert(answerList[0][1]);
    // }
    // else{
    //     alert(answerList[0][0]);
    //     alert(answerList[0][1]);        
        // alert(answerList[1][0]);
        // alert(answerList[1][1]);
    // }
}

function highlightNote(note){
    if(currentNote != ''){
        currentNote.style.border = 'solid black 1px';
    }

    note.style.border = 'solid white 1px';

    currentNote = note;
}

function HighlightAcc(acc){
    if(currentAcc != ''){
        currentAcc.style.border = 'solid black 1px';
    }

    acc.style.border = 'solid white 1px';

    currentAcc = acc;
}

function setGuess(note){
    const screen = document.getElementById('curr-guess-screen');
    screen.innerHTML = note.innerHTML;
}

function noteClick(event){

    const note = event.target;

    if(note.id === 'notes-container' || note.id === 'enter'){
     return;
    }

    highlightNote(note);
    setGuess(note);
}

function accidentalClick(event){
    const acc = event.target; /*accidental abbr*/

    if(acc.id === 'accidental-container'){
     return;
    }

    HighlightAcc(acc);
}

function enterClick(){
    if(currentAcc == '' || currentNote == ''){
        return;
    }

    let stringAcc = currentAcc.id;
    const stringNote = currentNote.innerHTML;

    userGuess = [];

    userGuess.push(stringNote);
    userGuess.push(stringAcc);

    // alert(userGuess);

    // alert(answerList[0]);

    if(contains(answerList, userGuess)){
        correctGuess();
    }
    else{
        wrongGuess();
    }

    const timeOut = setTimeout(resetAnim, 1000);

    // alert('recording guess:');
    // alert(stringNote);
    // alert(stringAcc);
}

function playClick(){
    playAudio(fileName);
}

function newClick(){
    answerList = [];
    fileName ='';
    resetAnim();

    randNote();
}