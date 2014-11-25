/*
 * Flickr Justified Gallery - v1.0.1
 * http://github.com/kladd/flickr-justified-gallery/
 *
 * flickrJustifiedGallery.js
 */
(function($) {
    $.fn.flickrJustifiedGallery = function (arg) {
        var defaults = {
            flickrApiKey: "",
            flickrUserID: "",
            flickrApiMethod: "flickr.people.getPublicPhotos",
            flickrApiUrl: "https://api.flickr.com/services/rest/?jsoncallback=?",
            flickrPerPage: "15",
            justifiedGallerySettings: undefined
        };

        function checkSettings(settings) {
            if (settings.flickrApiKey === "")
                throw 'flickrApiKey must be defined';

            if (settings.flickrUserID === "")
                throw 'flickrUserID must be defined';
        }

        return this.each(function (index, gallery) {
            var settings = $.extend({}, defaults, arg);
            var $gallery = $(gallery);

            checkSettings(settings);

            var flickrData = {
                method: settings.flickrApiMethod,
                api_key: settings.flickrApiKey,
                user_id: settings.flickrUserID,
                per_page: settings.flickrPerPage,
                format: "json",
                extras: "path_alias"
            };

            var flickrRequest = $.getJSON(
                    settings.flickrApiUrl,
                    flickrData);

            flickrRequest.done(function(response) {
                for (var i = 0; i < response.photos.photo.length; i++) {
                    var photo = response.photos.photo[i];
                    var url = "http://farm" + photo.farm +
                        ".staticflickr.com/" + photo.server +
                        "/" + photo.id + "_" + photo.secret + ".jpg";
                    var title = (photo.title === "") ? "Untitled" : photo.title;
                    var html = '<a href="https://www.flickr.com/photos/' + photo.pathalias + '/' + photo.id + '">' +
                                '<img alt="' + title + '" src="' + url +'"/></a>';
                    $gallery.append(html);
                }
                $gallery.justifiedGallery(settings.justifiedGallerySettings);
            });

            flickrRequest.fail(function(jqXhr, textStatus) {
                throw "flickrApiRequest: " + textStatus;
            });
        });
    };
}(jQuery));
