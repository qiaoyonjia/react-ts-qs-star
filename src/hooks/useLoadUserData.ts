import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true);

  // ajax加载用户信息
  const dispatch = useDispatch();
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      // 存储到redux store中
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 判断当前 redux store 是否已经存在用户信息
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false); // 如果redux store已经存在用户信息，就不用重新加载了
      return;
    }
    run(); // 如果redux store中没有用户信息，则进行加载
  }, [username]);

  return { waitingUserData };
}

export default useLoadUserData;
