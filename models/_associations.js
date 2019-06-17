'use strict';

module.exports = function loadAsociations (models) {
  const { companies, users, geos } = models;

  // Definiendo relaciones
  companies.hasMany(users, { foreignKey: { name: 'id_company' } });
  users.belongsTo(companies, { foreignKey: { name: 'id_company' } });

  users.hasMany(geos, { foreignKey: { name: 'id_user', allowNull: false } });
  geos.belongsTo(users, { foreignKey: { name: 'id_user', allowNull: false } });
};
