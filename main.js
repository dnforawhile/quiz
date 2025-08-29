let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.ans')
let container_h3 = document.querySelector('.container_h3')
let start_btn = document.querySelector('.start-btn')
let rules_btn = document.querySelector('.rules-btn')
let container_start = document.querySelector('.start')
let container_main = document.querySelector('.main')
let container_rules = document.querySelector('.rules')
let logo = document.querySelector('.logo')
let back_btn = document.querySelector('.back-btn')
let time_btn = document.querySelector('.time-btn')
let container_time = document.querySelector('.time')
let time_version1 = document.querySelector('.time-version1')
let time_version2 = document.querySelector('.time-version2')
let time_version3 = document.querySelector('.time-version3')

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ['+', '-', '*', '/']

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

function getRandomSign(){
    return signs[randint(0,3)]
}

class Question {
    constructor(){
        let a = randint(1,30)
        let b = randint(1,30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {
            this.correct = a + b
        }
        else if (sign == '-') {
            this.correct = a - b
        }
        else if (sign == '*') {
            this.correct = a * b
        }
        else if (sign == '/') {
            this.correct = parseFloat((a / b).toFixed(3))
        }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1 , this.correct + 15),
            randint(this.correct + 1, this.correct + 15)
        ]
        shuffle(this.answers)

    }
    display(){
        question_field.innerHTML = this.question
        for(let i = 0; i < this.answers.length; i += 1){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let correct_answer_given_one_round = 0
let total_answers_given_one_round = 0
let correct_answer_given = 0
let total_answers_given = 0
let current_question = new Question()

let time = 10000

time_btn.addEventListener('click', function(){
    container_start.style.display = 'none'
    container_time.style.display = 'flex'
    time_btn.style.display = 'none'
})

time_version1.addEventListener('click', function(){
    time = 10000
    container_time.style.display = 'none'
    container_start.style.display = 'flex'
    time_btn.style.display = 'flex'
})

time_version2.addEventListener('click', function(){
    time = 30000
    container_time.style.display = 'none'
    container_start.style.display = 'flex'
    time_btn.style.display = 'flex'
})

time_version3.addEventListener('click', function(){
    time = 60000
    container_time.style.display = 'none'
    container_start.style.display = 'flex'
    time_btn.style.display = 'flex'
})


start_btn.addEventListener('click', function(){
    container_start.style.display = 'none'
    time_btn.style.display = 'none'
    container_main.style.display = 'flex'
    current_question.display()
    setTimeout(function(){
        container_start.style.display = 'flex'
        container_main.style.display = 'none'
        time_btn.style.display = 'flex'
        container_h3.innerHTML = `Ви дали ${correct_answer_given_one_round} правильних відповідей із ${total_answers_given_one_round}. 
        Точність - ${Math.round(correct_answer_given_one_round * 100 / total_answers_given_one_round)}%.
        Усього правильних відповідей: ${correct_answer_given} із ${total_answers_given}.
        Загальна точність - ${Math.round(correct_answer_given * 100 / total_answers_given)}%
        `
    }, time)
    correct_answer_given_one_round = 0
    total_answers_given_one_round = 0
})



for(let i = 0; i < answer_buttons.length; i += 1){
    answer_buttons[i].addEventListener('click', function(){
        if (answer_buttons[i].innerHTML == current_question.correct){
            correct_answer_given_one_round += 1
            correct_answer_given += 1
            answer_buttons[i].style.background = '#63d90f'
            anime({
                targets: answer_buttons[i],
                background: '#0091ea',
                duration: 1000,
                delay: 100,
                easing: 'linear'
            })
        } else{
            answer_buttons[i].style.background = '#d9160f'
            anime({
                targets: answer_buttons[i],
                background: '#0091ea',
                duration: 1000,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers_given_one_round += 1
        total_answers_given += 1
        current_question = new Question()
        current_question.display()
    })
}

rules_btn.addEventListener('click', function(){
    container_start.style.display = 'none'
    logo.style.display = 'none'
    time_btn.style.display = 'none'
    container_rules.style.display = 'flex'
})

back_btn.addEventListener('click', function(){
    container_rules.style.display = 'none'
    container_start.style.display = 'flex'
    logo.style.display = 'flex'
    time_btn.style.display = 'flex'
})
