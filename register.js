/*
 * Oscar Boguszewski
 * HB-R6-Vill 
 * Exam JS 
 * Exercice 1: Réaliser un formulaire d'inscription
*/
const emailInput = document.querySelector('#email');
const passWordInput = document.querySelector('#password');
const passWordConfirmInput = document.querySelector('#passwordConfirm');
const registerBtn = document.querySelector('#registerBtn');
const registerForm = document.querySelector('#registerForm');

let errorMsg;
let successMsg;
let validUser = false;

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Vérifie si un message de succès ou d'erreur existe. Si oui, ils sont retirés pour réinitialiser l'affichage
    if (successMsg) {
        successMsg.remove();
    }

    if (errorMsg) {
        errorMsg.remove();
    }

    // Fonction qui récupère les informations de l'utilisateurs pour les comparer. Retourne validUser true pour déclencher la requete vers l'api pour créer l'utilisateur
    function passwordConfirm(password, passwordConfirm) {
        if (password.length < 8) {
            errorMsg = document.createElement('p');
            registerForm.appendChild(errorMsg);
            errorMsg.innerHTML = '';
            errorMsg.classList.add('errorMsg');
            errorMsg.innerText = 'Votre mot de passe doit comporter au moins 8 caractères';
            return;
        }
        
        if (password !== passwordConfirm) {
            errorMsg = document.createElement('p');
            registerForm.appendChild(errorMsg);
            errorMsg.innerHTML = '';
            errorMsg.classList.add('errorMsg');
            errorMsg.innerText = 'La confirmation du mot de passe doit être identique au mot de passe';
            return;
        }
        
        return validUser = true;
    }

    // Appelle de la fonction de confirmation avec les informations du formulaire
    passwordConfirm(passWordInput.value, passWordConfirmInput.value);

    if (validUser) {
        fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'email': emailInput.value,
                'password': passWordInput.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            // ajout de l'animation de loading
            const load = document.createElement('div');
            
            load.classList.add('spinner-border', 'load');
            registerForm.appendChild(load);
            
            // setTimeout est là pour obliger l'apparition de l'animation de loading
            setTimeout(() => {
                successMsg = document.createElement('p');
                load.style.display = 'none';
                successMsg.innerText = 'Merci! Inscription réussie!';
                successMsg.classList.add('successMsg')
                registerForm.appendChild(successMsg);
    
                console.log(data);
            }, 2000)
        })
    }
});
