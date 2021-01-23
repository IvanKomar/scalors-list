import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListSubheader,
} from "@material-ui/core";
import { Users } from "../types";

const ProjectUsers = ({
  users,
  isExistInProject,
}: {
  users: Users;
  isExistInProject: boolean;
}) => (
  <Collapse in={isExistInProject} timeout="auto" unmountOnExit>
    <List
      dense
      style={{ paddingLeft: "30px" }}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Project users
        </ListSubheader>
      }
      component="div"
      disablePadding
    >
      {users.map((user, idx) => {
        return (
          <ListItem
            dense
            disabled={!!user.disabled}
            key={idx + user.firstName + Date.now()}
          >
            <ListItemText>
              № {idx + 1}: {user.firstName} {user.lastName}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  </Collapse>
);

export default ProjectUsers;
