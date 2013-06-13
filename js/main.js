var AppRouter = Backbone.Router.extend({
    routes:{
	"":"sms",
	"sms" : "sms",
	"to" : "to",
	"about":"about",
	"contact":"contact"
    },

    initialize:function () {
	$('.back').live('click', function(event) {
	    window.history.back();
	    return false;
	});
	this.firstPage = true;
    },

    sms: function() {
	this.changePage(new SMSView());
    },

    to: function() {
	this.changePage(new ToView());
    },

    about: function() {
	this.changePage(new AboutView());
    },

    contact: function() {
	this.changePage(new ContactView());
    },

    changePage:function (page, options) {
	if (!options)
	    options = {};

	var data = {},
	transition = "fade";

	$.each(options, function(ky, val){
	    switch(ky) {
		case "data":
		    data = val
		    break;
		case "transition":
		    transition = val
		    break;
		case "class":
		    $(page.el).addClass(val);
		    break;
	    }
	});

	if (!data.role)
	    data.role = "page";

	$.each(data, function(ky, val) {
	    var key = ky.split("_");
	    ky = key.join("-");

	    $(page.el).attr('data-' + ky, val);
	});

	page.render();
	$('body').append($(page.el));

	// We don't want to slide the first page
	if (this.firstPage) {
	    transition = 'none';
	    this.firstPage = false;
	}
	$.mobile.changePage($(page.el), {
	    changeHash:false,
	    transition: transition
	});
    }
});

$(document).ready(function () {
    tpl.loadTemplates(["sms", "to", "list-contact",
    "about", "contact"],
	function () {
	    app = new AppRouter();
	    Backbone.history.start();
	});
});