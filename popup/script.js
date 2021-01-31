//Number of days to set a cookie
const NUM_DAYS = 1;
//Initial amount of time in ms before the popup becomes visible
const initialDelay = 2000;
//A toggle for the cookie functionality of the popup
const hasCookies = true;

//utility function to erase a single cookie
function eraseCookie(name) {
    setCookie(name, "", -1);
}
//method that uses the utility function eraseCookie(name) in order to erase all cookies
function eraseCookies() {
    const cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
        eraseCookie(cookies[i].split("=")[0]);
}
//method for setting a cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//method for retrieving a particular cookie
function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//method for checking if a cookie has been set or not (in order to decide on how to display the modal)
function checkCookie() {
    const user = getCookie("username");
    if (user != "") { return true } //if cookie is set, return true
    else { return false } //if cookie is not set, return false
}
//method for handling the popup button click, set cookie on click
function handleButtonClick() {
    setCookie("username", "user", NUM_DAYS)
}

// Method to close the modal
const closeModal = () => {
    modal.style.display = "none";
    if (hasCookies) {
        setCookie("username", "user", NUM_DAYS) //set cookie for 30 days on close
    }
}
// Get the modal
const modal = document.querySelector("#emma-utils-modal");

// Get the close button
const closeBtn = document.querySelector(".modal-close");

//Add an event listener to the window which waits initialDelay ms before triggering the modal
window.addEventListener('load', () => {
    if (!checkCookie()) {
        setTimeout(function () {
            modal.style.display = "block";
        }, initialDelay);
    }
})
//Add an event listener to the close button which closes the modal on click
closeBtn.addEventListener('click', closeModal);

//Add an event listener to the modal which closes the modal on a click outside of the modal
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
})
