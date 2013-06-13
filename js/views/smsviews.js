window.SMSView = Backbone.View.extend({
    initialize: function() {
	this.template = _.template(tpl.get("sms"));
    },

    render: function() {
	$(this.el).html(this.template({
	    el:$("#content")
	}));
    },

    events: {
	"click #menu-a" :"menu",
	"submit #form":"submit",
	"click #goto": "to"
    },

    menu: function(event) {
	$(".menu").toggle();
    },

    submit: function(event) {
	event.preventDefault();

	if ($("#name").val() == "" || $("#message").val() == "") {
	    popAlert("All fields are required");
	}
	else {
	    $.post(url, data, callback, type);
	}
    },

    to: function(event){
	event.preventDefault();
	redirect("to");
    }
});

window.ToView = Backbone.View.extend({
    initialize: function() {
	this.template = _.template(tpl.get("to"));
    },

    render: function() {
	$(this.el).html(this.template({
	    el:$("#content")
	}));

	this.listview = new ContactListView({
	    el:$("#contact-list")
	});

	this.listview.render();
    },

    events: {
	"click #contact": "addContact"
    },

    addContact: function(event) {

    }
});

window.ContactListView = Backbone.View.extend({
    render: function() {
	if (navigator.contacts)
	    navigator.contacts.find("*", this.gotContacts, this.contactError);
	else
	    popAlert("Contacts API not supported!", "Contacts Error!");
	$(this.el).empty();
	return this;
    },

    gotContacts: function(contacts) {
	popAlert("found " + contacts.length + " contacts.", "Contacts Found!")

	_.each(contacts, function (contact) {
	    var ContactModel = new Backbone.Model();

	    popAlert(JSON.stringify(contact));
//	    var model = user.toJSON();
//	    model.isFriend = localStorage.getItem("isFriends");
//
//	    user = new User(model);
//	    $(this.el).append(new ContactListItemView({
//		model:user
//	    }).render().el);
	}, this);

	$('#contact-list').listview('refresh');
	return this;
    },

    contactError: function(error) {
	popAlert(error, "Fatal Error!");
    }
});

window.ContactListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
	this.template = _.template(tpl.get('contact'));
    },

    render:function (eventName) {
	$(this.el).html(this.template(this.model.toJSON()));
	return this;
    }

});