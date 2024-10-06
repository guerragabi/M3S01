'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'alunos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nome: {
          allowNull: false, //campo obrigatório
          type: Sequelize.STRING //tipo de dado de acordo com o modelo Aluno.js
        },
        data_nascimento: {
          allowNull: false,
          type: Sequelize.DATE
        },
        celular: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
     });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('alunos');
  }
};
