// Sample question sets for different categories
let questions = {
    geography: [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Rome", "Berlin"],
            answer: "Paris",
            hint: "It's known as the City of Light."
        },
        {
            question: "Which is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean",
            hint: "It's named after a word meaning 'peaceful'."
        },
        {
            question: "What is the longest river in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            answer: "Nile",
            hint: "It's located in Africa."
        },
        {
            question: "Which country has the largest population?",
            options: ["India", "USA", "China", "Russia"],
            answer: "China",
            hint: "It's known for the Great Wall."
        },
        {
            question: "Mount Everest is located in which mountain range?",
            options: ["Andes", "Rockies", "Himalayas", "Alps"],
            answer: "Himalayas",
            hint: "It's in Asia."
        }
    ],
    history: [
        {
            question: "Who was the first President of the United States?",
            options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
            answer: "George Washington",
            hint: "He is featured on the one-dollar bill."
        },
        {
            question: "In what year did World War II end?",
            options: ["1940", "1945", "1950", "1960"],
            answer: "1945",
            hint: "The war ended in the mid-1940s."
        },
        {
            question: "Who discovered America?",
            options: ["Christopher Columbus", "Leif Erikson", "Amerigo Vespucci", "Vasco da Gama"],
            answer: "Christopher Columbus",
            hint: "He sailed the ocean blue in 1492."
        },
        {
            question: "The Great Wall of China was built primarily to protect against which invaders?",
            options: ["Mongols", "Japanese", "Russians", "Turks"],
            answer: "Mongols",
            hint: "Genghis Khan led them."
        },
        {
            question: "Who wrote the Declaration of Independence?",
            options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
            answer: "Thomas Jefferson",
            hint: "He later became the third President of the United States."
        }
    ],
    science: [
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars",
            hint: "It's the fourth planet from the sun."
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "NaCl"],
            answer: "H2O",
            hint: "It consists of hydrogen and oxygen."
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            answer: "Carbon Dioxide",
            hint: "It's essential for photosynthesis."
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            answer: "Mitochondria",
            hint: "It produces the cell's energy."
        },
        {
            question: "What is the speed of light?",
            options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "200,000 km/s"],
            answer: "300,000 km/s",
            hint: "It's approximately 299,792 kilometers per second."
        }
    ]
};

// Elements to be used for DOM manipulation
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let userName = '';
let currentCategory = 'geography';
let hintsLeft = 3;

// Function to get user name
function enterName() {
    let usernameInput = document.getElementById('username');
    if (usernameInput.value.trim() !== '') {
        userName = usernameInput.value.trim();
        document.getElementById('name-input-section').classList.add('hidden');
        document.getElementById('welcome-message').textContent = `Hello, ${userName}!`;
        document.getElementById('instructions').classList.remove('hidden');
    } else {
        alert('Please enter your name.');
    }
}

// Function to start the quiz
function startQuiz() {
    currentCategory = document.getElementById('category').value;
    currentQuestionIndex = 0;
    score = 0;
    hintsLeft = 3;
    document.getElementById('home').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    loadQuestion();
    startTimer();
}

// Function to load question
function loadQuestion() {
    let questionElement = document.getElementById('question');
    let optionsElement = document.getElementById('options');
    
    let currentQuestion = questions[currentCategory][currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    
    currentQuestion.options.forEach(option => {
        let optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
        optionsElement.appendChild(optionElement);
    });

    updateProgressBar();
    resetFeedback();
}

// Function to submit answer
function submitAnswer() {
    let selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentCategory][currentQuestionIndex].answer) {
            score++;
            displayFeedback("Correct!", true);
        } else {
            displayFeedback(`Wrong! The correct answer is ${questions[currentCategory][currentQuestionIndex].answer}`, false);
        }
        updateScore();
        currentQuestionIndex++;
        clearInterval(timerInterval);
        if (currentQuestionIndex < 5) {
            setTimeout(() => {
                loadQuestion();
                startTimer();
            }, 2000);
        } else {
            setTimeout(() => {
                showResult();
            }, 2000);
        }
    } else {
        alert("Please select an option!");
    }
}

// Function to start the timer
function startTimer() {
    timeLeft = 15;
    document.getElementById('time-left').textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAnswer();
        }
    }, 1000);
}

// Function to display feedback for correct/incorrect answers
function displayFeedback(message, isCorrect) {
    let feedbackElement = document.getElementById('feedback');
    if (isCorrect) {
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.style.color = "red";
    }
    feedbackElement.textContent = message;
}

// Function to update score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Function to reset feedback message
function resetFeedback() {
    document.getElementById('feedback').textContent = '';
}

// Function to update progress bar
function updateProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    let progress = ((currentQuestionIndex + 1) / 5) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to show quiz result
function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Congratulations, ${userName}! Your final score is ${score}/5.`;
}

// Function to restart quiz
function restartQuiz() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
}

// Function to give hint
function giveHint() {
    if (hintsLeft > 0) {
        let currentQuestion = questions[currentCategory][currentQuestionIndex];
        alert(currentQuestion.hint);
        hintsLeft--;
        document.getElementById('hints-left').textContent = `Hints Left: ${hintsLeft}`;
    } else {
        alert("No hints left!");
    }
}
