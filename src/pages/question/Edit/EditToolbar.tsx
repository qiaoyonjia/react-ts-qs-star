import React, { FC } from "react";
import { Button, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from "../../../store/componentReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

  // 删除组件
  function handleClick() {
    dispatch(removeSelectedComponent());
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: false }));
  }

  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }

  // 复制
  function copy() {
    dispatch(copySelectedComponent());
  }

  // 粘贴
  function paste() {
    // 粘贴事件
    dispatch(pasteCopiedComponent());
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleClick}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
