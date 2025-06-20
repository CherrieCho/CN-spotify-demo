import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Navigate } from 'react-router';
import MobileLibraryPage from '../../layout/components/Libraries/MobileLibraryPage';

const ProtectedMobileRoute = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isMobile) {
    return <Navigate to="/" replace />;
  }

  return <MobileLibraryPage />;
};

export default ProtectedMobileRoute;