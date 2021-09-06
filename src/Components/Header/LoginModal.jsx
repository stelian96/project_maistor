import React from "react";
import styled from "styled-components";
import Store from "../../Store";
import { observer } from "mobx-react";
import ModalPortal from "./ModalPortal";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";

const Backdrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 10%;
  right: 10%;
  bottom: 10%;
  left: 10%;
  padding: 1em;
  max-width: 700px;
  margin: 0 auto;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 25px;
  top: 25px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  :hover {
    opacity: 1;
  }
  :before,
  :after {
    position: absolute;
    left: 13px;
    content: " ";
    height: 33px;
    width: 2px;
    background-color: #333;
    top: -2px;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

const LogOrReg = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 2em;
  font-weight: 600;
`;
const Choise = styled.p`
  cursor: pointer;
  color: ${(props) => (props.active ? "red" : "green")};
  :hover {
    text-decoration: underline;
  }
  :active {
    color: red;
    text-decoration: underline;
  }
`;

const Modal = observer(() => {
  return (
    <>
      {Store.formIsOpen && (
        <ModalPortal selector="#portal">
          <Backdrop>
            <ModalContainer>
              <CloseButton
                type="button"
                onClick={() => Store.closeForm()}
              ></CloseButton>

              <LogOrReg>
                <Choise onClick={() => Store.openLoginModal()}>Логин</Choise>
                <Choise onClick={() => Store.openRegisterModal()}>
                  Регистрация
                </Choise>
              </LogOrReg>

              {Store.loginModal ? <Login /> : <Register />}
            </ModalContainer>
          </Backdrop>
        </ModalPortal>
      )}
    </>
  );
});

export default Modal;
