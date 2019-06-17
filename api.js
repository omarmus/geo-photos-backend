'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
// const Sequelize = require('sequelize');
const api = express.Router();
// const Op = Sequelize.Op;

module.exports = function (models) {
  const { geos, users } = models;

  api.post('/register', async (req, res, next) => {
    let data = req.body;

    data.photo = data.photo.split(',');
    let file = data.photo[1];

    try {
      let format = '';
      if (data.photo[0].indexOf('webp') !== -1) {
        format = 'webp';
      } else if (data.photo[0].indexOf('jpg') !== -1 || data.photo[0].indexOf('jpeg') !== -1) {
        format = 'jpg';
      } else {
        format = 'png';
      }
      console.log('photo', data.photo[0])
      const photo = `${uuidv4()}.${format}`;
      const filename = path.join(__dirname, 'public', 'files', photo);
      fs.writeFileSync(filename, file, 'base64');
      data.photo = photo;

      let user = await users.findOne({
        where: {
          email: data.email
        }
      });

      if (!user) {
        user = await users.create({
          email: data.email,
          phone: data.phone
        });
      }

      data.id_user = user.id;
      delete data.email;
      delete data.phone;

      let geo = await geos.create(data);
      res.send(geo);
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  });

  return api;
};
