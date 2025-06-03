import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import SearchKeywordPage from './pages/Search/SearchKeywordPage';
import PlaylistPage from './pages/Playlist/PlaylistPage';
import Loading from './common/components/Loading';

//lazyLoading
const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/Search/SearchPage'));


function App() {
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
