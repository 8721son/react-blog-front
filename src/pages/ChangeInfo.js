import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckUserModal from "../components/common/CheckUserModal";
import CommonLayout from "../layouts/CommonLayout";
import AuthStore from "../stores/AuthStore";
import { customAxios } from "../utils/CustomAxios";

const ChangeInfo = () => {
  const [modalShow, setModalShow] = useState(true);
  const navigate = useNavigate();
  const authStore = AuthStore();

  const refs = useRef({
    idElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDescElement: null,
    profileImageElement: null,
    fileElement: null,
  });

  const validateFields = () => {
    const { pwElement, pw2Element, simpleDescElement } = refs.current;
    if (pwElement.value === "") {
      alert("비밀번호를 입력해주세요.");
      return false;
    }
    if (pw2Element.value === "") {
      alert("비밀번호 확인을 입력해주세요.");
      return false;
    }
    if (simpleDescElement.value === "") {
      alert("한 줄 소개를 입력해주세요.");
      return false;
    }
    if (pwElement.value !== pw2Element.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const changeInfo = () => {
    if (!validateFields()) {
      return;
    }
    const { pwElement, simpleDescElement, profileImageElement } = refs.current;

    console.log(profileImageElement.src);
    const user = {
      password: pwElement.value,
      simpleDesc: simpleDescElement.value,
      profileImage: profileImageElement.src,
    };

    customAxios
      .privateAxios({
        method: "put",
        url: "/v1/api/user/update",
        data: user,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("정보 수정에 성공했습니다.");
          navigate("/my");
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  // 모달창 닫았을때 어떻게 할건지
  const modalClose = () => {
    navigate("/my");
  };

  const setDefaultProfileImage = () => {
    refs.current.profileImageElement.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  };

  const setChangeProfileImage = () => {
    const fileElement = refs.current.fileElement;
    console.log(fileElement);
    //널체크
    if (fileElement.files && fileElement.files[0]) {
      const file = fileElement.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        refs.current.profileImageElement.setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 모달창에서 요구하는거 수행하고 넘어갈때
  const modalCallback = (token) => {
    localStorage.setItem("accessToken", token.accessToken);
    authStore.setLoginUserByToken(token.accessToken);
    setModalShow(false);
  };

  if (modalShow) {
    return (
      <CheckUserModal
        modalShow={modalShow}
        modalClose={modalClose}
        callback={modalCallback}
      ></CheckUserModal>
    );
  }
  return (
    <div>
      <CommonLayout />
      <Card style={{ borderRadius: "1rem" }}>
        <Card.Body className='text-center'>
          <h2>내 정보 수정</h2>
          <div className='d-flex justify-content-center'>
            <span>
              <Image
                ref={(r) => (refs.current.profileImageElement = r)}
                src={authStore.loginUser.profileImage}
                className='rounded-circle'
                style={{ width: "100px", height: "100px" }}
                alt='profile'
              />
              <Form.Control
                ref={(r) => (refs.current.fileElement = r)}
                type='file'
                accept='image/*'
                style={{ width: "100px" }}
                className='mt-3 mb-3'
                onClick={setDefaultProfileImage}
                onChange={setChangeProfileImage}
              />
            </span>
          </div>
          <InputGroup className='mb-3'>
            <InputGroup.Text>아이디</InputGroup.Text>
            <Form.Control
              ref={(r) => (refs.current.idElement = r)}
              type='text'
              defaultValue={authStore.loginUser.id}
              disabled
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
              type='text'
              defaultValue={authStore.loginUser.simpleDesc}
            />
          </InputGroup>
          <Row>
            <Col>
              <Button
                variant='outline-danger'
                type='button'
                style={{ width: "200px" }}
                onClick={() => navigate("/my")}
              >
                취소
              </Button>
            </Col>
            <Col>
              <Button
                variant='outline-success'
                type='button'
                style={{ width: "200px" }}
                onClick={changeInfo}
              >
                수정
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChangeInfo;
