import axios from "axios";
import React, { useRef } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import CommonLayout from "../layouts/CommonLayout";
import { customAxios } from "../utils/CustomAxios";

const Join = () => {
  const refs = useRef({
    idElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDescElement: null,
  });

  const validateFields = () => {
    // 1. 빈 값 없는지
    // 2. id,pw 형식 맞는지 (x)
    // 3. pw, pw2 똑같은지

    //구조분할 할당
    const { idElement, pwElement, pw2Element, simpleDescElement } =
      refs.current;

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

    if (pw2Element.value === "") {
      alert("비밀번호 확인을 입력해주세요.");
      pw2Element.focus();
      return false;
    }

    if (simpleDescElement.value === "") {
      alert("소개를 입력해주세요.");
      simpleDescElement.focus();
      return false;
    }

    if (pwElement.value !== pw2Element.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pw2Element.focus();
      return false;
    }

    return true;
  };

  const requestJoin = () => {
    // validation check (null,type)

    //validateFields()===false
    if (!validateFields()) {
      return;
    }

    const { idElement, pwElement, pw2Element, simpleDescElement } =
      refs.current;

    const userData = {
      id: idElement.value,
      password: pwElement.value,
      simpleDesc: simpleDescElement.value,
    };

    customAxios
      .publicAxios({
        method: "post",
        url: "/v1/api/user/join",
        data: userData,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(() => {})
      .finally(() => {});
  };

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
          <Row>
            <Col>
              <InputGroup className='mb-3'>
                <InputGroup.Text>비밀번호</InputGroup.Text>
                <Form.Control
                  ref={(r) => (refs.current.pwElement = r)}
                  placeholder='비밀번호를 입력해주세요'
                  type='password'
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className='mb-3'>
                <InputGroup.Text>비밀번호 확인</InputGroup.Text>
                <Form.Control
                  ref={(r) => (refs.current.pw2Element = r)}
                  placeholder='비밀번호를 다시 입력해주세요'
                  type='password'
                />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className='mb-3'>
            <InputGroup.Text>한 줄 소개</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.simpleDescElement = r)}
              placeholder='소개를 입력해주세요'
              type='text'
            />
          </InputGroup>
          <Button
            variant='success'
            style={{ textAlign: "center" }}
            onClick={requestJoin}
          >
            회원가입
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Join;
