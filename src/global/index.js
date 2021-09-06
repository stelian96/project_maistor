import { destroyCookie, setCookie } from "nookies";
import axios from "axios";
import Store from "../Store";

export async function registerToApp(registerInfo) {
  axios
    .post(`http://localhost:8000/users/`, registerInfo)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      setCookie(null, "jwt", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      if (registerInfo.file === undefined) return window.location.reload(false);
      let formData = new FormData();
      formData.append("avatar", registerInfo.file);
      axios.post(`http://localhost:8000/users/me/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.token}`,
        },
      });
      return window.location.reload(false);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function sendServiceData(serviceInfo, images) {
  // 1.Create Service
  axios
    .post(`http://localhost:8000/services`, serviceInfo, {
      headers: {
        Authorization: `Bearer ${Store.jwt}`,
      },
    })
    // 2. If Service have images create formData and upload them to DB.
    .then((res) => {
      // console.log(res.data);
      if (images.length === 0) return;

      let formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Content-Type is special for array of images.
      return axios.post(
        `http://localhost:8000/services/${res.data._id}/images`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data; charset=utf-8; boundary=" +
              Math.random().toString().substr(2),
            Authorization: `Bearer ${Store.jwt}`,
          },
        }
      );
    })
    .then((res) => {
      console.log(res.data);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function LoginToApp(loginInfo) {
  axios
    .post(`http://localhost:8000/users/login`, loginInfo)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      setCookie(null, "jwt", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      window.location.reload(false);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function Logout() {
  console.log(`${Store.jwt}`);
  axios
    .post(
      `http://localhost:8000/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Store.jwt}`,
        },
      }
    )
    .then(() => {
      destroyCookie(null, "jwt");
      return window.location.reload(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function LogoutAll() {
  console.log(`${Store.jwt}`);
  axios
    .post(
      `http://localhost:8000/users/logoutAll`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Store.jwt}`,
        },
      }
    )
    .then(() => {
      destroyCookie(null, "jwt");
      return window.location.reload(false);
    })
    .catch((error) => {
      console.log(error);
    });
}
