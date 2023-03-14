import React, { useEffect, useState } from "react";
import { CardGroup, Container } from "react-bootstrap";
import MyCard from "../components/common/MyCard";
import CommonLayout from "../layouts/CommonLayout";
import { customAxios } from "../utils/CustomAxios";

const Posts = () => {
  const [post, setPost] = useState([]);

  const getPost = () => {
    //axios 요청해서 setPost
    customAxios
      .publicAxios({
        method: "get",
        url: "/v1/api/post",
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
    getPost();
  }, []);

  return (
    <div>
      <CommonLayout />
      <Container>
        <CardGroup>
          {post.map((post) => (
            <MyCard post={post} />
          ))}
        </CardGroup>
      </Container>
    </div>
  );
};

export default Posts;
