import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import SearchKeywordPage from './pages/Search/SearchKeywordPage';
import PlaylistPage from './pages/Playlist/PlaylistPage';
import Loading from './common/components/Loading';
import useExchangeToken from './hooks/useExchangeToken';

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

        <Route path="playlist">
          <Route index element={<PlaylistPage />} />
          {/* <Route path=":id" element={<PlaylistDetail />} /> */}
        </Route>
      </Route>
    </Routes>
  </Suspense>

  );
}

export default App;
