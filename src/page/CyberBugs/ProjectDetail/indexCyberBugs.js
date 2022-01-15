import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentMain from "../../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";
import { GET_PROJECT_DETAIL } from "../../../redux/constants/Cyberbugs/Cyberbugs";

export default function IndexCyberBugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  console.log("projectDetail", projectDetail);

  useEffect(() => {
    //khi nguoi dung link qua trang nay bang the navlink hoac nguoi dung tu go url thi ta se lay tham so tu url=> goi saga
    const { projectId } = props.match.params;

    dispatch({
      type: GET_PROJECT_DETAIL,
      projectId
    });
  }, []);

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
