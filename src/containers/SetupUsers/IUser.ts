export interface ISelf {
  href: string;
}

export interface ILinks {
  self: ISelf;
  user: ISelf;
}

export interface IUser {
  createdDate: string;
  modifiedDate: string;
  username: string;
  password: string;
  email: string;
  lastPasswordReset?: any;
  authorities: string;
  _links: ILinks;
}

export interface IEmbedded {
  users: IUser[];
}

export interface ISelf2 {
  href: string;
  templated: boolean;
}

export interface IProfile {
  href: string;
}

export interface ISearch {
  href: string;
}

export interface ILinks2 {
  self: ISelf2;
  profile: IProfile;
  search: ISearch;
}

export interface IPage {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface IUserCollection {
  _embedded: IEmbedded;
  _links: ILinks2;
  page: IPage;
}
