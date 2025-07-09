import {ISequelize, IDataTypes} from '../defines/models.types';

export default (sequelize: ISequelize, DataTypes: IDataTypes) => {
    return sequelize.define('Profile', {
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
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
            allowNull: true
        },
        birthDate: {
            type: DataTypes.DATE,
            field: 'birth_date',
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            field: 'phone_number',
            allowNull: true
        }
    }, {
        tableName: 'profiles',
        timestamps: false,
    });
};
