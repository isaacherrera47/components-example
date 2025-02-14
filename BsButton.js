import { CustomElement } from "./Component.js";

class BsButton extends CustomElement {
    constructor(props) {
        super(props || {});
        const { text } = this.props;
        this.setState({ text });
    }

    render() {
        const { text } = this.state;
        const { id } = this.props;

        return `
            <button id="${id}--child" type="button" class="btn btn-primary">${text}</button>
        `;
    }
}

customElements.define('bs-button', BsButton);