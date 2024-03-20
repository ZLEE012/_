window.addEventListener('scroll', function() {
    var banner = document.getElementById('banner');
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 0) {
      banner.classList.add('fixed');
    } else {
      banner.classList.remove('fixed');
    }
  });
  
// Define quiz questions and answers with corresponding scores
const questions = [
    {
        question: "How often do you eat meat?",
        answers: [
            { text: "Every Meal", score: 3 },
            { text: "Some Meals", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },
    {
        question: "Of the food you buy how much is wasted?",
        answers: [
            { text: "More than 50%", score: 3 },
            { text: "30%-50%", score: 2 },
            { text: "10%-30%", score: 1 },
            { text: "0%-10%", score: 0 }
        ]
    },
    {
        question: "What vehicle do you travel in most?",
        answers: [
            { text: "Car", score: 3 },
            { text: "Motorbike", score: 2 },
            { text: "Public Transport", score: 1 },
            { text: "Walk/Cycle", score: 0 }
        ]
    },
    {
        question: "Do you recycle?",
        answers: [
            { text: "Never", score: 3 },
            { text: "Rarely", score: 2 },
            { text: "Most of the time", score: 1 },
            { text: "Always", score: 0 }
        ]
    },
    {
        question: "Do you turn off lights when not in use?",
        answers: [
            { text: "Never", score: 3 },
            { text: "Rarely", score: 2 },
            { text: "Most of the time", score: 1 },
            { text: "Always", score: 0 }
        ]
    },

    {
        question: "How often do you purchase products with excessive packaging",
        answers: [
            { text: "Weekly", score: 3 },
            { text: "Few time a Month", score: 2 },
            { text: "Monthly", score: 1 },
            { text: "Few times a Year", score: 0 }
        ]
    },
    
];

// DOM elements
const questionElement = document.getElementById('question');
const choiceContainers = document.querySelectorAll('.choice-container');
const gameElement = document.getElementById('game'); // Added to display score, impact, and suggestions

// Quiz variables
let currentQuestionIndex = 0;
let totalScore = 0;

// Function to display the current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;

    // Loop through each answer choice
    choiceContainers.forEach((container, index) => {
        const answer = question.answers[index];
        container.innerHTML = `<span class="choice-text">${answer.text}</span>`;
        
        // Add event listener for answer choice
        container.onclick = function() {
            handleAnswer(answer.score);
        };

        // Re-enable answer choice
        container.style.pointerEvents = 'auto';
        container.style.opacity = 1; // Restore full opacity
    });
}


// Function to handle answer selection
function handleAnswer(score, choiceIndex) {
    totalScore += score;
    currentQuestionIndex++;

    // Disable all answer choices
    choiceContainers.forEach(container => {
        container.removeEventListener('click', handleChoiceClick);
        container.style.pointerEvents = 'none';
        container.style.opacity = 0.5; // Optionally, you can visually indicate that the choice is disabled
    });

    // Get the feedback paragraph element
    const feedbackElement = document.getElementById('feedback');

    // Display feedback based on the score
    if (score === 0) {
        feedbackElement.textContent = "Great! You're making sustainable choices. Keep it up!";
    } else if (score === 3) {
        feedbackElement.textContent = "Oops! That's not very sustainable. Consider making changes to reduce your impact.";
    } else if (score == 1) {
        feedbackElement.textContent = "Good effort! You're on the right track, but there's room for improvement.";
    } else {
        feedbackElement.textContent = 'A step towards the right direction! But there is much more needed.';
    }

    // Show the feedback paragraph
    feedbackElement.style.display = 'block'; // Ensure feedback is visible

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        // Display the next button
        nextButton.style.display = 'block';
    } else {
        // Quiz completed, display total score
        displayScore();
    }
}
// Function to display the total score and feedback
function displayScore() {
    // Hide the feedback element
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.style.display = 'none';

    // Display total score
    const scoreDisplay = document.createElement('p1');
    scoreDisplay.textContent = `Total Score: ${totalScore}`;
    gameElement.appendChild(scoreDisplay);

    // Add information about user's impact on the world and suggestions for reducing their carbon footprint
    const imageElement = document.createElement('img');
    imageElement.src = 'UK.jpg  '
    imageElement.style.width = '300px';
    imageElement.style.height = '450px';
    gameElement.appendChild(imageElement);
    
    

    const impactElement = document.createElement('p1');

    let average = '';
    let impactText = '';
    let suggestions = '';

    if (totalScore <= 5) {
        average = "Based on your score, you are most likely below the UK average. Nice Job!";
        impactText = "Great job! You're a sustainability champion!";
        suggestions = "Since you're already doing so well, you can continue your sustainable habits and inspire others to follow suit.";
        
    } else if (totalScore <= 10) {
        average = "Based on your score, you are likely below the UK average.Keep up the good work!";
        impactText = "Well done! You're making good progress towards sustainability.";
        suggestions = "To further reduce your carbon footprint, consider reducing meat consumption by exploring plant based options (emits half that of meat.), minimizing food waste, and using public transportation (reduce 42% by bus and 73% by trains) or carpooling more often.";
    } else if (totalScore <= 15) {
        average = "Based on your score, you are most likely above the UK average. Try and work on lowering it!";
        impactText = "Nice Try! There's room for improvement, but you're on the right track.";
        suggestions = "To improve your sustainability efforts, focus on reducing meat consumption, recycling more, conserving energy by turning off lights and electronics when not in use, and using more eco-friendly transportation options.";
    } else {
        average = "Based on your score, you are most likely above the UK average. MAKE IMMEDIATE CHANGES!!!";
        impactText = "Oh No! Looks like there's some work to do. Consider making changes to reduce your impact.";
        suggestions = "It's important to take action to reduce your carbon footprint. Start by cutting down on meat consumption, reducing food waste, using energy-efficient appliances, recycling more, and choosing sustainable transportation options whenever possible.";
    }

    
    impactElement.textContent = impactText;
    gameElement.appendChild(impactElement);

    // Display suggestions for reducing carbon footprint

    const averageElement = document.createElement('p1');
    averageElement.textContent = average;
    gameElement.appendChild(averageElement);


    const suggestionsElement = document.createElement('p1');
    suggestionsElement.textContent = suggestions;
    gameElement.appendChild(suggestionsElement);

    // Display "Quiz completed!" message
    questionElement.textContent = "Quiz completed!";
    choiceContainers.forEach(container => {
        container.style.display = 'none'; // Hide answer choices


    });

    // Remove the next button
    nextButton.style.display = 'none';


}

