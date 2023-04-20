import React from 'react'
import Task from './Task'
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../styles/modules/app.module.scss';


const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};



const TasksList = ({ todosList ,handleDelete,handleUpdate,checkHandle,filterStatus}) => {
  
  const sortedTodos = [...todosList]
  sortedTodos.sort((a, b) => new Date(b.time) - new Date(a.time))
  const filteredTodos = sortedTodos.filter((todo) => {
    if (filterStatus === "all") {
      return true;
    }
    return todo.status === filterStatus;
  })
  return (

    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div>
        
      </div>
      
      <AnimatePresence>
        {filteredTodos && filteredTodos.length > 0 ?
          (filteredTodos.map((todo) => {
            return (
              <Task todo={todo} key={todo.id} handleDelete={handleDelete} handleUpdate={handleUpdate} checkHandle={ checkHandle}/>
              //<li key={todo.id}>{todo.title}</li>
            )
          }))
          :(
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )
        }
      
      </AnimatePresence>
    </motion.div>
  )
}

export default TasksList