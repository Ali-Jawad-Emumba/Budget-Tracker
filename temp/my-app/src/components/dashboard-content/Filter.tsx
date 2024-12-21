import { FilterProps } from '../../utils/types';
import styles from './DashboardContent.module.css';



const Filter = ({ title, children }: FilterProps) => (
  <div>
    <div className={styles.filterDiv}>
      <div className={styles.filter}>
        <p className={`${styles.filterLabel} poppins-regular`}>{title}</p>
      </div>
      {children}
    </div>
  </div>
);
export default Filter;
