import { Devices, Projects, Users, ProjectWithProperData } from "../types";

export const normalizeDate = (date: string | null): string => {
  const convertedStringToDate = date && new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return convertedStringToDate
    ? convertedStringToDate.toLocaleDateString("en-GB", options)
    : "current time";
};

export const createProjectsWithDeveicesAndUsers = (
  projects: Projects,
  devices: Devices,
  users: Users
): ProjectWithProperData[] => {
  return projects.map((project) => {
    const projectUsers = users.filter((user) => user.projectId === project.id);
    const projectDevices = devices.filter(
      (device) => device.projectId === project.id
    );
    return { ...project, users: projectUsers, devices: projectDevices };
  });
};
