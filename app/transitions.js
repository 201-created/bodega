export let duration = 400;

export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('item'),
    this.use('explode', {
      matchBy: 'data-item-id',
      use: ['flyTo', { duration } ]
    }, {
      pick: '.back-button',
      use: ['crossFade', { duration }]
    }, {
      pick: '.section-store__items-container',
      use: ['toLeft', { duration } ]
    }),
    this.reverse('explode', {
      matchBy: 'data-item-id',
      use: ['flyTo', { duration } ]
    }, {
      pick: '.back-button',
      use: ['crossFade', { duration }]
    }, {
      pick: '.section-store__items-container',
      use: ['toRight', { duration } ]
    })
  );

  this.transition(
    this.hasClass('liquid-footer'),
    this.toValue(true),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration })
  );
}
