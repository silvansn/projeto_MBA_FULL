// public/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const senha = formData.get('senha');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                // Redirecionar para a página após o login bem-sucedido
                window.location.href = '/home.html';
            } else {
                // Exibir mensagem de erro de login
                const data = await response.json();
                loginMessage.textContent = data.error || 'Erro ao fazer login';
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            loginMessage.textContent = 'Erro ao fazer login';
        }
    });
});