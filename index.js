// -------------------- Tarefa desafio modulo 1 -------------------- //

// Importante express para o projeto
const express = require("express");

// Instanciando um servidor
const server = express();

// Definido o formato JSON como comunicação da aplicação
server.use(express.json());

// Variaveis globais usadas para armazenar dados do programa.
let numberOfRequests = 0;
const projects = [];

// -------------------- Middlewares da aplicacao -------------------- //

// Log das requisições
function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}
server.use(logRequests);

// Verifica se o projeto existe.
function checkProjExist(req, res, next) {
  const IdExist = projects[req.params.id];
  if (!IdExist) {
    return res.status(400).json({ error: "Esse projeto não existe" });
  }
  return next();
}

// -------------------- Rotas da aplicacao -------------------- //

// GET - Consultando todos os projetos cadastrados.
server.get("/projects/", (req, res) => {
  return res.json(projects);
});

// GET - Consultado 1 projeto cadastrado pelo ID passaddo por parâmetro.
server.get("/projects/:id", checkProjExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  return res.json(project);
});

// POST- Cadastrar um projeto.
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(project);
});

// POST- Inserindo ***tasks*** em um projeto através do ID por params.
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

// PUT - Alterando dados de um projeto.
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// DELETE - Deletando um cadastro.
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const delIndex = projects.findIndex(p => p.id == id);

  projects.splice(delIndex, 1);

  return res.send();
});

// --------------- Porta em que o servidor ira responder --------------- //
server.listen(8080);
