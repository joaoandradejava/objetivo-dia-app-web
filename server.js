const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/objetivo-do-dia-angular'));

app.get('/*', (req, res) => {
  res.sendfile(__dirname + '/dist/objetivo-do-dia-angular/index.html')
})

app.listen(PORT, () => {
  console.log('Servidor iniciado na porta: ' + PORT)
})
