import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import {useSnackbar} from 'notistack';
import {useSelector} from "react-redux";
import {JSONViewer} from 'react-json-editor-viewer';

const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateName = name => {

  return !(Boolean(name) && name.length);
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "350",
    },
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

export default function ValidationTextFields() {
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const userReducer = useSelector(state => state.userReducer.user);
  const [userObject, setUserObject] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(userReducer);
  }, []);


  const handleSubmit = () => () => {
    let isError = false;
    if (!re.test(user.email)) {
      isError = true;
      enqueueSnackbar('Check email id!', {variant: "warning"});
    }
    if (validateName(user.first_name)) {
      isError = true;
      enqueueSnackbar('Name is required', {variant: "warning"});
    }
    if (validateName(user.age)) {
      isError = true;
      enqueueSnackbar('Age is required', {variant: "warning"});
    }
    if (!['male', 'female', 'other'].includes(user.gender)) {
      isError = true;
      enqueueSnackbar('Gender is required', {variant: "warning"});
    }

    if (!user.position || user.position === 'Non') {
      isError = true;
      enqueueSnackbar('Position is required', {variant: "warning"});
    }

    if (!isError) {
      setUserObject(user);
      enqueueSnackbar('Form is submitted successfully.', {variant: "success"});

    }
  };

  const handleCheckBox = (gender) => {
    setUserObject({});
    let newGender = user.gender === gender ? '' : gender;
    setUser(prevUser => ({...prevUser, gender: newGender}));
  }
  const handleInput = (e, key) => {
    e.persist();
    setUserObject({});

    setUser(prevUser => ({...prevUser, [key]: e.target.value}));
  }

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          error={!re.test(user.email)}
          label="Email"
          type={'email'}
          value={user.email || ''}
          onChange={(e) => handleInput(e, 'email')}
          variant="outlined"
        />
        <TextField
          error={validateName(user.first_name)}
          type={'text'}
          label="First Name"
          value={user.first_name || ''}
          onChange={(e) => handleInput(e, 'first_name')}
          variant="outlined"
        />
        <TextField
          error={validateName(user.age)}
          type={'number'}
          label="Age"
          value={user.age || ''}
          onChange={(e) => handleInput(e, 'age')}
          variant="outlined"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={user.gender === 'male'}
              onChange={() => handleCheckBox('male')}
              color="primary"
            />
          }
          label="Male"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={user.gender === 'female'}
              onChange={() => handleCheckBox('female')}
              color="primary"
            />
          }
          label="Female"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={user.gender === 'other'}
              onChange={() => handleCheckBox('other')}
              color="primary"
            />
          }
          label="Other"
        />
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Position</InputLabel>
          <Select
            value={user.position || 'Non'}
            onChange={(e) => {
              setUserObject({});
              setUser(prevUser => ({...prevUser, position: e.target.value}));
            }}
          >
            <MenuItem value={'Non'} disabled>Non</MenuItem>
            <MenuItem value={'Intern'}>Intern</MenuItem>
            <MenuItem value={'Jr Developer'}>Jr Developer</MenuItem>
            <MenuItem value={'Sr Developer'}>Sr Developer</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Divider/>
      <br/>
      <div>
        <React.Fragment>
          <Button variant="contained" color="primary" onClick={handleSubmit()}>Submit</Button>
        </React.Fragment>
      </div>
      {userObject.id &&
      <div>
        <br/>

        <Divider/>
        <JSONViewer
          data={userObject}
        />
      </div>
      }
    </div>
  );
}
