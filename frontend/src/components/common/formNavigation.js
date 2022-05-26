import React from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import useTranslation from "../../hooks/translation";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FormNavigation = ({
  module = "user",
  newNavLink = "",
  listviewLink = "",
}) => {
  const translation = useTranslation();

  const { userInfos } = useSelector((state) => state.userLogin);

  return (
    <Row>
      <Col>
        <ButtonGroup className="form-navigation-group">
          <Link
            to={newNavLink}
            style={{
              display:
                (userInfos.isAdmin && module === "user") ||
                (userInfos.isAdmin && module === "other")
                  ? "inline-block"
                  : !userInfos.isAdmin && module === "other"
                  ? "inline-block"
                  : "none",
            }}
          >
            <Button
              variant="secondary"
              className="me-1"
              title={translation.AddNew}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </Button>
          </Link>

          <Button
            variant="secondary"
            className="me-1"
            disabled
            title={translation.Previous}
            style={{
              display:
                (userInfos.isAdmin && module === "user") ||
                (userInfos.isAdmin && module === "other")
                  ? "inline-block"
                  : !userInfos.isAdmin && module === "other"
                  ? "inline-block"
                  : "none",
            }}
          >
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </Button>

          <Button
            variant="secondary"
            className="me-1"
            disabled
            title={translation.Next}
            style={{
              display:
                (userInfos.isAdmin && module === "user") ||
                (userInfos.isAdmin && module === "other")
                  ? "inline-block"
                  : !userInfos.isAdmin && module === "other"
                  ? "inline-block"
                  : "none",
            }}
          >
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </Button>

          <Link to={listviewLink}>
            <Button variant="secondary" title={translation.Listview}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </Button>
          </Link>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default FormNavigation;
