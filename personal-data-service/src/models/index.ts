// @ts-nocheck
import * as Sequelize from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './user.model.js';
import Address from './address.model.js';
import Preference from './preference.model.js';
import profile from './profile.model.js';
import contact from './contact.model.js';

interface IDb {
    Sequelize: typeof Sequelize;
    sequelize: typeof sequelize;
    User: ReturnType<typeof User>;
    Address: ReturnType<typeof Address>;
    Preference: ReturnType<typeof Preference>;
    Profile: ReturnType<typeof profile>;
    Contact: ReturnType<typeof contact>;
}

const db: Partial<IDb> = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Init models
db.User = User(sequelize, Sequelize);
db.Address = Address(sequelize, Sequelize);
db.Preference = Preference(sequelize, Sequelize);
db.Profile = profile(sequelize, Sequelize);
db.Contact = contact(sequelize, Sequelize);


// Associations
db.User.hasMany(db.Address, {foreignKey: 'userId'});
db.Address.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.Preference, {foreignKey: 'userId'});
db.Preference.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasOne(db.Profile, {foreignKey: 'userId'});
db.Profile.belongsTo(db.User, {foreignKey: 'userId'});

db.User.hasMany(db.Contact, {foreignKey: 'userId'});
db.Contact.belongsTo(db.User, {foreignKey: 'userId'});

export default db;