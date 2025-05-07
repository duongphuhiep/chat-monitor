import { Menu, PlusCircle, LogOut } from 'lucide-solid';
import { logout } from '../lib/auth';

function Toolbar({ toggleSidebar }) {
  return (
    <div class='bg-white shadow-md p-4 flex items-center justify-between'>
      <button
        onClick={toggleSidebar}
        class='md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
        aria-label='Toggle sidebar'>
        <Menu size={24} />
      </button>

      <div class='hidden md:block font-semibold text-lg'>Messages</div>

      <div class='flex items-center space-x-2'>
        <button class='flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'>
          <PlusCircle size={18} />
          <span>Create new chat</span>
        </button>

        <form action={logout} method='post'>
          <button class='flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors'>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Toolbar;
