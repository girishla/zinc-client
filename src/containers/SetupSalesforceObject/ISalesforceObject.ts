export interface IField {
  aggregatable: boolean;
  autoNumber: boolean;
  byteLength: number;
  calculated: boolean;
  calculatedFormula: string;
  cascadeDelete: boolean;
  caseSensitive: boolean;
  compoundFieldName: string;
  controllerName: string;
  createable: boolean;
  custom: boolean;
  defaultValueFormula: string;
  defaultedOnCreate: boolean;
  dependentPicklist: boolean;
  deprecatedAndHidden: boolean;
  digits: number;
  displayLocationInDecimal: boolean;
  encrypted: boolean;
  externalId: boolean;
  extraTypeInfo: string;
  filterable: boolean;
  groupable: boolean;
  highScaleNumber: boolean;
  htmlFormatted: boolean;
  idLookup: boolean;
  inlineHelpText: string;
  label: string;
  length: number;
  mask?: any;
  maskType?: any;
  name: string;
  nameField: boolean;
  namePointing: boolean;
  nillable: boolean;
  permissionable: boolean;
  picklistValues: any[];
  polymorphicForeignKey: boolean;
  precision: number;
  queryByDistance: boolean;
  referenceTargetField?: any;
  referenceTo: any[];
  relationshipName: string;
  relationshipOrder: number;
  restrictedDelete: boolean;
  restrictedPicklist: boolean;
  scale: number;
  searchPrefilterable: boolean;
  soapType: string;
  sortable: boolean;
  type: string;
  unique: boolean;
  updateable: boolean;
  writeRequiresMasterRead: boolean;
  createdDate: Date;
  updatedDate: Date;
  id: string;
}

export interface ISelf {
  href: string;
}

export interface IZincSObject {
  href: string;
}

export interface ILinks {
  self: ISelf;
  zincSObject: IZincSObject;
}

export interface ISalesforceObject {
  name: string;
  activateable: boolean;
  createable: boolean;
  custom: boolean;
  customSetting: boolean;
  deletable: boolean;
  deprecatedAndHidden: boolean;
  feedEnabled: boolean;
  keyPrefix: string;
  label: string;
  labelPlural: string;
  layoutable: boolean;
  mergeable: boolean;
  mruEnabled: boolean;
  queryable: boolean;
  replicateable: boolean;
  retrieveable: boolean;
  searchable: boolean;
  triggerable: boolean;
  undeletable: boolean;
  updateable: boolean;
  createdDate: string;
  updatedDate: string;
  fields: IField[];
  lastRefreshDate?: any;
  valueHash: string;
  syncDirty: boolean;
  id: string;
  _links: ILinks;
}

export interface IEmbedded {
  sobjects: ISalesforceObject[];
}

export interface IFirst {
  href: string;
}

export interface ISelf2 {
  href: string;
  templated: boolean;
}

export interface INext {
  href: string;
}

export interface ILast {
  href: string;
}

export interface IProfile {
  href: string;
}

export interface ISearch {
  href: string;
}

export interface ISalesforceObjectLinks {
  first: IFirst;
  self: ISelf2;
  next: INext;
  last: ILast;
  profile: IProfile;
  search: ISearch;
}

export interface IPage {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface ISalesforceObjectCollection {
  _embedded: IEmbedded;
  _links: ISalesforceObjectLinks;
  page: IPage;
}
