const card = document.getElementById('card')
card.style.display = 'none'
const container = document.getElementById('container')
const startbtn = document.getElementById('startbtn')

startbtn.addEventListener('click', () => {
    
    container.style.display = 'none'
    card.style.display = 'block'
    startgame()
})

var word = ""
var lenword = 0
var stagerow = 0

function startgame() {
    resetgame()
    fetch('https://random-word-api.herokuapp.com/word')
        .then(res => res.json())
        .then(w => {
            word = w[0]
            lenword = w[0].length
            console.log(word)
            console.log(lenword)
            rowWords(word)
        })
        .catch(err => console.log(err))

}
var rows = document.getElementById('rows')
function rowWords(word) {

    for (let j = 0; j < 5; j++) {
        var wor = document.createElement('div')
        wor.className = 'row'
        wor.id = 'row'+j
        if (j != 0) {
            wor.classList.add('rowdisabled')
        }

        for (let i = 0; i < lenword; i++) {
            var iinput = document.createElement('input')
            iinput.type = 'text';
            iinput.maxLength = 1;
            if (i == 0) {
                iinput.value = word[0];
                iinput.disabled = true;
            }
            if (j != 0){
                iinput.disabled = true
            }
            wor.append(iinput);
        }
        rows.append(wor);
    }
    
}



function check(){
    var rownow = document.getElementById('row'+stagerow)
    var inputs = rownow.getElementsByTagName('input'); 
    var values = [];
    for (let i = 0; i < inputs.length; i++) {
      values.push(inputs[i].value); 
    }
    var numGrenn = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i] == word[i].toLowerCase()) {
            inputs[i].className = 'green';
            numGrenn++;
        } 
        else if (word.toLowerCase().includes(values[i])) {
            inputs[i].className = 'orange';
        } 
        else {
            inputs[i].className = 'red';
        }
    }
    if (numGrenn==word.length){
      win();
    }
    else{
      next()
    }

}

function next() {
  const rownow = document.getElementById('row'+stagerow)
    rownow.classList.add('rowdisabled');
    const inpuuts = Array.from(rownow.querySelectorAll('input'))
    inpuuts.map(inp => inp.disabled = true)

  stagerow++
  if(stagerow==5){
    lose()
    return
  }
  const rownext = document.getElementById('row'+stagerow);
  if (rownext) {
    rownext.classList.remove('rowdisabled')
    const inputs = Array.from(rownext.querySelectorAll('input'))

    inputs.map((inp, idx) => {
      if (idx === 0) {
        inp.disabled = true
      } else {
        inp.disabled = false
      }
    });

  }
}

function win(){
  var messagewin = ['Victory! Your brain deserves a medal',
    'You did it! You guessed the word like a pro',
    "Awesome job! You cracked the code",
    "Perfect! You nailed it"
  ];
  container.style.display = 'block';
  card.style.display = 'none';
  var message =  document.createElement('p');
  message.innerText=messagewin[Math.floor(Math.random() * messagewin.length)];
  message.className='box_message-win';
  container.append(message);
}


function lose(){
    container.style.display='flex'
    const h11 = document.createElement("h1")
    h11.className = 'box_message-lose'
    h11.innerText = `You lose`
    container.append(h11)
    card.style.display='none'
    
}

function resetgame() {
  rows.innerHTML = ''
  container.querySelectorAll('.box_message-win, .box_message-lose').forEach(msg => msg.remove())
  word = ''
  lenword = 0
  stagerow = 0
}
