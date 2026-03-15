'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const requiredTables = ['users', 'user_profiles', 'user_preferences'];
    const existingTablesRaw = await queryInterface.showAllTables();

    const existingTables = existingTablesRaw.map((table) => {
      if (typeof table === 'string') {
        return table;
      }

      // Alcuni dialect restituiscono oggetti con nome tabella in `tableName`.
      return table.tableName;
    });

    const missingTables = requiredTables.filter(
      (tableName) => !existingTables.includes(tableName)
    );

    if (missingTables.length > 0) {
      throw new Error(
        `Baseline non applicabile: tabelle mancanti nel DB corrente: ${missingTables.join(', ')}`
      );
    }
  },

  async down(_queryInterface, _Sequelize) {
    // No-op: la baseline registra lo stato iniziale e non deve alterare lo schema.
  }
};

