import {
    getCurrentUsername
} from "./main.js";

export let language;

const textDirections = {
    "Hebrew": "rtl",
    "English": "ltr"
}

const textAligns = {
    "Hebrew": "right",
    "English": "left"
}

const secretQuestions = {
    "Hebrew" : [
        "מהו שם העיר בה גרת בילדותך?",
        "מהו שמו של בן/בת הזוג שלך?",
        "מהו שם המורה האהוב עליך מבית הספר היסודי?",
        "מהו שם הספר האהוב עליך?",
        "מהו שם המסעדה האהובה עליך?",
        "מהו שם המדינה הראשונה בה ביקרת בחו\"ל?",
        "מהו שם הסרט האהוב עליך?",
        "איזה סוג של מכונית ברצונך לרכוש בעתיד?",
        "מהו שם חית הבית הראשונה שהייתה ברשותך?",
        "באיזה מקום בעולם תמיד חלמת לבקר?" 
    ],
    "English" : [
        "What is the name of the city where you grew up as a child?",
        "What is the name of your spouse/partner?",
        "What is the name of your favorite teacher from elementary school?",
        "What is the name of your favorite book?",
        "What is the name of your favorite restaurant?",
        "What is the name of the first country you visited abroad?",
        "What is the name of your favorite movie?",
        "What type of car do you want to buy in the future?",
        "What is the name of your first pet?",
        "Which place in the world have you always dreamed of visiting?"
    ]
};

const menuTextContent = {
    "Hebrew": {
        logoutButton: "התנתק",
        contactButton: "צור קשר",
        aboutMeButton: "אודות",
        myListButton: "הצג רשימה",
        copyListButton: "העתק רשימה"
    },
    "English": {
        logoutButton: "Logout",
        contactButton: "Contact Me",
        aboutMeButton: "About Me",
        myListButton: "View List",
        copyListButton: "Copy List"
    }
};

export const listTitlePrefixes = {
    "Hebrew": "רשימת הקניות של ",
    "English": "Shopping List of "
}

const loginPageTextContent = {
    "Hebrew": {
        title: "ברוך הבא!",
        usernamePlaceholder: "שם משתמש:",
        passwordPlaceholder: "סיסמה:",
        loginButton: "התחבר",
        forgotPasswordButton: "שכחתי סיסמה",
        newUserButton: "אין לי חשבון",
        invalidInputText: "פרטים שגויים, נסה שוב."
    },
    "English": {
        title: "Welcome!",
        usernamePlaceholder: "Username:",
        passwordPlaceholder: "Password:",
        loginButton: "Login",
        forgotPasswordButton: "Forgot Password",
        newUserButton: "I don't have an account",
        invalidInputText: "Wrong details, try again."
    }
};

const registerPageTextContent = {
    "Hebrew": {
        title: "צור חשבון חדש!",
        usernamePlaceholder: "שם משתמש:",
        passwordPlaceholder: "סיסמה:",
        buttonText: "הרשם"
    },
    "English": {
        title: "Create your account!",
        usernamePlaceholder: "Username:",
        passwordPlaceholder: "Password:",
        buttonText: "Register"
    }
};

const secretDivTextContent = {
    "Hebrew": {
        secretQuestionLabel: "שאלה סודית:",
        secretAnswerLabel: "תשובה סודית:"
    },
    "English": {
        secretQuestionLabel: "Secret question:",
        secretAnswerLabel: "Secret answer:"
    }
};

const forgotPasswordPageTextContent = {
    "Hebrew": {
        // Labels and placeholders in Hebrew
        titleLabel: "שינוי סיסמא:",
        usernamePlaceholder: "שם משתמש:",
        newPasswordPlaceholder: "סיסמא חדשה:",
        newPasswordAssurancePlaceholder: "אישור סיסמא:",
        secretQuestionLabel: "שאלה סודית:",
        secretAnswerLabel: "תשובה לשאלה:",
        secretAnswerPlaceholder: "תשובה לשאלה:",
        saveButtonLabel: "שנה סיסמא",
        invalidInputLabel: "פרטים שגויים, נסה שוב."
    },
    "English": {
        // Labels and placeholders in English
        titleLabel: "Change Password:",
        usernamePlaceholder: "Username:",
        newPasswordPlaceholder: "New Password:",
        newPasswordAssurancePlaceholder: "Confirm Password:",
        secretQuestionLabel: "Secret Question:",
        secretAnswerLabel: "Answer to the question:",
        secretAnswerPlaceholder: "Answer to the question:",
        saveButtonLabel: "Save New Password",
        invalidInputLabel: "Wrong details, try again."
    }
};

