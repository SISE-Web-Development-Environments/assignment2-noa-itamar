var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var lastposition = 4;

var upkey;
var downkey;
var leftkey;
var rightkey;

var numofballs;
var gametime;
var monsercounter;
var smallcolor;
var mediumcolor;
var bigcolor;

var monster1 = {};
var monster2 = {};
var monster3 = {};
var monster4 = {};

var lives = 5;

function runGame() {
    context = canvas.getContext("2d");
    Start();

}

function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = numofballs;
    var small_food = parseInt(0.6 * numofballs);
    var medium_food = parseInt(0.3 * numofballs);
    var big_food = parseInt(0.1 * numofballs);
    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2)
            ) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (board[i][j] == 1) {
                var random1 = ~~(Math.random() * 3) + 1;
                if (random1 == 1) {
                    if (small_food > 0) {
                        small_food--;
                    } else {
                        random1 = 2;
                    }
                }
                if (random1 == 2) {
                    if (medium_food > 0) {
                        board[i][j] = 5;
                        medium_food--;
                    } else {
                        random1 = 3;
                    }

                }
                if (random1 == 3) {
                    if (big_food > 0) {
                        board[i][j] = 6;
                        big_food--;
                    } else if (small_food > 0) {
                        small_food--;
                    } else {
                        board[i][j] = 5;
                        medium_food--;
                    }
                }
            }
        }

    }
    monster2 = {x: 0, y: 9, direction: 'left'};
    monster3 = {x: 9, y: 0, direction: 'right'};
    monster1 = {x: 0, y: 0, direction: 'down'};
    monster4 = {x: 9, y: 9, direction: 'up'};


    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {};
    addEventListener(
        "keydown",
        function (e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function (e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 200);
    //interval = setInterval(MoveMonster, 200);
}

function paintwalls() {

}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[upkey]) {
        return 1;
    }
    if (keysDown[downkey]) {
        return 2;
    }
    if (keysDown[leftkey]) {
        return 3;
    }
    if (keysDown[rightkey]) {
        return 4;
    }
}

function Draw(y) {
    if (y != undefined)
        lastposition = y
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;


            if (board[i][j] == 2) {
                context.beginPath();
                if (lastposition == 2)
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, 2.35 * Math.PI); // half circle
                else if (lastposition == 1)
                    context.arc(center.x, center.y, 30, -0.35 * Math.PI, 1.35 * Math.PI);
                else if (lastposition == 4)
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI);
                else if (lastposition == 3)
                    context.arc(center.x, center.y, 30, -0.85 * Math.PI, 0.85 * Math.PI);
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                if (lastposition == 4 || lastposition == 3)
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                else if (lastposition == 2 || lastposition == 1)
                    context.arc(center.x + 12, center.y - 2, 5, 0, 2 * Math.PI);
                context.fillStyle = "black"; //color
                context.fill();

            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = smallcolor; //color
                context.fill();
            } else if (board[i][j] == 5) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = mediumcolor; //color
                context.fill();
            } else if (board[i][j] == 6) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = bigcolor; //color
                context.fill();

            } else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
            if (monster1.x == i && monster1.y == j) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0 * Math.PI, 2 * Math.PI);
                context.lineTo(center.x, center.y);
                context.fillStyle = 'orange'; //color
                context.fill();
                context.beginPath();
            }
            if (monster2.x == i && monster2.y == j && monsercounter > 1) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0 * Math.PI, 2 * Math.PI);
                context.lineTo(center.x, center.y);
                context.fillStyle = 'orange'; //color
                context.fill();
                context.beginPath();
            }
            if (monster3.x == i && monster3.y == j && monsercounter > 2) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0 * Math.PI, 2 * Math.PI);
                context.lineTo(center.x, center.y);
                context.fillStyle = 'orange'; //color
                context.fill();
                context.beginPath();
            }
            if (monster4.x == i && monster4.y == j && monsercounter > 3) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0 * Math.PI, 2 * Math.PI);
                context.lineTo(center.x, center.y);
                context.fillStyle = 'orange'; //color
                context.fill();
                context.beginPath();
            }

        }
    }
}

function MoveMonster(monster) {
    let Options = [];

    if (monster.x + 1 <= 9 && board[monster.x + 1][monster.y] != 4) {
        Options.push({x: monster.x + 1, y: monster.y, direction: 'right'});
        if (monster.direction == 'right') {
            updateMonPos(monster, {x: monster.x + 1, y: monster.y, direction: 'right'});
            return true;
        }

    }

    if (monster.x - 1 >= 0 && board[monster.x - 1][monster.y] != 4) {
        Options.push({x: monster.x - 1, y: monster.y, direction: 'left'});

        if (monster.direction == 'left') {
            updateMonPos(monster, {x: monster.x - 1, y: monster.y, direction: 'left'});
            return true;
        }
    }

    if (monster.y + 1 <= 9 && board[monster.x][monster.y + 1] != 4) {
        Options.push({x: monster.x, y: monster.y + 1, direction: 'down'});
        if (monster.direction == 'down') {
            updateMonPos(monster, {x: monster.x, y: monster.y + 1, direction: 'down'});
            return true;
        }
    }
    if (monster.y - 1 >= 0 && board[monster.x][monster.y - 1] != 4) {
        Options.push({x: monster.x, y: monster.y - 1, direction: 'up'});
        if (monster.direction == 'up') {
            updateMonPos(monster, {x: monster.x, y: monster.y - 1, direction: 'up'});
            return true;
        }
    }
    var newMove = Options[~~(Math.random() * Options.length)];
    updateMonPos(monster, newMove);
    return true;
}

function updateMonPos(monster, newMove) {
    monster.x = newMove.x;
    monster.y = newMove.y;
    monster.direction = newMove.direction;
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 1) {
        score += 5;
    }
    if (board[shape.i][shape.j] == 5) {
        score += 15;
    }
    if (board[shape.i][shape.j] == 6) {
        score += 25;
    }

    MoveMonster(monster1);
    killpacman(monster1);
    if (monsercounter > 1) {
        MoveMonster(monster2);
        killpacman(monster2);
        if (monsercounter > 2) {
            MoveMonster(monster3);
            killpacman(monster3);
        }
        if (monsercounter > 3) {
            MoveMonster(monster4);
            killpacman(monster4);
        }
    }
    board[shape.i][shape.j] = 2;


    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (time_elapsed >= gametime) {
        if (score < 100) {
            window.clearInterval(interval);
            window.alert("You are better than " + score + " points!\"");
        } else {
            window.clearInterval(interval);
            window.alert("Winner!!! you have" + score + "points");
        }
    }


    Draw(x);

}

function killpacman(monster) {
    if (monster.x == shape.i && monster.y == shape.j) {
        window.alert("you died, only " + lives - 1 + " left");
        lives--;
        if (lives == 0) {
            //game over
        }
        monster2 = {x: 0, y: 9, direction: 'left'};
        monster3 = {x: 9, y: 0, direction: 'right'};
        monster1 = {x: 0, y: 0, direction: 'down'};
        monster4 = {x: 9, y: 9, direction: 'up'};
        shape.i = ~~(Math.random() * 9) + 1;
        shape.j = ~~(Math.random() * 9) + 1;
    }
}


