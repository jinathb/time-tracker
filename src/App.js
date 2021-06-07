import { Route, Switch } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from './components/Sidebar';
import UserList from './components/user/UserList';
import RolesAndPrevilegesList from './components/RoleAndPrevileges/RolesAndPrevilegesList'
import User from './components/user/User';
import TitleBar from './components/TitleBar';
import RolesAndPrevileges from './components/RoleAndPrevileges/RolesAndPrevileges'
import GlobalStyles from './components/GlobalStyles';
import LoginComponent from './components/user/LoginComponent';
import ProjectList from './components/projects/ProjectList';
import Project from './components/projects/Project'
import TaskList from './components/projects/TaskList'
import Task from './components/projects/Task'
import Timetracker from './components/timetraking/TimeTracker';
import GroupList from './components/projects/GroupList'

const useStyles = makeStyles({
  container: {
    display: "flex"

  }
});

function App() {
  const classes = useStyles();
  return (
    <>
      <div>
        <TitleBar />
      </div>
      <div className={classes.container}>
        <GlobalStyles />
        <Sidebar />
        <Switch>
          <Route exact path="/users" component={UserList} />
          <Route exact path="/user-details" component={User} />
          <Route exact path="/roles" component={RolesAndPrevilegesList} />
          <Route exact path="/roles-details" component={RolesAndPrevileges} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/tasks" component={TaskList} />
          <Route exact path="/task" component={Task} />
          <Route exact path="/timeTracker" component={Timetracker} />
        </Switch>

      </div>
    </>
  );
}

export default App;
