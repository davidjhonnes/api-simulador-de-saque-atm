import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
export const generatePassword = async (pass): Promise<string> => {
  return await bcrypt.hash(pass, saltOrRounds);
};

export const confirmPassword = async (password, hash): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
