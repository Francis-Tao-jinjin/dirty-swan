import React from 'react';
import classnames from 'classnames';

import styles from './style.module.scss';
import checkOutsideCircleIcon from './icons/check-outside-circle.svg';
import downloadCloudIcon from './icons/download-cloud.svg';

const RADIUS = 140;
const STROKE = 4;

type Status = 'INITIAL' | 'GENERATING' | 'DOWNLOADING' | 'COMPLETED' | 'FAILED';

const mappingStatus: { [k in Status]: string } = {
  INITIAL: 'Click to download documents',
  GENERATING: 'Generating documents...',
  DOWNLOADING: 'Downloading documents...',
  COMPLETED: 'Done!',
  FAILED: 'Download failed. Click again to retry.',
};

export default ({
  progress,
  status,
  handleClick,
}: {
  progress: number;
  status: Status;
  handleClick: () => void;
}) => {
  const normalizedRadius = RADIUS - STROKE * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`w100 ${styles.container}`}>
      <button
        className={styles.button}
        type='button'
        onClick={handleClick}
        data-cy='download-documents-button'
      >
        <svg height={RADIUS * 2} width={RADIUS * 2}>
          <circle
            className={classnames(`${styles['inner-circle']}`, {
              [styles['inner-circle-hover']]: progress === 0,
            })}
            strokeWidth={STROKE}
            strokeDasharray={circumference + ' ' + circumference}
            r={normalizedRadius}
            cx={RADIUS}
            cy={RADIUS}
          />
          <circle
            className={
              status === 'COMPLETED'
                ? styles['overlay-circle-completed']
                : styles['overlay-circle']
            }
            strokeWidth={STROKE}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={RADIUS}
            cy={RADIUS}
          />
        </svg>
        <div className={`ws2 ${styles['text-container']}`}>
          <img
            src={
              status === 'COMPLETED'
                ? checkOutsideCircleIcon
                : downloadCloudIcon
            }
            alt=''
          />
          <div className='p-p mt8'>{mappingStatus[status]}</div>
        </div>
      </button>
    </div>
  );
};
