import {ISequelize, IDataTypes} from '../../types/sequelize.types';

export default (sequelize: ISequelize, DataTypes: IDataTypes) => {
    return sequelize.define('userProfile', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false
        },
        displayName: {
            type: DataTypes.STRING,
            field: 'display_name',
            allowNull: true
        },
        cookingTimePreference: {
            type: DataTypes.STRING,
            field: 'cooking_time_preference',
            allowNull: true
        },
        householdSize: {
            type: DataTypes.INTEGER,
            field: 'household_size',
            allowNull: true
        },
        budgetStyle: {
            type: DataTypes.STRING,
            field: 'budget_style',
            allowNull: true
        }
    }, {
        tableName: 'user_profiles',
        timestamps: true,        // ✅ Abilita createdAt / updatedAt automatici
        createdAt: 'created_at', // ✅ Mappa il nome corretto della colonna
        updatedAt: 'updated_at', // ✅ Mappa il nome corretto della colonna
    });
};
