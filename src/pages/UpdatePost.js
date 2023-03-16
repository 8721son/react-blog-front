import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import ExitImg from "../assets/exit.svg";
import AuthStore from "../stores/AuthStore";
import { customAxios } from "../utils/CustomAxios";

const UpdatePost = () => {
  const authStore = AuthStore();
  const navigate = useNavigate();

  const [editorHeight, setEditorHeight] = useState(0);

  const refs = useRef({
    titleElement: null,
    editorElement: null,
  });

  const params = useParams();
  const postIdx = params.idx;

  // 1. 게시물 인덱스 이용해서 서버랑통신해서 데이터 가져오고
  // 에디터에 채워넣기

  const getPost = () => {
    // validation
    if (isNaN(postIdx)) {
      alert("잘못된 접근입니다.");
      return;
    }

    customAxios
      .privateAxios({
        method: "get",
        url: `/v1/api/post/${postIdx}`,
      })
      .then((response) => {
        if (response.status === 200) {
          refs.current.titleElement.value = response.data.content.title;
          refs.current.editorElement
            .getInstance()
            .setMarkdown(response.data.content.content);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

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

  // 2. 수정
  const update = () => {
    // validation
    // 제목이 빈값인지, 내용이 빈 값인지
    if (!validateFields()) {
      return;
    }

    const { titleElement, editorElement } = refs.current;

    const title = titleElement.value;
    const content = editorElement.getInstance().getMarkdown();

    const markdownImageRegex = /\[.*\]\((.*)\)/gi; // 이미지
    //html 태그, \n (html 문법)
    const markdownRegex = /(\*|_|#|`|~|>|!|\[|\]|\(|\)|\{|\}|\||\\)/gi;

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
      thumbnail: thumbnail,
      summary: summary,
    };
    // axios
    customAxios
      .privateAxios({
        method: "put",
        url: `/v1/api/post/update/${postIdx}`,
        data: post,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("수정에 성공했습니다.");
          navigate(`/post/${postIdx}`);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    setEditorHeight(`${window.innerHeight - 300}px`);
    window.addEventListener("resize", () => {
      setEditorHeight(`${window.innerHeight - 300}px`);
    });
  }, []);

  useEffect(() => {
    if (authStore.loginUser === null) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
    getPost();
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
            <Button type='button' variant='outline-success' onClick={update}>
              수정하기
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UpdatePost;
