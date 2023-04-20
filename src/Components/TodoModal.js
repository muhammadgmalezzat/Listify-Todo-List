import React, { Fragment, useState } from 'react'
//import { useDispatch } from 'react-redux'
import {toast} from 'react-hot-toast'
//import {addTodo} from '../slices/todoSlice'
import styles from '../styles/modules/modal.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux';



const TodoModal = (props) => {
    const [title, settitle] = useState("");
    const [status, setstatus] = useState("incomplete");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && status) { 
            if (props.type === "add") {
                //this is for add action
                props.onAdd({
                        id: uuid(),
                        title: title,
                        status: status,
                        time:new Date().toLocaleString()
                })
                //reset the title and status
                settitle("")
                setstatus("incomplete")
                //close the modal
                props.setmodalOpen(false)
                //notification message
                toast.success(`Task ${props.type==="add"? "Added":"Updated"} successfully`)
            }
            if (props.type === "update") {
                //destructure todos from state
                let updateTodos = props.todoList;
                //updated todos array
                updateTodos.map((todo) => {
                        if (todo.id === props.updateId) {
                            todo.id = props.updateId;
                            todo.title = title;
                            todo.status = status;
                            todo.time=new Date().toLocaleString()
                        }
                })
                //update action
                props.onUpdate(updateTodos)
                //reset the title and status
                settitle("")
                setstatus("incomplete")
                //close the modal
                props.setmodalOpen(false)
                //notification message
                toast.success(`Task ${props.type==="add"? "Added":"Updated"} successfully`)
            }
        } else {
            //notification message
            toast.error("Title should not be empty")
        }
    }

    return (
        <>
            {(props.modalOpen) &&
                (<div className={styles.wrapper}>
                    <div className={styles.container}>
                    <div
                        className={styles.closeButton}
                        onClick={() => { props.setmodalOpen(false); }}
                        onKeyDown={() => { props.setmodalOpen(false); }}
                        tabIndex={0}
                        role="button"
                    >
                            <CloseIcon />
                        </div>
                        <form className={styles.form} onSubmit={(e)=>{handleSubmit(e)}}>
                        <h1 className={styles.formTitle}> {props.type==="add"? "Add Task":"Update Task"}</h1>
                            <label htmlFor="title">
                                title
                            <input type="text" id='title' value={title} onChange={(e)=>{settitle(e.target.value)} }/>
                            </label>
                            <label htmlFor="status">
                                status
                                <select name="status" id='status' value={status} onChange={(e)=>{setstatus(e.target.value)} }>
                                    <option value="incomplete">Incomplete</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </label>
                            <div className={styles.buttonContainer}>
                            <Button type="submit" variant='primary'
                                //onClick={()=>{ }}
                            >
                                {props.type==="add"? "Add Task":"Update Task"}
                            </Button>
                            <Button type="button" variant='secondary'
                                onClick={() => { props.setmodalOpen(false); }}
                            onKeyDown={() => { props.setmodalOpen(false); }}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>)
            }
            
        </>
        
    )
};


const mapStateToProps = (state) => {
    return {
        todoList:state.todosList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (todo) => dispatch({ type: "ADD", todo: todo }),
        onUpdate:(updateTodos) => dispatch({ type: "UPDATE", updateTodos: updateTodos })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoModal)