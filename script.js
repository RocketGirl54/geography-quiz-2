// Your list of countries and their continents
const countries = [ 
  { name: "Mexico", continent: "North America" },
  { name: "Ecuador", continent: "South America" },
  { name: "Austria", continent: "Europe" },
  { name: "Angola", continent: "Africa" },
  { name: "Armenia", continent: "Asia" },
  { name: "Micronesia", continent: "Oceania" },
  { name: "Nauru", continent: "Oceania" },
  { name: "Bahrain", continent: "Asia" },
  { name: "Benin", continent: "Africa" },
  { name: "Croatia", continent: "Europe" },
  { name: "Paraguay", continent: "South America" },
  { name: "El Salvador", continent: "North America" },
  { name: "Costa Rica", continent: "North America" },
  { name: "Uruguay", continent: "South America" },
  { name: "Denmark", continent: "Europe" },
  { name: "Cameroon", continent: "Africa" },
  { name: "Tuvalu", continent: "Oceania" },
  { name: "Bhutan", continent: "Asia" },
  { name: "Iraq", continent: "Asia" },
  { name: "Rwanda", continent: "Africa" },
  { name: "Senegal", continent: "Africa" },
  { name: "Seychelles", continent: "Africa" },
  { name: "Peru", continent: "South America" },
  { name: "Estonia", continent: "Europe" },
  { name: "Haiti", continent: "North America" },
  { name: "Chile", continent: "South America" },
  { name: "Finland", continent: "Europe" },
  { name: "Chad", continent: "Africa" },
  { name: "Kazakhstan", continent: "Asia" },
  { name: "Zambia", continent: "Africa" },
  { name: "Sierra Leone", continent: "Africa" },
  { name: "Moldova", continent: "Europe" },
  { name: "Gabon", continent: "Africa" },
  { name: "Kuwait", continent: "Asia" },
  { name: "Antigua ", continent: "North America" },
  { name: "Liberia", continent: "Africa" },
  { name: "Papua New Guinea", continent: "Oceania" },
  { name: "Lebanon", continent: "Asia" },
  { name: "Niger", continent: "Africa" },
  { name: "Serbia", continent: "Europe" },
  { name: "Suriname", continent: "South America" },
  { name: "Tunisia", continent: "Africa" },
  { name: "Saudi Arabia", continent: "Asia" },
  { name: "Slovakia", continent: "Europe" },
  { name: "Djibouti", continent: "Africa" },
  { name: "Brunei", continent: "Asia" },
  { name: "Barbuda", continent: "North America" },
  { name: "Albania", continent: "Europe" },
  { name: "Sudan", continent: "Africa" },
  { name: "Lithuania", continent: "Europe" },
  { name: "Eswatini (Swaziland)", continent: "Africa" },
  { name: "Kyrgyzstan", continent: "Asia" },
  { name: "Qatar", continent: "Asia" },
  { name: "Trinidad and Tobago", continent: "North America" },
  { name: "Cabo Verde", continent: "Africa" },
  { name: "Uzbekistan", continent: "Asia" },
  { name: "Saint Lucia", continent: "North America" },
  { name: "Comoros", continent: "Africa" },
  { name: "Sri Lanka", continent: "Asia" },
  { name: "Togo", continent: "Africa" },
];
let shuffledCountries = [...countries]; // Copy of the full list to shuffle
currentCountry = null;
let correctCount = 0;
let questionIndex = 0;
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(shuffledCountries); // Randomize order once at start

currentCountry = null;

// Reference elements
const countryName = document.getElementById("country-name");
const answerButtons = document.querySelectorAll(".answer-button");
const submitButton = document.getElementById("submit-btn");

// 🔄 Generate a random country
function generateQuestion() {
  clearFeedback();

  if (questionIndex >= shuffledCountries.length) {
    showFinalScore(correctCount); // All questions have been answered
    return;
  }

  currentCountry = shuffledCountries[questionIndex];
  countryName.textContent = currentCountry.name;
}


// ✨ Show result based on user's choice
function checkAnswer(selectedContinent) {
  const feedback = document.createElement("div");
  feedback.id = "feedback";
  feedback.style.position = "absolute";
  feedback.style.top = "70%";
  feedback.style.left = "50%";
  feedback.style.transform = "translateX(-50%)";
  feedback.style.fontSize = "28px";
  feedback.style.color = "white";
  feedback.style.background = "rgba(0,0,0,0.6)";
  feedback.style.padding = "12px 20px";
  feedback.style.borderRadius = "10px";
  feedback.style.textAlign = "center";

  if (selectedContinent === currentCountry.continent) {
    feedback.textContent = "✅ Well Done!";
    correctCount++;
  } else {
    feedback.textContent = `❌ Better Luck Next Time — the correct answer is ${currentCountry.continent}`;
  }
questionIndex++; // ✅ Move to next question
submitButton.style.display = "inline-block"; // Show “Next Question” button

  document.body.appendChild(feedback);

  // Show "Next Question" button
  submitButton.style.display = "inline-block";
}

// Clear old feedback + reset
function clearFeedback() {
  const oldFeedback = document.getElementById("feedback");
  if (oldFeedback) {
    oldFeedback.remove();
  }
  submitButton.style.display = "none";
}

// Listen for answer clicks
answerButtons.forEach(button => {
  button.addEventListener("click", () => {
    checkAnswer(button.textContent);
  });
});

// Listen for "Next" button
submitButton.addEventListener("click", generateQuestion);

// Start the quiz
generateQuestion();

function showFinalScore(correctCount) {
  const total = countries.length;
  const percent = (correctCount / total) * 100;
  let message = "";

  if (percent < 50) {
    message = "Keep Practising";
  } else if (percent < 60) {
    message = "Well Done You Passed, but aim higher";
  } else if (percent < 75) {
    message = "Great Work. You're nearly there!";
  } else if (percent < 91) {
    message = "WOW! You must be pretty happy with yourself";
  } else if (percent < 100) {
    message = "This is fantastic!";
  } else {
    message = "🎉 Congratulations, you have achieved a perfect score!";
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
    let victorySound = new Audio('victory-chime.mp3');
    victorySound.play();
  }

  // Display result (you can style this however you like)
  document.body.innerHTML = `
    <div style="
      text-align: center;
      color: white;
      font-size: 28px;
      margin-top: 100px;
      background: rgba(0, 0, 0, 0.6);
      padding: 30px;
      border-radius: 20px;
      width: 60%;
      margin-left: auto;
      margin-right: auto;">
      <p>Your score is <strong>${percent.toFixed(2)}%</strong></p>
      <p>${message}</p>
      <button onclick="location.reload()" style="
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;">
        🔁 Play Again
      </button>

    </div>
  `;
}
