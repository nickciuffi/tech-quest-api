import validator from 'validator';
import { userData } from '../types/UserProps';
import autorizedModel from '../models/AutorizedEmailsModel';

type ValidateResultProps = {
  msg: string,
  code: number
}

class UserValidation {
  public hasAllData(data: userData): boolean {
    let isValidated = true;
    if (!data.email || !data.name || !data.password) isValidated = false;
    return isValidated;
  }

  public correctPasswordCharacters(data: userData): boolean {
    let isValidated = true;
    if (data.password.length < 7 || data.password.length > 25) isValidated = false;
    return isValidated;
  }

  public hasOnlyTheCorrectFields(data: userData): boolean {
    let isValidated = true;
    if (Object.entries(data).length > 3) isValidated = false;
    return isValidated;
  }

  public async isEmailAutorized(email: string): Promise<boolean> {
    const finalData = await autorizedModel.getEmailByTxt(email);
    return finalData.length > 0;
  }

  async validateUser(data: userData): Promise<ValidateResultProps> {
    const msg = 'Everything all right';
    if (!this.hasAllData(data)) {
      return {
        msg: 'You didn`t send enought data',
        code: 400,
      };
    }
    if (!validator.isEmail(data.email)) {
      return {
        msg: 'Invalid Email',
        code: 400,
      };
    }
    if (!this.correctPasswordCharacters(data)) {
      return {
        msg: 'The password must have from 7 to 25 characters',
        code: 400,
      };
    }
    if (!this.hasOnlyTheCorrectFields(data)) {
      return {
        msg: 'You should only send: Email, name and password',
        code: 400,
      };
    }
    if (!(await this.isEmailAutorized(data.email))) {
      return {
        msg: 'This email is not authorized',
        code: 401,
      };
    }
    return {
      msg,
      code: 200,
    };
  }
}

export default new UserValidation();
