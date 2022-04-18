import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";


export default function MyNavbar () {
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
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </>
    );
}