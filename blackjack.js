
let cards = []

let isalive = false
let hasblackjack = false
let message = ""

function getrandom() {
    let randomnumber = Math.floor(Math.random()*13) + 1
    if (randomnumber > 10){
        return 10
    }
    else if (randomnumber === 1){
        return 11
    }
    else{
    return randomnumber
    }
}

function startgame() {
    if(!isalive) {
        isalive = true
        let firstcard = getrandom()
        let secondcard = getrandom()
        cards = [firstcard,secondcard]
        rendergame()
    }
    else {
        window.alert("Finish the first game or reload to start again")
    }
}

function rendergame() {
    if (isalive){
        document.getElementById("cards-el").textContent = "Cards: "
        document.getElementById("sum-el").textContent = "Sum: "
        let sum = 0
        for (let i = 0; i<cards.length; i++) {
            sum += cards[i]
            document.getElementById("cards-el").textContent += ' ' + cards[i]
        }
        document.getElementById("sum-el").textContent += sum
        
        if (sum<=20)
        {
            message = "Want to draw another card?"
        }
        else if (sum === 21)
        {
            message = "Won Blackjack"
            hasblackjack = true
            isalive = false
            document.body.style.background = "url(won-blackjack.png)"
            setTimeout(() => { alert('Congrats! You won (now you can reload to start again)') }, 1000)
        }
        else 
        {
            message = "you are out"
            isalive = false
        }
        
        document.querySelector("#message-el").textContent = message
    }
    else {
        document.querySelector("#message-el").textContent = "Sorry, but you are out"
    }
}

function newcard() {
    if (isalive) {
        let card = getrandom()
        cards.push(card)
        console.log(cards)
        rendergame()
    }
}


