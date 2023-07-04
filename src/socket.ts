import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export let socket: null | Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> = null;
export const setSocket = (
  newSocket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket = newSocket;
};
