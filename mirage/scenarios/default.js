export default function(server) {
  // TODO(Jorge): Update stickers with actual assets
  let stickerData = [
    {name: 'ghost', url: 'sticker-ghost.png'},
    {name: 'fingers', url: 'sticker-fingers.png'},
    {name: 'prince', url: 'sticker-prince.png'}
  ];

  stickerData.forEach(({name, url}) => {
    server.create('item', {name, url});
  });
}
