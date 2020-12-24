import React, {useEffect} from 'react';
import {DefaultLayout} from "../../_components/layout/DefaultLayout";
import {Grid, Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Billing} from './BillingComponents/Billing'
import {OrderForm} from './OrderForm'
import {useDispatch, useSelector} from "react-redux";
import {removeAllOrders} from "../../_actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function OrderPage() {
  const classes = useStyles();
  const {orders} = useSelector(state => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(() => () => removeAllOrders(dispatch)(), [])
  return (
    <DefaultLayout title={"Order Page"}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <OrderForm>
            </OrderForm>
          </Paper>
        </Grid>
        {orders.length !== 0 &&
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Billing/>
          </Paper>
        </Grid>
        }
      </Grid>
    </DefaultLayout>
  );
}

export {OrderPage};