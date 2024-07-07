import Link from 'next/link';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <NavItem>
        <Link href='/project/config' passHref legacyBehavior>
          <NavLink className='p-2'>Antrein</NavLink>
        </Link>
      </NavItem>
      {/* <NavItem>
        <Link href="#" passHref legacyBehavior>
          <NavLink className="p-2 border border-gray-300 rounded">
            Select Project <FontAwesomeIcon icon={faCaretDown} />
          </NavLink>
        </Link>
      </NavItem> */}
      {/* <NavItem>
        <Link href="#" passHref legacyBehavior>
          <NavLink className="p-2">Settings</NavLink>
        </Link>
      </NavItem> */}
    </Nav>
  );
}