const mainPageTextContent = {
    "Hebrew": {
        quantityPlaceholder: "כמות:",
        productNamePlaceholder: "שם המוצר:",
        addButton: "הוסף",
        clearButton: "נקה"
    },
    "English": {
        quantityPlaceholder: "Quantity:",
        productNamePlaceholder: "Product Name:",
        addButton: "Add",
        clearButton: "Clear"
    }
};

const productsTranslation = {
    "Hebrew": [
        // Fruits
        "אגסים",
        "אפרסקים",
        "שזיפים",
        "תפוח עץ",
        "בננות",
        "אבטיח",
        "מלון",
        "אננס",
        "ענבים",
        "תותים",
        "לימונים",
        "תפוזים",
        "קלמנטינות",
        "בצל לבן",
        "בצל סגול",
        "בצל ירוק",
        "מלפפונים",
        "עגבניות",
        "עגבניות שרי",
        "גזר",
        "תירס",
        "קישוא",
        "שום",
        "חסה",
        "ברוקולי",
        "כרוב",
        "כרובית",
        "פטריות",
        "פלפל-גמבה",
        "חצילים",
        "אבוקדו",
        "תפוח אדמה",
        "בטטה",
        "דלעת",
        "שומר",
        "קולורבי",
        "סלרי",
        "עלי רוקט",
        "עלי תרד",
        "פטרוזיליה",
        "כוסברה",
        "שמיר",
        "נענע",
        "בזיליקום",
        "רסק עגבניות",
        // Vegetables
        "תירס גמדי",
        "שעועית",
        "זיתים",
        "טונה",
        "מלפפון חמוץ",
        "גרגירי חומוס",
        "חזה עוף",
        "פרגיות",
        "עוף - שוקיים",
        "עוף - ירכיים",
        "עוף - כנפיים",
        "בשר טחון",
        "בשר בקר",
        "לבבות",
        "נקניקיות",
        "קבב",
        "המבורגר",
        "פסטה",
        "אורז",
        "פתיתים",
        "איטריות",
        "בורגול/קוסקוס",
        "לחם",
        "לחם קל",
        "פיתות",
        "קליליות",
        "פריכיות אורז",
        "פריכיות תירס",
        "פירורי לחם",
        "פופקורן למיקרו",
        "מלח",
        "סוכר",
        "קמח",
        "קפה שחור",
        "נס קפה",
        "נס קפה מגורען",
        "שוקולית",
        "קורנפלקס",
        "מרק עוף",
        "עוגות/עוגיות",
        "פיצוחים",
        "חטיפים מלוחים",
        "שוקולדים טעימים",
        "תבלינים - פפריקה מתוקה",
        "תבלינים - פפריקה חריפה",
        "תבלינים - אבקת שום",
        "אבקת אפייה",
        "שוקולד מריר",
        "שוקולד חלב",
        "שוקולד למריחה",
        "תבלינים - מלח",
        "תבלינים - פלפל שחור",
        "תבלינים - גריל עוף",
        "תבלינים - פלפל לבן",
        "מים מינרליים",
        "שתייה קלה - קולה",
        "שתייה קלה - קולה זירו",
        "שתייה קלה - ספרייט",
        "ויטמינצ׳יק בטעם פטל",
        "שתייה חריפה - יין",
        "בירות",
        "וודקה",
        "שניצל",
        "שניצל תירס",
        "ביצים",
        "חלות לשבת",
        "כוסות חד פעמיות",
        // Household Items
        "שמן זית",
        "שמן רגיל",
        "תרסיס שמן",
        "רוטב בלסמי",
        "חומץ",
        "פיצוחים",
        "חטיפים מלוחים",
        "שתייה נלווית לאלכוהול - רד בולים",
        "שתייה נלווית לאלכוהול - מיץ חמוציות",
        "שתייה נלווית לאלכוהול - מיץ אשכוליות",
        "שמן זית",
        "שמן רגיל",
        "תרסיס שמן",
        "רוטב בלסמי",
        "חומץ",
        "מוצרי ניקיון וחד פעמי",
        "אקונומיקה",
        "סבון לריצפה",
        "סמרטוט רצפה רב פעמי",
        "סמרטוט רצפה חד פעמי",
        "ספריי ניקוי לחלונות",
        "ספריי לניקוי אבנית",
        "מטהר אוויר לשירותים",
        "אבקת כביסה",
        "מרכך כביסה",
        "שקיות זבל",
        "שקיות קטנות לסנדוויצ'ים",
        "סבון כלים",
        "ספוג לכלים",
        "סמרטוטים קטנים למטבח",
        "כחול לשירותים",
        "נייר טואלט",
        "נייר סופג",
        "מגבונים לחים",
        "אבקה למדיח",
        "ניילון נצמד",
        "נייר אפייה",
        "תבניות אפייה חד פעמיות"
    ],
    "English": [
        // Fruits
        "Pears",
        "Peaches",
        "Plums",
        "Apple",
        "Bananas",
        "Watermelon",
        "Melon",
        "Pineapple",
        "Grapes",
        "Strawberries",
        "Lemons",
        "Oranges",
        "Clementines",
        "White Onions",
        "Purple Onions",
        "Green Onions",
        "Cucumbers",
        "Tomatoes",
        "Cherry Tomatoes",
        "Carrots",
        "Squash",
        "Zucchini",
        "Garlic",
        "Lettuce",
        "Broccoli",
        "Cabbage",
        "Cauliflower",
        "Mushrooms",
        "Bell Peppers",
        "Eggplants",
        "Avocado",
        "Potatoes",
        "Beets",
        "Sweet Potatoes",
        "Celery",
        "Rocket Leaves",
        "Tarragon Leaves",
        "Parsley",
        "Cilantro",
        "Dill",
        "Basil",
        "Tomato Sauce",
        // Vegetables
        "Mini Corn",
        "Green Beans",
        "Olives",
        "Tuna",
        "Pickled Cucumber",
        "Chickpeas",
        "Chicken Breast",
        "Strawberries",
        "Chicken Thighs",
        "Chicken Wings",
        "Ground Beef",
        "Beef",
        "Livers",
        "Sausages",
        "Kebab",
        "Hamburger",
        "Pasta",
        "Rice",
        "Noodles",
        "Tortellini",
        "Bulgur/Couscous",
        "Bread",
        "Light Bread",
        "Pitas",
        "Crackers",
        "Rice Cakes",
        "Bread Crumbs",
        "Microwave Popcorn",
        "Salt",
        "Sugar",
        "Flour",
        "Black Coffee",
        "Instant Coffee",
        "Decaffeinated Coffee",
        "Cocoa",
        "Cornflakes",
        "Chicken Soup",
        "Cakes/Cookies",
        "Nuts",
        "Salty Snacks",
        "Tasty Chocolates",
        "Spices - Sweet Paprika",
        "Spices - Hot Paprika",
        "Spices - Garlic Powder",
        "Baking Powder",
        "Dark Chocolate",
        "Milk Chocolate",
        "Chocolate Spread",
        "Spices - Salt",
        "Spices - Black Pepper",
        "Spices - Chicken Grill",
        "Spices - White Pepper",
        "Mineral Water",
        "Light Drink - Cola",
        "Light Drink - Zero Cola",
        "Light Drink - Sprite",
        "Vitamin Water - Peach Flavor",
        "Spicy Drink - Wine",
        "Beers",
        "Vodka",
        "Schnitzel",
        "Schnitzel - Turkey",
        "Eggs",
        "Challah",
        "Disposable Cups",
        // Household Items
        "Olive Oil",
        "Regular Oil",
        "Oil Spray",
        "Balsamic Sauce",
        "Vinegar",
        "Crackers",
        "Salty Snacks",
        "Alcoholic Mixer - Red Bull",
        "Alcoholic Mixer - Lemonade",
        "Alcoholic Mixer - Cranberry Juice",
        "Olive Oil",
        "Regular Oil",
        "Oil Spray",
        "Balsamic Sauce",
        "Vinegar",
        "Cleaning and Disposable Products",
        "Economical",
        "Floor Soap",
        "Multi-Use Floor Wipes",
        "Single-Use Floor Wipes",
        "Window Cleaning Spray",
        "Stone Cleaning Spray",
        "Toilet Air Freshener",
        "Laundry Detergent",
        "Fabric Softener",
        "Garbage Bags",
        "Small Sandwich Bags",
        "Dish Soap",
        "Dish Sponge",
        "Small Kitchen Sponges",
        "Bleach for Toilets",
        "Toilet Paper",
        "Paper Towels",
        "Wet Wipes",
        "Laundry Powder",
        "Laundry Stain Remover",
        "Cling Wrap",
        "Baking Paper",
        "Disposable Baking Trays",
        "Dishwasher Detergent",
        "Aluminum Foil",
        "Baking Soda",
        "Oven Cleaner" 
    ]
    
};

