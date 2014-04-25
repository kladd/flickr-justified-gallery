/*
 * Flickr Justified Gallery - v0.0.1
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
            flickrApiUrl: "https://api.flickr.com/services/rest/",
            flickrPerPage: "15",
            justifiedGallerySettings: undefined
        };

        function checkSettings(settings) {
            if (settings.flickrApiKey == "")
                throw 'flickrApiKey must be defined';

            if (settings.flickrUserID == "")
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
                nojsoncallback: 1
            };
            var flickrRequest = $.ajax({
                type: "GET",
                url: settings.flickrApiUrl,
                data: flickrData
            });

            flickrRequest.done(function(response) {
                for (var i = 0; i < settings.flickrPerPage; i++) {
                    var photo = response.photos.photo[i];
                    var url = "http://farm" + photo.farm +
                        ".staticflickr.com/" + photo.server +
                        "/" + photo.id + "_" + photo.secret + ".jpg";
                    var title = (photo.title == "") ? "Untitled" : photo.title;
                    var html = '<a href="https://www.flickr.com/photos/kyleladd/' + photo.id + '">' +
                                '<img alt="' + title + '" src="' + url +'"/></a>';
                    $gallery.append(html);
                }
                $gallery.justifiedGallery(settings.justifiedGallerySettings);
            });

            flickrRequest.fail(function(jqXhr, textStatus) {
                throw "flickrRequest: " + textStatus;
            });
        });
    }
}(jQuery));
