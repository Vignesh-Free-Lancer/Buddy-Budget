import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/userActions";
import { useLanguageContext } from "../../context/languageContext";
import useTranslation from "../../hooks/translation";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const translation = useTranslation();
  const { language, changeLanguage } = useLanguageContext();

  const { userInfos } = useSelector((state) => state.userLogin);

  const [selectedLang, setSelectedLang] = useState("En");

  useEffect(() => {
    const localData = localStorage.getItem("userInfos");
    return localData ? <></> : dispatch(logOut());
  }, [userInfos, dispatch, navigate]);

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <React.Fragment>
      <Navbar
        bg="primary"
        expand="lg"
        variant="dark"
        className="buddy-app-header"
      >
        <Container>
          <Navbar.Brand className="buddy-app-header__title">
            {userInfos ? (
              <Link to="/buddy-budget/dashboard">
                {translation.HOUSEBUDGET}
              </Link>
            ) : (
              <Link to="/">{translation.HOUSEBUDGET}</Link>
            )}
          </Navbar.Brand>
          {userInfos && <Navbar.Toggle aria-controls="navbarScroll" />}
          <Navbar.Collapse
            id="navbarScroll"
            style={{ justifyContent: userInfos ? "" : "flex-end" }}
          >
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="buddy-app-header__profile-menu">
                <Nav.Link
                  style={{
                    display: userInfos && userInfos.isActive ? "block" : "none",
                  }}
                  className="buddy-app-header__profile-icon"
                >
                  <img
                    src={userInfos && userInfos.pic}
                    alt={userInfos && userInfos.userName}
                  />
                </Nav.Link>
                <NavDropdown
                  title={userInfos && userInfos.userName}
                  id="navbarScrollingDropdown"
                  className="buddy-app-header__user-menu"
                  style={{ display: userInfos ? "block" : "none" }}
                >
                  <NavDropdown.Item
                    onClick={() =>
                      navigate(
                        `/buddy-budget/user/profile/${
                          userInfos && userInfos.userId
                        }`
                      )
                    }
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              <NavDropdown
                title={
                  selectedLang === "en"
                    ? "En"
                    : selectedLang === "hi"
                    ? "Hi"
                    : "En"
                }
                id="navbarLangScrollingDropdown"
                className="buddy-app-header__language-menu"
                onSelect={(evt) => {
                  changeLanguage(evt);
                  setSelectedLang(evt);
                }}
              >
                <NavDropdown.Item eventKey="en">En- English</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="hi">Hi- Hindi</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
