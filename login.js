// Nome de usuário e senha fixos
// Nome de usuário e senha fixos
const fixedUsername = 'skina';
const fixedPassword = 'admin';

// Verificação de login ao carregar a página
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn === 'false') {
        document.getElementById('loginContainer').classList.remove('hidden');
        document.body.classList.add('blur-background');
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    if (username === fixedUsername && password === fixedPassword) {
        loginMessage.textContent = 'Login bem-sucedido!';
        loginMessage.style.color = 'green';
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('loginContainer').classList.add('hidden');
        document.body.classList.remove('blur-background');
    } else {
        loginMessage.textContent = 'Nome de usuário ou senha incorretos.';
        loginMessage.style.color = 'red';
    }
});