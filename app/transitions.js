export let duration = 400;

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
