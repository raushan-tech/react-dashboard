import React from 'react';
import {DefaultLayout} from "../../_components/layout/DefaultLayout";
import {Filters} from "./Filters";
import Table from "./Table";

function ProductRulePage() {
  return (
    <DefaultLayout title={"Product Rule Page"}>
      <Filters/>
      <Table/>
    </DefaultLayout>
  );
}

export {ProductRulePage};