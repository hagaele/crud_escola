const express = require('express');
const router = express.Router();


let listaAlunos = [
    {
        id: 1,
        nome: "Ana Silva",
        email: "ana.silva@iesb.com",
        cpf: "123.456.789-00",
        telefone: "(11) 9 8765-4321",
        dataNascimento: "15/01/1999"
    },
    {
        id: 2,
        nome: "Bruno Costa",
        email: "bruno.costa@iesb.com",
        cpf: "987.654.321-00",
        telefone: "(21) 9 8765-4322",
        dataNascimento: "20/10/2000"
    }
];


// GET /alunos
router.get('/', (req, res) => {
    res.json(listaAlunos);
});

// GET /alunos/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = listaAlunos.find(aluno => aluno.id === id);
    if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
    }
    res.json(aluno);
});

// POST /alunos
router.post('/', (req, res) => {
    const { nome, email, cpf, telefone, dataNascimento } = req.body;
    
    // Validação
    if (!nome || !email || !cpf || !dataNascimento) {
        return res.status(400).json({ message: "Nome, email, cpf e dataNascimento são obrigatórios!" });
    }
    
    // Validar se o CPF ou email já existem
    if (listaAlunos.some(aluno => aluno.cpf === cpf || aluno.email === email)) {
        return res.status(409).json({ message: "CPF ou email já cadastrado!" });
    }

    const novoAluno = {
        id: Date.now(), // Garantir ID único
        nome,
        email,
        cpf,
        telefone,
        dataNascimento
    };

    listaAlunos.push(novoAluno);
    res.status(201).json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno });
});

// PUT /alunos/:id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const alunoIndex = listaAlunos.findIndex(aluno => aluno.id === id);

    // Valida se o aluno existe
    if (alunoIndex === -1) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
    }

    // Valida se os dados para atualizar foram envidos
    const { nome, email, telefone, dataNascimento } = req.body;
    if (!nome || !email || !dataNascimento) {
        return res.status(400).json({ message: "Nome, email e dataNascimento são obrigatórios!" });
    }
    
    // Atualiza os dados do aluno mennos CPF
    const alunoAtualizado = {
        ...listaAlunos[alunoIndex],
        nome,
        email,
        telefone,
        dataNascimento
    };
    
    listaAlunos[alunoIndex] = alunoAtualizado;
    
    res.json({ message: "Aluno atualizado com sucesso!", aluno: alunoAtualizado });
});

// DELETE /alunos/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const alunoIndex = listaAlunos.findIndex(aluno => aluno.id === id);
    if (alunoIndex === -1) {
        return res.status(404).json({ message: "Aluno não encontrado!" });
    }
    
    listaAlunos.splice(alunoIndex, 1);
    
    res.status(204).json({ message: "Aluno excluído com sucesso!" });
});


//exportar o roteaador
module.exports = router;

