export default function(server) {
  let stickerData = [
    {name: 'Seat', url: '/assets/images/seat.png'},
    {name: 'Touch', url: '/assets/images/fingers.png'},
    {name: 'Space', url: '/assets/images/space.png'}
  ];

  stickerData.forEach(({name, url}) => {
    server.create('item', {name, url});
  });
}
