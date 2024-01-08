import {
    collection,
    doc,
    getDocs,
    getDoc,
    orderBy,
    query,
    setDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    getCountFromServer
    } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

import {
    addNameToList,
    clearList,
    showDatabaseConnectionFailure
} from "./ui.js"

import { 
    getMainCollectionRef,
    getCurrentPassword,
    getCurrentUsername,
    getCurrentSecretQuestion,
    getCurrentSecretAnswer,
} from "./main.js";

import {
    language
} from "./languageHandler.js";

export async function isPasswordFitToUsername(password, username) {
    async function returnResult(passwordToCheck, usernameToCheck) {
        try {
            const snapshot = await getDocs(getMainCollectionRef());
            for (const doc of snapshot.docs) {
                if (doc.data().Username === "משפחת סאגה")
                    console.log(doc.data().Password,"\n\n\n",await hashPassword(passwordToCheck))
                if (doc.data().Username === usernameToCheck && doc.data().Password === await hashPassword(passwordToCheck)) {
                    return true; // Username found, return true
                }
            }
            return false; // Username not found, return false
        } catch (error) {
            showDatabaseConnectionFailure();
            console.error("Error getting documents: ", error);
            return false; // Handle the error and return false
        }
    }
    try {
        const result = await returnResult(password, username);
        return result;
    } catch (error) {
        showDatabaseConnectionFailure();
        console.error("Error:", error);
        return false; // Handle the error and return false
    }
}

export async function doesUsernameExist(username) {
    async function returnResult(usernameToCheck) {
        try {
            const snapshot = await getDocs(getMainCollectionRef());
            for (const doc of snapshot.docs) {
                if (doc.data().Username === usernameToCheck) {
                    return true; // Username found, return true
                }
            }
            return false; // Username not found, return false
        } catch (error) {
            showDatabaseConnectionFailure();
            console.error("Error getting documents: ", error);
            return false; // Handle the error and return false
        }
    }
    try {
        const result = await returnResult(username);
        return result;
    } catch (error) {
        showDatabaseConnectionFailure();
        console.error("Error:", error);
        return false; // Handle the error and return false
    }
}

export async function clearData(username, withAsking) {
    const listDeletionAlerts = {
        "Hebrew": "האם למחוק את הרשימה?",
        "English": "Delete this list?"
    }
    if (withAsking && !confirm(listDeletionAlerts[language]))
        return;

    // Find the document with the item to remove
    await getDocs(getUserCollection(username))
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                deleteDoc(doc.ref)
                    .then(() => {
                        console.log("Document successfully deleted!");
                    })
                    .catch((error) => {
                        showDatabaseConnectionFailure();
                        console.error("Error deleting document: ", error);
                    });
            });
            const inputBox = document.getElementById("input"); // Assuming you have an input field for the item to remove
        inputBox.value = ""; // Clear the input field after removal
        clearList();
        console.log("\n"+getCurrentUsername() + " cleared his data.\n")
        })
        .catch((error) => {
            showDatabaseConnectionFailure();
            console.error("Error getting documents: ", error);
        });
}

export function getUserCollection(username) {
    const userDocumentRef = doc(getMainCollectionRef(), username + "-cart");
    // Access the subcollection directly from the user document reference
    const subcollectionRef = collection(userDocumentRef, "Products"); // Replace "subcollectionName" with the actual subcollection name
    return subcollectionRef;
}

export async function getProductsAsList(username) {
    try {
        const collection = getUserCollection(username);
        const q = query(collection, orderBy('ProductCategory', 'asc'));
        const querySnapshot = await getDocs(q);
        const items = [];

        querySnapshot.forEach((doc) => {
            const itemData = doc.data();
            items.push((itemData.ProductCount || '1') + ' ' + itemData.ProductName); // Assuming "ProductName" is the field you want to extract
        });

        return items;
    } 
    catch (error) {
        showDatabaseConnectionFailure();
        console.error("Error getting items from user's subcollection:", error);
        return [];
    }

}

