

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

// [{
//         id: '1',
//         title: 'todo1',
//         status: 'incomplete',
//         time: '4/19/2023, 7:41:35 AM'
//     },
//     {
//         id: '2',
//         title: 'todo2',
//         status: 'incomplete',
//         time: '4/19/2023, 7:41:35 AM'
//     }]
        
const initialState = {
    todosList:getInitialTodo() ,
    filterStatus:"all"
};
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE":
            console.log("DELETE")
            console.log(state.todosList)
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
            console.log("ADD")
            console.log(action.todo)
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
            console.log("UPDATE")
            console.log(action.updateTodos)

            const todoList2 = window.localStorage.getItem('todosList');
            if (todoList2) { 
                const todoListArr2 = [...action.updateTodos]
                console.log(todoListArr2)
                window.localStorage.setItem('todosList', JSON.stringify(todoListArr2));
            }
            return {
                ...state,
                todosList: [...action.updateTodos]
            }
        case "CHECK":
            console.log("CHECK")
            console.log(action.updateTodos)
            const todoList3 = window.localStorage.getItem('todosList');
            if (todoList3) { 
                const todoListArr3 = [...action.updateTodos]
                console.log(todoListArr3)
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