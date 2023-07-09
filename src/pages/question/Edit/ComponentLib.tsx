import React, { FC } from "react";
import {
  ComponentConfType,
  componentConfGroup,
} from "../../../components/QuestionComponents";
import { Typography } from "antd";
import styles from "./ComponentLib.module.scss";
import { addComponent } from "../../../store/componentReducer";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

const { Title } = Typography;

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(), // 前端生成的id
        title,
        type,
        props: defaultProps,
      })
    );
  }

  return (
    <div key={title} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
