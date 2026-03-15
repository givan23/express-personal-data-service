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
        allergies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            field: 'allergies',
            allowNull: true,
            defaultValue: []
        },
        dietType: {
            type: DataTypes.STRING,
            field: 'diet_type',
            allowNull: true
        },
    }, {
        tableName: 'user_preferences',
        timestamps: true,        // ✅ Abilita createdAt / updatedAt automatici
        createdAt: 'created_at', // ✅ Mappa il nome corretto della colonna
        updatedAt: 'updated_at', // ✅ Mappa il nome corretto della colonna
    });
};
