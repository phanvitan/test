import React, { useRef } from "react";
import { useState } from "react";
import "./DemoDragDrop.css";
import { useSpring, animated } from "react-spring";

const defaultValue = [
  { id: 1, taskName: "Task 1" },
  { id: 2, taskName: "Task 2" },
  { id: 3, taskName: "Task 3" },
  { id: 4, taskName: "Task 4" },
  { id: 5, taskName: "Task 5" },
];

export default function DemoDragDrop(props) {
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDrag = useRef({});
  const tagDragEnter = useRef({});

  //animation
  const [propsSpring, set, stop] = useSpring(() => ({
    from: { bottom: -25 },
    to: { bottom: 0 },
    config: { duration: 250 },
    reset: true,
  }));

  const handleDragStart = (e, task, index) => {
    console.log("tag", e.target);
    console.log("task", task);
    // luu lai giá trị của task đang drag
    tagDrag.current = task;
  };

  const handleDragEnter = (e, taskDragEnter, index) => {
    // console.log("dragEnterTag", e.target);
    // console.log("targetOver", task);
    // console.log('index',index);

    set({ bottom: 0 });

    //luu lai gia tri cua task duoc keo ngang qua
    tagDragEnter.current = { ...taskDragEnter };

    let taskListUpdate = [...taskList];
    //lấy ra index thằng đang kéo
    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );
    //lấy ra index thằng bị kéo qua
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );
    //biến chứa giá trị thằng đang kéo
    let temp = taskListUpdate[indexDragTag];
    //lấy giá trị tại vị trí đang kéo gán = thằng kéo qua
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    //lấy thằng kéo qua gán = đang kéo
    taskListUpdate[indexDragEnter] = temp;

    setTaskList(taskListUpdate);
  };

  const handleDragEnd = (e) => {
  //   tagDrag.current = {};
  //   console.log("dragEnd");
  //   setTaskList([...taskList]);
  };

  const handleDrop = (e) => {
    console.log("drop", e.target);
  };

  return (
    <div
      className="container"
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        tagDrag.current = {};
        console.log("dragEnd");
        setTaskList([...taskList]);
      }}
    >
      <div className="row">
        <div className="col-2"></div>
        <div className="bg-dark p-5 col-4
        ">
          {taskList.map((task, index) => {
            let cssDragTag = task.id === tagDrag.current.id ? "dragTag" : "";

            if (task.id === tagDragEnter.current.id) {
              return (
                <animated.div
                  style={{
                    position: "relative",
                    bottom: propsSpring.bottom.interpolate(
                      (numBottom) => `${numBottom}px`
                    ),
                  }}
                  onDragStart={(e) => {
                    handleDragStart(e, task, index);
                  }}
                  onDragEnter={(e) => {
                    handleDragEnter(e, task, index);
                  }}
                  onDragEnd={(e) => {
                    handleDragEnd(e);
                  }}
                  draggable="true"
                  key={index}
                  className={`bg-success text-white m-1 p-3}`}
                >
                  {task.taskName}
                </animated.div>
              );
            }

            return (
              <div
                onDragStart={(e) => {
                  handleDragStart(e, task, index);
                }}
                onDragEnter={(e) => {
                  handleDragEnter(e, task, index);
                }}
                onDragEnd={(e) => {
                  handleDragEnd(e);
                }}
                draggable="true"
                key={index}
                className={`bg-success text-white m-1 p-3 ${cssDragTag}`}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div className="col-2 bg-primary">hjhjjjjjjjjjjjjjjjjjjjjj</div>
      </div>
    </div>
  );
}

// onDragOver={(e) => {
//   e.stopPropagation();
//   e.preventDefault();
// }}
