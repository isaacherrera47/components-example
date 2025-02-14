import { CustomElement } from './Component.js';
/**
 * Represents a Bootstrap 3 modal component.
 * 
 * @class
 * @extends CustomElement
 * 
 * @param {Object} props - The properties for the modal.
 * @param {string} props.id - The unique identifier for the modal.
 * @param {string} [props.title=''] - The title of the modal.
 * @param {string} [props.size=''] - The size of the modal (e.g., 'sm' for small, 'lg' for large).
 * @param {boolean} [props.backdrop=true] - Whether the modal should have a backdrop.
 * @param {boolean} [props.keyboard=true] - Whether the modal should close when the escape key is pressed.
 */
class Modal extends CustomElement {
    constructor(props) {
        super(props);
        const { title } = this.props;
        this.setState({ title });
    }

    render() {
        const { id, size, backdrop, keyboard } = this.props;
        const { title } = this.state;
        const sizeClass = size ? `modal-${size}` : '';
        const backdropAttr = backdrop ? 'true' : 'false';
        const keyboardAttr = keyboard ? 'true' : 'false';

        return `
            <div class="modal fade" id="${id}--child" tabindex="-1" role="dialog" aria-labelledby="${id}-label" data-backdrop="${backdropAttr}" data-keyboard="${keyboardAttr}">
            <div class="modal-dialog ${sizeClass}" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="${id}-label">${title}</h4>
            </div>
            <div class="modal-body" data-slot="modal-body">
            </div>
            <div class="modal-footer" data-slot="modal-footer">
            </div>
            </div>
            </div>
            </div>
        `;
    }
}

customElements.define('custom-modal', Modal);