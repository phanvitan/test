import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import Header from "../../components/Home/Header/Header";

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
              {/* <div className="main">
                <HeaderMain />
                <InfoMain/>             
                <ContentMain />
              </div> */}

              <Component {...propsRoute} />
              <ModalCyberBugs />
            </div>
          </>
        );
      }}
    />
  );
};
