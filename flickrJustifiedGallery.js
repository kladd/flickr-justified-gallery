/*!
 * Flickr Justified Gallery - v0.0.1
 * http://github.com/kladd/flickr-justified-gallery/
 * Copyright (c) 2014 Kyle Ladd
 * Licensed under the MIT license.
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

        function checkSettings(context) {
            if (context.settings.flickrApiKey == "")
                throw 'flickrApiKey must be defined';

            if (context.settings.flickrUserID == "")
                throw 'flickrUserID must be defined';
        }

        return this.each(function (index, gallery) {
            var $gallery= $(gallery);
            var context = {
                settings: $.extend({}, defaults, arg)
            };

            checkSettings(context);

            var flickrData = {
                method: context.settings.flickrApiMethod,
                api_key: context.settings.flickrApiKey,
                user_id: context.settings.flickrUserID,
                per_page: context.settings.flickrPerPage,
                format: "json",
                nojsoncallback: 1
            };
            var flickrRequest = $.ajax({
                type: "GET",
                url: context.settings.flickrApiUrl,
                data: flickrData
            });

            flickrRequest.done(function(response)) {
                for (var i = 0; i < per_page; i++) {
                    var photo = response.photos.photo[i];
                    var url = "http://farm" + photo.farm +
                        ".staticflickr.com/" + photo.server +
                        "/" + photo.id + "_" + photo.secret + ".jpg";
                    var title = (photo.title == "") ? "Untitled" : photo.title;
                    var html = '<a href="https://www.flickr.com/photos/kyleladd/' + photo.id + '">' +
                                '<img alt="' + title + '" src="' + url +'"/></a>';
                    $gallery.append(html);
                }
                $gallery.justifiedGallery(context.settings.justifiedGallerySettings);
            }

            flickrRequest.fail(function(jqXhr, textStatus) {
                throw "flickrRequest: " + textStatus;
            });
        });
    }
}(JQuery));
