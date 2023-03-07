import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TableBarIcon from '@mui/icons-material/TableBar';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ConstructionIcon from '@mui/icons-material/Construction';
import { CssBaseline, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux-ts/hooks';
import { changePage, selectCurrentPage } from '../../redux-ts/slices/navigation.slice';

enum NavigationPages {
    Saloon,
    Kitchen,
    Configurations
}

export default function Footer() {
    const [value, setValue] = useState(useAppSelector(selectCurrentPage));
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => { InternalDoNavigation(value) }, 
    // eslint-disable-next-line
    []);

    const DoNavigation = async (_: React.SyntheticEvent, newValue: number) => {
        await InternalDoNavigation(newValue);
    }

    const InternalDoNavigation = async (value: number) => {
        await setValue(value);
        let path = '/'
        switch (value) {
            case NavigationPages.Saloon:
                path = '/'
                break;
            case NavigationPages.Kitchen:
                path = '/kitchen';
                break;

            case NavigationPages.Configurations:
                path = '/config';
                break;

            default:
                break;
        }

        dispatch(changePage(value))
        await navigate(path);
    }

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={DoNavigation}
                >
                    <BottomNavigationAction label="Mesas" icon={<TableBarIcon />} />
                    <BottomNavigationAction label="Cozinha" icon={<SoupKitchenIcon />} />
                    <BottomNavigationAction label="Configurações" icon={<ConstructionIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}