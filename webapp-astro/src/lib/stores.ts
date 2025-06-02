import { atom } from "nanostores";

export const $sideBarOpened = atom(false);

export function toggleSideBar() {
  $sideBarOpened.set(!$sideBarOpened.get());
}
