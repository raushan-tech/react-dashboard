import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Button, Grid} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {showProductModal} from "../../../_actions";
import Table from './Table';

function Billing() {
  const {orders} = useSelector(state => state.orderReducer);

  return (
    <>
      {
        orders.length !== 0 && <Table/>

      }
    </>
  );
}

export {Billing};