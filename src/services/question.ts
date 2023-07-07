import axios from "./ajax";
import type { ResDateType } from "./ajax";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDateType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDateType;
  return data;
}

// 创建问卷
export async function createQuestionService(): Promise<ResDateType> {
  const url = "/api/question";
  const data = (await axios.post(url)) as ResDateType;
  return data;
}

// 获取（查询）列表
export async function getQuestionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDateType> {
  const url = "/api/question";
  const data = (await axios.get(url, { params: opt })) as ResDateType;
  return data;
}
