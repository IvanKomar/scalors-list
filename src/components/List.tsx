import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  IconButton,
  Box,
  Typography,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Delete, Edit, ExpandLess, ExpandMore } from "@material-ui/icons";
import UsersSublist from "./UsersSublist";
import DevicesSublist from "./DevicesSublist";
import EditModal from "./EditModal";
import { normalizeDate } from "../helpers";
import { ProjectWithProperData } from "../types";
import useDialog from "../hooks/useDialog";

type ListProps = {
  projects: ProjectWithProperData[];
};

export default function ListComponent({ projects }: ListProps) {
  const [projectsState, setProjectsState] = useState<ProjectWithProperData[]>(
    []
  );
  const [opened, setOpened] = React.useState<number[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectWithProperData>();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useDialog();

  useEffect(() => {
    setProjectsState(projects);
  }, [projects]);

  useEffect(() => {
    setProjectsState(projectsState);
  }, [projectsState]);

  const handleExpandListIntem = (id: number) => {
    if (opened.includes(id)) {
      setOpened(opened.filter((item) => item !== id));
      return;
    }
    setOpened([...opened, id]);
  };
  const handleEditClick = (project: ProjectWithProperData) => {
    setProjectInfo(project);
    handleOpenModal();
  };

  const handleConfirModal = (changedProjectInfo: ProjectWithProperData) => {
    setProjectInfo(undefined);
    const changedProjectIndex = projectsState.findIndex(
      (oldProjectInfo) => oldProjectInfo.id === changedProjectInfo.id
    );
    projectsState.splice(changedProjectIndex, 1, changedProjectInfo);
    setProjectsState(projectsState);
  };

  const handleRemove = (id: number) => {
    setProjectsState(projectsState.filter((proj) => proj.id !== id));
    setOpened(opened.filter((existId) => existId !== id));
  };

  const listItem = projectsState.map((project: ProjectWithProperData) => (
    <Box key={project.id + project.title}>
      <ListItem dense onClick={() => handleExpandListIntem(project.id)} button>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="between"
          width="80%"
        >
          <ListItemText>
            <Typography>{project.title}</Typography>
            <Typography color="textSecondary">{`${normalizeDate(
              project.beginDate
            )} - ${normalizeDate(project.expirationDate)}`}</Typography>
            {project.users.length || project.devices.length ? (
              opened.includes(project.id) ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(project);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(project.id);
              }}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>
      <Divider />
      {!!project.users.length && (
        <UsersSublist
          isExistInProject={opened.includes(project.id)}
          users={project.users}
        />
      )}
      {!!project.devices.length && (
        <DevicesSublist
          isExistInProject={opened.includes(project.id)}
          devices={project.devices}
        />
      )}
    </Box>
  ));

  return (
    <Box width="100%">
      <List>{listItem}</List>
      {projectInfo && (
        <EditModal
          project={projectInfo}
          open={isModalOpen}
          handleClose={handleCloseModal}
          title={`Changing of project: ${projectInfo.title}`}
          handleConfirm={handleConfirModal}
        />
      )}
    </Box>
  );
}
