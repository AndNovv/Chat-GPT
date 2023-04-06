import React from 'react'
import styles from '@/styles/Message.module.css'
import { BiUserCircle } from 'react-icons/bi';
import { GiBrain } from 'react-icons/gi'
import { FaRegUser } from 'react-icons/fa'

const Message = (props) => {
  return (
    <div className={props.author === 'user' ? styles.usercontainer : styles.aicontainer }key={props.index}>
        <div className={styles.icon}>
            {props.author === 'user' ? <FaRegUser size={30}/> : <GiBrain size={32}/>}
        </div>
        <pre className={styles.message}>{props.message}</pre>
    </div>
  )
}

export default Message