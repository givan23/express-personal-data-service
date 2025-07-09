import {ISequelize, IDataTypes} from '../defines/models.types';

export default (sequelize: ISequelize, DataTypes: IDataTypes) => {
    return sequelize.define('Address', {
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
        street: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zipCode: {
            type: DataTypes.STRING,
            field: 'zip_code',
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'addresses',
        timestamps: false,
    });
};
