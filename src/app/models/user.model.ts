export interface IUser {
  email: string;
  senha: string;
}

export class User implements IUser {
  constructor(
    public email: string,
    public senha: string
  )
  { }
}
