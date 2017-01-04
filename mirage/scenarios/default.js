export default function(server) {
  let stickerData = [
    {name: 'ghost', url: '/assets/images/seat.png'},
    {name: 'fingers', url: '/assets/images/fingers.jpg'},
    {name: 'space', url: '/assets/images/space.jpg'}
  ];

  stickerData.forEach(({name, url}) => {
    server.create('item', {name, url});
  });
}
