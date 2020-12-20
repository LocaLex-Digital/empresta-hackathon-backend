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
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Proposals, { foreignKey: 'proposal_id' });
  }
}
export default Agreements;
