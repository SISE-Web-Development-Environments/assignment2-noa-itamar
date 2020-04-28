
localStorage.setItem("p","p");


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
    // var newActivatedNav = document.getElementsByClassName(`${clickedName}Nav`)[0];
    // newActivatedNav.classList.add("activeNav");

}

function moveTo(destination) {

    unShowSection();

    showSection(destination);

}

function submitRegistration(){
    $('#first_form').validate({
        rules: {
            userName: {
                pattern: '^[a-zA-Z]*$',
                required: true
            },
            password: {
                pattern: '^(?=.*\\d)(?=.*[a-zA-Z]).{8,200}$',
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
        message:"password must be greater then 8 "
    });

    event.preventDefault();
    const form = $("#first_form");
    if (form.valid()) {
        var user_name = $('#userName').val();
        var password = $('#password').val();
        localStorage.setItem(user_name,password);
        moveTo("WelcomePage");
    }

}

function  logingGame(){

    if (localStorage.getItem($('#userlog-in').val()) === null ) {
        alert("Error Password or Username")
        return false;
    } else if (localStorage.getItem($('#userlog-in').val()) === $('#passlog-in').val()){
        moveTo("gameSettings");
        return true;
    }
    else{
        alert("Error Password or Username")
        return false;
    }
}
function uniKeyCode(event) {
    var key = event.keyCode;
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
function gameSettingsCheck(){
    $('#gameSettingsForm').validate({
        rules: {
            numofballs: {
                max: 90,
                min: 50,
                required: true
            },
            gamtime: {
                min: 60,
                required: true,

            },
            monsercounter: {
                max: 4,
                min: 1,
                required: true
            },

        },
    });

    event.preventDefault();
    const form = $("#first_form");
    if (form.valid()) {
       upkey =  uniKeyCode()
        var password = $('#password').val();
        localStorage.setItem(user_name,password);
        moveTo("WelcomePage");
    }

}