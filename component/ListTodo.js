import html from '../core.js';
import Todoitem from './TodoItem.js';
import { connect } from '../store.js';

function Todolist({ todos, currentFilter, filters, currentEdit }) {
    return html`
        <section class="main">
            <input 
                id="toggle-all" 
                class="toggle-all" 
                type="checkbox"
                onchange="dispatch('checkAll', this.checked)"
                ${todos.every(filters.completed) && 'checked'}>
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.filter(filters[currentFilter]).map((todo, index) => Todoitem({ todo, index, currentEdit }))}
            </ul>
        </section>
    `
}

export default connect()(Todolist);