import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { getNextSelectedId, insertNewComponent } from "./utils";
import cloneDeep from "lodash.clonedeep";
import { nanoid } from "nanoid";

export type ComponentInfoType = {
  fe_id: string; // 前端生成的id，服务端mongodb不认这种格式，所以自定义一个fe_id
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string; // 选中组件Id
  componentList: Array<ComponentInfoType>; // 组件列表
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload;
    },

    // 修改selectId
    changeSelectedId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      }
    ),

    // 添加新组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>
      ) => {
        const newComponent = action.payload;
        insertNewComponent(draft, newComponent);
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload;

        // 当前要修改属性的组件
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      }
    ),

    // 删除选中组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft;

      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList);
      draft.selectedId = newSelectedId;

      const index = componentList.findIndex((c) => c.fe_id === removedId);
      componentList.splice(index, 1);
    }),

    // 隐藏/显示组件
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const { componentList } = draft;
        const { fe_id, isHidden } = action.payload;

        // 重新计算selectId
        let newSelectedId = "";
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          // 要显示
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
        }
      }
    ),

    // 锁定/解锁组件
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        const { fe_id } = action.payload;
        const { componentList } = draft;

        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      }
    ),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId
      );

      if (selectedComponent == null) return;
      draft.copiedComponent = cloneDeep(selectedComponent); // 深拷贝
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;

      // 要把fe_id修改
      copiedComponent.fe_id = nanoid();

      // 插入 copiedComponent
      insertNewComponent(draft, copiedComponent);
    }),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