export async function loadDataFromFirebase(username) {
    console.log("loadDataFromFirebase");

    clearList();

    const subcollectionRef = getUserCollection(username);
    const orderedSubcollection = query(subcollectionRef, orderBy('ProductCategory', 'asc'));
    // Query the subcollection for documents
    await getDocs(orderedSubcollection)
        .then((snapshot) => {
            snapshot.forEach(async (doc) => {
                // doc.data() is the data of the document
                await addNameToList(doc.data().ProductName, doc.data().ProductCount || '1', doc.data().ProductCategory, doc.data().isInsideTheCart);
            });
        })
        .catch((error) => {
            showDatabaseConnectionFailure();
            console.error("Error getting subcollection documents: ", error);
        });
}


export async function markOrUnmarkProduct(username, productName, isInsideTheCart) {
    try {
        const userCollection = getUserCollection(username);
        const querySnapshot = await getDocs(userCollection);

        // Find the document with the matching product name
        for (const doc of querySnapshot.docs) {
            if (doc.data().ProductName === productName) {
                // Update the count in Firebase
                await updateDoc(doc.ref, { isInsideTheCart: isInsideTheCart});
                return;
            }
        }
        console.log(`${productName} not found in the collection.`);
    } catch (error) {
        showDatabaseConnectionFailure();
        console.error(error);
    }
}

export async function incrementProductCount(username, productName) {
    try {
        const userCollection = getUserCollection(username);
        const querySnapshot = await getDocs(userCollection);

        // Find the document with the matching product name
        for (const doc of querySnapshot.docs) {
            if (doc.data().ProductName === productName) {
                // Get the current count
                const currentCount = doc.data().ProductCount || 1;

                // Increment the count by 1
                const newCount = parseInt(currentCount) + 1;

                // Update the count in Firebase
                await updateDoc(doc.ref, { ProductCount: newCount });

                console.log(`Incremented count for ${productName} to ${newCount}`);

                return;
            }
        }
        console.log(`${productName} not found in the collection.`);
    } catch (error) {
        showDatabaseConnectionFailure();
        console.error("Error incrementing product count:", error);
    }
}

export async function decrementProductCount(username, productName) {
    try {
        const userCollection = getUserCollection(username);
        const querySnapshot = await getDocs(userCollection);

        // Find the document with the matching product name
        for (const doc of querySnapshot.docs) {
            if (doc.data().ProductName === productName) {
                // Get the current count
                const currentCount = doc.data().ProductCount || 0;

                // Ensure the count doesn't go below 1
                if (currentCount > 1) {
                    // Decrement the count by 1
                    const newCount = parseInt(currentCount) - 1;

                    // Update the count in Firebase
                    await updateDoc(doc.ref, { ProductCount: newCount });

                    console.log(`Decremented count for ${productName} to ${newCount}`);
                } else {
                    console.log(`${productName} count is already at the minimum of 1. No change.`);
                }
                return;
            }
        }

        console.log(`${productName} not found in the collection.`);
    } catch (error) {
        showDatabaseConnectionFailure();
        console.error("Error decrementing product count:", error);
    }
}

export async function addToFirebase(username) {
    console.log("addToFirebase");

    const countInput = document.getElementById("countInput");
    const newProductCount = countInput.value;
    const inputBox = document.getElementById("input");
    const newProductName = inputBox.value.trim(); // Trim whitespace from input
    inputBox.value = "";

    const categoryInput = document.getElementById("category");
    const productCategory = categoryInput.value || "zz_otherCategory";

    if (!document.getElementById("product-"+newProductName)) {
        // If the item is not a duplicate, add it to the collection
        await addProductToUserCollection(username, newProductName, newProductCount, productCategory);
    } 
    else {
        console.log("Item already exists in the list.");
    }
}

export async function getUserPasswordFromDatabase(username) {
    const cartDocumentName = username + "-cart";

    // Reference to the user's cart document in the main collection
    const cartDocumentRef = doc(getMainCollectionRef(), cartDocumentName);

    const cartDocumentSnapshot = await getDoc(cartDocumentRef); // Fetch the document
    return cartDocumentSnapshot.data().Password;
}

