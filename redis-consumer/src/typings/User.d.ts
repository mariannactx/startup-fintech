interface User {
  _id: ObjectId;
  type: UserTypes;
  balance: number;
  fullName: string;
  cpf: string;
  email: string;
  password: string;
}

interface UserDTO {
  type: UserTypes;
  balance: number;
  fullName: string;
  cpf: string;
  email: string;
  password: string;
}

type UserTypes = 'common' | 'store';
