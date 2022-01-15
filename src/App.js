import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  useHistory,
} from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import About from "./page/About/About";
import BaiTapToDoListSaga from "./page/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./page/Contact/Contact";
import Detail from "./page/Detail/Detail";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import PageNotFound from "./page/PageNotFound/PageNotFound";
import Profile from "./page/Profile/Profile";
import Todolist from "./page/Todolist/Todolist";
import ToDoListRedux from "./page/Todolist/ToDoListRedux";
import TodolistRFC from "./page/Todolist/TodolistRFC";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./page/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { history } from "./util/history";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import CreateProject from "./components/Cyberbugs/CreateProject/CreateProject";
import ProjectManagement from "./page/CyberBugs/ProjectManagement/ProjectManagement";
import ModalCyberBugs from "./components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/ModalCyberbugs";
import IndexCyberBugs from "./page/CyberBugs/ProjectDetail/indexCyberBugs";
import DemoDragDrop from "./page/DemoDragDrop/DemoDragDrop";
import DragAndDropDnD from "./page/DragAndDropDnD/DragAndDropDnD";
import LifeCycleReact from "./LifeCycleReact.js/LifeCycleReact";
// import DragAndDropDnD from "./page/DragAndDropDnd/DragAndDropDnd";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <>
      {/* <Header /> */}
      <LoadingComponent />
      <DrawerCyberbugs />

      <Switch>
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <HomeTemplate exact path="/dragdrop" Component={DemoDragDrop} />
        
        {/* <Route exact path='/login' component={Login} /> */}
        {/* <UserLoginTemplate exact path='/login' Component={Login} /> */}
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/todolistrfc" Component={TodolistRFC} />
        <HomeTemplate exact path="/todolistrcc" Component={Todolist} />
        <HomeTemplate exact path="/todolistredux" Component={ToDoListRedux} />

        <HomeTemplate
          exact
          path="/todolistsaga"
          Component={BaiTapToDoListSaga}
        />
        <HomeTemplate
          exact
          path="/demodragdropdnd"
          Component={DragAndDropDnD}
        />
        <HomeTemplate
          exact
          path="/lifecycle"
          Component={LifeCycleReact}
        />
        <HomeTemplate exact path="/home" Component={Home} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate exact path="/" Component={ProjectManagement} />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={IndexCyberBugs}
        />
        <HomeTemplate path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
