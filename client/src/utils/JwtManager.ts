class JwtManager {

  private static _jwt = localStorage.getItem("jwt") ?? null;

  static get() {
    return JwtManager._jwt;
  }
  static set(jwt: string) {
    JwtManager._jwt = jwt;
    localStorage.setItem("jwt", jwt);
  }

  static delete() {
    JwtManager._jwt = null;
    localStorage.removeItem("jwt");
  }


}

export default JwtManager;