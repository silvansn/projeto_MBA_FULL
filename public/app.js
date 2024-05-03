// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(userForm);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const senha = formData.get('senha');

        try {
            const response = await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha }),
            });
            const newUser = await response.json();

            const listItem = document.createElement('div');
            listItem.textContent = `Nome: ${newUser.nome}, Email: ${newUser.email}`;
            userList.appendChild(listItem);

            userForm.reset();
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    });

    // Função para carregar a lista de usuários
    async function loadUsers() {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();

            userList.innerHTML = '';
            users.forEach(user => {
                const listItem = document.createElement('div');
                listItem.textContent = `Nome: ${user.nome}, Email: ${user.email}`;
                userList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }

    // Carregar a lista de usuários ao carregar a página
    loadUsers();
});
