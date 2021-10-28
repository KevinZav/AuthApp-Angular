export interface Auth {
  id:       number;
  username: string;
  user:     User;
}

export interface User {
  id?:       number;
  name:     string;
  lastName: string;
  email:    string;
  phone?:    string;
  rfc?:      string;
  photo?:    null;
  role?:     Role;
}

export interface Role {
  id:          number;
  name:        string;
  description: string;
}

export interface createUser {
  newUser: User;
}

export interface createAuth {
  user: User;
}
