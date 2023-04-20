

const getInitialTodo = () => {
    // getting todo list
    const localTodoList = window.localStorage.getItem('todosList');
    // if todo list is not empty
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todosList', []);
    return [];
};

const initialState = {
    todosList:getInitialTodo() ,
    filterStatus:"all"
};
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE":
            const todoList1 = window.localStorage.getItem('todosList');
            if (todoList1) {
                const todoListArr1 = JSON.parse(todoList1);
                todoListArr1.forEach((todo, index) => {
                    if (todo.id === action.id) {
                        todoListArr1.splice(index, 1);
                    }
                });
                window.localStorage.setItem('todosList', JSON.stringify(todoListArr1));
                
            }
            return {
                ...state,
                todosList: state.todosList.filter((todo) => { return todo.id !== action.id; })
            }
        case "ADD":
            const todoList = window.localStorage.getItem('todosList');
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    ...action.todo,
                });
                window.localStorage.setItem('todosList', JSON.stringify(todoListArr));
            } else {
                window.localStorage.setItem(
                    'todosList',
                    JSON.stringify([
                        {
                            ...action.todo,
                        },
                    ])
                );
            }
            return {
                ...state,
                todosList: [...state.todosList, action.todo]
            }
        case "UPDATE":

            const todoList2 = window.localStorage.getItem('todosList');
            if (todoList2) { 
                const todoListArr2 = [...action.updateTodos]
                window.localStorage.setItem('todosList', JSON.stringify(todoListArr2));
            }
            return {
                ...state,
                todosList: [...action.updateTodos]
            }
        case "CHECK":
            const todoList3 = window.localStorage.getItem('todosList');
            if (todoList3) { 
                const todoListArr3 = [...action.updateTodos]
                window.localStorage.setItem('todosList', JSON.stringify(todoListArr3));
            }
            return {
                ...state,
                todosList: [...action.updateTodos]
            }
        default:
            return state
    }
    
};

export default todoReducer