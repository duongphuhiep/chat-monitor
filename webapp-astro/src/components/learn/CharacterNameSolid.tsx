import {
  createSignal,
  createResource,
  type JSX,
  Suspense,
  ErrorBoundary,
  Show,
  Switch,
  Match,
} from 'solid-js';
import { debounce } from '@solid-primitives/scheduled';
import { actions } from 'astro:actions';

export default function CharacterNameSolid(props: { children?: JSX.Element }) {
  const randomString = Math.random().toString(36).substring(2, 15);
  const [name] = createResource(
    () =>
      new Promise<string>((resolve, reject) => {
        //this code might be executed on the server side, or client side
        console.log(
          new Date().toISOString() + ' start fetching ' + randomString
        );
        setTimeout(() => {
          console.log(
            new Date().toISOString() + ' end fetching ' + randomString
          );
          Math.random() > 0.5
            ? resolve(randomString)
            : reject(new Error('failed to fetch name'));
        }, 3000);
      })
  );

  const [count, setCount] = createSignal(0);
  const add = () => setCount(count() + 1);
  const subtract = () => setCount(count() - 1);

  const [inputName, setInputName] = createSignal('');
  const [greeting] = createResource(inputName, async (name) => {
    if (name == 'crash') {
      throw new Error('Fatal crashed');
    }
    return await actions.getGreeting({ yourname: name });
  });

  console.info(
    new Date().toISOString() + ' Client side log: init CharacterName ',
    randomString
  );

  return (
    <div class='flex gap-6 flex-wrap'>
      <div class='card bg-base-100 w-96 shadow-sm m-4 border-1 border-gray-400'>
        <div class='card-body'>
          <h2 class='card-title'>Name</h2>
          <Suspense fallback={<div class='skeleton h-4 w-1/2'></div>}>
            <ErrorBoundary
              fallback={(error, reset) => (
                <p>
                  Random error from createResource:&nbsp;
                  <strong class='text-red-500'>{error.message}</strong>
                </p>
              )}>
              <p>{name()}</p>
            </ErrorBoundary>
          </Suspense>
        </div>
      </div>

      <div class='card bg-base-100 w-96 shadow-sm m-4 border-1 border-gray-400'>
        <div class='card-body'>
          <h2 class='card-title'>Counter</h2>
          <div class='flex gap-3 items-center'>
            <button onClick={subtract} class='btn btn-circle border-accent'>
              -
            </button>
            <pre class='text-xl'>{count()}</pre>
            <button onClick={add} class='btn btn-circle border-accent'>
              +
            </button>
          </div>
        </div>
      </div>

      <div class='card bg-base-100 w-96 shadow-sm m-4 border-1 border-gray-400'>
        <div class='card-body'>
          <h2 class='card-title'>Server action</h2>
          <div class='flex flex-col gap-3'>
            <input
              type='text'
              class='input input-bordered w-full max-w-xs'
              placeholder='Type "crash" for fatal error'
              onInput={debounce((e) => {
                setInputName(e.target.value);
              }, 500)}
            />
            <Suspense fallback={<div class='skeleton h-4 w-full'></div>}>
              <ErrorBoundary
                fallback={(error, reset) => (
                  <p class='flex flex-col gap-2'>
                    Uncatched crash:&nbsp;
                    <strong class='text-red-500'>{error.message}</strong>
                    <span>
                      enter another name than "crash" then
                      <button
                        class='btn btn-sm btn-primary'
                        onClick={reset}
                        type='button'>
                        Try again
                      </button>
                    </span>
                  </p>
                )}>
                <Switch>
                  <Match when={greeting()?.data}>
                    <p>greeting: {greeting()?.data}</p>
                  </Match>
                  <Match when={greeting()?.error}>
                    <p class='text-red-500'>{greeting()?.error?.code}</p>
                  </Match>
                </Switch>
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </div>

      <div>{props.children}</div>
    </div>
  );
}
