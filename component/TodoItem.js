import html from '../core.js';

function Todoitem({ todo, index, currentEdit }) {
    return html`
        <li class="${todo.completed && 'completed'}${currentEdit === index && 'editing'}">
            <div class="view">
                <input 
                    class="toggle" 
                    type="checkbox" 
                    ${todo.completed && 'checked'}
                    onchange="dispatch('check', ${index})"
                />
                <label ${!todo.completed && `ondblclick="dispatch('startEdit', ${index})"`}>${todo?.title}</label>
                <button class="destroy" onclick="dispatch('destroy', ${index})"></button>
            </div>
            <input 
                class="edit" 
                value="${todo?.title}" 
                onkeyup="event.keyCode === 13 && dispatch('editTodo', this.value.trim())"
                onblur="dispatch('editTodo', this.value.trim())"
            >
        </li>
    `
}

export default Todoitem;