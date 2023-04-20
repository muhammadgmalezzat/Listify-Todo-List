import React, { useEffect, useState } from 'react'
import Title from '../Components/Title'
import Quote from '../Components/Quote'
import Button, { SelectButton } from '../Components/Button'
import Taskslist from '../Components/Taskslist'
import styles from '../styles/modules/app.module.scss';
import TodoModal from '../Components/TodoModal'
import { connect } from 'react-redux';
import {toast} from 'react-hot-toast'
import Details from '../Components/details'

const Tasks = (props) => {
    const [modalOpen, setmodalOpen] = useState(false);
    const [todosList, settodosList] = useState([]);
    const [type, settype] = useState("add");
    const [updateId, setupdateId] = useState("");
    const [filterStatus,setfilterStatus] = useState("all")
    const [completedTasksNum, setcompletedTasksNum] = useState(0)

    const tasksNumber = () => {
        const allTasks = props.todoList.length;
        const completedNum=0
        console.log(allTasks);
        props.todoList.map((todo) => {
            if (todo.status === "complete") {
                completedNum++;
            }
        })
        setcompletedTasksNum(completedNum)
    }
    useEffect(() => {
        settodosList(props.todoList);
        


    }, [todosList])
    useEffect(() => {
        const allTasks = props.todoList.length;
        console.log(props.todoList);
        let completedNum = 0
        props.todoList.map((todo) => {
            if (todo.status === "complete") { 
                console.log("ee")
                completedNum++;
            }
        })
        setcompletedTasksNum(completedNum)
     })

    const updateFilter = (e) => {
        setfilterStatus(e.target.value)
    }

    //delete function
    const handleDelete = (id) => {
        //delete action
        props.onDelete(id)
        //notification message
        toast.success("Task deleted successfully")
    }
    //handle update for modal open 
    const handleUpdate = (id) => {
        //type of modal 
        settype("update")
        //open modal
        setmodalOpen(true)
        //pass id of todo need to be updated
        setupdateId(id)
    }
    //check mark function
    const checkHandle = (id) => {
        //destructure of todos state
        let updateTodos = props.todoList;
        //change todo status
        updateTodos.map((todo) => {
                if (todo.id === id) {
                if (todo.status === "complete") { todo.status = "incomplete" }
                else {
                    todo.status = "complete";
                    toast.success("Task completed successfully");
                    } 
                }
        })
        //check action
        props.onCheck(updateTodos)
    }
    
    return (
        <div className={styles.app__wrapper} style={{minWidth:"300px"}}>
            <Title />
            < Quote />
            <Details completedNum={completedTasksNum} allTasksNum={props.todoList.length }/>
            < Button
                type="button"
                variant='primary'
                onClick={() => {
                    setmodalOpen(true)
                    settype("add")
                }}
            >Crate task</Button>
            <SelectButton id="status" onChange={ updateFilter} value={filterStatus}>
                <option value="all">all</option>
                <option value="complete">complete</option>
                <option value="incomplete">incompleted</option>
            </SelectButton>
            <Taskslist
                todosList={props.todoList}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                checkHandle={checkHandle}
                filterStatus={ filterStatus}
            />
            <TodoModal
                modalOpen={modalOpen}
                setmodalOpen={setmodalOpen}
                type={type}
                updateId={ updateId}
            />
        </div>
    )
};




const mapStateToProps = (state) => {
    return {
        todoList:state.todosList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (todoId) => dispatch({ type: "DELETE", id: todoId }),
        onCheck:(updateTodos) => dispatch({ type: "CHECK", updateTodos: updateTodos })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tasks)