// Function to handle click on an answer choice
function handleChoiceClick(event) {
    const choiceIndex = event.currentTarget.dataset.number - 1; // Adjust index to start from 0
    const answer = questions[currentQuestionIndex].answers[choiceIndex];
    handleAnswer(answer.score, choiceIndex);
}

// Add event listeners to answer choices
choiceContainers.forEach(container => {
    container.addEventListener('click', handleChoiceClick);
});

// Function to display the current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    questionElement.textContent = question.question;

    // Loop through each answer choice
    const choiceContainers = document.querySelectorAll('.choice-container');
    choiceContainers.forEach((container, index) => {
        const choiceTextElement = container.querySelector('.choice-text');
        const answer = question.answers[index];

        // Display answer choice text
        choiceTextElement.textContent = answer.text;

        // Enable answer choice
        container.style.pointerEvents = 'auto';
        container.style.opacity = 1; // Restore full opacity

        // Ensure container is clickable by attaching event listener to each answer choice container
        container.onclick = () => handleAnswer(answer.score, index);
    });
}

// Get the next button element
const nextButton = document.getElementById('next-btn');

// Add event listener to the next button to display the next question
nextButton.addEventListener('click', () => {
    // Hide the next button until the user is ready for the next question
    nextButton.style.display = 'none';

    // Hide the feedback
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.style.display = 'none';

    // Display the next question
    displayQuestion();
});

// Display the first question
displayQuestion();
