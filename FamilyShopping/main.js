// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";

import {
    getFirestore,
    doc,
    collection,
    onSnapshot 
    } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

import {
    doesUsernameExist,
    clearData,
    loadDataFromFirebase,
    addToFirebase,
    hashPassword,
    isPasswordFitToUsername,
    checkUsernameSecretData,
    setNewPassword,
    getProductsAsList,
    getUserPasswordFromDatabase
} from "./database.js"

import {
    hideEverything,
    hideMenu,
    showMenu,
    showCartPage,
    hideDatabaseConnectionFailure
} from "./ui.js";
import { 
    language,
    getLastLanguage,
    changeLanguage,
    listTitlePrefixes
 } from "./languageHandler.js";

const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const mainPage = document.getElementById("mainPage");

// -------------------- Register Page --------------------

let currentUsername;
let currentPassword;
let currentSecretQuestion;
let currentSecretAnswer;

const registerButton = document.getElementById("registerButton");
const registerUsername = document.getElementById("registerUsername");
const registerInvalidInputText = document.getElementById("registerInvalidInputText");
const registerPassword = document.getElementById("registerPassword");
const registerSecretAnswer = document.getElementById("secretAnswer");

registerButton.onclick = async () => {
    const secretQuestionDropdown = document.getElementById('secretQuestions');
    const selectedQuestionIndex = secretQuestionDropdown.selectedIndex;
    const selectedQuestionText = secretQuestionDropdown.options[selectedQuestionIndex].text;

    const username = registerUsername.value;
    const password = registerPassword.value;
    const secretAnswer = registerSecretAnswer.value;

    let invalidInputMessages = {
        "Hebrew": {
            "usernameTaken": "שם המשתמש תפוס",
            "usernameLength": "אורך שם מינימלי - 5 תווים.",
            "passwordLength": "אורך סיסמא מינימלי - 8 תווים.",
            "passwordSpaces": "אין להכיל רווחים בסיסמא",
            "secretAnswer": "יש להכניס תשובה סודית"
        },
        "English": {
            "usernameTaken": "Username is already taken",
            "usernameLength": "Minimum username length - 5 letters.",
            "passwordLength": "Minimum password length - 8 letters.",
            "passwordSpaces": "Password cannot contain spaces",
            "secretAnswer": "Please enter a secret answer"
        }
    };
    
    if (await doesUsernameExist(username)) {
        registerInvalidInputText.innerHTML = invalidInputMessages[language]["usernameTaken"];
        registerInvalidInputText.style.display = "block";
    } else if (username.length < 5) {
        registerInvalidInputText.innerHTML = invalidInputMessages[language]["usernameLength"];
        registerInvalidInputText.style.display = "block";
    } else if (password.length < 8) {
        registerInvalidInputText.innerHTML = invalidInputMessages[language]["passwordLength"];
        registerInvalidInputText.style.display = "block";
    } else if (password.includes(' ')) {
        registerInvalidInputText.innerHTML = invalidInputMessages[language]["passwordSpaces"];
        registerInvalidInputText.style.display = "block";
    } else if (secretAnswer === "") {
        registerInvalidInputText.innerHTML = invalidInputMessages[language]["secretAnswer"];
        registerInvalidInputText.style.display = "block";
    }
    
    else {
        console.log("Registered successfully.");
        currentUsername = username;
        currentPassword = password;
        currentSecretAnswer = secretAnswer;
        currentSecretQuestion = selectedQuestionText;

        localStorage.setItem("lastActiveUsername", currentUsername);

        registerInvalidInputText.style.display = "none";
        registerInvalidInputText.innerHTML = "";

        const listTitle = document.getElementById("listTitle");
        listTitle.innerHTML = listTitlePrefixes[language] + currentUsername;        

        await addToFirebase(username)
        await clearData(username, false);

        loadDataFromFirebase(currentUsername);
        listenToUpdates();

        registerPage.style.display = "none";
        mainPage.style.display = "contents";
    }
    }

export async function getCurrentPassword() {
    try {
        if (currentPassword != undefined) {
            const hashedPassword = await hashPassword(currentPassword);
            return hashedPassword;
        }
        else { 
            return await getUserPasswordFromDatabase(currentUsername) }
    }
    catch (error) {
            console.error("Error hashing password:", error);
            return null;
        }
    }

// -------------------- Login Page ---------------

export function getCurrentUsername(){
        return currentUsername;
};
export function getDatabase() { return db; }

export function getCurrentSecretQuestion() { return currentSecretQuestion; }

export function getCurrentSecretAnswer() { return currentSecretAnswer; }

export function getMainCollectionRef() { return mainCollectionRef; }



let userJustLoggedIn = true;

const loginButton = document.getElementById("loginButton");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginInvalidInputText = document.getElementById("loginInvalidInputText");
const newUserButton = document.getElementById("newUserButton");
const saveNewPasswordButton = document.getElementById("saveNewPasswordButton");



