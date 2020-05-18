# MMM-showerthoughts

Module for [MagicMirror²](https://magicmirror.builders/) to display [/r/Showerthoughts](https://old.reddit.com/r/Showerthoughts/) on screen.

## Installation

Clone the repository

```bash
cd ~/MagicMirror/modules
git clone https://github.com/dominikb/MMM-showerthoughts.git
cd MMM-showerthoughts
npm install
```

Extend the configuration of your MagicMirror in `config/config.js`

```js
{
    module: 'MMM-showerthoughts'
    config: {
      // Time in SECONDS until quotes change on screen.
      viewUpdateInterval: 30,

      // Time in MINUTES until new quotes get polled from reddit.
      fetchInterval: 60,

      // Number of quotes, from top down, that will be used.
      quoteLimit: 20,
    }
},
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Credits

- [Dominik Bauernfeind](https://github.com/dominikb)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
