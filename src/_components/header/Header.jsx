import React  from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LeftDrawer from './LeftDrawer';

const useStyles = makeStyles((theme) => ({  
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2), 
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer></LeftDrawer>
    </div>
  );
}