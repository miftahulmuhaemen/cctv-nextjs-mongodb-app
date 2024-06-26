import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { usePostPages } from '@/lib/post';
import { useFloorWithBuildingPages } from '@/lib/floor';
import { Select } from '@/components/Select';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Poster.module.css';

const PosterInner = ({ role, buildings }) => {
  const { data: floorPages } = useFloorWithBuildingPages();
  const floors = floorPages
    ? floorPages.reduce((acc, val) => [...acc, ...val.floors], [])
    : [];
  const [isLoading, setIsLoading] = useState(false);
  const [floor, setFloor] = useState('');

  const handleFloorChange = (value) => {
    setFloor(value);
  };

  const { mutate } = usePostPages();
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher(`/api/roles/floors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: role._id, 
            floorAccess: floor,
          }),
        });
        toast.success('You have add new floor to the floor successfully');
        setFloor(['']);
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [floor]
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Container className={styles.creator}>
        <div className={styles.formSection}>
          <label className={styles.label}>Floor:</label>
          <div className={styles.ipInputContainer}>
                <Select className={styles.select} value={floor} onChange={(e) => handleFloorChange(e.target.value)} options={floors}></Select>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button type="success" loading={isLoading} onClick={onSubmit}>
            Tambahkan Floor
          </Button>
        </div>
      </Container>
    </form>
  );
};

const Poster = ({ role, buildings }) => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner role={role} buildings={buildings}/>
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref legacyBehavior>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
