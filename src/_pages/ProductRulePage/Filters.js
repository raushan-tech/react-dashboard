import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import AddRule from "./AddRule";
import {useDispatch, useSelector} from "react-redux";
import {showRuleModal} from "../../_actions";
import Pagination from "../../_components/layout/Pagination";

function Filters() {
  const dispatch = useDispatch();
  const {rule} = useSelector(state => state.ruleReducer);

  const handleAddRule = () => showRuleModal(dispatch)({}, true);

  return (
    <Grid container spacing={3} style={{paddingBottom: 6}}
          direction="row"
          justify="space-around"
          alignItems="center" >
      <Grid item xs={12} md={8}>
        {rule._id &&
          <AddRule />
        }
        {!rule._id &&
        <AddRule />
        }
        <Button size={"small"} variant="contained" color="primary" onClick={handleAddRule}>
          <AddIcon/> Add Rule
        </Button>
      </Grid>
      <Grid item xs={12} md={4} >
        <Pagination actionName={'getRules'} reducerName={ 'ruleReducer'}/>
      </Grid>
    </Grid>
  );
}

export {Filters};