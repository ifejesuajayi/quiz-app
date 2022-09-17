// getting all required elements

const startBtn = document.querySelector(".startBtn");
const infoBox = document.querySelector(".infoBox");
const exitQuiz = document.querySelector(".quit");
const continueBtn = document.querySelector(".restart");
const quizBox = document.querySelector(".quizBox");
const nextBtn = document.querySelector(".nextBtn");
const resultBox = document.querySelector(".resultBox");
const restartQuiz = document.querySelector(".replay");
const quitQuiz = document.querySelector(".exit");
const optionList = document.querySelector(".optionList");
const timeCount = document.querySelector(".timerSec");
const score = document.querySelector(".scoreText");

// Adds event listener, if start button is clicked
startBtn.addEventListener("click", () => {
  infoBox.classList.add("activateInfo"); // Adds the class of activateInfo which displays the information div (infoBox)
});

// Adds event listener, if exit button is clicked
exitQuiz.addEventListener("click", () => {
  infoBox.classList.remove("activateInfo"); // Remove the class of activateInfo which removes the information div (infoBox) and takes us back to the start page
});

// Adds event listener, if continue button is clicked
continueBtn.addEventListener("click", () => {
  quizBox.classList.add("activateQuest"); // Adds the class of activateQuest which displays the QUiz section
  showQuestion(0); // passes 0 as it is the first object in the array.... loads first
  questBottomCount(1);
  setTimer(timeValue); //calls setTimer function // timer value == 15 seconds
});

let count = 0;
let bottomCount = 1;
let userScore = 0;

// Adds event listner, if next button is clicked
nextBtn.addEventListener("click", () => {
  if (count >= 0 && count < questions.length - 1) {
    // questions is the array... checking to see if count = 0 and less than the array (questions lenght) if true, adds 1 to count till it becomes false
    //set count = 0 and bottom count = 1
    count++;
    bottomCount++;
    showQuestion(count); // calling the function showQuestion() and passing count as a paramteter which increases by 1 anytime we click on the next button...
    //showQuestion function gets elements from the array and displays
    questBottomCount(bottomCount); //calling the function questBottomCount() and passes bottomCount as a paramteter which increases by 1 anytime we click on the next button...
    clearInterval(counter); //clear interval setTimer() function
    setTimer(timeValue); // Restart timer anytime nextBtn is clicked
  } else {
    console.log("done");
    showResults();
  }
});

// Adds event listner, if quit button is clicked
quitQuiz.addEventListener("click", () => {
  window.location.reload();
});

// Adds event listner, if restart button is clicked
restartQuiz.addEventListener("click", () => {
  quizBox.classList.add("activateQuest");
  resultBox.classList.remove("activateResult");
  timeValue = 15;
  count = 0;
  bottomCount = 1;
  userScore = 0;
  showQuestion(count);
  questBottomCount(bottomCount);
  clearInterval(counter); //clear interval setTimer() function
  setTimer(timeValue);
});

// function to display
function showQuestion(index) {
  const questionTag = document.querySelector(".queText");
  const optionList = document.querySelector(".optionList"); //selecting the parent of the options
  nextBtn.style.display = "none"; // display none the next question button until an option is clicked

  questionTag.innerHTML = `
     <div class="queText">
                <span>${questions[index].question}</span>
            </div>
  `; // index == count

  optionList.innerHTML = `
     <div class="option">
                    <span>${questions[index].options[0]}</span>
                    
                </div>
                <div class="option">
                    <span>${questions[index].options[1]}</span>
                </div>
                <div class="option">
                    <span>${questions[index].options[2]}</span>
                </div>
                <div class="option">
                    <span>${questions[index].options[3]}</span>
                </div>
  `; // index == count //

  const optionsToPick = document.querySelectorAll(".option"); // selecting all options

  //Looping through all options and adding an event listener
  for (const opt of optionsToPick) {
    opt.addEventListener("click", (e) => {
      clearInterval(counter); // if an option is picked stop timer
      nextBtn.style.display = "block"; // display next question button if an option is clicked
      let correctIcon =
        '<div class="icon tick"><i class="fas fa-check"></i></div>';
      let wrongIcon =
        '<div class="icon cross"><i class="fas fa-times"></i></div>';

      let userAns = e.target.innerText;
      let correctAns = questions[count].answer; // count == index

      alert(`your picked ${userAns} correct answer is ${correctAns}`);

      //

      // checks to see if userAns (what the user clicks on) === correctAns(the correct answer set in the array)

      if (userAns === correctAns) {
        userScore += 1;
        console.log(userScore);
        e.target.classList.add("correct"); // if true add the class of correct // line 224 CSS
      } else {
        e.target.classList.add("incorrect"); // if users !== correctAns add the class of incorrect // line 225 css
        e.target.insertAdjacentHTML("beforeend", wrongIcon); // insert adjacent takes two parameters ('position', 'text,icon')
      }

      //IF user selects wrong answer automatically select correct answer
      //Loop through each option and check to see if each looped click element innerText == correctAns
      optionsToPick.forEach((opt) => {
        if (opt.innerText == correctAns) {
          opt.setAttribute("class", "option correct"); // adds the class correct
          opt.insertAdjacentHTML("beforeend", correctIcon); // inserts icon ('position', 'icon')
        }
      });

      //once user clicks on one option disable all others correct or not
      //loop through each options and add the class of disabled
      optionsToPick.forEach((opt) => {
        opt.classList.add("disabled");
      });
    });
  }
}

let timeValue = 15;
let counter;

// function to set timer
function setTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.innerText = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.innerText;
      timeCount.innerText = `0${addZero}`;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.innerText = "00";

      const options = document.querySelectorAll(".option"); // selecting all options
      let correctIcon =
        '<div class="icon tick"><i class="fas fa-check"></i></div>';
      let wrongIcon =
        '<div class="icon cross"><i class="fas fa-times"></i></div>';

      let correctAns = questions[count].answer; // count == index

      //IF user selects wrong answer automatically select correct answer
      //Loop through each option and check to see if each looped click element innerText == correctAns
      options.forEach((opt) => {
        if (opt.innerText == correctAns) {
          opt.setAttribute("class", "option correct"); // adds the class correct
          opt.insertAdjacentHTML("beforeend", correctIcon); // inserts icon ('position', 'icon')
        }
      });

      //once user clicks on one option disable all others correct or not
      //loop through each options and add the class of disabled
      options.forEach((opt) => {
        opt.classList.add("disabled");
      });

      nextBtn.style.display = "block";
    }
  }
}

//Show results
function showResults() {
  infoBox.classList.remove("activateInfo"); // Removes the class of activateInfo which removes the information div (infoBox) and takes us back to the start page
  quizBox.classList.remove("activateQuest"); // removes the class of activateQuest which displays the QUiz section
  resultBox.classList.add("activateResult"); //removes the class of activateResult which displays results

  score.innerHTML = `
     <div class="scoreText">
                <span> You got <p>${userScore}</p> out of <p>${questions.length}</p></span>
            </div>
  `;
}

function questBottomCount(index) {
  const bottomCounter = document.querySelector(".totalQue");

  bottomCounter.innerHTML = `
        <span><p>${index}</p><p>of</p><p>${questions.length}</p>Questions</span>`;
}
