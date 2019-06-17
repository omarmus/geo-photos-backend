'use strict';

const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const port = process.env.PORT || 3000;
const api = require('./api');
const hook = require('./lib/hook');
const env = 'development';
const config = require(path.join(__dirname, 'config/config.json'))[env];

// Create the Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Create the Express application
const app = express();
app.use(cors());
const models = require('./models').init(app, sequelize);
hook.validate(sequelize);

app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use('/api', api(models));

// Synchronize our models and start the application
sequelize
  .sync()
  .then(start);

// Express Error Handler
app.use((err, req, res, next) => {
  console.error(`${chalk.magenta('[ERROR]')}`, err);
  res.status(500).send({ error: err.message });
});

function start () {
  if (process.env.NODE_ENV === 'secure') {
    const options = {
      cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
      key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
    };
    https.createServer(options, app).listen(port, () => {
      console.log(`Iniciando servidor HTTPS en el puerto ${port} `);
    });
  } else {
    app.listen(port, () => {
      console.log(`Servidor iniciado en el puerto: ${port}`);
    });
  }
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

process.on('uncaughtException', handleFatalError);
process.on('unhandledRejection', handleFatalError);
