    function showScores(playerName) {
        var scoresDisplay = document.getElementById('scores');
        var highestScore = document.getElementById('highest-score');
        var highestScoreValue = localStorage['first'];
        if (!highestScoreValue) {
            localStorage.setItem('first', 0);
        }
        highestScore.innerHTML = highestScoreValue;
        if (document.title === 'Fatty ninja game') {
            localStorage.setItem('you', 0);
        }
        var currentPlayer = document.getElementById('current-player');
        if (playerName) {
            currentPlayer.innerHTML = playerName + ': ';
        } else {
            currentPlayer.innerHTML = 'You: ';
        }
        currentScore = document.getElementById('current-score')
        currentScore.innerHTML = localStorage['you'];
        scoresDisplay.style.display = 'block';
    }

    function increaseScore(points) {
        points = points || 10;
        var currentScore = document.getElementById('current-score');
        currentScore.innerHTML = +currentScore.innerHTML + points;
    }

    function updateScores(currentScore) {
        localStorage.setItem('you', currentScore);
        if (+localStorage['you'] > +localStorage['first']) {
            localStorage.setItem('first', currentScore);
        }
    }
