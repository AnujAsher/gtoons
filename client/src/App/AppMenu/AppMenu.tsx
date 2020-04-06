import React from "react";
import { Menu } from "semantic-ui-react";
import { AppMenuProps } from "./types";
import { isLoggedIn, logOut } from "../../utils/auth";

const AppMenu: React.FunctionComponent<AppMenuProps> = (props) => {
  const goto = (path: string) => {
    return () => {
      const { history } = props;
      if (path[0] === "/") {
        history.push(path);
      } else {
        window.location = path as any;
      }
    };
  };

  const renderCommunityMenu = () => {
    return (
      <Menu.Item>
        <Menu.Header>Community</Menu.Header>
        <Menu.Menu>
          <Menu.Item onClick={goto("https://discord.gg/W9Z9hSG")}>
            <i className='fab fa-discord'></i> &nbsp;Join our Discord
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  };

  const renderNonAuthMenu = () => {
    const {
      location: { pathname },
    } = props;
    return (
      <>
        <Menu.Item>
          <Menu.Header>Join gToons Revived</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              active={pathname.includes("/login")}
              onClick={goto("/login")}
            >
              <i className='fas fa-sign-in-alt'></i> &nbsp;Log in to Play
            </Menu.Item>
            <Menu.Item
              active={pathname.includes("/register")}
              onClick={goto("/register")}
            >
              <i className='fas fa-user-plus'></i> &nbsp;Sign Up
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        {renderCommunityMenu()}
      </>
    );
  };

  const renderUserMenu = () => {
    const {
      location: { pathname },
    } = props;
    return (
      <>
        <Menu.Item>
          <Menu.Header>Play gToons Revived</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              active={pathname.includes("/lobbies")}
              onClick={goto("/lobbies")}
            >
              <i className='fas fa-search'></i> &nbsp;Lobbies
            </Menu.Item>
            <Menu.Item
              active={pathname.includes("/deckBuilder")}
              onClick={goto("/deckBuilder")}
            >
              <i className='fas fa-tools'></i> &nbsp;Deck Builder
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Account</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              active={pathname.includes("/profile")}
              onClick={goto("/profile")}
            >
              <i className='far fa-id-badge'></i> &nbsp;Profile
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                logOut();
                goto("/")();
              }}
            >
              <i className='fas fa-sign-out-alt'></i> &nbsp;Log out
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        {renderCommunityMenu()}
      </>
    );
  };

  const renderAppMenu = () => {
    return (
      <Menu vertical id='App-menu'>
        {isLoggedIn() ? renderUserMenu() : renderNonAuthMenu()}
      </Menu>
    );
  };

  return renderAppMenu();
};

export default AppMenu;