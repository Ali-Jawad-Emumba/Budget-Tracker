import styles from './notification.module.css';
import { NotificationProps } from '../../utils/types';
import { tickIcon } from '../../utils/icons';

const Notification = ({
  useFor,
  title,
  description,
  open,
}: NotificationProps) => {
  
  if (open)
    return (
      <div
        className={`${styles.notification} ${
          useFor === 'delete' ? styles.red : styles.green
        }`}
      >
        <div className={styles.tickIcon}>{tickIcon}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
};
export default Notification;
