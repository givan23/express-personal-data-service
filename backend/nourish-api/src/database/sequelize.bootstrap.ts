// @ts-nocheck
import * as Sequelize from 'sequelize';
import sequelize from '../config/db.config';
import User from '../modules/user/user.entity';
import userPreference from '../modules/user/user-preference.entity';
import userProfile from '../modules/user/user-profile.entity';

interface IDb {
    Sequelize: typeof Sequelize;
    sequelize: typeof sequelize;
    User: ReturnType<typeof User>;
    userPreference: ReturnType<typeof userPreference>;
    userProfile: ReturnType<typeof userProfile>;
}

const sequelizeBootstrap: Partial<IDb> = {};
sequelizeBootstrap.Sequelize = Sequelize;
sequelizeBootstrap.sequelize = sequelize;

// Init models
sequelizeBootstrap.User = User(sequelize, Sequelize);
sequelizeBootstrap.userPreference = userPreference(sequelize, Sequelize);
sequelizeBootstrap.userProfile = userProfile(sequelize, Sequelize);


// Associations
sequelizeBootstrap.User.hasMany(sequelizeBootstrap.userPreference, {foreignKey: 'userId'});
sequelizeBootstrap.userPreference.belongsTo(sequelizeBootstrap.User, {foreignKey: 'userId'});

sequelizeBootstrap.User.hasOne(sequelizeBootstrap.userProfile, {foreignKey: 'userId'});
sequelizeBootstrap.userProfile.belongsTo(sequelizeBootstrap.User, {foreignKey: 'userId'});

export default sequelizeBootstrap;