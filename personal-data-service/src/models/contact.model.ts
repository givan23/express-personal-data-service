import {ISequelize, IDataTypes} from '../defines/models.types';

export default (sequelize: ISequelize, DataTypes: IDataTypes) => {
    return sequelize.define('Contact', {
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
        contactType: {
            type: DataTypes.STRING,
            field: 'contact_type',
            allowNull: true
        },
        contactValue: {
            type: DataTypes.STRING,
            field: 'contact_value',
            allowNull: true
        },
    }, {
        tableName: 'contacts',
        timestamps: false,
    });
};
