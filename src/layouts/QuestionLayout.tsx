import { FC } from "react";
import { Outlet } from "react-router-dom";
// import styles from "./QuestionLayout.module.scss";

const QuestionLayout: FC = () => {
  return (
    <>
      <p>Question layout</p>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default QuestionLayout;
