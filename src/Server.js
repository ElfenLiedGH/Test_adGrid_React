import { roomListReceived, messageReceived, fullLogReceived } from './actions/serverActions.js';


export default class Server
{
  constructor(store)
  {
      this.dispatch = store.dispatch;
      this.log = new Map();
      this.rooms=['первая','вторая','все остальные'];
    /*this.server = window.io('http://'+document.location.hostname+':8088');

    this.server.on('new', (m) => store.dispatch(messageReceived(m.from, m.room, m.msg)));
    this.server.on('log', (m) => store.dispatch(fullLogReceived(m)));
    this.server.on('list', (m) => store.dispatch(roomListReceived(m)));
*/
    console.log('Server: Подключаюсь');
  }

  send(from, room, msg)
  {
      console.log('Server: msg');
      var msgs = this.log.get('room');
      if(!msgs) msg = [];
      msgs.push(msgs);
      this.log.set(room,msgs);
      this.dispatch(messageReceived(m.from, m.room, m.msg));
    // this.server.emit('msg', {from, room, msg});
  }

  getLog(room) {
       console.log('Server: getlog');
       this.dispatch(fullLogReceived(this.log.get('room')))
    // this.server.emit('getlog', room);
  }

  getRooms() {
      console.log('Server: get rooms');
    this.dispatch(roomListReceived(this.rooms))
  }

}