// server.js
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path'); 

app.use(express.json());

// Configure o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});

app.get('/voluntarios', (req, res) => {
    res.sendFile('voluntario.html', { root: 'public' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
