import axios from "axios";
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
  }
}

export const customAxios = CustomAxios.instance();