loginButton.onclick = async () => {
    loginPage.style.visibility = "hidden";
    if (await isPasswordFitToUsername(loginPassword.value, loginUsername.value)) 
    {
        const alreadyListeningToUpdates = currentUsername === loginUsername.value;
        console.log(alreadyListeningToUpdates)
        loginPage.style.visibility = "visible";
        userJustLoggedIn = true;
        currentUsername = loginUsername.value;
        currentPassword = loginPassword.value;

        localStorage.setItem("lastActiveUsername", currentUsername);

        await showCartPage(language);

        if (!alreadyListeningToUpdates)
            listenToUpdates();
        }
    else {
        loginPage.style.visibility = "visible";
        loginInvalidInputText.style.display = "contents";
    }
}

newUserButton.onclick = () => {
    loginPage.style.display = "none";
    registerPage.style.display = "flex";
}

saveNewPasswordButton.onclick = async () => {
    const changePasswordUsername = document.getElementById("changePasswordUsername");
    const newPasswordInput = document.getElementById("newPasswordInput");
    const newPasswordInputAssurance = document.getElementById("newPasswordInputAssurance");
    const changePasswordInvalidInputText = document.getElementById("changePasswordInvalidInputText");

    const changePasswordSecretQuestionDropdown = document.getElementById("changePasswordSecretQuestion");
    const selectedQuestionIndex = changePasswordSecretQuestionDropdown.selectedIndex;
    const selectedQuestionText = changePasswordSecretQuestionDropdown.options[selectedQuestionIndex].text;
    const changePasswordSecretAnswer = document.getElementById("changePasswordSecretAnswer");

    
    let username = changePasswordUsername.value;
    let newPassword = newPasswordInput.value;
    let newPasswordAssurance = newPasswordInputAssurance.value;

    let secretQuestion = selectedQuestionText;
    let secretAnswer = changePasswordSecretAnswer.value;

    if (!(await doesUsernameExist(username))) {
        changePasswordInvalidInputText.innerHTML = "שם המשתמש אינו קיים במערכת";
        changePasswordInvalidInputText.style.display = "block";
    }
    else if (username.length < 5) {
        changePasswordInvalidInputText.innerHTML = "אורך שם מינימלי - 5 תווים."
        changePasswordInvalidInputText.style.display = "block";
    }
    else if (newPassword.length < 8){
        changePasswordInvalidInputText.innerHTML = "אורך סיסמא מינימלי - 8 תווים."
        changePasswordInvalidInputText.style.display = "block";
    }
    else if (newPassword.includes(' ')) {
        changePasswordInvalidInputText.innerHTML = "אין להכיל רווחים בסיסמא"
        changePasswordInvalidInputText.style.display = "block";
    }
    else if (newPassword !== newPasswordAssurance) {
        changePasswordInvalidInputText.innerHTML = "אישור הסיסמא אינו זהה לסיסמא החדשה"
        changePasswordInvalidInputText.style.display = "block";
    }
    else if (secretAnswer === "") {
        changePasswordInvalidInputText.innerHTML = "יש להכניס תשובה סודית"
        changePasswordInvalidInputText.style.display = "block";
    }
    else if (!(await checkUsernameSecretData(username, secretQuestion, secretAnswer))) {
        changePasswordInvalidInputText.innerHTML = "הפרטים הסודיים אינם נכונים";
        changePasswordInvalidInputText.style.display = "block";
    }
    else {
        console.log("Password was changed successfully.");

        changePasswordInvalidInputText.style.display = "none";
        changePasswordInvalidInputText.innerHTML = "";

        await setNewPassword(username, newPassword);
        hideEverything();
        loginPage.style.display = "flex";
    }

    
}
// ---------------------- Main Page ------------------

const countInput = document.getElementById("countInput");

countInput.addEventListener("input", function () {
    // Parse the input value as a number
    const inputValue = parseFloat(countInput.value);

    // Check if the input value is negative
    if (inputValue < 1) {
        // If it's negative, reset it to 1
        countInput.value = "1";
    }
});

const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");

addButton.addEventListener("click", () => {
    userJustLoggedIn = false;
    addToFirebase(currentUsername)
}
);

clearButton.addEventListener("click", () => clearData(currentUsername, true))

