## Flickr Justified Gallery

This gallery plugin allows you to create a Flickr photostream-like gallery for your application
while still using Flickr to host your image files. The plugin uses the Flickr API to gather a list
of recently added public photos for a particular user and displays them in a justified gallery
using ["Justified Gallery"](http://miromannino.com/projects/justified-gallery/) from Miro Mannino.

## Installation

```bash
bower install kladd/flickr-justified-gallery
```

## Usage

Follow the directions on Miro Mannino's project page
[here](http://miromannino.com/projects/justified-gallery/).

Then replace

```javascript
$("#mygallery").justifiedGallery();
```

with

```javascript
$("#mygallery").flickrJustifiedGallery();
```

## License

Flickr Justified Gallery is open-sourced software licensed under the
[MIT license](https://raw.github.com/kladd/flickr-justified-gallery/master/LICENSE)
