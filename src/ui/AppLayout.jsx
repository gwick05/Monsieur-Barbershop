import { Outlet } from 'react-router-dom';
import Main from './Main';
import Sidebar from './Sidebar';
import Header from './Header';
import Container from './Container';
import { useDarkModeContext } from '../context/DarkModeContext';

function AppLayout() {
  const { dark } = useDarkModeContext();
  return (
    <div className={`${dark ? 'dark' : ''} flex h-screen  overflow-hidden `}>
      <Sidebar />
      <Main>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </div>
  );
}

export default AppLayout;
