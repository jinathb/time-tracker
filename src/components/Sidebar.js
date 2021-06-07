import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonOutline from '@material-ui/icons/PersonOutline';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import GroupIcon from '@material-ui/icons/Group';
import UpdateIcon from '@material-ui/icons/Update';
import EventNoteIcon from '@material-ui/icons/EventNote';

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    title: {
        flexGrow: 1,
    },

    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function Sidebar() {
    const classes = useStyles();
    const drawerItems = [
        { key: "users", text: "User Profiles", path: "/users", icon: <PersonOutline /> },
        { key: "userRoles", text: "User Roles", path: "/roles", icon: <VerifiedUserIcon /> },
        { key: "projects", text: "Projects", path: "/projects", icon: <AssignmentTurnedInIcon /> },
        { key: "tasks", text: "Tasks", path: "/tasks", icon: <AssignmentIcon /> },
        { key: "group", text: "groups", path: "/groups", icon: <GroupIcon /> },
        { key: "timeSheet", text: "Time Sheet", path: "/timeSheet", icon: <EventNoteIcon /> },
        { key: "timeTracker", text: "Time Tracker", path: "/timeTracker", icon: <UpdateIcon /> }
    ]
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawer}
        >
            <Box alignItems="center" display="flex" flexDirection="column" p="2" padding="20px">
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    Time Tracker
                </Typography>
            </Box>
            <Divider />
            <List>
                {drawerItems.map((item) => {
                    const { text, key, icon, path } = item;
                    return (
                        <ListItem button key={key} component={Link} to={path}>
                            {icon && icon !== "" ? <ListItemIcon> {icon}</ListItemIcon> : ""}
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    )
}
