export default function(){
  var duration = 1000;

  this.transition(
    this.fromRoute('index'),
    this.toRoute('item'),
    this.use('explode', {
      matchBy: 'data-test-item',
      use: ['flyTo', { duration } ]
    }, {
      pick: '.back-button',
      use: ['crossFade', { duration }]
    }, {
      pick: '.section-store__items-container',
      use: ['toLeft', { duration } ]
    }),
    this.reverse('explode', {
      matchBy: 'data-test-item',
      use: ['flyTo', { duration } ]
    }, {
      pick: '.back-button',
      use: ['crossFade', { duration }]
    }, {
      pick: '.section-store__items-container',
      use: ['toRight', { duration } ]
    })
  );
}
