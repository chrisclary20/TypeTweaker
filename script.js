const startBtn = document.getElementById('start-btn')
const highScoreBtn = document.getElementById('highscore-btn')
const aboutBtn = document.getElementById('about-btn')
const logo = document.getElementById('logo')
const mainContainer = document.getElementById('main-container')
const gameContainer = document.getElementById('game-container')
const randomQuoteAPI = "https://api.quotable.io/random?minLength=25&maxLength=87"
const inputBox = document.getElementById('input-box')
const quoteBox = document.getElementById('quote')
const timerElement = document.getElementById('timer')
const wpmElement = document.getElementById('wpm')
const nextBtn = document.getElementById('nxt-btn')
const authorSource = document.getElementById('author-source')
const lightDarkMode = document.getElementById('light-dark-mode')
const htmlBody = document.getElementById('body')

let currentQuoteData = null
let currentCharIndex = 0
let correctCharCount = 0

async function fetchRandomQuote() {
  try {
    const response = await fetch(randomQuoteAPI)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    currentQuoteData = await response.json()
    return currentQuoteData
  } catch (error) {
    console.error('Error fetching quote:', error)
  }
}

function clearInput() {
  inputBox.value = ''
}

async function renderRandomQuote() {
  clearInput()
  wpmElement.innerHTML = 'WPM: '
  quoteBox.innerHTML = ''
  currentQuoteData = await fetchRandomQuote()
  const quoteCharacters = currentQuoteData.content.split('')
  quoteCharacters.forEach((char) => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    charSpan.classList.add('untouched')
    quoteBox.appendChild(charSpan)
  })
  correctCharCount = 0
  authorSource.style.display = 'none'
  startTimer()
  inputBox.addEventListener('input', handleInput)
  inputBox.focus()
}

function handleInput() {
  const arrayQuote = quoteBox.querySelectorAll('span')
  const arrayValue = inputBox.value.split('')
  correctCharCount = 0

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character === undefined) {
      characterSpan.classList.remove('correct', 'incorrect', 'untouched')
      characterSpan.classList.add('untouched')
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect', 'untouched')
      correctCharCount++
    } else {
      characterSpan.classList.remove('correct', 'untouched')
      characterSpan.classList.add('incorrect')
    }
  })

  const currentTime = getTimerTime()
  const wpm = Math.floor((correctCharCount / 5) / (currentTime / 60))
  wpmElement.innerText = `WPM: ${wpm}`

  if (correctCharCount === arrayQuote.length) {
    clearInterval(timerInterval) // Stop the timer
    inputBox.setAttribute('disabled', 'true') // Disable the input box
    nextBtn.style.display = 'block'
    authorSource.innerText = `— ${currentQuoteData.author}`
    authorSource.style.display = 'block'
  }
}






let startTime
let timerInterval

function startTimer() {
  clearInterval(timerInterval)
  timerElement.innerText = 0
  startTime = new Date()
  timerInterval = setInterval(() => {
    timerElement.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

startBtn.addEventListener('click', function () {
  mainContainer.classList.add('animate__animated', 'animate__backOutLeft')
  mainContainer.style.display = 'none'
  logo.classList.remove('animate__animated', 'animate__flip')
  logo.classList.add('animate__animated', 'animate__backOutLeft')
  gameContainer.classList.add('animate__animated', 'animate__backInDown')
  gameContainer.style.display = 'block'
  renderRandomQuote()
});

nextBtn.addEventListener('click', function () {
  inputBox.removeAttribute('disabled', 'true')
  renderRandomQuote();
})

lightDarkMode.addEventListener('click', function () {
  if (lightDarkMode.innerHTML === 'Light Mode') {
    htmlBody.style.backgroundColor = '#747e94'
    lightDarkMode.innerHTML = 'Dark Mode' 
  } else {
    htmlBody.style.backgroundColor = '#282c34'
    lightDarkMode.innerHTML = 'Light Mode'
  }
})
