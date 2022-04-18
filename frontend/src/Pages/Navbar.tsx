import React from "react";
import { Navbar, Container, Nav, Button} from "react-bootstrap";
import Cookies from "universal-cookie";

export default function MyNavbar () {
  const cookies = new Cookies()
    return(
        <>
            <Navbar fixed="top" bg="dark"  variant="dark" >
              <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link style={{margin: "20px"}} href="/">Home</Nav.Link>
                    <Nav.Link style={{margin: "20px"}} href="/login">login</Nav.Link>
                    <Nav.Link style={{margin: "20px"}} href="/register">register</Nav.Link>
                    <Nav.Link style={{margin: "20px"}} href="/upload">upload</Nav.Link>
                    <Button variant="primary" onClick={e => {cookies.remove('token', { path: '/' });}}>logout</Button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </>
    );
}