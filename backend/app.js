'use strict';
require('./globals');

const express = require('express');
const jsonParser = require('body-parser').json();
const promesso = require('promesso');

const session = rootRequire('./components/session');
const serve = rootRequire('./components/serve');
const pages = rootRequire('./pages');
const api = rootRequire('./api');

const app = express();

app.use(jsonParser);

app.use(session);
app.get(/(\/build\/|\/public\/).*/, serve);

app.post('/api/login', promesso(api.login));
app.post('/api/unlock', promesso(api.unlock));
app.post('/api/logout', promesso(api.logout));

app.get('/api/torrents', promesso(api.torrents));
app.delete('/api/torrents', promesso(api.removeTorrents));
app.post('/api/unrestrict', promesso(api.unrestrict));

app.get('/login', promesso(pages.login));
app.get('*', promesso(pages.main));

app.use(function (err, req, res, next) {
  if (err && err instanceof SyntaxError) console.log('SYNTAX ERROR!'); // very bad
  console.dir(err.stack);
  return res.sendStatus(500);
});

module.exports = app;
