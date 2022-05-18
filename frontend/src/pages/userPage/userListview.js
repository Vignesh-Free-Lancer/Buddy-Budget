import React, { lazy } from "react";
import "./user-list.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const Listview = lazy(() =>
  import("../../components/userListview/userListview")
);

const UserListview = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.UserListview}>
      <div className="user-listview__section">
        <Listview />
      </div>
    </MainScreen>
  );
};

export default UserListview;