const productCategories = {
    "Hebrew": [
        "קטגוריה:",
        "ירקות",
        "פירות",
        "בשר",
        "דגים",
        "מוצרי חלב",
        "דגנים",
        "שתייה",
        "ממרחים ורטבים",
        "ממתקים וחטיפים",
        "מאפים",
        "קפואים",
        "קופסאות שימורים",
        "מוצרי ניקיון",
        "מוצרי כביסה",
        "כלי בית",
        "טואלטיקה והגיינה",
        "קטניות",
        "תבלינים",
        "אחר"
    ],
    "English": [
        "Category:",
        "Vegetables",
        "Fruits",
        "Meat",
        "Fish",
        "Dairy Products",
        "Grains",
        "Beverages",
        "Spreads and Sauces",
        "Snacks and Sweets",
        "Bakery",
        "Frozen",
        "Canned Goods",
        "Cleaning Products",
        "Laundry Products",
        "Kitchen Supplies",
        "Toiletries and Hygiene",
        "Small Appliances",
        "Spices",
        "Other"
    ]
};

const databaseConnectionErrorContent = {
    "Hebrew": {
        messageContent: "החיבור לשרת נכשל.<br>נא לוודא את יציבות החיבור לאינטרנט ולנסות שוב.",
        buttonContent: "נסה שוב"
    },
    "English": {
        messageContent: "The connection to the server has failed.<br>Please verify your internet connection and try again.",
        buttonContent: "Try again"
    }
}


