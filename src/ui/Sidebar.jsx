import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <div className="flex h-full w-1/7 flex-col border border-neutral-400 border-opacity-30 bg-neutral-100 text-neutral-700 transition-colors duration-500 dark:bg-neutral-900 dark:text-neutral-50">
      <>
        <Logo />
      </>
      <MainNav />
    </div>
  );
}

export default Sidebar;
