const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json()); 


const alunosRouter = require('./routes/alunos');
app.use('/alunos', alunosRouter);






app.listen(3000, () => {
  console.log(`Servidor a ser executado em http://localhost:3000`);
});


module.exports = app;

