import React, { useState } from "react";
import {Drawer,Button} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../../redux/constants/Cyberbugs/Cyberbugs";

export default function DrawerCyberbugs(props) {
  const { visible,ComponentContentDrawer,callBackSubmit,title } = useSelector((state) => state.drawerReducer);

  const dispatch = useDispatch();

  console.log("visible", visible);

  const showDrawer = () => {
    dispatch({type: OPEN_DRAWER});
  };

  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };

  return (
    <>
      {/* <button onClick={showDrawer}>showdrawer</button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
{/*  noi dung thay doi cua drawer */}
{ComponentContentDrawer}

      </Drawer>
    </>
  );
}
