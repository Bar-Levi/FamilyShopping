import {
    getUserCollection, 
    updateCartSize, 
    incrementProductCount,
    decrementProductCount,
    markOrUnmarkProduct,
    loadDataFromFirebase
} from "./database.js";

import { 
    getCurrentUsername,
} from "./main.js";

import {
    language
} from "./languageHandler.js";

import {
    getDocs,
    deleteDoc
    } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";


export async function addNameToList(nameToAdd, productCount, productCategory, isInsideTheCart) {
    const list = document.getElementById("myList");

    let newLine = document.createElement("li");
    newLine.classList.add("productLine")
    newLine.classList.add(productCategory)
    newLine.id = "product-" + nameToAdd;

    const productDataDiv = document.createElement("div");
    productDataDiv.classList.add("productDataDiv");

    let countSpan = document.createElement("span");
    countSpan.classList.add("productCountSpan");
    countSpan.innerHTML = productCount;

    let nameSpan = document.createElement("span");
    nameSpan.classList.add("productNameSpan");
    nameSpan.innerHTML = nameToAdd;

    // --------- Plus / Minus Buttons

    const modifyingButtonsDiv = document.createElement("div");
    modifyingButtonsDiv.classList.add("modifyingButtonsDiv");

    const plusButton = document.createElement("button");
    plusButton.innerHTML = '+';
    plusButton.onclick = async () => {
        await incrementProductCount(getCurrentUsername(), nameToAdd);
    }

    const minusButton = document.createElement("button");
    minusButton.innerHTML = '-';
    minusButton.onclick = async () => {
        await decrementProductCount(getCurrentUsername(), nameToAdd);
    }

    plusButton.classList.add("modifyingButton");
    minusButton.classList.add("modifyingButton");


    modifyingButtonsDiv.appendChild(plusButton);
    modifyingButtonsDiv.appendChild(minusButton);

    // ---------

    productDataDiv.appendChild(modifyingButtonsDiv);
    productDataDiv.appendChild(countSpan);
    productDataDiv.appendChild(nameSpan);

    const productButtonsDiv = document.createElement("div");
    productButtonsDiv.classList.add("productButtonsDiv");

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("imageButton");
    let deleteImageElement = document.createElement("img");
    deleteImageElement.src = "bin.png";

    deleteButton.appendChild(deleteImageElement);
    deleteButton.onclick = async () => { 
        await removeFromFirebase(nameToAdd)
    };

    let markButton = document.createElement("button");
    markButton.classList.add("imageButton");
    let markImageElement = document.createElement("img");
    markImageElement.src = "addToCart.png";

    markButton.appendChild(markImageElement);


    let unmarkButton = document.createElement("button");
    unmarkButton.classList.add("imageButton");
    let unmarkImageElement = document.createElement("img");
    unmarkImageElement.src = "removeFromCart.png";
    unmarkButton.style.display = "none";

    unmarkButton.appendChild(unmarkImageElement);

    markButton.onclick = async () => { 
        await markOrUnmarkProduct(getCurrentUsername(), nameToAdd, true);
    }
    unmarkButton.onclick = async() => { 
        await markOrUnmarkProduct(getCurrentUsername(), nameToAdd, false);
     }


    productButtonsDiv.appendChild(unmarkButton);
    productButtonsDiv.appendChild(markButton);
    productButtonsDiv.appendChild(deleteButton);

    newLine.appendChild(productDataDiv);
    newLine.appendChild(productButtonsDiv);

    newLine.style.animation = "1s fadeAppear ease-in-out";
    if (isInsideTheCart) {
        newLine.classList.add("addedToCart");
        markButton.style.display = "none";
        unmarkButton.style.display = "";
    }
    else {
        newLine.classList.remove("addedToCart");
        markButton.style.display = "";
        unmarkButton.style.display = "none";
    }
    list.appendChild(newLine);

}

export function removeNameFromList(nameToRemove) {
    const list = document.getElementById("myList");
    const productToRemove = document.getElementById("product-"+nameToRemove);
    list.removeChild(productToRemove);
}

export function clearList() {
    console.log("clearList");
    const list = document.getElementById("myList");
    list.innerHTML = "";    
}

export async function removeFromFirebase(nameToRemove) {
    const productDeletionAlerts = {
        "Hebrew": "האם למחוק את הפריט?",
        "English": "Delete this product?"
    }
    if (!confirm(productDeletionAlerts[language]))
        return;

    try {
        const userCollection = getUserCollection(getCurrentUsername());
        const snapshot = await getDocs(userCollection);

        for (const doc of snapshot.docs) {
            if (doc.data().ProductName === nameToRemove) {
                await deleteDoc(doc.ref);
                console.log("Document successfully deleted!");
            }
        }

        await updateCartSize(getCurrentUsername());
    } catch (error) {
        console.error("Error:", error);
    }
}

export function showDatabaseConnectionFailure() {
    hideEverything();
    document.getElementById("databaseConnectionFailureDiv").style.display = "flex";
}

export function hideDatabaseConnectionFailure() {
    document.getElementById("databaseConnectionFailureDiv").style.display = "none";
}

export function hideEverything() {
    hideMenu();
    loginPage.style.display = "none";
    registerPage.style.display = "none";
    mainPage.style.display = "none";
    aboutMePage.style.display = "none";
    forgotPasswordPage.style.display = "none";
    contactPage.style.display = "none";
}

export function hideMenu() {
    console.log("Hide menu");
    menuContent.classList.add("invisible");
    if(menuContent.classList.contains("visible"))
        menuContent.classList.remove("visible");
    setTimeout(() => {  // Give 300 milliseconds for the disapperaing animation to finish.
        menuContent.style.display = "none";
    }, 300);
}

export function showMenu() {
    console.log("Show menu");
    menuContent.style.display = "flex"; // Program starts with "none"
    menuContent.classList.add("visible");
    if(menuContent.classList.contains("invisible"))
        menuContent.classList.remove("invisible");
}

export async function showCartPage(language) {
    const listTitlePrefixes = {
        "Hebrew": "רשימת הקניות של ",
        "English": "Shopping List of "
    }
    
    const listTitle = document.getElementById("listTitle");
    listTitle.innerHTML = listTitlePrefixes[language] + getCurrentUsername();   

    loginPage.style.display = "none";
    mainPage.style.display = "contents";
    loginInvalidInputText.style.display = "none";

    console.log("showCartPage")
    await loadDataFromFirebase(getCurrentUsername());
}