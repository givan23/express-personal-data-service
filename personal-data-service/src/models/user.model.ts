import {ISequelize, IDataTypes} from '../defines/models.types';

export default (sequelize: ISequelize, DataTypes: IDataTypes) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            passwordHash: {
                type: DataTypes.STRING,
                field: 'password_hash',
                allowNull: false,
            },
        },
        {
            tableName: 'users',      // Nome tabella nel DB
            timestamps: true,        // ✅ Abilita createdAt / updatedAt automatici
            createdAt: 'created_at', // ✅ Mappa il nome corretto della colonna
            updatedAt: 'updated_at', // ✅ Mappa il nome corretto della colonna
        }
    );
};

