import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = customer => () => {
    setAnchorEl(null);
    props.onSelectCustomer(customer);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" size="small" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Select Customer
      </Button>
      {props.children}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem style={{color: 'blue'}} onClick={handleSelect( 'Non Privilege Customer')}>
          Non Privilege Customer
        </MenuItem>
        {props.privilegeCustomers.map((privilegeCustomer => (
          <MenuItem key={privilegeCustomer} onClick={handleSelect(privilegeCustomer)}>{privilegeCustomer}</MenuItem>
        )))}
      </Menu>
    </div>
  );
}