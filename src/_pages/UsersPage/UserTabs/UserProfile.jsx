import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useDispatch, useSelector} from "react-redux";
import {removeUserProfile} from '../../../_actions';

import UserProfileForm from './UserProfileForm'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 6,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: "#f3f2f2"

  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {

    return () => {
      removeUserProfile(dispatch)();
    }
  }, [])


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <UserProfileForm />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
