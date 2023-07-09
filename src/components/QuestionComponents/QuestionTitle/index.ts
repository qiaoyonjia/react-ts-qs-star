/**
 * 问卷的输入框
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTitleDefaultProps } from "./interface";

export * from "./interface";
// Title组件的配置
export default {
  title: "输入框",
  type: "questionTitle",
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
};
