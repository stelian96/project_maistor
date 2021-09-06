import React from "react";
import styled from "styled-components";
import Store from "../../Store";
import { Logout } from "../../global";
import { observer } from "mobx-react";
import Link from 'next/link'

const RelativeDiv = styled.div`
  position: relative;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35px;
  left: -25px;
  background: #01579b;
  padding: 10px;
  border-radius: 4px;
`;
const DropdownLink = styled.p`
  padding: 6px 0;
  margin: 0;
`;

const HeaderDropdown = observer(({ name }) => {
  return (
    <RelativeDiv>
      <div>{name}</div>
      <DropdownContainer style={{ display: Store.dropdown ? "flex" : "none" }}>
        <Link href="/">
          <DropdownLink>Моят профил</DropdownLink>
        </Link>
        <Link href="/favorites">
          <DropdownLink>Запазени</DropdownLink>
        </Link>
        <Link href="/create-service">
          <DropdownLink>Създай обява</DropdownLink>
        </Link>
        <Link href="/my-services">
          <DropdownLink>Моите обяви</DropdownLink>
        </Link>
        <DropdownLink onClick={() => Logout()}>Изход</DropdownLink>
      </DropdownContainer>
    </RelativeDiv>
  );
});

export default HeaderDropdown;
