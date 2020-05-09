var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalM;
var lastposition = 4;

var upkey;
var downkey;
var leftkey;
var rightkey;
var monsterimage;
var numofballs;
var gametime;
var monsercounter;
var smallcolor;
var mediumcolor;
var bigcolor;
var extratime = 0.0;
var monster1 = {};
var monster2 = {};
var monster3 = {};
var monster4 = {};
var bonus = {};
var gotbonusallready;
var lives = 5;
var lifeimage;
var timeimage;
var bonusimage;
var wallimage;
var ongoingmusic;
var bonusmusic;
var endgame = false;

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
            if ((i == 0 && j == 5) ||
                (i == 2 && j == 5) ||
                (i == 6 && j == 0) ||
                (i == 9 && j == 3) ||
                (i == 7 && j == 2) ||
                (i == 3 && j == 9) ||
                (i == 6 && j == 3)
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


    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
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
                    } else if (medium_food > 0) {
                        board[i][j] = 5;
                        medium_food--;
                    }
                }
            }
        }

    }
    monsterimage = new Image();
    lifeimage = new Image();
    timeimage = new Image();
    bonusimage = new Image();
    wallimage = new Image();
    monsterimage.src = "./images/toppng.com-cute-monster-1904x3001.png";
    lifeimage.src = "./images/PinClipart.com_gold-heart-clip-art_687594.png";
    bonusimage.src = "./images/pngguru.com.png";
    timeimage.src = "./images/hiclipart.com.png";
    wallimage.src = "./images/wood-wall-cartoon-seamless-pattern-clipart-vector_csp68117150.jpg";


    ongoingmusic = new Audio("./music/PAC-MAN Remix (Trap Remix) - Joe Monday (Official Audio).mp3");
    ongoingmusic.loop=true;
    ongoingmusic.play();
    bonusmusic = new Audio("./music/Worms - Holy Hand Grenade (Hallelujah) Audio Clip.mp3");
    bonusmusic.loop=false;

    monster2 = {x: 0, y: 9, direction: 'left'};
    monster3 = {x: 9, y: 0, direction: 'right'};
    monster1 = {x: 0, y: 0, direction: 'down'};
    monster4 = {x: 9, y: 9, direction: 'up'};
    if (monsercounter == 4)
        bonus = {x: 4, y: 4, direction: 'up'};
    else
        bonus = {x: 9, y: 9, direction: 'up'};
    gotbonusallready = false;
    //extra lives
    var cell = findRandomEmptyCell(board);
    board[cell[0]][cell[1]] = 10;
    //extra time
    var cell2 = findRandomEmptyCell(board);
    board[cell2[0]][cell2[1]] = 15;
    keysDown = {};
    addEventListener("keydown",function (e) {
        if([32,37,39].indexOf(e.keyCode) > -1){
            e.preventDefault();
        }

    },false);
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
    interval = setInterval(UpdatePosition, 120);
    intervalM = setInterval(MoveMonsters, 300);
}

function MoveMonsters() {
    MoveMonster(bonus);
    MoveMonster(monster1);
    if (monsercounter > 1) {
        MoveMonster(monster2);
        if (monsercounter > 2) {
            MoveMonster(monster3);
            if (monsercounter > 3) {
                MoveMonster(monster4);
            }
        }
    }
}


function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 10);
    var j = Math.floor(Math.random() * 10);
    while (board[i][j] != 0 || i == 10 || j == 10) {
        i = Math.floor(Math.random() * 10);
        j = Math.floor(Math.random() * 10);
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
    context.canvas.height = window.innerHeight;
    lblScore.value = score;
    lblTime.value = (gametime - (time_elapsed - extratime));
    lblname.value = $("#userlog-in").val();

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
                context.drawImage(wallimage, center.x - 25, center.y - 33, 50, 50);
            } else if (board[i][j] == 10) {
                context.drawImage(lifeimage, center.x - 25, center.y - 33, 50, 50);
            } else if (board[i][j] == 15) {
                context.drawImage(timeimage, center.x - 25, center.y - 33, 50, 50);
            }
            if (bonus.x == i && bonus.y == j && !gotbonusallready) {
                context.drawImage(bonusimage, center.x - 25, center.y - 33, 50, 50);
            }
            if (monster1.x == i && monster1.y == j) {
                context.drawImage(monsterimage, center.x - 25, center.y - 33, 50, 50);
            }
            if (monster2.x == i && monster2.y == j && monsercounter > 1) {
                context.drawImage(monsterimage, center.x - 25, center.y - 33, 50, 50);
            }
            if (monster3.x == i && monster3.y == j && monsercounter > 2) {
                context.drawImage(monsterimage, center.x - 25, center.y - 33, 50, 50);
            }
            if (monster4.x == i && monster4.y == j && monsercounter > 3) {
                context.drawImage(monsterimage, center.x - 25, center.y - 33, 50, 50);
            }

        }
    }
}

