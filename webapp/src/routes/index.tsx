import { type RouteDefinition } from '@solidjs/router';
import { getUser } from '../lib';
import { createSignal } from 'solid-js';
import Toolbar from '../components/Toolbar';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

export const route = {
  preload() {
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    getUser('home');
  },
} satisfies RouteDefinition;

export default function Home() {
  //const user = createAsync(() => getUser('home'), { deferStream: true });

  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen());
  };

  return (
    <div class='flex h-screen bg-gray-100'>
      {/* Chat List Sidebar */}
      <ChatList isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div class='flex flex-col flex-1'>
        <Toolbar toggleSidebar={toggleSidebar} />
        <ChatWindow />
      </div>
    </div>
  );

  // return (
  //   <main class='w-full p-4 space-y-2'>
  //     <h2 class='font-bold text-3xl'>Hello {user()?.email}</h2>
  //     <h3 class='font-bold text-xl'>Message board</h3>
  //     <form action={logout} method='post'>
  //       <button
  //         name='logout'
  //         type='submit'
  //         class='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
  //         Logout
  //       </button>
  //     </form>
  //   </main>
  // );
}
