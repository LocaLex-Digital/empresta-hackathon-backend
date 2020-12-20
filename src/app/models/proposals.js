import { Sequelize, Model } from 'sequelize';

class Proposals extends Model {
  static init(sequelize) {
    super.init({
      value: Sequelize.FLOAT,
      interest_rate: Sequelize.FLOAT,
      months: Sequelize.INTEGER,
      installment_value: Sequelize.FLOAT,
    },
    {
      sequelize,
    });
    return this;
  }
}
export default Proposals;
