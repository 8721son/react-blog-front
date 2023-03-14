import React from "react";
import { Card, Col, Image, InputGroup, Row } from "react-bootstrap";
import NoImage from "../../assets/no-image.png";
import LikeImg from "../../assets/like.svg";
import { useNavigate } from "react-router-dom";
const blogCardContainer = {
  height: "150px",
  width: "200px",
  overflow: "hidden",
};

const blogCardImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  cursor: "pointer",
};

const blogCardText = {
  display: "-webkit-box",
  wordWrap: "break-word",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100px",
};

const blogTitle = {
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const MyCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Col>
      <Card className='m-3'>
        <div style={blogCardContainer}>
          <Card.Img
            variant='top'
            src={post.thumbnail ? post.thumbnail : NoImage}
            style={blogCardImage}
            alt='No Image'
            onClick={() => navigate(`/post/${post.idx}`)}
          />
        </div>
        <Card.Body>
          <Card.Title
            style={blogTitle}
            onClick={() => navigate(`/post/${post.idx}`)}
          >
            {post.title}
          </Card.Title>
          <Card.Text style={blogCardText}>{post.summary}</Card.Text>
          <small>{post.createDate.substring(0, 10)}</small>
        </Card.Body>
        <Card.Footer>
          {/* 글 작성자 프로필사진,아이디, 좋아요버튼(개수) */}
          <Row>
            <Col>
              <InputGroup>
                <Image
                  src={post.writer.profileImage}
                  alt='profile'
                  className='rounded-circle me-2'
                  style={{ width: "25px", height: "25px" }}
                />
                <strong>{post.writer.id}</strong>
              </InputGroup>
            </Col>
            <Col className='col-auto'>
              <InputGroup>
                <Image src={LikeImg} width='15px' />
                <span className='mx-2'>{post.like}</span>
              </InputGroup>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default MyCard;
