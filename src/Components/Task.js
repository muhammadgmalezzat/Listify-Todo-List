import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import CheckButton from './CheckButton'


const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Task = ({ todo, handleDelete, handleUpdate,checkHandle }) => {
  const [checked,setChecked]=useState(false)
    ///console.log(todo.status)
//console.log(checked)
  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true)
    }
    else if(todo.status === 'incomplete') {
      setChecked(false)
    }
  },[todo.status])

  return (
    <motion.div className={styles.item} variants={child}>

      <div className={styles.todoDetails}>
        <CheckButton checked={checked}  handleCheck={()=>{checkHandle(todo.id)}}/>
        {/* <Checkbox  checked={checked}  color="success" onClick={()=>{checkHandle(todo.id)}}/> */}
        <div className={styles.texts}>
          <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
          >{todo.title}</p>
          <p className={styles.time}>
              {format(new Date(todo.time), 'p, MM/dd/yyyy')}
            </p>
        </div>
      </div>

      <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete(todo.id)}
            //onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <DeleteIcon />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate(todo.id)}
            //onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <EditIcon />
          </div>
      </div>
      </motion.div>
  )
}

export default Task