document.addEventListener('DOMContentLoaded', async () => {
    const voluntarioForm = document.getElementById('voluntarioForm');
    const mensagem = document.getElementById('mensagem');
    const listaVoluntarios = document.getElementById('listaVoluntarios');

    // Função para carregar a lista de voluntários
    async function carregarVoluntarios() {
        try {
            const response = await fetch('/voluntarios');
            const voluntarios = await response.json();

            // Limpar a lista de voluntários antes de adicionar os novos
            listaVoluntarios.innerHTML = '';

            // Adicionar cada voluntário à lista na página
            voluntarios.forEach(voluntario => {
                const listItem = document.createElement('div');
                listItem.textContent = `Nome: ${voluntario.nome}, Email: ${voluntario.email}, Celular: ${voluntario.celular}`;
                listaVoluntarios.appendChild(listItem);
            });
        } catch (error) {
            console.error('Erro ao carregar voluntários:', error);
            mensagem.textContent = 'Erro ao carregar voluntários';
        }
    }

    // Carregar a lista de voluntários ao carregar a página
    carregarVoluntarios();

    voluntarioForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(voluntarioForm);
        const nome = formData.get('nome');
        const celular = formData.get('celular');
        const email = formData.get('email');
        const experiencia = formData.get('experiencia');
        const conselho = formData.get('conselho');
        const especialidade = formData.get('especialidade');
        const disponibilidade = formData.get('disponibilidade');

        try {
            const response = await fetch('/api/voluntarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, celular, email, experiencia, conselho, especialidade, disponibilidade }),
            });

            if (response.ok) {
                mensagem.textContent = 'Voluntário cadastrado com sucesso!';
                voluntarioForm.reset();
                // Após cadastrar o voluntário com sucesso, recarregar a lista de voluntários
                carregarVoluntarios();
            } else {
                const data = await response.json();
                mensagem.textContent = data.error || 'Erro ao cadastrar voluntário';
            }
        } catch (error) {
            console.error('Erro ao cadastrar voluntário:', error);
            mensagem.textContent = 'Erro ao cadastrar voluntário';
        }
    });
});
