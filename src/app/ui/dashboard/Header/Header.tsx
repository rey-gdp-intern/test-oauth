import Link from 'next/link';
import { Container } from 'react-bootstrap';
import HeaderSidebarToggler from '@/app/ui/dashboard/Header/HeaderSidebarToggler';
import HeaderFeaturedNav from '@/app/ui/dashboard/Header/HeaderFeaturedNav';
import HeaderNotificationNav from '@/app/ui/dashboard/Header/HeaderNotificationNav';
import HeaderProfileNav from '@/app/ui/dashboard/Header/HeaderProfileNav';
import Breadcrumb from '@/app/ui/dashboard/Breadcrumb/Breadcrumb';
import HeaderSelectProjectNav from './HeaderSelectProjectNav';

export default function Header() {
  return (
    <header className='header sticky-top mb-4 py-2 px-sm-2 border-bottom'>
      <Container fluid className='header-navbar d-flex align-items-center'>
        <HeaderSidebarToggler />
        <div className='header-nav d-none d-md-flex'>
          <HeaderFeaturedNav />
        </div>
        <div className='header-nav ms-auto'>
          <HeaderSelectProjectNav />
        </div>
        <div className='header-nav ms-2'>
          <HeaderProfileNav />
        </div>
      </Container>
    </header>
  );
}