function setProductsSuggestions(language) {
    const datalist = document.getElementById("products"); // Replace with the ID of your datalistw
    const optionElements = datalist.querySelectorAll("option");

    // Define translation dictionaries for each language
    

    // Get the appropriate translation array based on the selected language
    const translationArray = productsTranslation[language];

    if (!translationArray) {
        // Handle the case when the selected language is not found in translations
        console.error("Translation not available for the selected language");
        return;
    }

    // Iterate through option elements and set their innerHTML to the translated value
    optionElements.forEach((option, index) => {
        if (index < translationArray.length) {
            option.value = translationArray[index];
        } else {
            // Handle the case when there's no translation available for an option
            console.error(`Translation missing for option ${index + 1}`);
        }
    });
}

function setProductCategories(language) {
    const selectCategory = document.getElementById("category");
    const optionElements = selectCategory.querySelectorAll("option");
    
    optionElements.forEach((option, index) => {
        option.innerHTML = productCategories[language][index];
    });

}

function setMenu(language) {
    logoutButton.innerHTML = menuTextContent[language].logoutButton;
    contactButton.innerHTML = menuTextContent[language].contactButton;
    aboutMeButton.innerHTML = menuTextContent[language].aboutMeButton;
    myListButton.innerHTML = menuTextContent[language].myListButton;
    copyListButton.innerHTML = menuTextContent[language].copyListButton;
}

