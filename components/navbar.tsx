import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface NavbarComponentProps {
  pageLocation: string;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({ pageLocation }) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#'>Dina - A Simple Black Desert Online Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href='/'>Central Market</Nav.Link>
            <Nav.Link href='#'>Items</Nav.Link>
            <Nav.Link href='#'>Recipes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}