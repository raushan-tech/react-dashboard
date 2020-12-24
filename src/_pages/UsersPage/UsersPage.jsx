import React from 'react';
import {DefaultLayout} from "../../_components/layout/DefaultLayout";
import UserTabs from "./UserTabs";

function UsersPage() {
  return (
    <DefaultLayout title={"User Page"}>
      <UserTabs/>
    </DefaultLayout>
  );
}

export {UsersPage};