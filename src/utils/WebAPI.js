// @flow
import axios from "axios";

class WebAPI {
  static HOST = "http://localhost:8080";

  static postLoginUser = (username: string, password: string): Promise<*> =>
    axios.post("/api/login", {
      username,
      password
    });
}

export default WebAPI;
