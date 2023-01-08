'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blog_attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        defaultValue: Sequelize.literal('public.uuid_generate_v4()'),
        type: Sequelize.UUID
      },
      blog_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      attachment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      attachment_mimetype: {
        type: Sequelize.TEXT
      },
      attachment_size: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blog_attachments');
  }
};