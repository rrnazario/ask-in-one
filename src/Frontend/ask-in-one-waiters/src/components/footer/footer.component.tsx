import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TableBarIcon from '@mui/icons-material/TableBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CssBaseline, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

enum NavigationPages {
    Saloon,

}

export default function FixedBottomNavigation() {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const DoNavigation = async (_: React.SyntheticEvent, newValue: number) => {
        await setValue(newValue);
        let path = '/'
        switch (newValue) {
            case NavigationPages.Saloon:
                break;
            case 1:
                path = '/login';
                break;

            default:
                path = '/login';
                break;
        }

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
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Archive" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}