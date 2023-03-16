import React, { useEffect, useRef } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import AuthStore from "../../stores/AuthStore";
import { customAxios } from "../../utils/CustomAxios";

const CheckUserModal = ({ modalShow, modalClose, callback }) => {
  const refs = useRef({
    idElement: null,
    pwElement: null,
  });

  const authStore = AuthStore();

  const validateFields = () => {
    const pw = refs.current.pwElement.value;
    if (pw === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }
    return true;
  };

  const requestCheckUser = () => {
    //validation
    if (!validateFields()) {
      return;
    }

    const { idElement, pwElement } = refs.current;

    const user = {
      id: idElement.value,
      password: pwElement.value,
    };

    customAxios
      .publicAxios({
        method: "post",
        url: "/login",
        data: user,
      })
      .then((response) => {
        if (response.status === 200) {
          callback(response.data);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const enterKeyCheckUser = (event) => {
    if (event.keyCode === 13) {
      requestCheckUser();
    }
  };

  useEffect(() => {
    if (authStore.loginUser != null) {
      refs.current.idElement.value = authStore.loginUser.id;
    }
  }, [authStore]);

  return (
    <Modal show={modalShow} onHide={modalClose} backdrop='static'>
      <Modal.Header>
        <Modal.Title>본인 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-3'>
          <InputGroup.Text>아이디</InputGroup.Text>
          <Form.Control
            ref={(r) => (refs.current.idElement = r)}
            type='text'
            disabled
          />
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Text>비밀번호</InputGroup.Text>
          <Form.Control
            ref={(r) => (refs.current.pwElement = r)}
            type='password'
            onKeyUp={enterKeyCheckUser}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={modalClose}>
          취소
        </Button>
        <Button variant='outline-success' onClick={requestCheckUser}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckUserModal;
