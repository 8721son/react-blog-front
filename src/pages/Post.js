import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import AuthStore from "../stores/AuthStore";
import { customAxios } from "../utils/CustomAxios";
import LikeRedImg from "../assets/like-red.svg";
import LikeImg from "../assets/like.svg";
import { Viewer } from "@toast-ui/react-editor";
import produce from "immer";

const Post = () => {
  const params = useParams();
  const authStore = AuthStore();
  const navigate = useNavigate();

  const postIdx = params.idx;

  const [post, setPost] = useState(null);

  const clickLike = () => {
    customAxios
      .privateAxios({
        method: "post",
        url: `/v1/api/post/like/${postIdx}`,
      })
      .then((response) => {
        getPost();
      })
      .catch(() => {})
      .finally(() => {});
  };

  const getPost = () => {
    // NaN -> Not a Number
    if (isNaN(postIdx)) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }

    //axios 게시물 정보

    customAxios
      .privateAxios({
        method: "get",
        url: `/v1/api/post/${postIdx}`,
      })
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data.content);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    if (authStore.loginUser === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
    getPost();
  }, []);

  return (
    <div>
      <CommonLayout />
      {post != null ? (
        <Container>
          <h1>{post.title}</h1>
          <div className='d-flex justify-content-between align-items-center'>
            {/* 작성자 정보 */}
            <div>
              <span>
                <Image
                  src={post.writer.profileImage}
                  className='rounded-circle me-3'
                  style={{ width: "35px", height: "35px" }}
                  alt='profile'
                />
                <strong>{post.writer.id}</strong>
              </span>
              <span className='ms-4'>
                {post.createDate.substring(0, 10)}
                &nbsp;
                {post.createDate.substring(11, 19)}
              </span>
            </div>

            <button className='btn' onClick={clickLike}>
              <Image
                src={post.likeClicked ? LikeRedImg : LikeImg}
                width='20'
                alt='like'
              />
              <span className='mx-2'>{post.like}</span>
            </button>

            {authStore.loginUser.idx === post.writer.idx ? (
              <div>
                <Button variant='outline-success' type='button'>
                  수정
                </Button>
                <Button variant='outline-danger' className='ms-2' type='button'>
                  삭제
                </Button>
              </div>
            ) : null}
          </div>

          <div style={{ marginTop: "100px" }}>
            <Viewer initialValue={post.content} />
          </div>

          <Row className='mt-5'>
            <Col className='d-flex justify-content-center'>
              <Button
                variant='outline-success'
                type='button'
                onClick={() => navigate("/")}
              >
                목록으로
              </Button>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

export default Post;
