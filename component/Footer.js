import html from '../core.js';
import { connect } from '../store.js'

function Footer({ todos, currentFilter, filters }) {
    return html`
        <footer class="footer">
            <span ${currentFilter === 'completed' && 'style="display: none"'} class="todo-count"><strong>${todos.filter(filters.active).length}</strong> item left</span>
            <ul class="filters">
                ${Object.keys(filters).map(el => html
                    `
                        <li style="cursor:pointer" onclick="dispatch('selectFilter', '${el}')">
                            <a ${currentFilter === el && 'class="selected"'} style="text-transform: capitalize;">${el}</a>
                        </li>
                    `
                )}
            </ul>
            <button ${(todos.every(filters.active) || currentFilter === 'active') && 'style="display: none"'} onclick="dispatch('clearCompleted')" class="clear-completed">Clear completed</button>
        </footer>
    `
}

export default connect()(Footer);