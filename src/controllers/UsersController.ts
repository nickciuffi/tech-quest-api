import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import model from '../models/UsersModel';
import { userData } from '../types/UserProps';
import userValidation from '../utils/UserValidation';

class Userscontroller {
  public async store(req: Request, res: Response) {
    const data = req.body as userData;
    const validResult = await userValidation.validateUser(data);
    if (validResult.code !== 200) return res.status(validResult.code).json(validResult.msg);
    const result = await model.storeUser(data);

    return res.status(validResult.code).json(result);
  }

  public async login(req: Request, res: Response) {
    const data = req.body;
    if (!data.email || !data.password) return res.status(400).json('not enought data');
    const dataVerification = await model.verifyCredentials(data);
    if (typeof dataVerification !== 'string') {
      compare(data.password, dataVerification.password, (err, result) => {
        if (result) {
          return res.json({
            name: dataVerification.name,
            email: dataVerification.email,
          });
        }
        return res.status(401).json('Incorrect values');
      });
      return 0;
    }
    return res.status(400).json('Incorrect values');
  }
}

export default new Userscontroller();
