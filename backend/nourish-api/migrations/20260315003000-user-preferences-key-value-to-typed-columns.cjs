'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('user_preferences');

    if (!table.allergies) {
      await queryInterface.addColumn('user_preferences', 'allergies', {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: []
      });
    }

    if (!table.diet_type) {
      await queryInterface.addColumn('user_preferences', 'diet_type', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (table.key || table.value) {
      await queryInterface.sequelize.query(`
        WITH aggregated AS (
          SELECT
            user_id,
            array_remove(
              array_agg(DISTINCT CASE
                WHEN key = 'allergies'
                THEN value
              END),
              NULL
            ) AS allergies,
            MAX(CASE
              WHEN key = 'diet_type'
              THEN value
            END) AS diet_type,
            MIN(id) AS keep_id
          FROM user_preferences
          GROUP BY user_id
        )
        UPDATE user_preferences up
        SET
          allergies = aggregated.allergies,
          diet_type = aggregated.diet_type
        FROM aggregated
        WHERE up.id = aggregated.keep_id;
      `);

      await queryInterface.sequelize.query(`
        DELETE FROM user_preferences up
        USING (
          SELECT user_id, MIN(id) AS keep_id
          FROM user_preferences
          GROUP BY user_id
        ) keep
        WHERE up.user_id = keep.user_id
          AND up.id <> keep.keep_id;
      `);
    }

    if (table.key) {
      await queryInterface.removeColumn('user_preferences', 'key');
    }

    if (table.value) {
      await queryInterface.removeColumn('user_preferences', 'value');
    }

    const [existingConstraint] = await queryInterface.sequelize.query(`
      SELECT 1
      FROM pg_constraint
      WHERE conname = 'user_preferences_user_id_unique'
      LIMIT 1;
    `);

    if (!existingConstraint.length) {
      await queryInterface.addConstraint('user_preferences', {
        fields: ['user_id'],
        type: 'unique',
        name: 'user_preferences_user_id_unique'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('user_preferences');

    const [existingConstraint] = await queryInterface.sequelize.query(`
      SELECT 1
      FROM pg_constraint
      WHERE conname = 'user_preferences_user_id_unique'
      LIMIT 1;
    `);

    if (existingConstraint.length) {
      await queryInterface.removeConstraint('user_preferences', 'user_preferences_user_id_unique');
    }

    if (!table.key) {
      await queryInterface.addColumn('user_preferences', 'key', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!table.value) {
      await queryInterface.addColumn('user_preferences', 'value', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    await queryInterface.sequelize.query(`
      UPDATE user_preferences
      SET key = 'diet_type', value = diet_type::text
      WHERE diet_type IS NOT NULL;
    `);

    await queryInterface.sequelize.query(`
      UPDATE user_preferences
      SET key = 'allergies', value = allergies[1]
      WHERE key IS NULL
        AND allergies IS NOT NULL
        AND array_length(allergies, 1) > 0;
    `);

    if (table.allergies) {
      await queryInterface.removeColumn('user_preferences', 'allergies');
    }

    if (table.diet_type) {
      await queryInterface.removeColumn('user_preferences', 'diet_type');
    }
  }
};

