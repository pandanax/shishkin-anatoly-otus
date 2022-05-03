import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import AuthPage from '../pages/AuthPage/AuthPage';
import RegPage from '../pages/RegPage/RegPage';
import CoursesPage from '../pages/CoursesPage/CoursesPage';
import MyCoursesPage from '../pages/MyCoursesPage/MyCoursesPage';
import AddCoursePage from '../pages/AddCoursePage/AddCoursePage';
import EditCoursePage from '../pages/EditCoursePage/EditCoursePage';
import ReadPage from '../pages/ReadPage/ReadPage';

interface BaseRoutesProps {
}

const BaseRoutes: FC<BaseRoutesProps> = () => (

    <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="my" element={<MyCoursesPage />} />
        <Route path="add" element={<AddCoursePage />} />
        <Route path="edit/:id" element={<EditCoursePage />} />
        <Route path="read/:id" element={<ReadPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="registration" element={<RegPage />} />
    </Routes>

);

export default BaseRoutes;
