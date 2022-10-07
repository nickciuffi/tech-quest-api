import isEmail from 'validator/lib/isemail';
import { userData } from '../types/UserProps';
import autorizedModel from '../models/AutorizedEmailsModel';

type ValidateResultProps = {
  validated: boolean,
  msg: string
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

  public async isEmailAutorized(data: userData): Promise<boolean> {
    const finalData = await autorizedModel.getEmailByTxt(data.email);
    return finalData.length > 0;
  }

  async validateUser(data: userData): Promise<ValidateResultProps> {
    const msg = 'Everithing all right';
    const validated = true;
    if (!this.hasAllData(data)) {
      return {
        validated: false,
        msg: 'You didn`t send enought data',
      };
    }
    if (!isEmail(data.email)) {
      return {
        validated: false,
        msg: 'Invalid Email',
      };
    }
    if (!this.correctPasswordCharacters(data)) {
      return {
        validated: false,
        msg: 'he password must have from 7 to 25 characters',
      };
    }
    if (!this.hasOnlyTheCorrectFields(data)) {
      return {
        validated: false,
        msg: 'You should only send: Email, name and password',
      };
    }
    if (!(await this.isEmailAutorized(data))) {
      return {
        validated: false,
        msg: 'This email is no authorized',
      };
    }
    return {
      validated,
      msg,
    };
  }
}

export default new UserValidation();
