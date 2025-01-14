import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState } from 'react';

export function Header({ handleAddTask,  }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    handleAddTask(title);
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>To-Do List</h1>

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input 
          type="text" 
          placeholder="Add your task"  
          onChange={onChangeTitle} 
          value={title} 
        />
        <button>Create <AiOutlinePlusCircle size={20} /></button>
      </form>
    </header>
  );
}

export default Header;
