import { createAsync } from '@solidjs/router';
import { X, Search } from 'lucide-solid';
import { For } from "solid-js"
import { queryConversationList } from '~/lib/repository';

function ChatList({ isOpen , toggleSidebar }) {
  const chats = createAsync(queryConversationList);
  return (
    <div
      class={`fixed md:static inset-0 bg-white z-10 w-full md:w-80 md:flex flex-col border-r transform transition-transform duration-300 ease-in-out ${
        isOpen() ? "translate-x-0 flex" : "-translate-x-full md:translate-x-0 md:flex hidden"
      }`}
    >
      <div class="p-4 border-b">
        <h2 class="text-xl font-bold">Chats</h2>
        <X class='absolute right-2 top-2 cursor-pointer md:hidden' onClick={toggleSidebar}/>
        <div class="mt-2 relative">
          <input
            type="text"
            placeholder="Search conversations..."
            class="w-full p-2 pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search class='inline-block absolute left-2 top-2 text-gray-400' />
        </div>
      </div>

      <div class="flex-grow overflow-y-auto">
        <For each={chats()}>
          {(chat) => (
            <div class="p-3 border-b cursor-pointer hover:bg-gray-200 focus:bg-blue-200" tabindex="0">
              <div class="flex justify-between items-start">
                <h3 class="font-medium">{chat.subject}</h3>
                <span class="text-xs text-gray-500">{chat.last_message_date}</span>
              </div>
              <div class="flex justify-between items-start mt-1">
                <p class="text-sm text-gray-600 truncate">{chat.last_message_content}</p>
                {chat.unread > 0 && (
                  <span class="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default ChatList
