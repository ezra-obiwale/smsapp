tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates:function (names, callback) {

	var that = this;

	var loadTemplate = function (index) {
	    var name = names[index];
	    console.log('Loading template: ' + name);
	    $.get('tpl/' + name + '.html', function (data) {
		that.templates[name] = data;
		index++;
		if (index < names.length) {
		    loadTemplate(index);
		} else {
		    callback();
		}
	    });
	}

	loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
	return this.templates[name];
    }

};


Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value))
}

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return (value !== null) ? JSON.parse(value) : null;
}

window.redirect = function(page) {
    location.hash=page;
}

window.popAlert = function(message, title) {
    if (navigator.notification) {
	if (!title)
	    title = "Alert";

	navigator.notification.alert(message, null, title, 'OK');
	beep();
	vibrate();
    } else {
	alert(title ? (title + ": " + message) : message);
    }
}

window.popConfirm = function(message, callback , title, btnLabels) {
    if (navigator.notification) {
	if (!title)
	    title = "Alert";
	if (!btnLabels)
	    btnLabels = "Ok,Cancel";

	navigator.notification.alert(message, callback, title, btnLabels);
    } else {
	callback(confirm(title ? (title + ": " + message) : message));
    }
}

window.beep = function(repeat) {
    if (navigator.notification) {
	if (!repeat)
	    repeat = 1;

	navigator.notification.beep(repeat)
    }
}

window.vibrate = function(ms) {
    if (navigator.notification) {
	if (!ms)
	    ms = 2500;

	navigator.notification.vibrate(ms)
    }
}