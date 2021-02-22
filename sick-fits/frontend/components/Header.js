import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: red;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Logo>
          <Link href="/">sick fits</Link>
        </Logo>
      </div>
      <div className="sub-bar">
        <p>search</p>
      </div>
      <Nav />
    </header>
  );
}
