import React, { useEffect, useRef } from "react";
import CommonLayout from "../layouts/CommonLayout";
import logo from "../assets/logo.png";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { customAxios } from "../utils/CustomAxios";

//아이디 기억하기
const Login = () => {
  const refs = useRef({
    idElement: null,
    pwElement: null,
    rememberIdElement: null,
  });

  const validateFields = () => {
    const { idElement, pwElement } = refs.current;

    if (idElement.value === "") {
      alert("아이디를 입력해주세요.");
      idElement.focus();
      return false;
    }

    if (pwElement.value === "") {
      alert("비밀번호를 입력해주세요.");
      pwElement.focus();
      return false;
    }
    return true;
  };

  const requestLogin = () => {
    // validation check
    if (!validateFields()) {
      return;
    }

    const { idElement, pwElement, rememberIdElement } = refs.current;

    const loginData = {
      id: idElement.value,
      password: pwElement.value,
    };

    // axios
    customAxios
      .publicAxios({
        method: "post",
        url: "/login",
        data: loginData,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          //로그인 성공했을대
          //rememeberIdElement 체크 되있으면 로컬스토리지에 아이디 저장
          if (rememberIdElement.checked) {
            localStorage.setItem("rememberId", idElement.value);
          } else {
            localStorage.removeItem("rememberId");
          }
          const token = response.data.accessToken;
          localStorage.setItem("accessToken", token);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const setLoginPage = () => {
    const { idElement, rememberIdElement } = refs.current;
    const rememberId = localStorage.getItem("rememberId");
    if (rememberId !== null) {
      idElement.value = rememberId;
      rememberIdElement.checked = true;
    }
  };

  //로그인 페이지에 처음 들어왔을 때
  //로컬 스토리지에 rememberId가 있다면 -> input박스에 미리 채워주는 함수
  useEffect(() => {
    setLoginPage();
  }, []);

  return (
    <div>
      <CommonLayout />
      <Card style={{ borderRadius: "1rem" }}>
        <Card.Body>
          <img src={logo} style={{ width: "200px" }} alt='logo' />
          <InputGroup className='mb-3'>
            <InputGroup.Text>아이디</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.idElement = r)}
              placeholder='아이디를 입력해주세요'
              type='text'
            />
          </InputGroup>
          {/* Row -> 가로줄  Col->세로줄 */}

          <InputGroup className='mb-3'>
            <InputGroup.Text>비밀번호</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.pwElement = r)}
              placeholder='비밀번호를 입력해주세요'
              type='password'
            />
          </InputGroup>
          <Form style={{ float: "right" }}>
            <Form.Check
              ref={(r) => (refs.current.rememberIdElement = r)}
              type='checkbox'
              label='아이디 기억하기'
            />
          </Form>

          <Button variant='success' onClick={requestLogin}>
            로그인
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
