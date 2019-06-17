'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  // Define a Sequelize model
  const Geo = sequelize.define('geos', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    neighbourhood: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    county: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    postcode: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    country_code: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.DECIMAL
    },
    longitude: {
      type: Sequelize.DECIMAL
    },
    altitude: {
      type: Sequelize.DECIMAL
    },
    photo: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false
  });

  return Geo;
};
