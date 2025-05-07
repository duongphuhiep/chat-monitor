import { type RouteDefinition } from '@solidjs/router';
import { getUser } from '../lib/auth';
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
}
