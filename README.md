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
$("#mygallery").flickrJustifiedGallery({
	flickrApiKey: "YOUR_API_KEY",
	flickrUserID: "YOUR_FLICKR_USER_ID",
	flickrPerPage: 12
});
```

Additional settings can be set through the `justifiedGallerySettings` parameter.

Here's an example:

```javascript
$("#mygallery").flickrJustifiedGallery({
	flickrApiKey: "YOUR_API_KEY",
	flickrUserID: "YOUR_FLICKR_USER_ID",
	flickrPerPage: 12,

	justifiedGallerySettings: {
		rowHeight: 212,
		maxRowHeight: 312,
		target: "_blank",
		lastRow: "hide"
	}
});
```

## License

Flickr Justified Gallery is open-sourced software licensed under the
[MIT license](https://raw.github.com/kladd/flickr-justified-gallery/master/LICENSE)
