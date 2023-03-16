import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyCard from "../components/common/MyCard";
import CommonLayout from "../layouts/CommonLayout";
import AuthStore from "../stores/AuthStore";
import { customAxios } from "../utils/CustomAxios";

// 사용자 정보
// 내가 쓴 글
// 좋아요 한 글
const My = () => {
  const authStore = AuthStore();

  const [myPostList, setMyPostList] = useState([]);
  const [likePostList, setLikePostList] = useState([]);

  const getMyInfo = () => {
    customAxios
      .privateAxios({
        method: "get",
        url: "/v1/api/user/my",
      })
      .then((response) => {
        if (response.status === 200) {
          setMyPostList(response.data.content.myPostList);
          setLikePostList(response.data.content.likePostList);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    if (authStore.loginUser === null) {
      alert("로그인이 필요합니다");
    }
    getMyInfo();
  }, []);

  return (
    <div>
      <CommonLayout />
      {authStore.loginUser ? (
        <div>
          <Container>
            <Row>
              <Col>
                <div className='d-flex justify-content-center'>
                  <img
                    src={authStore.loginUser.profileImage}
                    className='rounded-circle'
                    style={{ width: "100px", height: "100px" }}
                    alt='profile'
                  />
                </div>
              </Col>
              <Col>
                <h2>{authStore.loginUser.id}</h2>
                <p>{authStore.loginUser.simpleDesc}</p>
                <Link to='/change-info'>내 정보 수정</Link>
              </Col>
            </Row>
            <hr />
          </Container>
          <Container>
            <Row className='row-cols-1 row-cols-md-2'>
              <Col>
                <h5 className='text-center'>내 글</h5>
                <Row className='row-cols-1 card-group'>
                  {myPostList.map((post) => (
                    <MyCard post={post} />
                  ))}
                </Row>
              </Col>
              <Col>
                <h5 className='text-center'>좋아요 한 글</h5>
                <Row className='row-cols-1 card-group'>
                  {likePostList.map((post) => (
                    <MyCard post={post} />
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default My;
