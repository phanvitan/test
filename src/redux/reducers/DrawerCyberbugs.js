import React from "react";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_CREATE_TASK,
  SET_SUBMIT_EDIT_PROJECT,
} from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
  visible: false,
  title: "",
  ComponentContentDrawer: <p>default content</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo");
  },
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };
    case CLOSE_DRAWER:
      return { ...state, visible: false };
    /****  cach 1
  * 
      // case OPEN_FORM_EDIT_PROJECT: {
    //   return {
    //     ...state,
    //     visible: true,
    //     ComponentContentDrawer: action.Component,
    //   };
    // }
  */

    /**cach 2 */
    case OPEN_FORM_EDIT_PROJECT: {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case SET_SUBMIT_EDIT_PROJECT: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    case SET_SUBMIT_CREATE_TASK:{
      return {...state,callBackSubmit:action.submitFunction}
    }
    case OPEN_FORM_CREATE_TASK: {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.Component;
      return {...state}
    }
    default:
      return state;
  }
};
