'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db) {
    return db.createTable('account', {
        id: { type: 'string', primaryKey: true },
        email: { type: 'string', unique: true, notNull: true },
        password: { type: 'string', notNull: true },
        createdAt: { type: 'datetime', notNull: true },
        updatedAt: { type: 'datetime', notNull: true },
        accountId: {
            type: 'string',
            notNull: true,
            foreignKey: {
                name: 'fk_account_user_id',
                table: 'user',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT',
                },
                mapping: 'id',
            },
        },
    });
};

exports.down = function(db) {
    return db.dropTable('account');
};

exports._meta = {
    version: 1,
};
