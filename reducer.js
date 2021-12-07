import storage from "./util/storage.js";

const init = {
    todos: storage.get(),
    currentFilter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    currentEdit: null
}

const actions = {
    add({ todos }, title) {
        if(title) {
            todos.push({ title, completed: false });
            storage.set(todos);
        }
    },
    check({ todos }, index) {
        todos[index].completed = !todos[index].completed;
        storage.set(todos);
    },
    checkAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed);
        storage.set(todos);
    },
    destroy({ todos }, index) {
        todos.splice(index, 1);
        storage.set(todos);
    },
    selectFilter(state, filter) {
        state.currentFilter = filter;
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active);
        storage.set(state.todos);
    },
    startEdit(state, index) {
        state.currentEdit = index;
    },
    editTodo(state, newTitle) {
        if(state.currentEdit != null) {
            if(newTitle) {
                state.todos[state.currentEdit].title = newTitle;
                storage.set(state.todos);
            }
            else {
                this.destroy(state, state.currentEdit);
            }
            state.currentEdit = null;
        }
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args);

    return state;
}

