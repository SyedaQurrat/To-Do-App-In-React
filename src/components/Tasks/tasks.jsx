import { Task } from '../Task/task';
import styles from './tasks.module.css';

export function Tasks({ tasks, onDelete, onComplete, handleEdit }) {  
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>{completedTasks} of {tasksQuantity}</span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} onEdit={handleEdit} /> 
        ))}
      </div>
    </section>
  );
}

export default Tasks;




