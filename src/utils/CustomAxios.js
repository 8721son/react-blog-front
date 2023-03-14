import axios from "axios";
import jwtDecode from "jwt-decode";
import { BASE_URL } from "../config/Contants";

class CustomAxios {
  // 인스턴스화 -> 클래스에서 객체를 만들어서 메모리에 주입
  static _instance = new CustomAxios();
  static instance = () => {
    return CustomAxios._instance;
  };

  // 로그인 x -> publicAxios
  // 로그인 o -> privateAxios
  constructor() {
    this.publicAxios = axios.create({ baseURL: BASE_URL });
    this.privateAxios = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });
    this.privateAxios.interceptors.request.use(this._requestPrivateInterceptor);
  }
  _requestPrivateInterceptor = async (config) => {
    // 헤더에 액세스 토큰 담는
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      throw new axios.Cancel("토큰이 없습니다.");
    }
    //만료됐는지 확인
    // Date.now() millisecond / jwt exp second
    if (jwtDecode(accessToken).exp < Date.now() / 1000) {
      localStorage.removeItem("accessToken");
      throw new axios.Cancel("토큰이 만료되었습니다.");
    }
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  };
}

export const customAxios = CustomAxios.instance();
