// Vérification formulaire inscription

window.onload = init;

function init() {
    document.getElementById("username").addEventListener("input", function () {
        checkUsername();
        submit();
    });
    document.getElementById("userMail").addEventListener("input", function () {
        checkUserMail();
        submit();
    });
    document.getElementById("password").addEventListener("input", function () {
        pwdStrength();
        comparePwd();
        submit();
    });
    document.getElementById("passwordBis").addEventListener("input", function () {
        comparePwd();
        submit();
    });

    // Appel initial des fonctions pour configurer l'état initial
    checkUsername();
    checkUserMail();
    comparePwd();
    pwdStrength();
    submit();
    // connexion();

    document.getElementById("formulaireInscription").addEventListener("submit", function (event) {
        event.preventDefault();
        submit();
        if (!document.getElementById("validerInscription").disabled) {
            stockageUser();
            window.location.href = 'connexion.html';
        }
    });

    // document.getElementById("formulaireConnexion").addEventListener("submit", function (event) {
    //     event.preventDefault();
    //     connexion();
    //     if (!document.getElementById("connexion").disabled) {
    //         window.location.href = 'profil.html';
    //     }
    // });
}

function checkUsername() {
    const username = document.getElementById("username").value;
    const validation = document.getElementById("validationUsername");

    if (username.length === 0) {
        validation.textContent = "";
        return;
    }

    // Vérif. storage
    const userDataSauv = localStorage.getItem('userData');
    let isUsernameTaken = false;

    if (userDataSauv) {
        const userData = JSON.parse(userDataSauv);
        if (userData.username === username) {
            isUsernameTaken = true;
        }
    }

    if (isUsernameTaken) {
        alert("Ce nom d'utilisateur est déjà pris");
    } else if (username.length >= 3) {
        document.getElementById("usernameCheck").style.display = "block"
        document.getElementById("usernameError").style.display = "none"
    } else {
        document.getElementById("usernameCheck").style.display = "none"
        document.getElementById("usernameError").style.display = "block"
        // validation.textContent = "✗ Le nom d'utilisateur doit contenir au moins 3 caractères";
        // validation.style.color = "red";
    }
}

function checkUserMail() {
    const userMail = document.getElementById("userMail").value;
    const validation = document.getElementById("validationUserMail");
    const emailValide = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userMail);

    if (userMail.length === 0) {
        validation.textContent = "";
        return;
    }

    // Vérif. storage
    const userDataSauv = localStorage.getItem("userData");
    let isUserMailTaken = false;

    if (userDataSauv) {
        const userData = JSON.parse(userDataSauv);
        if (userData.userMail === userMail) {
            isUserMailTaken = true;
        }
    }

    if (isUserMailTaken) {
        alert("Cette adresse mail est déjà utilisée");
    } else if (emailValide) {
        document.getElementById("userMailCheck").style.display = "block"
        document.getElementById("userMailError").style.display = "none"
    } else {
        document.getElementById("userMailCheck").style.display = "none"
        document.getElementById("userMailError").style.display = "block"
    }
}

function pwdStrength() {
    const password = document.getElementById("password").value;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*\-_+=]/.test(password);
    const length = password.length;
    const validation = document.getElementById('pwdStrength');

    if (password.length === 0) {
        document.getElementById("passwordCheck").style.display = "none"
        document.getElementById("passwordWarning").style.display = "none"
        document.getElementById("passwordError").style.display = "none"
        return;
    }

    if (length >= 9 && hasNumber && hasSpecial) {
        document.getElementById("passwordCheck").style.display = "block"
        document.getElementById("passwordWarning").style.display = "none"
        document.getElementById("passwordError").style.display = "none"
        validation.textContent = "✓ Le mot de passe est fort";
        validation.style.color = "green";
    } else if (length >= 6 && (hasNumber || hasSpecial)) {
        document.getElementById("passwordWarning").style.display = "block"
        document.getElementById("passwordError").style.display = "none"
        document.getElementById("passwordCheck").style.display = "none"
        validation.textContent = "⚠ Le mot de passe est moyen";
        validation.style.color = "orange";
    } else {
        document.getElementById("passwordError").style.display = "block"
        validation.textContent = "✗ Le mot de passe est faible";
        validation.style.color = "red";
    }
}

function comparePwd() {
    const pwd1 = document.getElementById("password").value;
    const pwd2 = document.getElementById("passwordBis").value;
    const validation = document.getElementById("validationPwdBis");

    if (pwd2.length === 0) {
        validation.textContent = "";
        return;
    }

    if (pwd1 === pwd2) {
        document.getElementById("passwordBisCheck").style.display = "block"
        document.getElementById("passwordBisError").style.display = "none"
        // validation.textContent = "✓ Les mots de passe correspondent";
        // validation.style.color = "green";
    } 
    if (pwd1 !== pwd2) {
        document.getElementById("passwordBisError").style.display = "block"
        // validation.textContent = "✗ Les mots de passe ne correspondent pas";
        // validation.style.color = "red";
    } 
}

function submit() {
    // Vérification dans le localStorage
    const userDataSauv = localStorage.getItem("userData");
    let isUsernameUntaken = true;
    let isUserMailUntaken = true;

    if (userDataSauv) {
        const userData = JSON.parse(userDataSauv);
        if (userData.username === document.getElementById("username").value) {
            isUsernameUntaken = false;
        }
        if (userData.userMail === document.getElementById("userMail").value) {
            isUserMailUntaken = false;
        }
    }

    // Vérification des attentes
    const username = document.getElementById("username").value;
    const userMail = document.getElementById("userMail").value;
    const password = document.getElementById("password").value;
    const passwordBis = document.getElementById("passwordBis").value;
    const isUsernameValid = username.length >= 3;
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userMail);
    const isPwdStrong = password.length >= 6 && (/\d/.test(password) || /[!@#$%^&*\-_+=]/.test(password));
    const isPwdMatching = password === passwordBis && password !== "";

    const submitButton = document.getElementById("validerInscription");

    if (isUsernameValid && isEmailValid && isPwdStrong && isPwdMatching && isUsernameUntaken && isUserMailUntaken) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function stockageUser() {
    const username = document.getElementById("username").value;
    const userMail = document.getElementById("userMail").value;
    const password = document.getElementById("password").value;

    const userData = {
        username: username,
        userMail: userMail,
        password: password
    };

    localStorage.setItem('userData', JSON.stringify(userData));
}

// function connexion() {
//     const userDataSauv = localStorage.getItem("userData");

//  if (userDataSauv) {
//     const userData = JSON.parse(userDataSauv);
//     if (userData.username === document.getElementById("usernameCo").value) {
//         document.getElementById("usernameCoCheck").style.display = "block"
//     }
//     if (userData.password === document.getElementById("passwordCo").value) {
//         document.getElementById("passwordCoCheck").style.display = "block"
//     }
//  }

// }