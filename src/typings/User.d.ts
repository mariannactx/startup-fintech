interface User {
  id: number;
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
