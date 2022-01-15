import { GET_ALL_PROJECT, GET_LIST_PROJECT } from "../constants/Cyberbugs/Cyberbugs";

const stateDefault = {
  projectList: [],
  arrProject:[] //get allproject cho dropdown
};

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      state.projectList = action.projectList;
      console.log("projectList", action.projectList);
      return { ...state };
    }
    case GET_ALL_PROJECT:{
      state.arrProject = action.arrProject;
      return {...state}
      /**co the viet tat nhu sau :
       * case GET_ALL_PROJECT:{
       * return {...state,arrProject:action.arrProject}
       * }
       */
    }
    default:
      return { ...state };
  }
};