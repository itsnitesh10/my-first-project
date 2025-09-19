const nameForm = document.getElementById('nameForm');
const playerNameInput = document.getElementById('playerName');
const greetText = document.getElementById('greetText');
const quizContainer = document.getElementById('quizContainer');

const questions = [
    {question:"Which language is primarily used for web development?", options:[
        {name:"Python", img:"python.png"},
        {name:"JavaScript", img:"javascript.png"},
        {name:"Rust", img:"rust.png"},   // changed C++ → Rust
        {name:"Java", img:"java.png"}], answer:"JavaScript"},

    {question:"Which database is widely used with web applications?", options:[
        {name:"MySQL", img:"mysql.png"},
        {name:"Java", img:"java.png"},
        {name:"Rust", img:"rust.png"},
        {name:"CSS", img:"css.png"}], answer:"MySQL"},

    {question:"Which CSS property is used to change background color?", options:[
        {name:"background-color", img:"css.png"},
        {name:"color", img:"css.png"},
        {name:"font-style", img:"css.png"},
        {name:"border", img:"css.png"}], answer:"background-color"},

    {question:"Which language is mainly used for Android app development?", options:[
        {name:"Java", img:"java.png"},
        {name:"Python", img:"python.png"},
        {name:"Rust", img:"rust.png"},
        {name:"HTML", img:"html.png"}], answer:"Java"},

    {question:"Which keyword is used to define a function in Python?", options:[
        {name:"def", img:"python.png"},
        {name:"function", img:"javascript.png"},
        {name:"func", img:"java.png"},
        {name:"define", img:"rust.png"}], answer:"def"}
];

let currentQuestion = 0;
let score = 0;
let timerInterval;

nameForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = playerNameInput.value.trim();
    if(name==="") return;

    nameForm.style.display = 'none';
    greetText.textContent = `Hello, ${name}! Let's play the Coding Quiz! 🎮`;
    greetText.style.display = 'block';

    showQuestion(currentQuestion);
});

function showQuestion(index){
    quizContainer.innerHTML = "";
    clearInterval(timerInterval); // clear any old timer

    // Progress bar
    const progress = document.createElement('div');
    progress.className='progress-bar';
    const progressInner = document.createElement('div');
    progressInner.className='progress-inner';
    progressInner.style.width = `${(currentQuestion / questions.length) * 100}%`;
    progress.appendChild(progressInner);
    quizContainer.appendChild(progress);

    // Timer
    const timerBox = document.createElement('div');
    timerBox.className = 'timer';
    let timeLeft = 15; // seconds per question
    timerBox.textContent = `⏳ Time left: ${timeLeft}s`;
    quizContainer.appendChild(timerBox);

    timerInterval = setInterval(()=>{
        timeLeft--;
        timerBox.textContent = `⏳ Time left: ${timeLeft}s`;
        if(timeLeft <= 0){
            clearInterval(timerInterval);
            Swal.fire({icon:'error', title:`⏰ Time's up! Answer: ${questions[index].answer}`, showConfirmButton:false, timer:1200});
            currentQuestion++;
            if(currentQuestion < questions.length){
                setTimeout(()=>showQuestion(currentQuestion),900);
            } else {
                setTimeout(()=>finishQuiz(),900);
            }
        }
    },1000);

    // Question
    const q = questions[index];
    const card = document.createElement('div');
    card.className='quiz-card';
    card.innerHTML = `<h3>Q${index+1}: ${q.question}</h3>`;

    // Options
    q.options.forEach(option=>{
        const btn = document.createElement('button');
        btn.className='option-btn';
        btn.innerHTML = `<img src="static/img/${option.img}" alt="${option.name}"> ${option.name}`;
        btn.onclick = () => {
            clearInterval(timerInterval); // stop timer when answered
            if(option.name===q.answer){
                score++;
                Swal.fire({icon:'success', title:'Correct! ✅', showConfirmButton:false, timer:800});
            } else {
                Swal.fire({icon:'error', title:`Wrong ❌ Answer: ${q.answer}`, showConfirmButton:false, timer:1200});
            }

            currentQuestion++;
            if(currentQuestion < questions.length){
                setTimeout(()=>showQuestion(currentQuestion),900);
            } else {
                setTimeout(()=>finishQuiz(),900);
            }
        };
        card.appendChild(btn);
    });

    quizContainer.appendChild(card);
}

function finishQuiz(){
    clearInterval(timerInterval);
    quizContainer.innerHTML = `
        <h2 class="greet">🎉 Quiz Finished! 🎉</h2>
        <h3>Your Score: ${score} / ${questions.length}</h3>
        <button id="restartBtn">Play Again</button>
    `;
    document.getElementById('restartBtn').onclick = () => location.reload();
}

