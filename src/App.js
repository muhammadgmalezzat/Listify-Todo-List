
import styles from './styles/GlobalStyles.css';
import Tasks from './Containers/tasks'
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div className={styles.app__wrapper}>
      <Tasks />
      <Toaster
        position='bottom-right'
        toastOptions={{
        style: {
          fontSize:"1.4rem"
        }
      }}/>
    </div>
  );
}

export default App;
