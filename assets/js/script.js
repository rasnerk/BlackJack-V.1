const newGame = new BlackJack(cards);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.balance').innerText = `$${newGame.playerBalance}`;
    document.querySelector('.bet-amount').innerText = `$${newGame.playerBet}`;
    // Click Events
    newGame.addEvents();
})