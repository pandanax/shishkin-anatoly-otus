import React, { FC } from 'react';
import './ReadPage.css';
import ReadCourse from '../../components/ReadCourse/ReadCourse';

interface ReadPageProps {}

const ReadPage: FC<ReadPageProps> = () => (
  <div className="ReadPage" data-testid="ReadPage">
    <ReadCourse />
  </div>
);

export default ReadPage;
