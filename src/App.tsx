import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import SearchKeywordPage from './pages/Search/SearchKeywordPage';
import PlaylistDetailPage from './pages/Playlist/PlaylistDetailPage';
import Loading from './common/components/Loading';
import useExchangeToken from './hooks/useExchangeToken';
import MobileLibraryPage from './layout/components/Libraries/MobileLibraryPage';
import ProtectedMobileRoute from './common/components/ProtectedMobileRoute';

//lazyLoading
const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/Search/SearchPage'));


function App() {
  //로그인
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  // stored in the previous step
  const codeVerifier = localStorage.getItem('code_verifier');
  const {mutate: exchangeToken} = useExchangeToken();

  useEffect(() => {
    if(code && codeVerifier){
      exchangeToken({code, codeVerifier})
    }
  }, [code, codeVerifier, exchangeToken]);


  return (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route path="search">
          <Route index element={<SearchPage />} />
          <Route path=":keyword" element={<SearchKeywordPage />} />
        </Route>

        <Route path="library">
          <Route index element={
            <ProtectedMobileRoute>
              <MobileLibraryPage />
            </ProtectedMobileRoute>
            } />
        </Route>

        <Route path="playlist">
          <Route path=":id" element={<PlaylistDetailPage />} />
        </Route>
      </Route>
    </Routes>
  </Suspense>

  );
}

export default App;
