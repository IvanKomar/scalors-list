export type SingleDevice = {
  deviceId: number;
  projectId: number;
  serialNumber: string;
};
export type Devices = SingleDevice[];
export type SingleProject = {
  id: number;
  title: string;
  parentId: null | number;
  beginDate: string;
  expirationDate: string;
  deleted: number;
};
export type Projects = SingleProject[];
export type SingleUser = {
  appuserId: number;
  projectId: number;
  firstName: string;
  lastName: string;
  disabled: number;
};
export type Users = SingleUser[];

export interface ProjectWithProperData extends SingleProject {
  users: Users;
  devices: Devices;
}
