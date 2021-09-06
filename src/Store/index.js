import { makeAutoObservable } from "mobx";
// Not secure way to store cookies. Need to improve later
import { parseCookies } from "nookies";
import axios from "axios";

class Store {
  services = [];
  jwt = parseCookies().jwt || false;
  user = undefined;
  formIsOpen = false;
  loginModal = true;
  dropdown = false;

  constructor() {
    makeAutoObservable(this);
    getUserData(this.jwt, this);
    // getInitServices(this)
  }

  setServices(services) {
    this.services = services;
  }
  setUser(user) {
    this.user = user;
  }
  openForm() {
    this.formIsOpen = true;
  }
  closeForm() {
    this.formIsOpen = false;
  }
  openRegisterModal() {
    this.loginModal = false;
    console.log(this.loginModal);
  }
  openLoginModal() {
    this.loginModal = true;
  }

  openDropdown() {
    this.dropdown = !this.dropdown;
  }
  closeDropdown() {
    this.dropdown = false;
  }
}

export default new Store();

async function getUserData(jwt, Store) {
  if (jwt === false) return;
  axios
    .get("http://localhost:8000/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      return Store.setUser(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// async function getInitServices(Store) {

//   axios
//     .get("http://localhost:8000/services")
//     .then((res) => {
//       console.log(res.data);
//       return res.data;
//     })
//     .then((data) => {
//       Store.setServices(data);
//       console.log(data)
//       return;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
