export default class DOM {

    static stringToHTML(str) {
        if (!str) {
            return {};
        }
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    static a = (...args) => DOM.create(`a`, ...args);
    static div = (...args) => DOM.create(`div`, ...args);
    static ul = (...args) => DOM.create(`ul`, ...args);
    static li = (...args) => DOM.create(`li`, ...args);
    static h1 = (...args) => DOM.create(`h1`, ...args);
    static h2 = (...args) => DOM.create(`h2`, ...args);
    static h3 = (...args) => DOM.create(`h3`, ...args);
    static h4 = (...args) => DOM.create(`h4`, ...args);
    static h5 = (...args) => DOM.create(`h5`, ...args);
    static h6 = (...args) => DOM.create(`h6`, ...args);
    static header = (...args) => DOM.create(`header`, ...args);
    static section = (...args) => DOM.create(`section`, ...args);
    static p = (...args) => DOM.create(`p`, ...args);
    static span = (...args) => DOM.create(`span`, ...args);
    static img = (...args) => DOM.create(`img`, ...args);
    static td = (...args) => DOM.create(`td`, ...args);

    static elid(id) {
        return document.getElementById(id);
    }

    static el(name) {
        return document.querySelector(name);
    }

    static appendText(el, text) {
        const textNode = document.createTextNode(text);
        el.appendChild(textNode);
    }

    static appendArray(el, children) {
        children.forEach((child) => {
            if (Array.isArray(child)) {
                DOM.appendArray(el, child);
            } else if (child instanceof window.Element) {
                el.appendChild(child);
            } else if (typeof child === `string`) {
                DOM.appendText(el, child);
            }
        });
    }

    static setStyles(el, styles) {
        if (!styles) {
            el.removeAttribute(`styles`);
            return;
        }

        Object.keys(styles).forEach((styleName) => {
            if (styleName in el.style) {
                el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
            } else {
                console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
            }
        });
    }

    static create(type, textOrPropsOrChild, ...otherChildren) {
        const el = document.createElement(type);

        if (textOrPropsOrChild) {

            if (Array.isArray(textOrPropsOrChild)) {
                DOM.appendArray(el, textOrPropsOrChild);
            } else if (textOrPropsOrChild instanceof window.Element) {
                el.appendChild(textOrPropsOrChild);
            } else if (typeof textOrPropsOrChild === `string`) {
                DOM.appendText(el, textOrPropsOrChild);
            } else if (typeof textOrPropsOrChild === `object`) {
                Object.keys(textOrPropsOrChild).forEach((propName) => {
                    if (propName in el) {
                        const value = textOrPropsOrChild[propName];

                        if (value) {
                            el[propName] = value;
                        }
                    } else {
                        console.warn(`${propName} is not a valid property of a <${type}>`);
                    }
                });
            }

        }

        if (otherChildren) DOM.appendArray(el, otherChildren);

        return el;
    }
}