function setLoginPage(language) {
    loginPage.style.direction = textDirections[language];
    loginTitle.innerHTML = loginPageTextContent[language].title;
    loginUsername.placeholder = loginPageTextContent[language].usernamePlaceholder;
    loginPassword.placeholder = loginPageTextContent[language].passwordPlaceholder;
    loginButton.innerHTML = loginPageTextContent[language].loginButton;
    forgotPasswordButton.innerHTML = loginPageTextContent[language].forgotPasswordButton;
    newUserButton.innerHTML = loginPageTextContent[language].newUserButton;
    loginInvalidInputText.innerHTML = loginPageTextContent[language].invalidInputText;
}

function setRegisterPage(language) {
        registerPage.style.direction = textDirections[language];
        registerTitle.innerHTML = registerPageTextContent[language].title;
        registerUsername.placeholder = registerPageTextContent[language].usernamePlaceholder;
        registerPassword.placeholder = registerPageTextContent[language].passwordPlaceholder;
        registerButton.innerHTML = registerPageTextContent[language].buttonText;
        setSecretDiv(language);
}

function setSecretDiv(language) {
    const selectQuestions = document.getElementById("secretQuestions");
    const optionElements = selectQuestions.querySelectorAll("option");
    
    optionElements.forEach((option, index) => {
        option.innerHTML = secretQuestions[language][index];
    });

    const secretQuestionLabel = document.getElementById("secretQuestionLabel");
    secretQuestionLabel.innerHTML = secretDivTextContent[language].secretQuestionLabel;

    const secretAnswer = document.getElementById("secretAnswer");
    secretAnswer.placeholder = secretDivTextContent[language].secretAnswerLabel;

    const secretAnswerLabel = document.getElementById("secretAnswerLabel");
    secretAnswerLabel.innerHTML = secretDivTextContent[language].secretAnswerLabel;
}

function setForgotPasswordPage(language) {
    forgotPasswordPage.style.direction = textDirections[language];
    
    const titleLabel = document.getElementById("forgotPasswordTitle");
    titleLabel.innerHTML = forgotPasswordPageTextContent[language].titleLabel;

    const changePasswordUsername = document.getElementById("changePasswordUsername");
    changePasswordUsername.placeholder = forgotPasswordPageTextContent[language].usernamePlaceholder;

    const newPasswordInput = document.getElementById("newPasswordInput");
    newPasswordInput.placeholder = forgotPasswordPageTextContent[language].newPasswordPlaceholder;

    const newPasswordInputAssurance = document.getElementById("newPasswordInputAssurance");
    newPasswordInputAssurance.placeholder = forgotPasswordPageTextContent[language].newPasswordAssurancePlaceholder;

    const secretQuestionLabel = document.querySelector("label[for='changePasswordSecretQuestion']");
    secretQuestionLabel.innerHTML = forgotPasswordPageTextContent[language].secretQuestionLabel;

    const selectQuestions = document.getElementById("changePasswordSecretQuestion");
    const optionElements = selectQuestions.querySelectorAll("option");
    
    optionElements.forEach((option, index) => {
        option.innerHTML = secretQuestions[language][index];
    });

    const secretAnswerLabel = document.querySelector("label[for='changePasswordSecretAnswer']");
    secretAnswerLabel.innerHTML = forgotPasswordPageTextContent[language].secretAnswerLabel;

    const changePasswordSecretAnswer = document.getElementById("changePasswordSecretAnswer");
    changePasswordSecretAnswer.placeholder = forgotPasswordPageTextContent[language].secretAnswerPlaceholder;

    const saveNewPasswordButton = document.getElementById("saveNewPasswordButton");
    saveNewPasswordButton.innerHTML = forgotPasswordPageTextContent[language].saveButtonLabel;

    const changePasswordInvalidInputText = document.getElementById("changePasswordInvalidInputText");
    changePasswordInvalidInputText.innerHTML = forgotPasswordPageTextContent[language].invalidInputLabel;
}

