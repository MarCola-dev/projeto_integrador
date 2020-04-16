const express = require('express');//Importando o express
const cors = require('cors');
const {errors}=require('celebrate');
const routes = require('./routes');
const app = express();
app.use(express.json());
app.use(cors());
// criando a aplicação onde depois
//vai ter as rotas e as funcionalidades
app.use(routes);
app.use(errors());
/*metodo 
GET busca informação no backend
POST criar informação no backend
PUT altera uma informação no backend
DELETE delea uma informação no backend

*/
/*
Tipo de parametros
Query params: vai dentro da url(rota) iusado pra filtro e paginação geralemte depois de um"?"
Route params: utilizado pra identificar recursos
Request Body: utilizado pra criar ou alterar recursos, o corpo da requisição
*/


//aqui dentro eu coloco a rota que
//eu quero acessar (nesse caso é a 3333)

module.exports = app;//Aqui eu configuro 
//a porta onde minha aplicação vai rodar
