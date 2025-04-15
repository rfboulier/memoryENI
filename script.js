// Vérification formulaire inscription

window.onload = init

document.getElementById("formulaire").addEventListener("submit", function (event) {
    const submitButton = document.getElementById("validerInscription");
    if (submitButton.disabled) {
        event.preventDefault();
    }
});

function init() {
    // Ajouter les écouteurs d'événements sans appeler les fonctions immédiatement
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

    document.getElementById("choixJeu").addEventListener("change", actualiserImage);
    actualiserImage();

    // Appel initial des fonctions pour configurer l'état initial
    checkUsername();
    checkUserMail();
    comparePwd();
    pwdStrength();
    submit();
    choixJeu();
    actualiserImage();


}

function checkUsername() {
    const username = document.getElementById("username").value
    const validation = document.getElementById("validationUsername")

    if (username.length === 0) {
        validation.textContent = "";
        return;
    }

    if (username.length >= 3) {
        validation.textContent = "✓ Le nom d'utilisateur est valide"
        validation.style.color = "green"
    } else {
        validation.textContent = "✗ Le nom d'utilisateur doit contenir au moins 3 caractères"
        validation.style.color = "red"
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

    if (emailValide) {
        validation.textContent = "✓ L'adresse mail est valide";
        validation.style.color = "green";
    } else {
        validation.textContent = "✗ L'adresse mail n'est pas valide";
        validation.style.color = "red";
    }
}


function comparePwd() {
    const pwd1 = document.getElementById("password").value;
    const pwd2 = document.getElementById("passwordBis").value;
    const validation = document.getElementById("validationPwdBis");

    if (pwd2.length === 0) {
        validation.textContent = "";
        return
    }

    if (pwd1 === pwd2 && pwd1 !== "") {
        validation.textContent = "✓ Les mots de passe correspondent";
        validation.style.color = "green";
    } else {
        validation.textContent = "✗ Les mots de passe ne correspondent pas";
        validation.style.color = "red";
    }
}

function pwdStrength() {
    const password = document.getElementById("password").value;
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*\-_+=]/.test(password)
    const length = password.length
    const validation = document.getElementById('pwdStrength')

    if (password.length === 0) {
        validation.textContent = "";
        return;
    }

    if (length >= 9 && hasNumber && hasSpecial) {
        validation.textContent = "✓ Le mot de passe est fort";
        validation.style.color = "green";
    }
    else if (length >= 6 && (hasNumber || hasSpecial)) {
        validation.textContent = "⚠ Le mot de passe est moyen";
        validation.style.color = "orange";
    }
    else {
        validation.textContent = "✗ Le mot de passe est faible";
        validation.style.color = "red";
    }

}

function submit() {
    const username = document.getElementById("username").value
    const userMail = document.getElementById("userMail").value
    const password = document.getElementById("password").value
    const passwordBis = document.getElementById("passwordBis").value

    const isUsernameValid = username.length >= 3;
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userMail);
    const isPwdStrong = password.length >= 6 && (/\d/.test(password) || /[!@#$%^&*\-_+=]/.test(password));
    const isPwdMatching = password === passwordBis && password !== "";

    const submitButton = document.getElementById("validerInscription");

    if (isUsernameValid && isEmailValid && isPwdStrong && isPwdMatching) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Conservation des données


// Affichage des images - choix du jeu - page profil


