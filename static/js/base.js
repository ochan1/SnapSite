snapURL = location.protocol + '//bromagosa.github.io/Snap/snap.html';

function getUrlParameter (param) {
    var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

function pageUser () {
    return getUrlParameter('user');
};

function pageProject () {
    return getUrlParameter('project');
};

// Data insertion

function fillVisitorFields () {
    var visitor = SnapAPI.currentUser();
    if (visitor) {
        document.querySelectorAll('.visitor').forEach(function (each) {
            each.innerHTML = visitor;
        });
    }
};

function fillUsernameFields () {
    var username = pageUser();
    if (username) {
        document.querySelectorAll('.username').forEach(function (each) {
            each.innerHTML = username;
        });
    }
};

function setTitle (newTitle) {
    document.title = newTitle;
};

// Element creation

function authorSpan (author) {
    var span = document.createElement('span');
    span.classList.add('author');
    span.innerHTML = localizer.localize(' by ') + '<a href="user.html?user=' + author + '"><strong>' + author + '</strong></a>';
    return span;
};

function isPublicSpan (isPublic) {
    var span = document.createElement('span'),
        state = isPublic ? 'public' : 'private';
    span.classList.add(state);
    span.innerHTML = '<small>(' + localizer.localize(state) + ')</small>';
    return span;
};

function projectURL (author, project) {
    return snapURL + '#present:Username=' + author + '&ProjectName=' + project;
};

// Error handling

function genericError (errorString, title) {
    doneLoading();
    return new Promise(function (resolve, reject) {
        alert(
           errorString,
           { title: title || 'Error'},
           resolve
           );
    });
};

// Page loading

function beganLoading (selector) {
    var loader;
    if (selector) {
        loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>';
        document.querySelector(selector).append(loader);
    }
};

function doneLoading (selector) {
    document.querySelector(selector ? (selector + ' .loader') : '#loading').hidden = true;
};

// Other goodies

function formatDate (aDate) {
    return aDate.toLocaleString(
        navigator.language || 'en-us',
        { month: 'long', day: '2-digit', year: 'numeric' }
    );
};

// JS additions

Array.prototype.sortBy = function (parameter, reverse) {
    return this.sort(
        function (a, b) {
            if (reverse) {
                return (a[parameter] > b[parameter]) ? 1 : -1;
            } else {
                return (a[parameter] > b[parameter]) ? -1 : 1;
            }
        }
    );
};