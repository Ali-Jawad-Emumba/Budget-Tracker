import { useEffect, useState } from 'react';
import styles from './Notification.module.css';

const Notifictaion = ({
  useFor,
  title,
  description,
  open,
}: {
  useFor: string;
  open: boolean;
  title: string;
  description: string;
}) => {
  const tickIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_233_4890)">
        <circle
          cx="12"
          cy="11.9999"
          r="9"
          stroke="#EA3B3B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 10L11 14L9 12"
          stroke="#EA3B3B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_233_4890">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  if (open)
    return (
      <div
        className={`${styles.notification} ${
          useFor === 'delete' ? styles.red : styles.green
        }`}
      >
        <div>{tickIcon}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
};
export default Notifictaion;
