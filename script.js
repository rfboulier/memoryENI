// Vérification formulaire inscription

window.onload = init;

function init() {

    // Page d'inscription

    if (document.getElementById("formulaireInscription")) {
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

        document.getElementById("formulaireInscription").addEventListener("submit", function (event) {
            event.preventDefault();
            submit();
            if (!document.getElementById("validerInscription").disabled) {
                stockageUser();
                window.location.href = 'connexion.html';
            }
        });
    }

    // Page de connexion

    if (document.getElementById("formulaireConnexion")) {
        document.getElementById("formulaireConnexion").addEventListener("submit", connexion);
        document.getElementById("formulaireConnexion").addEventListener("submit", stockageUserConnexion);
    }

    // Page de profil
    if (document.getElementById("formulaireProfil")) {
        let userCo = sessionStorage.getItem("userCo")
        let afficherUser = document.getElementById("userCo")

        if (userCo !== null) {
            afficherUser.textContent = userCo;
        }



    }
}

function checkUsername() {
    const username = document.getElementById("username").value;
    const validation = document.getElementById("validationUsername");

    if (username.length === 0) {
        validation.textContent = "";
        return;
    }

    // Vérif. storage
    const usersListSauv = localStorage.getItem('usersList');
    let isUsernameTaken = false;

    if (usersListSauv) {
        const usersList = JSON.parse(usersListSauv);
        for (let user of usersList) {
            if (user.username === username) {
                isUsernameTaken = true;
                break;
            }
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
    const usersListSauv = localStorage.getItem("usersList");
    let isUserMailTaken = false;

    if (usersListSauv) {
        const usersList = JSON.parse(usersListSauv);
        for (let user of usersList) {
            if (user.userMail === userMail) {
                isUserMailTaken = true;
                break;
            }
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

/* Fonction de soumission du formulaire :
- vérifie que l'username et le mail n'existe pas dans le local storage.
- vérifie que tous les champs correspondent aux attendus. 
- si tout est ok, le bouton est cliquable. */

function submit() {
    // Vérification dans le localStorage
    const usersListSauv = localStorage.getItem("usersList");
    let isUsernameUntaken = true;
    let isUserMailUntaken = true;
    const username = document.getElementById("username").value;
    const userMail = document.getElementById("userMail").value;

    if (usersListSauv) {
        const usersList = JSON.parse(usersListSauv);
        for (let user of usersList) {
            if (user.username === username) {
                isUsernameUntaken = false;
            }
            if (user.userMail === userMail) {
                isUserMailUntaken = false;
            }
        }
    }

    // Vérification des attentes
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

/* Fonction de stockage :
- récupère les valeurs de l'username, usermail, password.
- stocke tout ça dans une variable, sous forme d'objet JS.
- on récupère les données du storage, s'il n'y a rien, on crée un tableau.
- on ajoute les nouvelles données à la liste des utilisateurs.
- on envoie ces données dans le storage.
 */

function stockageUser() {
    const username = document.getElementById("username").value;
    const userMail = document.getElementById("userMail").value;
    const password = document.getElementById("password").value;

    const newUser = {
        username: username,
        userMail: userMail,
        password: password
    };

    let usersList = JSON.parse(localStorage.getItem('usersList')) || [];

    usersList.push(newUser);

    localStorage.setItem('usersList', JSON.stringify(usersList));
}

/* PROBLEME : Fonction de connexion :
- on récupère les valeurs des input du formulaire.
- on les compare avec les données du storage.
- si l'username et le mdp correspondent : on peut cliquer et passer sur la page profil.
- sinon, alerte. PROBLEME ICI */

function connexion(event) {
    console.log("plop")
    // - on récupère les valeurs des input du formulaire.
    let usernameCo = document.getElementById("usernameCo").value
    let passwordCo = document.getElementById("passwordCo").value
    let usersList = JSON.parse(localStorage.getItem('usersList'))
    let usernameCoValide = false;
    let loginValide = false;
    let btnConnexion = document.getElementById("btnConnexion")

    // On sort de la fonction si un champ est vide
    if (usernameCo === "" || passwordCo === "") {
        btnConnexion.disabled = true;
        return;
    }

    // - on les compare avec les données du storage : boucle for pour parcourir usersList.

    for (let index = 0; index < usersList.length; index++) {
        usernameCoValide = usersList[index].username === usernameCo
        passwordCoValide = usersList[index].password === passwordCo
        loginValide = usernameCoValide && passwordCoValide
        if (loginValide) {
            break
        }
    }

    if (loginValide) {
        btnConnexion.disabled = false;
        event.target.action = "profil.html"
    } else {
        // On affiche seulement l'alerte si les deux champs sont remplis mais invalides
        if (usernameCo !== "" && passwordCo !== "") {
            btnConnexion.disabled = false;
            alert("Erreur")
        }
    }
}

/* Fonction de stockage des données de connexion dans le session storage :
- - récupère les valeurs de l'username, usermail, password.
- stocke tout ça dans une variable, sous forme d'objet JS.
- on récupère les données du storage, s'il n'y a rien, on crée un tableau.
- on ajoute les nouvelles données à la liste des utilisateurs.
- on envoie ces données dans le storage.
 */

function stockageUserConnexion() {
    let usernameCo = document.getElementById("usernameCo").value

    sessionStorage.setItem("userCo", usernameCo)
}

/* Fonction pour afficher l'image du plateau sélectionné :
- récupérer la valeur de l'input sélection.
- la faire matcher avec une image.
- faire apparaître l'image. */

