const card = document.getElementById('card')
card.style.display = 'none'
const container = document.getElementById('container')
const startbtn = document.getElementById('startbtn')

startbtn.addEventListener('click',()=>{
    container.style.display = 'none'
    card.style.display = 'block'
    startgame()
})

var word = ""
var lenword = 0

function startgame(){
      fetch('https://random-word-api.herokuapp.com/word')
      .then(res => res.json())
      .then(w => {
        word = w[0]
        lenword = w[0].length
        console.log(word)
      console.log(lenword)
      })
      .catch(err=>console.log(err))
      
}