export async function updateCartSize(username) {
    const cartDocumentName = username + "-cart";

    // Reference to the user's cart document in the main collection
    const cartDocumentRef = doc(getMainCollectionRef(), cartDocumentName);

    // Data to set in the user's cart document

    const userProducts = collection(cartDocumentRef, "Products");
    const userProductsSnapshot = await getCountFromServer(userProducts);
    const cartSize = userProductsSnapshot.data().count;

    let cartDocumentData;
    
    cartDocumentData = {
        CartSize: cartSize
    };
    
    try {
        // Create or update the user's cart document in the main collection
        await setDoc(cartDocumentRef, cartDocumentData, { merge: true });
        console.log("CartSize: "+ cartSize);

        
    }
    catch(error) { console.log(error); }
}

export async function addProductToUserCollection(username, productName, productCount, productCategory) {
    const cartDocumentName = username + "-cart";

    // Reference to the user's cart document in the main collection
    const cartDocumentRef = doc(getMainCollectionRef(), cartDocumentName);

    // Data to set in the user's cart document

    const userProducts = collection(cartDocumentRef, "Products");

    let cartDocumentData;
    if (getCurrentSecretQuestion() !== undefined) {
        cartDocumentData = {
            Username: username,
            Password: await getCurrentPassword() !== await hashPassword(undefined) ? await getCurrentPassword() : await getUserPasswordFromDatabase(username),
            SecretQuestion: getCurrentSecretQuestion(),
            SecretAnswer: getCurrentSecretAnswer(),
        };
    } 
    else {
        cartDocumentData = {
            Username: username,
            Password: await getCurrentPassword() !== await hashPassword(undefined) ? await getCurrentPassword() : await getUserPasswordFromDatabase(username),
        };
    }

    try {
        console.log(cartDocumentData);
        // Create or update the user's cart document in the main collection
        await setDoc(cartDocumentRef, cartDocumentData, { merge: true });

        // Reference to the subcollection under the user's cart document
        // Data for the new product document
        const newProductObject = {
            ProductName: productName,
            ProductCount: productCount,
            ProductCategory: productCategory,
        };

        // Add the product document to the subcollection
        await addDoc(userProducts, newProductObject);

        updateCartSize(username);
        console.log("Product added to user's cart");
    } catch (error) {
        showDatabaseConnectionFailure();
        console.error("Error adding product to user's cart:", error);
    }
}

// Function to hash a password using the Web Crypto API
export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    const extraHashing = hashHex.split('').reverse().join('');
    return extraHashing;
}

export async function setNewPassword(username, newPassword) {
    console.log("new Password: "+ newPassword);
    console.log("hashed new Password: "+ await hashPassword(newPassword));

    const cartDocumentName = username + "-cart";
    const cartDocumentRef = doc(getMainCollectionRef(), cartDocumentName);

    const cartDocumentSnapshot = await getDoc(cartDocumentRef);

    await updateDoc(cartDocumentRef, {
        Password: await hashPassword(newPassword)
    });
}

export async function checkUsernameSecretData(username, secretQuestion, secretAnswer) {
    try {

        console.log(secretAnswer, secretQuestion)
        // Reference the user's cart document in the main collection
        const cartDocumentName = username + "-cart";
        const cartDocumentRef = doc(getMainCollectionRef(), cartDocumentName);

        const cartDocumentSnapshot = await getDoc(cartDocumentRef); // Fetch the document

        const originalSecretQuestion = cartDocumentSnapshot.data().SecretQuestion;
        const originalSecretAnswer = cartDocumentSnapshot.data().SecretAnswer;

        // Check if the cart document exists
        if (cartDocumentSnapshot.exists()) {
            // Get the data from the cart document
            // Check if the secret question and answer match
            if (
                originalSecretQuestion === secretQuestion &&
                originalSecretAnswer === secretAnswer
            ) {
                return true; // Match found
            }
        }

        return false; // No match found or cart document doesn't exist
    } catch (error) {
        showDatabaseConnectionFailure();
        console.error("Error checking secret data:", error);
        return false; // Handle any errors and return false
    }
}