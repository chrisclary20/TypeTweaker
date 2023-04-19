const startBtn = document.getElementById('start-btn')
const highScoreBtn = document.getElementById('highscore-btn')
const aboutBtn = document.getElementById('about-btn')
const logo = document.getElementById('logo')
const mainContainer = document.getElementById('main-container')
const gameContainer = document.getElementById('game-container')
const randomQuoteAPI = "https://api.quotable.io/random?minLength=250&maxLength=550"

const quoteBox = document.getElementById('quote')



async function fetchRandomQuote() {
    try {
      const response = await fetch(randomQuoteAPI);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const quoteData = await response.json();
      return quoteData
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  }
  
async function renderRandomQuote() {
    const quoteData = await fetchRandomQuote()
    quoteBox.textContent = `"${quoteData.content}" - ${quoteData.author}`
}  


startBtn.addEventListener('click', function() {
    mainContainer.classList.add('animate__animated', 'animate__backOutLeft')
    mainContainer.style.display = 'none'
    logo.classList.remove('animate__animated', 'animate__flip')
    logo.classList.add('animate__animated', 'animate__backOutLeft')
    gameContainer.classList.add('animate__animated', 'animate__backInDown')
    gameContainer.style.display = 'block'
    renderRandomQuote()
})
