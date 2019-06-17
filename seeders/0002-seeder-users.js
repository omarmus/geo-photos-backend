'use strict';

const casual = require('casual');
const { setTimestampsSeeder, encrypt } = require('../lib/util');
const password = encrypt('123456');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let users = Array(10).fill().map((_, i) => {
    return {
      username: casual.username,
      password,
      email: casual.email,
      first_name: casual.first_name,
      last_name: casual.last_name,
      id_company: casual.integer(1, 5)
    };
  });

  items = items.concat(users);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', items, {});
  },

  down (queryInterface, Sequelize) { }
};
