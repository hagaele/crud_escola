const express = require('express');
const router = express.Router();


let listaProfessores = [
    { 
        id: 1, 
        nome: "Carlos Pereira", 
        email: "carlos.pereira@iesb.com", 
        cpf: "555.666.777-88", 
        curso: "Ciência da Computação", 
        disciplina: "Algoritmos" 
    },
    { 
        id: 2, 
        nome: "Luiza Lima", 
        email: "luiza.lima@iesb.com", 
        cpf: "666.777.888-99", 
        curso: "Engenharia de Software", 
        disciplina: "Banco de Dados" 
    }
];



// GET /professores 
router.get('/', (req, res) => {
    res.json(listaProfessores);
});

// GET /professores/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const professor = listaProfessores.find(prof => prof.id === id);
    if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado!" });
    }
    res.json(professor);
});

// POST /professores 
router.post('/', (req, res) => {
    const { nome, email, cpf, curso, disciplina } = req.body;

    // Validação dos campos 
    if (!nome || !email || !cpf || !curso || !disciplina) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    // Validar se o CPF ou email já existem
    if (listaProfessores.some(prof => prof.cpf === cpf || prof.email === email)) {
        return res.status(409).json({ message: "CPF ou email já cadastrado!" });
    }

    const novoProfessor = {
        id: Date.now(),
        nome,
        email,
        cpf,
        curso,
        disciplina
    };

    listaProfessores.push(novoProfessor);
    res.status(201).json({ message: "Professor cadastrado com sucesso!", professor: novoProfessor });
});

// PUT /professores/:id 
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const professorIndex = listaProfessores.findIndex(prof => prof.id === id);

    // Valida se o professor existe
    if (professorIndex === -1) {
        return res.status(404).json({ message: "Professor não encontrado!" });
    }

    // Valida se os dados para atualizar foram enviados
    const { nome, email, curso, disciplina } = req.body;
    if (!nome || !email || !curso || !disciplina) {
        return res.status(400).json({ message: "Nome, email, curso e disciplina são obrigatórios para atualização!" });
    }

    // Atualiza os dados do professor
    const professorAtualizado = {
        ...listaProfessores[professorIndex],
        nome,
        email,
        curso,
        disciplina
    };
    
    listaProfessores[professorIndex] = professorAtualizado;
    
    res.json({ message: "Professor atualizado com sucesso!", professor: professorAtualizado });
});

// DELETE /professores/:id 
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const professorIndex = listaProfessores.findIndex(prof => prof.id === id);
    if (professorIndex === -1) {
        return res.status(404).json({ message: "Professor não encontrado!" });
    }
    
    listaProfessores.splice(professorIndex, 1);
    
    res.status(204).json({ message: "Professor excluído com sucesso!" });
});


// Exporta o router
module.exports = router;