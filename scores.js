    function showScores(playerName) {
        let scoresDisplay = document.getElementById('scores');
        let highestScore = document.getElementById('highest-score');
        let highestScoreValue = localStorage['first'];
        if (!highestScoreValue) {
            localStorage['first'] = 0;
        }
        highestScore.innerHTML = highestScoreValue;
        if(document.title === 'Fatty ninja game') {
            localStorage.setItem('you', 0);
        }
        let currentPlayer = document.getElementById('current-player');
        if(playerName) {
            currentPlayer.innerHTML = playerName + ': ';
        } else {
            currentPlayer.innerHTML = 'You: ';
        }
        currentScore = document.getElementById('current-score')
        currentScore.innerHTML = localStorage['you'];
        scoresDisplay.style.display = 'block';
    }

    function increaseScore() {
        let currentScore = document.getElementById('current-score');
        currentScore.innerHTML = +currentScore.innerHTML + 1;
    }

    function updateScores(currentScore) {
        localStorage.setItem('you', currentScore);
        if (currentScore > localStorage['first']) {
            localStorage['first'] = currentScore;
    }
    }