function MoveMonster(monster) {
    let Options = [];
    let chcker = false;
    if (monster.x + 1 <= 9 && board[monster.x + 1][monster.y] != 4) {
        Options.push({x: monster.x + 1, y: monster.y, direction: 'right'});
        if (monster.direction == 'right') {
            updateMonPos(monster, {x: monster.x + 1, y: monster.y, direction: 'right'})
            chcker = true;
        }


    }

    if (monster.x - 1 >= 0 && board[monster.x - 1][monster.y] != 4) {
        Options.push({x: monster.x - 1, y: monster.y, direction: 'left'});

        if (monster.direction == 'left') {
            updateMonPos(monster, {x: monster.x - 1, y: monster.y, direction: 'left'});
            chcker = true;
        }


    }

    if (monster.y + 1 <= 9 && board[monster.x][monster.y + 1] != 4) {
        Options.push({x: monster.x, y: monster.y + 1, direction: 'down'});
        if (monster.direction == 'down') {
            updateMonPos(monster, {x: monster.x, y: monster.y + 1, direction: 'down'});
            chcker = true;
        }


    }
    if (monster.y - 1 >= 0 && board[monster.x][monster.y - 1] != 4) {
        Options.push({x: monster.x, y: monster.y - 1, direction: 'up'});
        if (monster.direction == 'up') {
            updateMonPos(monster, {x: monster.x, y: monster.y - 1, direction: 'up'});
            chcker = true;
        }

    }
    if (!chcker) {
        var newMove = Options[~~(Math.random() * Options.length)];
        updateMonPos(monster, newMove);
    }
}

function updateMonPos(monster, newMove) {
    monster.x = newMove.x;
    monster.y = newMove.y;
    monster.direction = newMove.direction;

}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    let value = 0;

    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
            value = upkey;
        }

    }
    if (x == 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
            value = downkey;
        }

    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
            value = leftkey;
        }

    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
            value = rightkey;
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


    if (board[shape.i][shape.j] == 10) {
        lives++;
        bonusmusic.play();
        $("#showlives").text(lives);
    }
    if (board[shape.i][shape.j] == 15) {
        extratime = 10.0;
    }
    if (monster1.x == shape.i && monster1.y == shape.j) {
        killpacman(monster1, value);
    }
    if (monsercounter > 1) {
        if (monster2.x == shape.i && monster2.y == shape.j) {
            killpacman(monster2, value);
        }
        if (monsercounter > 2) {
            if (monster3.x == shape.i && monster3.y == shape.j) {
                killpacman(monster3, value);
            }
            if (monsercounter > 3) {
                if (monster4.x == shape.i && monster4.y == shape.j) {
                    killpacman(monster4, value);
                }
            }
        }
    }

    if (bonus.x == shape.i && bonus.y == shape.j && !gotbonusallready) {
        score += 50;

        bonusmusic.play();
        gotbonusallready = true;
    }

    board[shape.i][shape.j] = 2;

    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if ((time_elapsed - extratime) >= gametime) {
        if (score < 100) {
            ongoingmusic.pause();
            window.clearInterval(interval);
            window.clearInterval(intervalM);
            window.alert("You are better than " + score + " points!\"");
            endgame=true;
        } else {
            ongoingmusic.pause();
            window.clearInterval(interval);
            window.clearInterval(intervalM);
            window.alert("Winner!!! you have " + score + " points");
            endgame=true;
        }
    }

    Draw(x);

}

function killpacman(monster, x) {

    lives--;
    $("#showlives").text(lives);
    score -= 10;
    keysDown[x] = false;
    if (lives == 0) {
        ongoingmusic.pause();
        window.clearInterval(interval);
        window.clearInterval(intervalM);
        window.alert("You are a Loser");
        endgame=true;
    }

    monster2 = {x: 0, y: 9, direction: 'left'};
    monster3 = {x: 9, y: 0, direction: 'right'};
    monster1 = {x: 0, y: 0, direction: 'down'};
    monster4 = {x: 9, y: 9, direction: 'up'};
    shape.i = ~~(Math.random() * 9) + 1;
    shape.j = ~~(Math.random() * 9) + 1;
    console.log(shape.i + "     " + shape.j);


}

function restartgame() {
    if(!endgame) {
        window.clearInterval(interval);
        window.clearInterval(intervalM);
    }
    endgame=false
    extratime = 0;
    lives = 5;
    ongoingmusic.pause();
    $("#showlives").text('5');
    Start();
}


