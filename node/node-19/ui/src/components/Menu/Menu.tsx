import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import useQueryCurrentUser from '../../hooks/user/useQueryCurrentUser';
import {Link, ListItemIcon, Menu, MenuItem} from '@mui/material';
import {Logout} from '@mui/icons-material';
import './Menu.css';
import {storage} from '../../services/storage';


export default function AccountMenu() {

    let navigate = useNavigate();

    const {data: user, isLoading: isUserLoading} = useQueryCurrentUser();
    const {refetch: refetchCurrentUser} = useQueryCurrentUser();

    const logout = async () => {
        storage.removeToken();
        await refetchCurrentUser();
        return navigate('/');
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <nav>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'space-between',
                mt: 2
            }}>
                <Box sx={{display: 'flex'}}>
                    <Typography sx={{minWidth: 100}}>
                        <Link component={RouterLink} to="/">
                            Все курсы
                        </Link>
                    </Typography>
                    {!isUserLoading && user && <>
                        <Typography sx={{minWidth: 100}}>
                            <Link component={RouterLink} to="/my">
                                Мои Курсы
                            </Link>
                        </Typography>


                    </>
                    }
                </Box>

                {!user && !isUserLoading &&
                <Box sx={{display: 'flex'}}>

                    <Typography sx={{minWidth: 100}}>
                        <Link component={RouterLink} to="/auth">
                            Вход
                        </Link>
                    </Typography>

                    <Typography sx={{minWidth: 100}}>
                        <Link component={RouterLink} to="/registration">
                            Регистрация
                        </Link>
                    </Typography>
                </Box>
                }

                {!isUserLoading && user &&

                <Button
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <>
                        {user && user.firstName} {user && user.lastName} ({user && user.email})
                    </>
                </Button>

                }
            </Box>
            {!isUserLoading && user &&
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                {/*<MenuItem>
                        <Avatar />
                            First
                    </MenuItem>
                    <MenuItem>
                        <Avatar />
                        Second
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>*/}

                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>

            </Menu>
            }
        </nav>
    );
}
