import { Show, createSignal } from 'solid-js';
import { Send, Image } from "lucide-solid";

export default function ChatWindow() {
  const [currentConversation, setcurrentConversation] = createSignal(true);
  return (
    <Show when={currentConversation()} fallback={
        <div class="flex-grow flex flex-col bg-gray-50">
          <div class="flex-grow p-4 flex items-center justify-center text-gray-500">
            <div class="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p class="mt-2">Select a chat or create a new one</p>
            </div>
          </div>
        </div>
      }>
      <div class="flex-1 flex flex-col">
        {/* Message Area */}
        <div class="flex-1 flex flex-col p-4 relative overflow-hidden">
          <div class="rounded-[inherit]">
              <div class="space-y-4">
                <div class="flex items-end gap-2">
                  <img src="/placeholder.svg" alt="" class="w-8 h-8 rounded-full" />
                  <div class="bg-gray-100 rounded-2xl p-3 max-w-md">
                    <p>Hello! How are you?</p>
                  </div>
                </div>
                <div class="flex items-end justify-end gap-2">
                  <div class="bg-purple-500 text-white rounded-2xl p-3 max-w-md">
                    <p>I'm doing great, thanks!</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        
        {/* Message Input */}
        <div class="p-4 border-t border-gray-200">
          <div class="flex items-center gap-2">
            <button class="hover:bg-accent hover:text-accent-foreground" size="icon">
              <Image class="w-5 h-5 text-gray-500" />
            </button>
            <input
              placeholder="Aa"
              class="flex-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground h-10 w-10 bg-purple-500 hover:bg-purple-600 text-white">
              <Send class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Show>
  )
}
