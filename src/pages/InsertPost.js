import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ExitImg from "../assets/exit.svg";
import AuthStore from "../stores/AuthStore";

// 1. 임시 저장
// 2. 글 작성
// 3. 에디터 크기를 브라우저 크기에 따라 동적으로 변동되게 - O
// 4. 로그인 한 유저만 글 작성이 가능하게(auth store) - O

const InsertPost = () => {
  const authStore = AuthStore();
  const navigate = useNavigate();

  const [editorHeight, setEditorHeight] = useState(0);

  const refs = useRef({
    titleElement: null,
    editorElement: null,
  });

  const tempSave = () => {
    // ref 제목이랑 editor내용 가져와서 로컬 스토리지에 JSON타입으로 저장
    // insertPost 페이지로 처음 들어왔을 때 알림창(임시저장된 글 있는데)
    // 이어서 쓸래? -> 예 : 채워주고 아니오 : 로컬스토리지에서 삭제

    const { titleElement, editorElement } = refs.current;
    //js객체
    const tempPost = {
      title: titleElement.value,
      content: editorElement.getInstance().getMarkdown(),
    };
    //js객체 -> JSON
    localStorage.setItem("tempPost", JSON.stringify(tempPost));

    alert("임시저장 되었습니다.");
  };

  const tempPostCheck = () => {
    const tempPost = localStorage.getItem("tempPost");
    if (tempPost != null) {
      if (
        window.confirm(
          "임시저장된 글이 있습니다. 불러오시겠습니까? \n취소하시면 저장된 글이 삭제됩니다."
        )
      ) {
        //true가 리턴됐을때
        // JSON -> js 객체
        // js 객체의 값을 ref에 채워주면 됨
        const tempPostObject = JSON.parse(tempPost);

        refs.current.titleElement.value = tempPostObject.title;
        refs.current.editorElement
          .getInstance()
          .setMarkdown(tempPostObject.content);
      } else {
        localStorage.removeItem("tempPost");
      }
    }
  };

  useEffect(() => {
    setEditorHeight(`${window.innerHeight - 300}px`);
    window.addEventListener("resize", () => {
      setEditorHeight(`${window.innerHeight - 300}px`);
    });

    tempPostCheck();
  }, []);

  useEffect(() => {
    if (authStore.loginUser === null) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  }, [authStore]);

  return (
    <div>
      <CommonLayout />
      <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Row>
          <Col>
            <Form.Control
              ref={(r) => (refs.current.titleElement = r)}
              className='border-0 fs-1 mt-3'
              type='text'
              placeholder='제목을 입력해주세요.'
            />
          </Col>
        </Row>
        <Editor
          ref={(r) => (refs.current.editorElement = r)}
          previewStyle='vertical'
          height={editorHeight}
        />
        <Row className='row fixed-bottom p-3 bg-white shadow-lg'>
          <Col className='col-auto'>
            {/* 나가기 */}
            <Link to={-1}>
              <Image src={ExitImg} />
              <span>나가기</span>
            </Link>
          </Col>
          <Col className='col-auto'>
            {/* 임시저장 */}
            <Button type='button' variant='outline-success' onClick={tempSave}>
              임시저장
            </Button>
          </Col>
          <Col className='col-auto'>
            {/* 저장 */}
            <Button type='button' variant='outline-success'>
              게시하기
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InsertPost;
