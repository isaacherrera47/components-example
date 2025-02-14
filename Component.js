/**
 * CustomElement class extends HTMLElement to create a custom web component.
 * 
 * @class CustomElement
 * @extends {HTMLElement}
 * 
 * @param {Object} [props={}] - Initial properties for the custom element.
 * 
 * @method connectedCallback - Called when the element is added to the DOM.
 * @method render - Abstract method to be implemented by subclasses to define the element's HTML.
 * @method _syncAttributtes - Synchronizes attributes and properties.
 * @method _assignPropsFromAttributes - Assigns properties from the element's attributes.
 * @method _assignAttributesFromProps - Assigns attributes from the element's properties.
 * @method _replaceSlots - Replaces slot placeholders with actual content.
 */
export class CustomElement extends HTMLElement {
    constructor(props = {}) {
        super();
        this.props = props;
        this._syncAttributtes();
    }

    connectedCallback() {
        const slotValues = [...this.querySelectorAll('[data-slot]')].map(el => ({ slot: el.dataset.slot, value: el.innerHTML }));
        this.innerHTML = this.render();
        this._replaceSlots(slotValues);
    }

    render() {
        throw new Error('You have to implement the render method.');
    }

    _syncAttributtes() {
        if (this.getAttributeNames().length) {
            this._assignPropsFromAttributes();

            return;
        }

        this._assignAttributesFromProps();
    }

    _assignPropsFromAttributes() {
        for (const name of this.getAttributeNames()) {
            this.props[name] = this.getAttribute(name);
        }
    }

    _assignAttributesFromProps() {
        for (const [key, value] of Object.entries(this.props)) {
            this.setAttribute(key, value);
        }
    }

    _replaceSlots(slotValues) {
        for (const { slot, value } of slotValues) {
            const slotElement = this.querySelector(`.${slot}`);
            slotElement.innerHTML = value;
        }
    }


}