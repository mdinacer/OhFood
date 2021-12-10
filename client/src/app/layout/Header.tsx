import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  Badge,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import CartMenu from "../../features/home/cart/CartMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";

const homeTags = [
  { name: "Home", path: "#home" },
  { name: "Annonces", path: "#announces" },
  { name: "Plats du jour", path: "#dujour" },
  { name: "Menu", path: "#menu" },
];

const links = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
  { name: "Profile", path: "/profile" },
  { name: "Gallery", path: "/gallery" },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const [showBasket, setShowBasket] = useState(false);
  const itemsCount = basket
    ? basket?.items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const { pathname } = useLocation();

  function handleClose() {
    setShowBasket(false);
  }

  return (
    <>
      <Navbar
        id="navbar"
        className="nav-bar"
        collapseOnSelect
        expand="lg"
        variant="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <span className="mx-1">Oh!</span>Food
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto d-flex justify-content-evenly" navbarScroll>
              {pathname === "/" ? (
                <>
                  {homeTags.map(({ name, path }) => (
                    <Nav.Link
                      key={path}
                      as="a"
                      href={path}
                      className="link-item"
                    >
                      {name}
                    </Nav.Link>
                  ))}
                </>
              ) : (
                <>
                  {links.map(({ name, path }) => (
                    <Nav.Link
                      active={pathname === path}
                      key={name}
                      as={Link}
                      to={path}
                      className="link-item "
                    >
                      {name}
                    </Nav.Link>
                  ))}
                </>
              )}
            </Nav>
            <Nav>
              <Nav.Link onClick={() => setShowBasket(true)}>
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  color="inherit"
                  size="lg"
                />
                <Badge bg="danger" pill className="mx-2">
                  {itemsCount}
                </Badge>
              </Nav.Link>
            </Nav>
            {!user ? (
              <Nav>
                <Nav.Link
                  as={Link}
                  to={"/login"}
                  active={pathname === "/login"}
                >
                  S'identifier
                </Nav.Link>
              </Nav>
            ) : (
              <>
                <NavDropdown title={user.email} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profiles">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profiles">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profiles">
                    Reservations
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(signOut());
                      dispatch(clearBasket());
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas
        className="side-menu"
        placement="end"
        show={showBasket}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>PANIER</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartMenu onClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
