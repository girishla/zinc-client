import { ISalesforceObjectCollection } from "./ISalesforceObject";

export interface ISalesforceObjectState {
  data: ISalesforceObjectCollection[];
  loading: boolean;
  salesforceObjectNames: string[];
}
