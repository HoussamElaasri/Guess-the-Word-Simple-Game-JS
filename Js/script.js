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

function startgame() {
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

