import React from "react";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
const MyNavBar = () => {
  const navigate = useNavigate();

  // 로그인 O -> 글작성, 마이페이지
  // 로그인 X -> 로그인, 회원가입
  return (
    <div>
      <Navbar>
        <Container>
          <Link to={"/"}>
            <Image src={logo} style={{ width: "50px" }} />
          </Link>

          <Button variant='success' onClick={() => navigate("/login")}>
            로그인
          </Button>
          <Button variant='success' onClick={() => navigate("/join")}>
            회원가입
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavBar;
