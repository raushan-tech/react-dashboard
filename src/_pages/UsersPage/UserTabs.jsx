import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserTable from "./UserTabs/UserTable";
import UserProfile from "./UserTabs/UserProfile";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleTabs}>
          <Tab label="Users List" {...a11yProps(0)} />
          <Tab label="User Profile" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div style={{padding: 8, minHeight: 100}}>
        {value === 0 && <UserTable handleTabs={handleTabs}/>}
        {value === 1 && <UserProfile/>}
      </div>
    </div>
  );
}
