import { Sequelize, Model } from 'sequelize';

class Agreements extends Model {
  static init(sequelize) {
    super.init({
      state: Sequelize.STRING,
    },
    {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Proposals, { foreignKey: 'proposal_id', as: 'proposals' });
  }
}
export default Agreements;
