import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListSubheader,
} from "@material-ui/core";
import { Devices } from "../types";

const ProjectDevices = ({
  devices,
  isExistInProject,
}: {
  devices: Devices;
  isExistInProject: boolean;
}) => (
  <Collapse in={isExistInProject} timeout="auto" unmountOnExit>
    <List
      dense
      style={{ paddingLeft: "30px" }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Project devices
        </ListSubheader>
      }
      component="div"
      disablePadding
    >
      {devices.map((device, idx) => {
        return (
          <ListItem dense key={idx + device.serialNumber + +Date.now()}>
            <ListItemText>
              №{idx + 1}: {device.serialNumber}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  </Collapse>
);

export default ProjectDevices;
