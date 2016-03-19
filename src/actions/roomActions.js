export const SELECT_ROOM = 'SELECT_ROOM';
export const ROOMS_LIST = 'ROOMS_LIST';

export function selectRoomAction(room) {
   return {
      type: SELECT_ROOM,
      room: room
   };
}

export function getRoomAction() {
   return {
      type: ROOMS_LIST_ROOM
   };
}