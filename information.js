localStorage.setItem("p", "p");


function showNavOption(identifier) {
    /**
     * Disactivating the current activated navbar and section, and activating the destinated navbar and section.
     * @type {string}
     */
    const clickedName = identifier.getAttribute("data-option");

    unShowSection();

    showSection(clickedName);

}

function unShowSection() {
    /**
     * Removes the activated class from activated navbar and section.
     * @type {HTMLCollectionOf<Element>}
     */
    const activatedSection = document.getElementsByClassName("choosenScreen");
    activatedSection[0].classList.remove("choosenScreen");
}

function showSection(clickedName) {
    /**
     * Adding to the destinated section and nvabar activated class.
     * @type {Element | null}
     */
    const newActivatedSection = document.getElementById("main").querySelector(`#${clickedName}`);
    newActivatedSection.classList.add("choosenScreen");


}

function moveTo(destination) {

    unShowSection();

    showSection(destination);

}

function submitRegistration() {
    $('#first_form').validate({
        rules: {
            userName: {
                pattern: '^[a-zA-Z]*$',
                required: true
            },
            password: {
                pattern: '^(?=.*\\d)(?=.*[a-zA-Z]).{6,200}$',
                required: true,

            },
            name: {
                pattern: '^[a-zA-Z]*$',
                required: true

            },

            email: {
                email: true,
                required: true,
            },

        },

    });

    event.preventDefault();
    const form = $("#first_form");
    if (form.valid()) {
        var user_name = $('#userName').val();
        var password = $('#password').val();
        window.alert("registered ")
        localStorage.setItem(user_name, password);
        switchdivs("WelcomePage");
    }

}

function logingGame() {
    if (localStorage.getItem($('#userlog-in').val()) === null) {
        //alert("Error Password or Username")
    } else if (localStorage.getItem($('#userlog-in').val()) === $('#passlog-in').val()) {
        event.preventDefault()
        switchdivs("gameSettings");
    } else {
        //alert("Error Password or Username")
    }
}

function uniKeyCode(event, chooseKey) {
    var key = event.keyCode;
    if (chooseKey == 'up') {
        upkey = key;

    } else if (chooseKey == 'down') {
        downkey = key;
    } else if (chooseKey == 'left') {
        leftkey = key;
    } else {
        rightkey = key;
    }
    if (key == 38)
        $("#goup").val("Up key");
    if (key == 40)
        $("#godown").val("Down key");
    if (key == 39)
        $("#goright").val("right key");
    if (key == 37)
        $("#goleft").val("left key");
    return key;
}

function checkboxrandomize() {
    var checkBox = document.getElementById("randomcheck");
    var text = document.getElementById("rulesdiv");
    if (checkBox.checked == false) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function gameSettingsCheck() {
    var checkBox = document.getElementById("randomcheck");
    if (checkBox.checked == false) {
        $('#gameSettingsForm').validate({
            rules: {
                numofballs: {
                    max: 90,
                    min: 50,
                    required: true
                },
                gametime: {
                    min: 60,
                    required: true,

                },
                monstercounter: {
                    max: 4,
                    min: 1,
                    required: true
                },
                smallcolor: {

                    required: true
                },
                mediumcolor: {

                    required: true
                },
                bigcolor: {

                    required: true
                },
            },
        });
        numofballs = $("#numofballs").val();
        gametime = $("#gametime").val();
        monsercounter = $("#monstercounter").val();
        smallcolor = $("#smallcolor").val();
        mediumcolor = $("#mediumcolor").val();
        bigcolor = $("#bigcolor").val();

        $("#displayup").text("UP key: " + $("#goup").val());
        $("#displaydown").text("Down key: " + $("#godown").val());
        $("#displayright").text("Right key: " + $("#goright").val());
        $("#displayleft").text("Left key: " + $("#goleft").val());

    } else {
        upkey = 38;
        downkey = 40;
        leftkey = 37;
        rightkey = 39;

        numofballs = 90;
        gametime = 90;
        monsercounter = 2;
        smallcolor = getRandomColor();
        mediumcolor =getRandomColor();
        bigcolor = getRandomColor();

        $("#displayup").text("UP key: Up arrow");
        $("#displaydown").text("Down key: Down arrow");
        $("#displayright").text("Right key: right arrow ");
        $("#displayleft").text("Left key: left arrow");

    }

    $("#foodisplay").text("food counter: " + numofballs);
    $("#smallfoodisplay").prop("value", smallcolor);
    $("#mediumfoodisplay").prop("value", mediumcolor);
    $("#bigfoodisplay").prop("value", bigcolor);
    $("#timedisplay").text("game time: " + gametime);
    $("#enemiesdisplay").text("total monsters: " + monsercounter);
    event.preventDefault();
    const form = $("#gameSettingsForm");
    if (form.valid()) {
        runGame();
        switchdivs("PacmanGame");
    }

}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function switchdivs(newdiv) {
    var mainFrameTwo = document.getElementById(newdiv);
    var oldframe1 = document.getElementById("WelcomePage");
    var oldframe2 = document.getElementById("log-in");
    var oldframe3 = document.getElementById("gameSettings");
    var oldframe4 = document.getElementById("PacmanGame");
    var oldframe5 = document.getElementById("registerpage");
    if (newdiv == "WelcomePage") {
        mainFrameTwo.style.display = 'block';
        oldframe3.style.display = 'none';
        oldframe4.style.display = 'none';
        oldframe5.style.display = 'none';
        oldframe2.style.display = 'none';
    }
    if (newdiv == "log-in") {
        mainFrameTwo.style.display = 'block';
        oldframe1.style.display = 'none';
        oldframe4.style.display = 'none';
        oldframe5.style.display = 'none';
        oldframe3.style.display = 'none';
    }
    if (newdiv == "gameSettings") {
        mainFrameTwo.style.display = 'block';
        oldframe1.style.display = 'none';
        oldframe4.style.display = 'none';
        oldframe5.style.display = 'none';
        oldframe2.style.display = 'none';
    }
    if (newdiv == "PacmanGame") {
        mainFrameTwo.style.display = 'block';
        oldframe1.style.display = 'none';
        oldframe3.style.display = 'none';
        oldframe5.style.display = 'none';
        oldframe2.style.display = 'none';
    }
    if (newdiv == "registerpage") {
        mainFrameTwo.style.display = 'block';
        oldframe1.style.display = 'none';
        oldframe4.style.display = 'none';
        oldframe3.style.display = 'none';
        oldframe2.style.display = 'none';
    }

}
function menuToAbout(){
    $("#Aboutpage").modal();
    if(interval !=undefined){
        window.clearInterval(interval);
    }

}
function closeModal(){
    $.modal.close();
}

