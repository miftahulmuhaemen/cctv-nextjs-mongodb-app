import { Container } from '@/components/Layout';
import clsx from 'clsx';
import { fetcher } from '@/lib/fetch';
import { useCallback, useState } from 'react';
import styles from './Post.module.css';
import toast from 'react-hot-toast';

const Building = ({ building, className, mutate }) => {
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await fetcher(`/api/buildings`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id: building._id,
          }),
        });
        toast.success('You have delete the Building successfully');
        mutate();
      } catch (e) {
        toast.error(e.message);
      } 
    },
    [building]
  );
  return (
    <div className={clsx(styles.root, className)}>
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>{building.name}</p>
          </Container>
        </Container>
        <button
          onClick={onSubmit}
          className={styles.btn}
        >
          Hapus
        </button>
    </div>
  );
};

export default Building;
