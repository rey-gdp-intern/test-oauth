import {
  faAddressCard,
  faBell,
  faFileLines,
  faStar,
} from '@fortawesome/free-regular-svg-icons';
import { faCode, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import React, { PropsWithChildren } from 'react';
import { Badge } from 'react-bootstrap';
import SidebarNavGroup from '@/app/ui/dashboard/Sidebar/SidebarNavGroup';
import SidebarNavItem from '@/app/ui/dashboard/Sidebar/SidebarNavItem';

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <li className='nav-title px-3 py-2 mt-3 text-uppercase fw-bold'>
      {children}
    </li>
  );
};

export default function SidebarNav() {
  return (
    <ul className='list-unstyled'>
      <SidebarNavItem icon={faCode} href='/project/config'>
        Configuration
      </SidebarNavItem>
      <SidebarNavItem icon={faPaintBrush} href='/project/config'>
        Style
      </SidebarNavItem>
    </ul>
  );
}
