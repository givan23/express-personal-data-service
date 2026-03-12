// @ts-nocheck
import * as Sequelize from 'sequelize';
import sequelize from '../config/db.config';
import User from '../modules/user/user.entity';
import Preference from '../modules/preference/preference.entity';
import profile from '../modules/profile/profile.entity';

interface IDb {
    Sequelize: typeof Sequelize;
    sequelize: typeof sequelize;
    User: ReturnType<typeof User>;
    Preference: ReturnType<typeof Preference>;
    Profile: ReturnType<typeof profile>;
}

const sequelizeBootstrap: Partial<IDb> = {};
sequelizeBootstrap.Sequelize = Sequelize;
sequelizeBootstrap.sequelize = sequelize;

// Init models
sequelizeBootstrap.User = User(sequelize, Sequelize);
sequelizeBootstrap.Preference = Preference(sequelize, Sequelize);
sequelizeBootstrap.Profile = profile(sequelize, Sequelize);


// Associations
sequelizeBootstrap.User.hasMany(sequelizeBootstrap.Preference, {foreignKey: 'userId'});
sequelizeBootstrap.Preference.belongsTo(sequelizeBootstrap.User, {foreignKey: 'userId'});

sequelizeBootstrap.User.hasOne(sequelizeBootstrap.Profile, {foreignKey: 'userId'});
sequelizeBootstrap.Profile.belongsTo(sequelizeBootstrap.User, {foreignKey: 'userId'});

export default sequelizeBootstrap;