import React from "react";
import {
  Anchor,
  Button,
  Container,
  Dropdown,
  Form,
  Image,
  InputGroup,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logo from "../../assets/logo.png";
import AuthStore from "../../stores/AuthStore";
import searchImg from "../../assets/search.png";

// 메인페이지 -> 검색기능
const MyNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authStore = AuthStore();
  // QueryString 다루는법

  //   console.log(location);
  //   const qs = location.search;
  //   const qsArr = qs.split("?");
  //   console.log(qsArr);
  //   const qsArr2 = qsArr[1].split("=");
  //   console.log(qsArr2);
  //   let key = qsArr2[0];
  //   let value = qsArr2[1];

  //   const [queryString, setQueryString] = useSearchParams();
  //   const searchParam = queryString.get("search");
  //   const nameParam = queryString.get("name");
  //   console.log(searchParam);
  //   console.log(nameParam);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("rememberId");
    navigate("/login");
  };

  const search = () => {
    // 데이터 생기면 구현
  };

  return (
    <div>
      <Navbar>
        <Container>
          <Link to={"/"}>
            <Image src={logo} style={{ width: "50px" }} />
          </Link>
          {location.pathname === "/" ? (
            <Form className='d-flex' style={{ width: "400px" }}>
              <Form.Control type='text' placeholder='검색어를 입력해주세요.' />
              <button className='btn' type='button' onClick={search}>
                <Image src={searchImg} style={{ width: "20px" }} />
              </button>
            </Form>
          ) : null}

          <div>
            <InputGroup>
              {authStore.loginUser ? (
                <Button
                  variant='success'
                  onClick={() => navigate("/insert-post")}
                  style={{ borderRadius: "10px" }}
                >
                  글작성
                </Button>
              ) : (
                <Button
                  variant='success'
                  onClick={() => navigate("/login")}
                  style={{ borderRadius: "10px" }}
                >
                  로그인
                </Button>
              )}

              {authStore.loginUser ? (
                <NavDropdown
                  title={
                    <Image
                      src={authStore.loginUser.profileImage}
                      className='rounded-circle'
                      style={{
                        width: "35px",
                        height: "35px",
                        marginLeft: "10px",
                      }}
                    />
                  }
                >
                  <Link to={"/my"} className='dropdown-item'>
                    마이페이지
                  </Link>
                  <Dropdown.Divider />
                  <Anchor
                    href='#'
                    className='dropdown-item'
                    onClick={() => {
                      logout();
                    }}
                  >
                    로그아웃
                  </Anchor>
                </NavDropdown>
              ) : (
                <Button
                  variant='success'
                  style={{ marginLeft: "10px", borderRadius: "10px" }}
                  onClick={() => navigate("/join")}
                >
                  회원가입
                </Button>
              )}
            </InputGroup>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavBar;
