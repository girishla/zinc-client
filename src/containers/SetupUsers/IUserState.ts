import { IUserCollection } from "./IUser";

export interface IUserState {
  data: IUserCollection[];
  loading: boolean;
}
