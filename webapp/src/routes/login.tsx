import { createSignal, Show } from "solid-js";
import { type RouteSectionProps, useSubmission } from "@solidjs/router";
import { loginOrRegister } from "../lib/index.ts";

export default function Login(props: RouteSectionProps) {
  const loggingIn = useSubmission(loginOrRegister);
  const [wantToLogin, setWantToLogin] = createSignal(true); // Signal to track the selected form

  return (
    <main class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form action={loginOrRegister} method="post" class="space-y-6">
          <input
            type="hidden"
            name="redirectTo"
            value={props.params.redirectTo ?? "/"}
          />
          <fieldset class="space-y-2">
            <legend class="font-medium text-gray-700 mb-2">
              Login or Register?
            </legend>
            <div class="flex gap-4">
              <label class="flex items-center space-x-2">
                <input
                  type="radio"
                  name="loginType"
                  value="login"
                  checked={wantToLogin()}
                  class="text-blue-600"
                  onInput={() => setWantToLogin(true)} // Update signal on change
                />
                <span>Login</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="radio"
                  name="loginType"
                  value="register"
                  class="text-blue-600"
                  onInput={() => setWantToLogin(false)} // Update signal on change
                />
                <span>Register</span>
              </label>
            </div>
          </fieldset>

          {/* ************ login form *********** */}
          <Show when={wantToLogin()}>
            <div id="login-form" class="space-y-6">
              <div class="space-y-1">
                <label
                  for="username-input"
                  class="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username-input"
                  name="username"
                  placeholder="kody"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="password-input"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  placeholder="twixrox"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                name="login"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
              <Show when={loggingIn.result}>
                <p
                  class="text-red-600 text-sm"
                  role="alert"
                  id="error-message"
                >
                  {loggingIn.result!.message}
                </p>
              </Show>
            </div>
          </Show>

          {/* ************ register form *********** */}
          <Show when={!wantToLogin()}>
            <div id="register-form" class="space-y-6">
              <div class="space-y-1">
                <label
                  for="username-input"
                  class="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username-input"
                  name="username"
                  placeholder="kody"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="password-input"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  placeholder="twixrox"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="confirm-password-input"
                  class="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password-input"
                  name="confirm-password"
                  type="password"
                  placeholder="twixrox"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                name="register"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register
              </button>
              <Show when={loggingIn.result}>
                <p
                  class="text-red-600 text-sm"
                  role="alert"
                  id="error-message"
                >
                  {loggingIn.result!.message}
                </p>
              </Show>
            </div>
          </Show>
        </form>
      </div>
    </main>
  );
}
