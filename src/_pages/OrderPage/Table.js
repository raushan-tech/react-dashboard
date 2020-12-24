import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import CurrencyIcon from '@material-ui/icons/AttachMoney';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {addOrder, getProducts, removeOrder} from '../../_actions'
import {LinearProgress} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ProductTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {fetchingProducts} = useSelector(state => state.productReducer);

  useEffect(() => {
    getProducts(dispatch)();
  }, []);

  const handleAddOrder = (product) => () => addOrder(dispatch)(product);
  const handleRemoveOrder = (product) => () => removeOrder(dispatch)(product);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Actions</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Size</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Retail Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((product) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell align="center">
                <Button size="small" color="primary" onClick={handleAddOrder(product)}>
                  <AddIcon/>
                </Button>
                <Button size="small" color="primary" onClick={handleRemoveOrder(product)}>
                  <RemoveIcon/>
                </Button>
              </StyledTableCell>
              <StyledTableCell component="th" scope="product">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="center">{product.size}</StyledTableCell>
              <StyledTableCell align="center">{product.type}</StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h4">
                  {product.retailPrice && <CurrencyIcon/>}
                  {product.retailPrice || 'NA'}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {fetchingProducts && <LinearProgress/>}
    </TableContainer>
  );
}