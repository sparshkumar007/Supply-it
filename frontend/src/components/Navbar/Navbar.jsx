import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetApiCall } from "../../utils/Axios";

import "./Navbar.css";

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [toroute, setToRoute] = useState("");

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    const data = GetApiCall("/api/auth/logout");
    if (data.success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(UserData);
    if (UserData?.userType == "Seller") {
      setToRoute("/home-seller");
    } else if (UserData?.userType == "middle") {
      setToRoute("/home-middleman");
    } else {
      setToRoute("/home-buyer");
    }
  }, [localStorage.getItem("userInfo")]);

  return (
    <>
      <Navbar key="md" expand="md" className="bg-body-danger">
        <Container fluid>
          <Navbar.Brand href="/">Supply Point</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton className="bg-info">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>Supply Point</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-info">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {user ? (
                  <>
                    <Nav.Link as={Link} to={toroute}>
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" onClick={handleLogout}>
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/signUp">
                      Sign Up
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
