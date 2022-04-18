const newGame = new BlackJack(cards);

window.addEventListener('DOMContentLoaded', () => {
    newGame.endGame();
    document.querySelector('.balance').innerText = `$${newGame.playerBalance}`;
    document.querySelector('.bet-amount').innerText = `$${newGame.playerBet}`;
    // Click Events
    newGame.addEvents();
})