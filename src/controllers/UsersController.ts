import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import model from '../models/UsersModel';
import { userData } from '../types/UserProps';
import userValidation from '../utils/UserValidation';

class Userscontroller {
  public async store(req: Request, res: Response) {
    const data = req.body as userData;
    const validResult = await userValidation.validateUser(data);
    if (!validResult.validated) return res.json(validResult.msg);
    const result = await model.storeUser(data);

    return res.json(result);
  }

  public async login(req: Request, res: Response) {
    const data = req.body;
    if (!data.email || !data.password) return res.json('not enought data');
    const passHash = await model.verifyCredentials(data);
    compare(data.password, passHash, (err, result) => res.json(result));
    return 0;
  }
}

export default new Userscontroller();
