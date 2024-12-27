import { DashboardContentLayoutProps } from '../../utils/types';
import styles from './dashboard-content.module.css';

const DashboardContentLayout = ({
  title,
  tableTitle,
  button,
  filters,
  children,
}: DashboardContentLayoutProps) => {
  return (
    <>
      <div className={styles.dashboardContent}>
        <div className={styles.dataTableHeader}>
          <h1 className="poppins-semibold">{title}</h1>
          {button}
        </div>
        <div className={styles.dataTable}>
          <div className={styles.tableHeader}>
            <h1 className="poppins-semibold">{tableTitle}</h1>
            <div className={styles.filtersSection}>{filters}</div>
          </div>
          <div className={styles.tableBody}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardContentLayout;
