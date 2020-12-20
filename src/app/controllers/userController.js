import * as Yup from 'yup';
import User from '../models/user';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      cpf: Yup.string().required(),
      date_of_birth: Yup.string().required(),
      phone: Yup.string().required(),
      cep: Yup.string().required(),
      address: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      paycheck: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) { return res.status(400).json({ error: 'Email already exists.' }); }
    const {
      id, name, email,
    } = await User.create(req.body);
    return res.json({
      id, name, email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      paycheck: Yup.number(),
      target_value: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const user = await User.findByPk(req.userId);

    const { id, paycheck, target_value } = await user.update(req.body);

    return res.json({
      id, paycheck, target_value,
    });
  }

  async index(req, res) {
    try {
      const userCollection = await User.findAll({});

      return res.json(userCollection);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async show(req, res) {
    const user = await User.findByPk(req.userId);
    return res.json({
      user,
    });
  }
}

export default new UserController();
