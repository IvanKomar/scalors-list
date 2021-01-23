import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { ProjectWithProperData } from "../types";

type FormDialogProps = {
  open: boolean;
  handleClose(): void;
  handleConfirm(project: ProjectWithProperData): void;
  title: string;
  contentText?: string;
  project: ProjectWithProperData;
};

const FormDialog: React.FC<FormDialogProps> = ({
  handleClose,
  handleConfirm,
  open,
  title,
  contentText,
  project,
}) => {
  const [projectTitle, setProjectTitle] = useState(project.title);
  const [projectUsers, setProjectUsers] = useState(project.users);
  const [projectDevices, setProjectDevices] = useState(project.devices);
  useEffect(() => {
    setProjectUsers(project.users);
    setProjectDevices(project.devices);
    setProjectTitle(project.title);
  }, [project]);

  const displayUsersFields = projectUsers.map((user, idx) => (
    <Box key={idx + user.appuserId}>
      <TextField
        defaultValue={user.firstName}
        type="text"
        margin="dense"
        id={`${idx}First name`}
        label="First name"
        onChange={
          (e: ChangeEvent<HTMLInputElement>) => {
          const userWithChanges = { ...user, firstName: e.target.value };
          const changedUsers = projectUsers.map(changedUser => {
            if (changedUser.appuserId === userWithChanges.appuserId) return userWithChanges
            return changedUser
          })
          setProjectUsers(changedUsers);
        }
      }
      />
      <TextField
        type="text"
        defaultValue={user.lastName}
        margin="dense"
        id={`${idx}Last name`}
        label="Last name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const userWithChanges = { ...user, lastName: e.target.value };
          const changedUsers = projectUsers.map(changedUser => {
            if (changedUser.appuserId === userWithChanges.appuserId) return userWithChanges
            return changedUser
          })
          setProjectUsers(changedUsers);
        }}
      />
    </Box>
  ));

  const displayDevicesFileds = projectDevices.map((device, idx) => (
    <Box key={idx + device.serialNumber}>
      <TextField
        type="text"
        margin="dense"
        id={`${idx}Serial number`}
        label="Serial number"
        defaultValue={device.serialNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const deviceWithChanges = { ...device, serialNumber: e.target.value };
          projectDevices.splice(idx, 1, deviceWithChanges);
          setProjectDevices(projectDevices);
        }}
      />
    </Box>
  ));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        <TextField
          margin="dense"
          id="project name"
          label="Project name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProjectTitle(e.target.value)
          }
          value={projectTitle}
          type="text"
          fullWidth
        />
        {displayUsersFields}
        {displayDevicesFileds}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleConfirm({
              ...project,
              users: projectUsers,
              devices: projectDevices,
              title: projectTitle,
            })
          }
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
