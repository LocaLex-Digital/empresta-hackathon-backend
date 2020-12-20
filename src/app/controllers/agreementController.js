import * as Yup from 'yup';
import Agreements from '../models/agreements';

class AgreementsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      state: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    try {
      const {
        id, state, user_id, proposal_id,
      } = await Agreements.create(req.body);
      return res.json({
        id, state, user_id, proposal_id,
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      state: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const agr = await Agreements.findByPk(req.params.id);
    const {
      id, state, user_id, proposal_id,
    } = await agr.update(req.body);
    return res.json({
      id, state, user_id, proposal_id,
    });
  }

  async index(req, res) {
    try {
      const agreementCollection = await Agreements.findAll({
        where: {
          user_id: req.userId,
        },
      });

      return res.json(agreementCollection);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async show(req, res) {
    const Agreement = await Agreements.findByPk(req.params.id);
    return res.json({
      Agreement,
    });
  }
}
export default new AgreementsController();
