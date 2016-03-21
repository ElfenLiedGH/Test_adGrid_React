// import { roomListReceived, messageReceived, fullLogReceived } from './actions/serverActions.js';


export default class Server
{
  constructor(store)
  {
      this.dispatch = store.dispatch;
      this.log = new Map();
      this.rooms=['первая','вторая','все остальные'];
    console.log('Server: Подключаюсь');
  }

  getRooms() {
      console.log('Server: get rooms');
    // this.dispatch(roomListReceived(this.rooms))
  }

}