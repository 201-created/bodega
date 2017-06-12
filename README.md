# Bodega

## Task Tracking
 * [Trello Board](https://trello.com/b/A0j0rS2a/mobile-web-app-ecommerce-demo)

## Deployment

This app is deployed via Heroku automatically when new code is pushed to master.

The Heroku app is [here](https://dashboard.heroku.com/apps/shop-201).

## Installation

* `git clone <repository-url>` this repository
* `cd bodega`
* `yarn`
* `bower install`
* Update your `/etc/hosts` to include a line: `127.0.0.1  localhost.ssl`

## Running / Development

* `ember serve`
* Visit your app **using Safari** at [https://localhost.ssl:4200](https://localhost.ssl:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