const firebaseConfig = {
   apiKey: "AIzaSyC3fgyWh3D1Fi5RJki7Aw3PrYFIUJvlVOo",
   authDomain: "shoptogether-e50ca.firebaseapp.com",
   projectId: "shoptogether-e50ca",
   storageBucket: "shoptogether-e50ca.appspot.com",
   messagingSenderId: "148964860706",
   appId: "1:148964860706:web:17a15c759a846882f5fb7b",
   measurementId: "G-Z7M96PYNGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const mainCollectionName = "CartsCollection";


// Reference to a Firestore collection
const mainCollectionRef = collection(db, mainCollectionName);

const menuButton = document.getElementById("menuButton");
const menuButtonImage = document.getElementById("menuButtonImage");
const menuContent = document.getElementById("menuContent");

const aboutMePage = document.getElementById("aboutMePage");
const contactPage = document.getElementById("contactPage");

const logoutButton = document.getElementById("logoutButton");
const contactButton = document.getElementById("contactButton");
const aboutMeButton = document.getElementById("aboutMeButton");
const myListButton = document.getElementById("myListButton");
const copyListButton = document.getElementById("copyListButton");

const closeListTextToCopyButton = document.getElementById("closeListTextToCopyButton");

document.body.addEventListener("click", (e) => { 
    if (e.target !== menuButtonImage) {
        menuContent.classList.add("invisible");
        if(menuContent.classList.contains("visible"))
            menuContent.classList.remove("visible");

    }
 });

contactButton.onclick = () => {
    document.body.style["background-image"] = "url(mySelfie.png)";
    hideEverything();
    contactPage.style.display = "block";
}

myListButton.onclick = async () => { 
    hideEverything();
    document.body.style["background-image"] = "url(familyShopping.jpg)";
    await showCartPage(language);
    }

aboutMeButton.onclick = () => {
    hideEverything();
    aboutMePage.style.display = "flex";
    document.body.style["background-image"] = "url(mySelfie.png)";
}

copyListButton.onclick = async () => {
    const listToCopyDiv = document.getElementById("listToCopyDiv");
    const textAreaToCopy = document.getElementById("textAreaToCopy");

    // Set the content of the element
    textAreaToCopy.textContent = (await getProductsAsList(currentUsername)).join('\n');

    // Make the element contenteditable
    textAreaToCopy.contentEditable = true;

    // Create a range and select the text
    const range = document.createRange();
    range.selectNodeContents(textAreaToCopy);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Deselect the text after a short delay (to give the user time to see the selection)
    setTimeout(() => {
        selection.removeAllRanges();
        textAreaToCopy.contentEditable = false;
    }, 1000); // Adjust the delay time as needed


    hideMenu();
    listToCopyDiv.style.visibility = "visible";

}

closeListTextToCopyButton.onclick = () => {
    const listToCopyDiv = document.getElementById("listToCopyDiv");
    listToCopyDiv.style.visibility = "hidden";
}

menuButton.onclick = () => {
    const lastActiveUsername = localStorage.getItem("lastActiveUsername");
    const myListButton = document.getElementById("myListButton");
    const copyListButton = document.getElementById("copyListButton");
    

    if (lastActiveUsername === null) {
        myListButton.style.display = "none";
        copyListButton.style.display = "none";
    }
    else {
        myListButton.style.display = "";
        copyListButton.style.display = "";
    }
    if (menuContent.classList.contains("invisible"))
        showMenu();
    else hideMenu();
}

logoutButton.onclick = () => {
    localStorage.removeItem("lastActiveUsername");
    hideEverything();
    loginPage.style.display = "flex";
    document.body.style["background-image"] = "url(familyShopping.jpg)";
}

const forgotPasswordPage = document.getElementById("forgotPasswordPage");
forgotPasswordButton.onclick = () => {
    hideEverything();
    forgotPasswordPage.style.display = "flex";
}

function listenToUpdates() {
    const userDocumentRef = doc(mainCollectionRef, currentUsername + "-cart"); // Create a reference to the user's document
    const userCartRef = collection(userDocumentRef, "Products");

    console.log("Listening to " + currentUsername);
    let loadedData = false;
    onSnapshot(userCartRef, (snapshot) => {
        console.log("userJustLoggedIn: "+userJustLoggedIn);

        snapshot.docChanges().forEach((change) => {
            console.log("Update: "+ change.type);
            if ((change.type === 'added' && !userJustLoggedIn)) {
                // Only call loadDataFromFirebase() for new additions after the initial load
                loadDataFromFirebase(currentUsername);
            }
            else if ((change.type === 'modified')) {
                // Only call loadDataFromFirebase() for new additions after the initial load
                loadDataFromFirebase(currentUsername);
            }
            else if (change.type === 'removed') {
                // Handle removed documents
                loadDataFromFirebase(currentUsername);
            }
        });

        // Mark the initial data load as complete after the first snapshot
        if (userJustLoggedIn) {
            userJustLoggedIn = false;
        }
    });
}



// --------------- Setting language


const hebrewFlag = document.getElementById("hebrewFlag");
const englishFlag = document.getElementById("englishFlag");

hebrewFlag.onclick = () => changeLanguage("English");
englishFlag.onclick = () => changeLanguage("Hebrew");

async function main() {
    const lastActiveUsername = localStorage.getItem("lastActiveUsername");
    getLastLanguage();

    if (lastActiveUsername === null) {
        hideEverything();
        loginPage.style.display = "flex";
    }
    else 
    {
        currentUsername = lastActiveUsername;
        await showCartPage(language);
        listenToUpdates();
    }
}

document.getElementById("tryAgainButton").onclick = async () => {
    hideDatabaseConnectionFailure();
    loginInvalidInputText.style.display = "none";
    registerInvalidInputText.style.display = "none";
    changePasswordInvalidInputText.style.display = "none";
    await main();
}
document.onload = await main();


