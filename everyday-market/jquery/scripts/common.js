'use-strict';

(function(window) {
    const ns = window.common = window.common || {};
    const waitIndicator = $('#wait');
    const templatesCache = {};

    ns.hideBusyIndicator = function() {
        waitIndicator.addClass('hidden');
    }

    ns.showBusyIndicator = function() {
        waitIndicator.removeClass('hidden');
    }

    ns.render = function(props) {
        return function(tok, i) { return (i % 2) ? props[tok] : tok; };
    }

    ns.renderTemplate = function(templateName, props) {
        let template = templatesCache[templateName];
        if (!template) {
            template = $(`script[data-template="${templateName}"]`).text().split(/\$\{(.+?)\}/g);
            templatesCache[templateName] = template;
        }

        return template.map(this.render(props)).join('');
    }
})(window);