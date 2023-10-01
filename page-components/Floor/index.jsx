import { Spacer } from '@/components/Layout';
import { Card } from '@/components/Card';
import { CameraCard } from '@/components/Camera-Card';
import { Container, Wrapper } from '@/components/Layout';
import styles from './Feed.module.css';
import Poster from './Poster';
import PostList from './PostList';

export const Floor = ({ building }) => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster building={building} />
      <PostList building={building}/>
    </div>
  );
};

export const UserFloor = ({ floors }) => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Wrapper>
        <Card floors={floors}></Card>
      </Wrapper>
      <Spacer size={1} axis="vertical" />
    </div>
  );
};

export const UserFloorCameras = ({ floor }) => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Wrapper>
        <CameraCard floor={floor}></CameraCard>
      </Wrapper>
      <Spacer size={1} axis="vertical" />
    </div>
  );
};
