import {ISequelize, IDataTypes} from '../defines/models.types';

export default (sequelize: ISequelize, DataTypes: IDataTypes) => {
    return sequelize.define('Preference', {
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
        preferenceKey: {
            type: DataTypes.STRING,
            field: 'preference_key',
            allowNull: false
        },
        preferenceValue: {
            type: DataTypes.STRING,
            field: 'preference_value',
            allowNull: true
        },
    }, {
        tableName: 'preferences',
        timestamps: false,
    });
};
