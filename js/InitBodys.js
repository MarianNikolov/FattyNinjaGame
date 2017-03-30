(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

var gameContext = document.getElementById('game-canvas').getContext('2d');
var firstNinjasImg = document.getElementById('ninja-running1');
var jumpingNinja = [document.getElementById('ninja-jumping1')];
var cuttingNinja = [
    [3, 56], [7, 56], [9, 55], [12, 60], [11, 69],
    [35, 69], [35, 52], [38, 42], [52, 34], [63, 8], [61, 2],
    [58, 2], [44, 28], [36, 29], [35, 15], [26, 11], [14, 12],
    [12, 16], [11, 30], [2, 35]
]; // this define area to collision
var cuttingMoney = [
    [9, 45], [2, 33], [6, 23], [3, 15], [13, 2], [26, 3], [29, 9],
    [36, 18], [36, 26], [32, 30], [37, 36], [33, 43], [28, 47], [26, 52], [12, 51]
];
var eleToIntroduceImgMoney = document.getElementById('imgMoney');
for (var index = 1; index < 21; index++) {
    var fel = document.createElement('img');
    fel.style.display = 'none';
    fel.id = 'money' + index;
    var nm = index < 10 ? '0' + index : '' + index;
    fel.src = '../images/separatedImages/pari4ka/animated-money-image-0104-' + nm + '.png';
    eleToIntroduceImgMoney.appendChild(fel);
}

var ninjaHit = [
    { img: document.getElementById('ninja-hit1'), cut: [[7, 67], [15, 23], [51, 10], [49, 2], [68, 4], [85, 31], [83, 67], [54, 63], [32, 70]] },
    { img: document.getElementById('ninja-hit2'), cut: [[7, 67], [15, 23], [51, 10], [49, 2], [68, 4], [85, 31], [83, 67], [54, 63], [32, 70]] },
];
var ninja = function () {
    return new Ninja(
        gameContext, // initial context
        100, //initial x
        200, //initial y
        [
            [
                { img: firstNinjasImg, cut: cuttingNinja },
                { img: document.getElementById('ninja-running2'), cut: cuttingNinja },
                { img: document.getElementById('ninja-running3'), cut: cuttingNinja },
                { img: document.getElementById('ninja-running4'), cut: cuttingNinja }
            ],
            [
                { img: document.getElementById('ninja-jumping1'), cut: cuttingNinja }
            ],
            ninjaHit
        ], // image - sprites
        Constants.NINJA_SPRITE_FREQUENCY, // speed tick by frame
        {
            left: 0,
            right: gameContext.canvas.width - 67,
            up: 0,
            down: gameContext.canvas.height - 71 - Constants.NINJA_GAMEWALKING_LINE
        } // size of gaming board of ninja object
    );
}();

var obstacles = [];
var RandomTimes = function () {
    return Math.random() * Constants.OBSTACLE_TIMES_RANGE + Constants.OBSTACLE_TIMES_MIN;
};

var rand = RandomTimes();
function CreatObstacle(obst, explod) {
    rand -= 1;
    if (rand > 0) {
        return
    }
    rand = RandomTimes();
    var shape = [obst[(Math.random() * 2) | 0], explod];
    var obstacle = function () {
        return new Obstacale(
            gameContext,
            gameContext.canvas.width - shape[0][0].img.width - 5,
            gameContext.canvas.height - shape[0][0].img.height - Constants.NINJA_GAMEWALKING_LINE,
            shape,
            Constants.OBSTACLE_SPRITE_FREQUENCY,
            {
                left: 0,
                right: gameContext.canvas.width - shape[0][0].img.width,
                up: 0,
                down: gameContext.canvas.height - shape[0][0].img.height - Constants.NINJA_GAMEWALKING_LINE
            },
            Constants.OBSTACLE_INIT_SPEED * (Math.random() * 0.8 + 0.4),
            sndEffect
        )
    }();

    obstacles.push(obstacle);
};
var bonusCut = [[37, 78], [23, 65], [21, 54], [31, 24], [49, 20], [71, 25], [81, 40], [81, 53], [75, 70], [62, 79]];
var ballCrushed = [
    { img: document.getElementById('bonus-ball2'), cut: bonusCut },
    { img: document.getElementById('bonus-ball3'), cut: bonusCut },
    { img: document.getElementById('bonus-ball4'), cut: bonusCut },
    { img: document.getElementById('bonus-ball5'), cut: bonusCut },
    { img: document.getElementById('bonus-ball6'), cut: bonusCut }
];
var ball = [{ img: document.getElementById('bonus-ball1'), cut: bonusCut }];
var bonuses = [];

function CreatBonus(shape) {
    rand -= 1;
    if (rand > 0) {
        return
    }
    rand = RandomTimes();
    var bonus = function () {
        return new Bonus(
            gameContext,
            gameContext.canvas.width - shape[0][0].img.width - 5,
            gameContext.canvas.height - shape[0][0].img.height - Constants.NINJA_GAMEWALKING_LINE,
            shape,
            Constants.OBSTACLE_SPRITE_FREQUENCY,
            {
                left: 0,
                right: gameContext.canvas.width - shape[0][0].img.width,
                up: 0,
                down: gameContext.canvas.height - shape[0][0].img.height - Constants.NINJA_GAMEWALKING_LINE
            },
            Constants.BONUS_HORIZONTAL_SPEED * (Math.random() * 0.8 + 0.4),
            Constants.BONUS_VERTICAL_SPEED * (Math.random() + 0.3),
            sndEffectCash
        )
    }();

    bonuses.push(bonus);
}
var arrayOfMoney = [];
for (var index = 1; index < 21; index++) {
    arrayOfMoney.push({ img: document.getElementById('money' + index), cut: cuttingMoney });
}
var chest = [{ img: document.getElementById('obstacle-crate'), cut: [[0, 0], [40, 0], [40, 40], [0, 40]] }];
var explidingBomb = [
    { img: document.getElementById('obstacle-bomb2'), cut: [[18, 21], [43, 20], [43, 52], [19, 52]] },
    { img: document.getElementById('obstacle-bomb3'), cut: [[18, 21], [43, 20], [43, 52], [19, 52]] },
    { img: document.getElementById('obstacle-bomb4'), cut: [[18, 21], [43, 20], [43, 52], [19, 52]] },
    { img: document.getElementById('obstacle-bomb5'), cut: [[18, 21], [43, 20], [43, 52], [19, 52]] }
];
var bomb = [{ img: document.getElementById('obstacle-bomb2'), cut: [[18, 21], [43, 20], [43, 52], [19, 52]] }];