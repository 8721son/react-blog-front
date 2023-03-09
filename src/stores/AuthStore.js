import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

// jwt 토큰을 디코딩해서 유저 정보를 저장하는 공간
const AuthStore = () => {
  const [loginUser, setLoginUser] = useState(undefined);

  const setLoginUserByToken = (accessToken) => {
    try {
      const decodedAccessToken = jwtDecode(accessToken);
      setLoginUser(decodedAccessToken);
    } catch (error) {
      setLoginUser(null);
    }
  };

  //최초 한 번 로컬 스토리지에 accessToken이 있다면
  //setLoginUserByToken함수를 호출
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setLoginUserByToken(accessToken);
  }, []);

  return {
    loginUser,
    setLoginUser,
    setLoginUserByToken,
  };
};

export default AuthStore;
