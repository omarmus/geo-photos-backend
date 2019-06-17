'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let companies = Array(5).fill().map((_, i) => {
    return {
      name: casual.name,
      address: casual.address,
      phone: casual.phone
    };
  });

  items = items.concat(companies);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('companies', items, {});
  },

  down (queryInterface, Sequelize) { }
};
