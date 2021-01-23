import { useEffect, useState } from "react";
import List from "./components/List";
import { Projects, Devices, Users, ProjectWithProperData } from "./types";
import { createProjectsWithDeveicesAndUsers } from "./helpers";

import projectsMock from "./mocks/project.json";
import deviceMock from "./mocks/device.json";
import usersMock from "./mocks/user.json";

function App() {
  const [projects, setProjects] = useState<ProjectWithProperData[]>([]);
  const initialProjects = projectsMock as Projects;
  const initialDevices = deviceMock as Devices;
  const initalUsers = usersMock as Users;
  useEffect(() => {
    const normlizedProjects = createProjectsWithDeveicesAndUsers(
      initialProjects,
      initialDevices,
      initalUsers
    );
    setProjects(normlizedProjects);
  }, [initialProjects, initialDevices, initalUsers]);
  return (
    <div className="App">
      <List projects={projects} />
    </div>
  );
}

export default App;
