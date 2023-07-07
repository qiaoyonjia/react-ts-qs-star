import { FC, useEffect, useState } from "react";
import { Input } from "antd";
import type { ChangeEvent } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import styles from "./ListSearch.module.scss";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [value, setValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  // 获取url参数，并设置到参数中
  const [searchParams] = useSearchParams();
  // 每当searchParams变化，都会执行这个回调
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(newVal);
  }, [searchParams]);

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <>
      <Search
        size="large"
        placeholder="输入关键字"
        onSearch={handleSearch}
        onChange={handleChange}
        value={value}
        style={{ width: 260 }}
        allowClear
      />
    </>
  );
};

export default ListSearch;
