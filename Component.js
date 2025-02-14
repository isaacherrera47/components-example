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
    static observedAttributes = ['_state'];

    constructor(props = {}) {
        super();
        this.props = props || {};
        this._syncAttributtes();
        this.state = {};
        this._slotValues = [...this.querySelectorAll('[data-slot]')].map(el => ({ slot: el.dataset.slot, value: el.innerHTML }));
    }

    setState = (newState) => {
        this._state = { ...newState };
    }

    setSlot(slot, value) {
        this._slotValues = this._slotValues.map(slotValue => slotValue.slot === slot ? { slot, value } : slotValue)
        this._replaceSlots(this._slotValues);
    }

    set _state(newState) {
        this.state = newState;
        this.setAttribute('_state', newState);
        console.log('State set');
    }

    connectedCallback() {
        this.innerHTML = this.render();
        this._replaceSlots(this._slotValues);
        console.log('Connected');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Attribute changed name:', name, 'oldValue:', oldValue, 'newValue:', newValue);
        this.innerHTML = this.render();
        this._replaceSlots(this._slotValues);
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
            const slotElement = this.querySelector(`[data-slot="${slot}"]`);
            slotElement.innerHTML = value;
        }
    }
}