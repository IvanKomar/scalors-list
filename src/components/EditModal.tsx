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

import { ProjectWithProperData, SingleDevice, SingleUser } from "../types";

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

  const userFieldsHandler = (e: ChangeEvent<HTMLInputElement>, user: SingleUser, key: keyof SingleUser) => {
    const userWithChanges = { ...user, [key]: e.target.value };
    const changedUsers = projectUsers.map(changedUser => {
      if (changedUser.appuserId === userWithChanges.appuserId) return userWithChanges
      return changedUser
    })
    setProjectUsers(changedUsers);
  }

  const devicesFieldsHandler = (e: ChangeEvent<HTMLInputElement>, device: SingleDevice, key: keyof SingleDevice) => {
      const deviceWithChanges = { ...device, [key]: e.target.value };
      const changedDevices = projectDevices.map(changedDevice => {
        if (deviceWithChanges.deviceId === changedDevice.deviceId) return deviceWithChanges
        return changedDevice
      })
      setProjectDevices(changedDevices);
  }

  const titleFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {setProjectTitle(e.target.value)}

  const displayUsersFields = projectUsers.map((user, idx) => (
    <Box key={idx + user.appuserId}>
      <TextField
        defaultValue={user.firstName}
        type="text"
        margin="dense"
        id={`${idx}First name`}
        label="First name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => userFieldsHandler(e, user, 'firstName')}
      />
      <TextField
        type="text"
        defaultValue={user.lastName}
        margin="dense"
        id={`${idx}Last name`}
        label="Last name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => userFieldsHandler(e, user, 'lastName')}
      />
    </Box>
  ));

  const displayDevicesFileds = projectDevices.map((device, idx) => (
    <Box key={idx + device.deviceId}>
      <TextField
        type="text"
        margin="dense"
        id={`${idx}Serial number`}
        label="Serial number"
        defaultValue={device.serialNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) => devicesFieldsHandler(e, device, 'serialNumber')}
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
          onChange={titleFieldHandler}
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
