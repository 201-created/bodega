import Service from '@ember/service';
import RSVP from 'rsvp';

export default Service.extend({
  isAvailable: true,

  init() {
    this._super(...arguments);
    this.chargesSent = [];
    this.notificationsSent = [];
    this.rejectionError = null;
  },

  rejectWith(message) {
    this.rejectionError = { message };
  },

  charge(payment) {
    this.chargesSent.push(payment);
    let notificationsSent = this.notificationsSent;

    return new RSVP.Promise((resolve, reject) => {
      if (this.rejectionError) {
        reject(this.rejectionError);

        return;
      }

      resolve({
        result: {
          token: { id: 'fake-token-id' }
        },
        notify: {
          success() {
            notificationsSent.push('success')
          },
          failure() {
            notificationsSent.push('failure')
          }
        }
      })
    });
  }
});
