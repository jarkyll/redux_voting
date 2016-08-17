import Server from 'socket.io';


export default function startServer(store){
  const io = new Server().attach(8090);


  //subscribe a listener to the store so it reads
  // the state and makes it into a js obj

  store.subscribe( ()=> io.emit('state', store.getState().toJS() )
);

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    //clients emite action events that go into the store
    // security is needed here bc any connected client can dispatch
    // any action, so a firewall would be important here
    //http://vertx.io/docs/vertx-web/java/#_securing_the_bridge
    // or have a auth method 
    socket.on('action', store.dispatch.bind(store));
  });
}
