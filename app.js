/*
 * Oscar Boguszewski
 * HB-R6-Vill 
 * Exam JS 
 * Exercice 2: Theme Switcher
*/
class ThemeSwitcher {

    // Prend l'élément html body dans la construction d'une instance
    constructor(body){
        this.body = body;
    }
    
    // Meme principe pour mes deux méthodes. Ajoute ou retire le theme dark selon l'action demandée et sauvegarde du paramètre dans le localstorage
    turnLightTheme() {
        this.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    turnDarkTheme() {
        this.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

}

// Je récupère mon élément du dom body et le theme stocké dans le local storage
const body = document.body;
const theme = localStorage.getItem('theme');

// Si le theme existe et qu'il est évalué à dark, ajout du style dark
if (theme === 'dark') {
    body.classList.add('dark');
}

// Listeners pour mes boutons. Même principe pour les deux, on instancie ThemeSwitcher et on appelle la méthode correspondante
const lightBtn = document.querySelector('#lightThemeBtn');
lightBtn.addEventListener('click', () => {
    const lightSwitch = new ThemeSwitcher(body);
    lightSwitch.turnLightTheme();
})

const darkBtn = document.querySelector('#darkThemeBtn');
darkBtn.addEventListener('click', () => {
    const darkSwitch = new ThemeSwitcher(body);
    darkSwitch.turnDarkTheme();

})