function setMainPage(language) {
    const backgroundDirections = {
        "Hebrew": "right",
        "English": "Left"
    }
    mainPage.style.direction = textDirections[language];
    document.getElementById("myList").style.direction = textDirections[language];
    const translation = mainPageTextContent[language];

    // Update the content of the main page elements based on the selected language
    document.getElementById("countInput").placeholder = translation.quantityPlaceholder;
    document.getElementById("input").placeholder = translation.productNamePlaceholder;
    document.getElementById("addButton").textContent = translation.addButton;
    document.getElementById("clearButton").textContent = translation.clearButton;

    setProductCategories(language);
    setProductsSuggestions(language);
    refreshMainPageTitle(language);

    document.getElementById("myList").style.setProperty("--gradient-direction", backgroundDirections[language]);
}

function refreshMainPageTitle(language) {
    document.getElementById("listTitle").innerHTML = listTitlePrefixes[language] + getCurrentUsername();
}

function setlistToCopyDiv(language) {
    document.getElementById("listToCopyDiv").style.direction = textDirections[language];
    const translations = {
        "Hebrew": {
            closeButtonText: "סגור",
            listHeaderText: "רשימה להעתקה"
        },
        "English": {
            closeButtonText: "Close",
            listHeaderText: "Copy List"
        }
    };

    const closeButton = document.getElementById("closeListTextToCopyButton");
    const listHeader = document.querySelector("#textDiv span");

    if (translations[language]) {
        closeButton.textContent = translations[language].closeButtonText;
        listHeader.textContent = translations[language].listHeaderText;
    }
}

function setAboutMePage(language) {
    aboutMePage.style.direction = textDirections[language];
    aboutMePage.style.textAlign = textAligns[language];
    const translations = {
        "Hebrew": {
            aboutTitle: "אודות",
            hello: "שלום לכולכם! 👋🏼",
            myName: "השם שלי הוא בר לוי, ואני סטודנט שנה שלישית להנדסת תוכנה במכללת SCE באשדוד 👨🏼‍🎓.",
            programmingLanguages: "אני בקיא בשפות תכנות רבות כגון:<br> C, C++, Python ו-Java,<br> ובחודשים האחרונים התחלתי ללמוד באופן עצמאי טכנולוגיות Web כגון:<br>HTML5, CSS3 ו-JavaSript,<br>אשר באמצעותן בניתי את האתר הזה.",
            ambitious: "אני שאפתן מאוד ותמיד חושב כיצד אפשר להשתמש בידע שיש לי כדי לעזור לאחרים, וכך חשבתי לבנות את האתר הזה 🤔",
            projects: 'אתר זה הינו פרוייקט אחד מתוך פרוייקטים רבים שבניתי, בהם אפשר לצפות <a href="https://bar-levi-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">בקישור הזה 🚀</a>',
            jobSeeking: "אני מחפש כרגע משרה חלקית בתחום הפיתוח Frontend/Backend, אשמח בבקשה לחיבורים עם האנשים הרלוונטיים 🕵️‍♂️",
            contact: 'מוזמנים ליצור איתי קשר דרך <a href="https://www.linkedin.com/in/bar-levi-software-developer/">פרופיל הלינקדין שלי</a>, ואם תגידו שהגעתם דרך האתר זה אפילו יהיה עוד יותר מגניב 😉',
            viewResume: "לצפייה בקורות החיים שלי"
        },
        "English": {
            aboutTitle: "About",
            hello: "Hello, everyone! 👋🏼",
            myName: "My name is Bar Levi, and I'm a third-year student in software engineering at SCE College in Ashdod 👨🏼‍🎓.",
            programmingLanguages: "I'm proficient in various programming languages such as:<br> C, C++, Python, and Java.<br> In recent months, I've been self-learning web technologies like:<br> HTML5, CSS3, and JavaScript,<br> which I used to build this website.",
            ambitious: "I'm very ambitious and always think about how I can use my knowledge to help others, and that's how I came up with the idea to build this website 🤔",
            projects: 'This website is one of many projects I\'ve built, and you can check them out <a href="https://bar-levi-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">here 🚀.</a>',
            jobSeeking: "I'm currently looking for a part-time job in Frontend/Backend development, and I'd be happy to connect with relevant people 🕵️‍♂️",
            contact: 'You can reach out to me via <a href="https://www.linkedin.com/in/bar-levi-software-developer/">my LinkedIn profile</a>, and if you mention that you came from this website, it will be even cooler 😉',
            viewResume: "View my resume"
        }
    };

    document.getElementById("aboutTitle").innerHTML = translations[language].aboutTitle;
    const elementsToTranslate = document.querySelectorAll("[data-translate]");

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });
}

