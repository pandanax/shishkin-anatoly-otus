import React, {FC} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainMenu from '../../components/Menu/Menu';
import './BaseLayout.css';
import BaseRoutes from '../../routes/BaseRoutes';

interface BaseLayoutProps {
}

const BaseLayout: FC<BaseLayoutProps> = () => (
    <div className="BaseLayout" data-testid="BaseLayout">

        <Container maxWidth="lg">
            <MainMenu />
            <Box sx={{my: 4}}>
                <BaseRoutes />
            </Box>
        </Container>
    </div>
);

export default BaseLayout;
