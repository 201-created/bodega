import config from 'bodega/config/environment';
const { animationDuration: duration } = config;

export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('item'),
    this.useAndReverse('explode', {
      matchBy: 'data-item-id',
      use: ['flyTo', { duration } ]
    }, {
      use: ['crossFade', { duration }]
    })
  );
}
