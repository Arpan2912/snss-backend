'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blog', {
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
      poster_image: {
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      category: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      likes: {
        type: Sequelize.INTEGER
      },
      sub_category: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.TEXT
      },
      created_by_email: {
        type: Sequelize.TEXT
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('blog');
  }
};