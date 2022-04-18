class BlackJack {
    constructor(cards) {
        this.cards = cards;
        this.availableCards = [];
        this.playersHand = [];
        this.dealersHand = [];
        this.playerBalance = 1000;
        this.playerBet = 25;
        this.gameResult = false;
        this.handsDealt = 0;
        this.gameInMotion = false;
        this.playerSplit = { first: [], second: [] };
        this.gameControls = [".hit", ".stand", ".split", ".double"]
    }
    // Pretty good hard to change this logic
    startGame () {
        // Is the player trying to bet more than they have?
        if (this.playerBalance < this.playerBet) {
            alert('Cannot Bet more than your balance!');
            return;
        }
        document.querySelector('.bet-amount').innerText = `$${this.playerBet}`;
        this.gameInMotion = true;
        // If the game is just starting we need to 'shuffle' the deck
        if (this.handsDealt === 0) this.shuffleDeck();
        // If the shoe is almost out we need to reshuffle the deck & reset the game
        if (this.handsDealt > 24 ) {
            alert("Reshuffling the Cards...")
            this.resetGame();
        }
        // We need to reset all in game variables
        document.querySelector(".players-hand").classList.remove('split')
        document.querySelector('.players-hand').innerHTML = '';
        document.querySelector('.dealers-hand').innerHTML = '';
        this.playersHand = [];
        this.dealersHand = [];
        this.gameResult = false;
        this.dealCards();
        this.gameControls.forEach( (control) => document.querySelector(control).disabled = false )
    }
    // Good
    resetGame () {
        this.shuffleDeck();
        document.querySelector('.players-hand').innerHTML = '';
        document.querySelector('.dealers-hand').innerHTML = '';
        this.handsDealt = 0;
        this.playersHand = [];
        this.dealersHand = [];
        this.gameResult = false;
    }
    // Pretty good hard to change logic
    dealCards () {
        this.handsDealt ++;
        // Players Cards
        let playersFirstCard = this.randomCardSelector();
        let playersSecondCard = this.randomCardSelector();
        // Display the card to the screen
        document.querySelector('.players-hand').append( this.createCard(playersFirstCard), this.createCard(playersSecondCard) )
        // Update Players Score
        this.updatePlayerScore(playersFirstCard.value);
        this.updatePlayerScore(playersSecondCard.value);

        // DealersCards
        let dealersFirstCard = this.randomCardSelector();
        let dealersSecondCard = this.randomCardSelector();
        let dealersHiddenCard = this.createCard(dealersSecondCard);
        dealersHiddenCard.classList.add('dealers-hidden-card')
        let dealersBackCard = this.createCard({link: 'assets/imgs/back-of-card.jpg'})
        dealersBackCard.classList.add('back-of-card')
        // Display the cards to the screen 
        document.querySelector('.dealers-hand').append( this.createCard(dealersFirstCard), dealersHiddenCard, dealersBackCard )
        // Update Dealers Score
        this.updateDealerScore(dealersFirstCard.value);
        this.updateDealerScore(dealersSecondCard.value);
    }
    // Good
    shuffleDeck () {
        this.availableCards = [];
        let temp = []
        for (let i=0; i<6; i++) {
            temp.push(this.cards);
        }
        for (let i=0; i<temp.length; i++) {
            this.availableCards = this.availableCards.concat(temp[i])
        }

    }
    // Good
    randomCardSelector () {
        let selectedCardIndex = Math.floor(Math.random() * ( (this.availableCards.length - 1) - 0) )
        let selectedCard = this.availableCards[selectedCardIndex];
        // Remove Card from available cards as its now been used
        this.availableCards.splice(selectedCardIndex, 1);
        
        return selectedCard;
    }
    // Good
    createCard (obj) {
        let card = document.createElement('img');
        card.src = obj.link;
        card.value = obj.value;
        return card;
    }
    // Complicated
    updatePlayerScore (value) {
        // If the card drawn is an ace and the player does NOT have any other cards yet
        if (typeof value === 'object' && this.playersHand.length === 0) {
            this.playersHand.push(value[0],value[1])
        } 
        // If the card drawn is an ace and the player has one non ace card
        else if(typeof value === 'object' && this.playersHand.length === 1) {
            let x = this.playersHand[0];
            this.playersHand = [];
            value.forEach( (val) => {
                this.playersHand.push(x+val)
            })
        } 
        // If the card drawn is an ace and the player already has an ace
        else if (typeof value === 'object' && this.playersHand.length > 1) {
            this.playersHand[0] += value[0];
            this.playersHand[1] += value[0];
        } 
        // If the card drawn is NOT an ace and the player already has an ace
        else if (typeof value !== 'object' && this.playersHand.length > 1) {
            let x1 = this.playersHand[0];
            let x2 = this.playersHand[1];
            this.playersHand = [];
            this.playersHand.push(x1+value);
            this.playersHand.push(x2+value)
        } 
        // If the card drawn is NOT an ace and the player does NOT have an ace BUT has a card
        else if (typeof value !== 'object' && this.playersHand.length === 1) {
            this.playersHand[0] += value;
        }
        // If the card drawn is NOT an ace and the player does NOT have any cards 
        else {
            this.playersHand.push(value)
        }
        // ... wow what a shit show

        console.log(this.playersHand)
        
        // If the player was able to draw cards and remain with more than one available score
        if (this.playersHand.length > 1) {
            this.playersHand.forEach( (val) => {
                // Check if one of the scores is 21 then keep that score
                if (val === 21) {
                    this.playersHand = [21]
                }
                // if one of the scores is more than 21 remove it
                if(val > 21) {
                    this.playersHand.splice(this.playersHand.indexOf(val),1)
                }
            })
            console.log(this.playersHand)
        }
        if (typeof val === 'object') {
            //run helper function?
            // helperFunction(notAce=false,value)
        } else {
            //run other helper function?
            // helperFunction(notAce=true,value)
        }
        // Above might actually be easiest
        
        // might be able to check if its an ace then do some stuff like..
        // if(typeof val === 'object') {
        //      if (this.playersHand.length === 0){}
        //      if (this.playersHand.length === 1) {}
        //      if (this.playersHand.length > 1) {}
        // } 
        // Now i know its NOT an ace
        // else {
        //      if (this.playersHand.length === 0){}
        //      if (this.playersHand.length === 1) {}
        //      if (this.playersHand.length > 1) {}
        // }

        // This might also work
        // so have two booleans for isAce & playersHand.length?
        // value === 'object' ? isAce = true : isAce = false;
        // switch (this.playersHand.length){
        //      case 0: 
        //          myBoolean = null
        //      case 1: 
        //          myBoolean = false
        //      case >2:
        //          myBoolean = true
        // }
        // switch (true) {
        //     case (bool1 && bool2):
        //         alert('case 1');
        //         break;
        //     case (bool1 || bool2):
        //         alert('case 2');
        //         break;
        //     default:
        //         alert('default');   
        // }
    }
    // Complicated
    updateDealerScore (value) {

        if (typeof value === 'object' && this.dealersHand.length === 0) {
            this.dealersHand.push(value[0],value[1])
        } else if(typeof value === 'object' && this.dealersHand.length === 1) {
            let x = this.dealersHand[0];
            this.dealersHand = [];
            value.forEach( (val) => {
                this.dealersHand.push(x+val)
            })
        } else if (typeof value === 'object' && this.dealersHand.length > 1) {
            this.dealersHand[0] += value[0];
            this.dealersHand[1] += value[0];
        } else if (typeof value !== 'object' && this.dealersHand.length > 1) {
            let x1 = this.dealersHand[0];
            let x2 = this.dealersHand[1];
            this.dealersHand = [];
            this.dealersHand.push(x1+value);
            this.dealersHand.push(x2+value)
        } else if (typeof value !== 'object' && this.dealersHand.length === 1) 
            this.dealersHand[0] += value;
        else {
            this.dealersHand.push(value)
        }

        // console.log(this.dealersHand)
        
        if (this.dealersHand.length > 1) {
            this.dealersHand.forEach( (val) => {
                if (val === 21) {
                    this.dealersHand = [21]
                }
                if(val > 21) {
                    this.dealersHand.splice(this.dealersHand.indexOf(val),1)
                }
            })
            console.log(this.dealersHand)
        }
    }
    // Good
    hit () {
        let playersCard = this.randomCardSelector();
        document.querySelector('.players-hand').append( this.createCard(playersCard) )
        this.updatePlayerScore(playersCard.value);
        if (this.playersHand[0] > 21) {
            setTimeout( () => {
                this.bust();
                this.endGame();
            }, 100)
        }
    }
    // Not good
    stand () {
        // Find highest Player score
        if (this.playersHand.length > 1 ) {
            this.playersHand[0] > this.playersHand[1] ? this.playersHand[0] = [ this.playersHand[0] ] : this.playersHand[1] = [ this.playersHand[1] ]; 
        }

        if (this.playersHand[0] > 21) {
            alert('Player Lost Double!')
            this.gameResult = false;
            this.endGame();
            return;
        }

        document.querySelector('.dealers-hidden-card').style.display = "inline-block";
        document.querySelector('.back-of-card').style.display = 'none';

        setTimeout( () => {
            while (this.dealersHand[0] < 17) {
                let dealersCard = this.randomCardSelector();
                document.querySelector('.dealers-hand').append( this.createCard(dealersCard) )
                this.updateDealerScore(dealersCard.value);
            }
            setTimeout( () => {
                if (this.playersHand[0] === this.dealersHand[0]) {
                    this.gameResult = null;
                    alert('Push!')
                }
                else if (this.playersHand[0] > this.dealersHand[0] || this.dealersHand[0] > 21) {
                    this.gameResult = true;
                    alert("Player Wins!")
                } else {
                    this.gameResult = false;
                    alert('Dealer Wins!')
                }
                this.endGame();
            },100)
        }, 1500)
    }
    // idk how to change this yet
    double () {
        if (this.playerBalance < this.playerBet * 2) {
            alert('Cannot Bet more than your balance!');
            return;
        }
        this.playerBet = this.playerBet * 2;
        let playersDoubleCard = this.randomCardSelector();
        this.updatePlayerScore(playersDoubleCard.value);

        document.querySelector(".players-hand").append( this.createCard(playersDoubleCard) );
        
        setTimeout( () => {
            this.stand()
        },1000)
    }
    split () {
        let currentHand = document.querySelector(".players-hand");
        let starterCards = currentHand.children;
        if (starterCards[0].value === starterCards[1].value) {
            currentHand.classList.add('split');
            // They are going to be the same card so it doesnt matter which one you push
            this.playerSplit.first.push(starterCards[0].value)
            this.playerSplit.second.push(starterCards[0].value)
        } else {
            alert('Can only split cards that have the same value!')
        }
    }
    // Good
    increaseBet () {
        this.isGameStarted() ? alert("Cannot Change Bet Size During Game!") : this.playerBet += 5;
        document.querySelector('.bet-amount').innerText = `$${this.playerBet}`
    }
    // Good
    decreaseBet () {
        this.isGameStarted() ? alert("Cannot Change Bet Size During Game!") : this.playerBet -= 5;
        document.querySelector('.bet-amount').innerText = `$${this.playerBet}`
    }
    // Good
    isGameStarted () {
        return this.gameInMotion;
    }
    // Good
    bust () {
        this.gameResult = false;
        alert('Player Busted!')
    }
    // Better
    endGame () {
        if (this.gameInMotion === false) {
            this.gameControls.forEach( (control) => document.querySelector(control).disabled = true )
            return
        }
        switch(this.gameResult) {
            case null: 
                this.playerBalance = this.playerBalance;
                break;
            case false: 
                this.playerBalance -= this.playerBet;
                break;
            case true:
                this.playerBalance += this.playerBet;
                break;
        }
        this.gameInMotion = false;
        document.querySelector('.balance').innerText = `$${this.playerBalance}`;
        this.gameControls.forEach( (control) => document.querySelector(control).disabled = true )
        this.playerBet = Number( document.querySelector('.bet-amount').innerText.split('$')[1] );
    }
    // Good
    addEvents () {
        document.querySelector('.deal').addEventListener("click", () => this.startGame() )
        document.querySelector('.hit').addEventListener("click", () => this.hit() )
        document.querySelector('.stand').addEventListener('click', () => this.stand() )
        document.querySelector(".double").addEventListener('click', () => this.double() )
        document.querySelector(".split").addEventListener('click', () => this.split() )
        document.querySelector(".increase-bet").addEventListener('click', () => this.increaseBet() )
        document.querySelector(".decrease-bet").addEventListener('click', () => this.decreaseBet() )
    }
}