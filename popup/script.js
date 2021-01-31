class Cookie {
    constructor(numDays, cname, cvalue) {
        this.numDays = numDays;
        this.name = cname;
        this.value = cvalue;
    }
    setCookie = () => {
        const d = new Date();
        d.setTime(d.getTime() + (this.numDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = this.name + "=" + this.value + ";" + expires + ";path=/";
    }
    eraseCookie = () => {
        this.value = ""
        this.numDays = -1
        this.setCookie();
    }
    eraseCookies = () => {
        const cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            this.eraseCookie(cookies[i].split("=")[0]);
        }
    }
    getCookie = () => {
        const name = this.name + "=";
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
    checkCookie = () => {
        const user = this.getCookie();
        if (user != "") { return true } //if cookie is set, return true
        else { return false } //if cookie is not set, return false
    }
    printCookie = () => {
        console.log("Cookie Debug Log", "\nName", this.name, "\nValue:", this.value, "\nExpiration Days:", this.numDays)
    }
}

//Initial amount of time in ms before the popup becomes visible
const initialDelay = 2000;

const myCookie = new Cookie(25, "username", "user");

// Method to close the modal
const closeModal = () => {
    modal.style.display = "none";
    myCookie.setCookie()
}
// Get the modal
const modal = document.querySelector("#emma-utils-modal");

// Get the close button
const closeBtn = document.querySelector(".modal-close");

const eraseBtn = document.querySelector('.erase-button');

eraseBtn.addEventListener('click', myCookie.eraseCookies)
//Add an event listener to the window which waits initialDelay ms before triggering the modal
window.addEventListener('load', () => {
    if (!myCookie.checkCookie()) {
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
