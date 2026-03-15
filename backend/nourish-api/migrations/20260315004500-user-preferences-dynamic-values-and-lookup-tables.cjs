'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE user_preferences
      ALTER COLUMN allergies TYPE TEXT[] USING allergies::text[];
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE user_preferences
      ALTER COLUMN diet_type TYPE TEXT USING diet_type::text;
    `);

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_user_preferences_allergies";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_user_preferences_diet_type";');

    await queryInterface.createTable('allergy_options', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.createTable('diet_type_options', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.bulkInsert('allergy_options', [
      { name: 'glutine', created_at: new Date(), updated_at: new Date() },
      { name: 'arachidi', created_at: new Date(), updated_at: new Date() },
      { name: 'lattosio', created_at: new Date(), updated_at: new Date() }
    ]);

    await queryInterface.bulkInsert('diet_type_options', [
      { name: 'onnivora', created_at: new Date(), updated_at: new Date() },
      { name: 'vegetariana', created_at: new Date(), updated_at: new Date() },
      { name: 'vegana', created_at: new Date(), updated_at: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diet_type_options');
    await queryInterface.dropTable('allergy_options');

    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_user_preferences_allergies" AS ENUM ('glutine', 'arachidi', 'lattosio');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);

    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_user_preferences_diet_type" AS ENUM ('onnivora', 'vegetariana', 'vegana');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE user_preferences
      ALTER COLUMN allergies TYPE "enum_user_preferences_allergies"[]
      USING (
        CASE
          WHEN allergies IS NULL THEN NULL
          ELSE ARRAY(
            SELECT allergy::"enum_user_preferences_allergies"
            FROM unnest(allergies) AS allergy
            WHERE allergy IN ('glutine', 'arachidi', 'lattosio')
          )
        END
      );
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE user_preferences
      ALTER COLUMN diet_type TYPE "enum_user_preferences_diet_type"
      USING (
        CASE
          WHEN diet_type IN ('onnivora', 'vegetariana', 'vegana')
          THEN diet_type::"enum_user_preferences_diet_type"
          ELSE NULL
        END
      );
    `);
  }
};

