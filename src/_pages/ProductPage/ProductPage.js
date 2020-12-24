import React from 'react';
import {DefaultLayout} from "../../_components/layout/DefaultLayout";
import Table from "./Table";
import {Filters} from "./Filters";

function ProductPage() {
  return (
    <DefaultLayout title={"Product Page"}>
      <Filters/>
      <Table/>
    </DefaultLayout>
  );
}

export {ProductPage};