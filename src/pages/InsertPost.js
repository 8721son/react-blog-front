import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ExitImg from "../assets/exit.svg";
import AuthStore from "../stores/AuthStore";
import { customAxios } from "../utils/CustomAxios";

// 1. 임시 저장
// 2. 글 작성
// 3. 에디터 크기를 브라우저 크기에 따라 동적으로 변동되게
// 4. 로그인 한 유저만 글 작성이 가능하게(auth store)

const InsertPost = () => {
  const authStore = AuthStore();
  const navigate = useNavigate();

  const [editorHeight, setEditorHeight] = useState(0);

  const refs = useRef({
    titleElement: null,
    editorElement: null,
  });

  const validateFields = () => {
    const { titleElement, editorElement } = refs.current;
    if (titleElement.value === "") {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (editorElement.getInstance().getMarkdown() === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  const save = () => {
    // validation check
    if (!validateFields()) {
      return;
    }

    const { titleElement, editorElement } = refs.current;

    const title = titleElement.value;
    const content = editorElement.getInstance().getMarkdown();

    const markdownImageRegex = /\[.*\]\((.*)\)/gi; // 이미지
    //html 태그, \n (html 문법)
    const markdownRegex = /(\*|_|#|`|~|>|!|\[|\]|\(|\)|\{|\}|\||\\)/gi;

    console.log(content);
    // 이미지 날리고, html날린 후 150자
    const summary = content
      .replace(markdownImageRegex, "")
      .replace(markdownRegex, "")
      .substring(0, 151);

    const imageList = content.match(markdownImageRegex);
    const thumbnailMarkdown = imageList != null ? imageList[0] : null;

    const thumbnail = thumbnailMarkdown
      ? thumbnailMarkdown.substring(
          thumbnailMarkdown.indexOf("](") + 2,
          thumbnailMarkdown.length - 1
        )
      : null;

    const post = {
      title: title,
      content: content,
      summary: summary,
      thumbnail: thumbnail,
    };

    customAxios
      .privateAxios({
        method: "post",
        url: "/v1/api/post",
        data: post,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("게시물 저장에 성공했습니다.");
          localStorage.removeItem("tempPost");
          navigate(`/post/${response.data.content.idx}`);
        } else {
          alert(response.data.message);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

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
            <Button type='button' variant='outline-success' onClick={save}>
              게시하기
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InsertPost;
