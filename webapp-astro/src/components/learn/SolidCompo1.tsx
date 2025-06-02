import { onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { logger } from "../../lib/logger";

export default function SolidCompo1() {
  const randomString =
    (isServer ? "Server" : "Client") +
    " " +
    Math.random().toString(36).substring(2, 15);
  logger.info(`init SolidCompo1 on ${randomString}`);

  onMount(() => {
    console.info(new Date().toISOString() + " on mount ", randomString);
  });

  return <div>SolidCompo1 {randomString}</div>;
}
