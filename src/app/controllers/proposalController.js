import * as Yup from 'yup';
import Proposals from '../models/proposals';

class ProposalsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      interest_rate: Yup.number().required(),
      months: Yup.number().required(),
      installment_value: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    try {
      const { value } = await Proposals.create(req.body);
      return res.json({
        value,
      });
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      value: Yup.number(),
      interest_rate: Yup.number(),
      months: Yup.number(),
      installment_value: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const prop = await Proposals.findByPk(req.params.id);
    const {
      id, value, interest_rate, months, installment_value,
    } = await prop.update(req.body);
    return res.json({
      id, value, interest_rate, months, installment_value,
    });
  }

  async index(req, res) {
    try {
      const proposalCollection = await Proposals.findAll({});

      return res.json(proposalCollection);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async show(req, res) {
    const proposal = await Proposals.findByPk(req.params.id);
    return res.json({
      proposal,
    });
  }
}

export default new ProposalsController();