function setDatabaseConnectionErrorDiv(language) {
    document.getElementById("databaseConnectionFailureDiv").style.direction = textDirections[language];
    document.getElementById("databaseConnectionFailureMessage").innerHTML = databaseConnectionErrorContent[language].messageContent;
    document.getElementById("tryAgainButton").innerHTML = databaseConnectionErrorContent[language].buttonContent;

}

function translateContactPage(language) {
    const textDirections = {
        Hebrew: "rtl",
        English: "ltr",
    };

    contactPage.style.direction = textDirections[language];
    
    const translations = {
        Hebrew: {
            contactQuestion: "אשמח לשמוע מה דעתכם!",
            contactText: "לרשותכם מגוון פלטפורמות נוספות ליצירת קשר, עבור ביקורות, מילים טובות ושיתופי פעולה:",
            email: "bar314levi@gmail.com",
            phoneNumber: "+972-52-9569907",
            viewResume: "לצפייה בקורות החיים",
            leaveMessageTitle: "מוזמנים להשאיר הודעה -",
            sendButton: "שלח",
            yourName: "איך קוראים לך?",
            yourEmail: "מה האימייל שלך?",
            yourMessage: "אני מקשיב לך ..."
        },
        English: {
            contactQuestion: "I'd love to hear from you!",
            contactText: "You have various other platforms to get in touch, for reviews, kind words, and collaborations:",
            email: "bar314levi@gmail.com",
            phoneNumber: "+972-52-9569907",
            viewResume: "View my resume",
            leaveMessageTitle: "Feel free to leave a message -",
            sendButton: "Send",
            yourName: "What's your name?",
            yourEmail: "What's your email?",
            yourMessage: "I'm listening to you ..."
        }
    };

    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    const elementsWithPlaceholders = document.querySelectorAll("[data-placeholder-translate]");

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });

    elementsWithPlaceholders.forEach(element => {
        const key = element.getAttribute("data-placeholder-translate");
        if (translations[language] && translations[language][key]) {
            element.setAttribute("placeholder", translations[language][key]);
        }
    });
}

export function changeLanguage(newLanguage) {
    const frontSide = document.querySelector(".frontSide");
    const backSide = document.querySelector(".backSide");
    frontSide.classList.remove("frontSide");
    frontSide.classList.add("backSide");
    backSide.classList.remove("backSide");
    backSide.classList.add("frontSide");

    document.body.classList.add("changeLanguageTo" + newLanguage);
    setTimeout(() => { 
        document.body.classList.remove("changeLanguageTo" + newLanguage);
    }, 800);

    language = newLanguage;
    setLanguage(newLanguage);
}

function setLanguage(language) { 
    localStorage.setItem("userLanguage", language);
    setMenu(language);
    setLoginPage(language);
    setRegisterPage(language);
    setForgotPasswordPage(language);
    setMainPage(language);
    setlistToCopyDiv(language);
    setAboutMePage(language);
    setDatabaseConnectionErrorDiv(language);
    translateContactPage(language);
}

export function getLastLanguage() {
    console.log(localStorage.getItem("userLanguage"));
    language = localStorage.getItem("userLanguage") || "Hebrew";

    const israelFlagSide = document.getElementById("israelFlagSide");
    const usaFlagSide = document.getElementById("usaFlagSide");

    if (language === "Hebrew") {
        usaFlagSide.classList.remove("frontSide");
        usaFlagSide.classList.add("backSide");
        israelFlagSide.classList.remove("backSide");
        israelFlagSide.classList.add("frontSide");
    }
    else {
        israelFlagSide.classList.remove("frontSide");
        israelFlagSide.classList.add("backSide");
        usaFlagSide.classList.remove("backSide");
        usaFlagSide.classList.add("frontSide");
    }
    setLanguage(language);
}