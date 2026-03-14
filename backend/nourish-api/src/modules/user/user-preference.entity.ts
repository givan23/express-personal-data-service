import {ISequelize, IDataTypes} from '../../types/sequelize.types';

export default (sequelize: ISequelize, DataTypes: IDataTypes) => {
    return sequelize.define('userPreference', {
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
        key: {
            type: DataTypes.STRING,
            field: 'key',
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            field: 'value',
            allowNull: true
        },
    }, {
        tableName: 'user_preferences',
        timestamps: true,        // ✅ Abilita createdAt / updatedAt automatici
        createdAt: 'created_at', // ✅ Mappa il nome corretto della colonna
        updatedAt: 'updated_at', // ✅ Mappa il nome corretto della colonna
    });
};
