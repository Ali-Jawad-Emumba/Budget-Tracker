import styles from './DashboardContent.module.css';

const Filter = ({ title, children }: { title: string; children: any }) => (
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
