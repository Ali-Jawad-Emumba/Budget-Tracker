import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotifications } from '../../app/store';
import styles from './notifications-list.module.css';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const NotifictaionLists = ({
  setShowNotificationsList,
}: {
  setShowNotificationsList: any;
}) => {
  const getIcon = (action: string) => {
    switch (action) {
      case 'add':
        return '#6bb648';
      case 'edit':
        return '#2fb6e1';
      case 'delete':
        return '#f04a4a';
    }
  };
  const getDescription = (action: string) => {
    switch (action) {
      case 'add':
        return 'added successfully';
      case 'edit':
        return 'Updated successfully';
      case 'delete':
        return 'Removed';
    }
  };
  const notifications = useSelector((state: any) => state.notifications);
  const dispatch = useDispatch();
  return (
    <div className={styles.menu}>
      <div className={styles.list}>
        {notifications.length>0 && notifications.map((notification: any, index: number) => (
          <div className={styles.notificationItem} key={index}>
            <div
              className={styles.icon}
              style={{ backgroundColor: getIcon(notification.action) }}
            ></div>
            <div>
              <h3>{notification.name}</h3>
              <p>{getDescription(notification.action)}</p>
              <p>{dayjs(new Date(notification.time).getTime()).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          dispatch(clearNotifications());
          setShowNotificationsList(false);
        }}
      >
        Clear
      </Button>
    </div>
  );
};

export default NotifictaionLists;
