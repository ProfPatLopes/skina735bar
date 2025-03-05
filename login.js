// Nome de usuário e senha fixos
const fixedUsername = 'skina';
const fixedPassword = 'admin';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    if (username === fixedUsername && password === fixedPassword) {
        loginMessage.textContent = 'Login bem-sucedido!';
        loginMessage.style.color = 'green';
    } else {
        loginMessage.textContent = 'Nome de usuário ou senha incorretos.';
        loginMessage.style.color 
    }