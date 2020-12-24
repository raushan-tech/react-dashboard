import React, {useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {getRules} from '../../_actions';
import {LinearProgress} from "@material-ui/core"
import Button from "@material-ui/core/Button";
import {showRuleModal} from '../../_actions'


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

export default function RuleTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {rules, fetchingRules} = useSelector(state => state.ruleReducer);

  useEffect(() => {
    getRules(dispatch)({}, {pageNumber: 1, itemsPerPage: 3});
  }, []);

  const handleEdit = rule => () => showRuleModal(dispatch)(rule, true);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Product Count</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
            <StyledTableCell align="center">Product Id</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((rule) => (
            <StyledTableRow key={rule._id}>
              <StyledTableCell component="th" scope="rule">
                {rule.name}
              </StyledTableCell>
              <StyledTableCell align="center">{rule.count}</StyledTableCell>
              <StyledTableCell align="center">{rule.discount}</StyledTableCell>
              <StyledTableCell align="center">
                {rule.productId._id ? <span> {rule.productId._id} </span> : rule.productId}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button size="small" color="primary" onClick={handleEdit(rule)}>Edit</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {fetchingRules && <LinearProgress/>}
    </TableContainer>
  );
}
