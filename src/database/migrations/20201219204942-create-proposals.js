module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('proposals', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      interest_rate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      months: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      installment_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('proposals');
  },
};
