import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Prenotazioni from './pages/Prenotazioni';
import Blog from './pages/Blog';
import Contatti from './pages/Contatti';
import Carrello from './pages/Carrello';
import Profilo from './pages/Profilo';
import Prenota from './features/prenotazioni/Prenota';
import PrenotazioneAttuale from './features/prenotazioni/PrenotazioneAttuale';
import StatsPrenotazioni from './features/prenotazioni/StatsPrenotazioni';
import PrenotazioniPassate from './features/prenotazioni/PrenotazioniPassate';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CarrelloContextProvider } from './context/CarrelloContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './ui/ProtectedRoute';
import { PrenotazioneContextProvider } from './context/PrenotazioneContext';
import Post from './features/blog/Post';
import PageNotFound from './pages/PageNotFound';
import ProtectedAuth from './ui/ProtectedAuth';
import { DarkModeContextProvider } from './context/DarkModeContext';
import ToasterWrapper from './ui/ToasterWrapper';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

function App() {
  return (
    <DarkModeContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <CarrelloContextProvider>
            <PrenotazioneContextProvider>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate replace to="home" />} />
                  <Route
                    path="home"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="shop" element={<Shop />} />
                  <Route path="carrello" element={<Carrello />} />

                  <Route
                    path="prenotazioni"
                    element={
                      <ProtectedRoute>
                        <Prenotazioni />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate replace to="attuale" />} />
                    <Route path="prenota" element={<Prenota />} />
                    <Route path="attuale" element={<PrenotazioneAttuale />} />
                    <Route path="passate" element={<PrenotazioniPassate />} />
                    <Route path="statistiche" element={<StatsPrenotazioni />} />
                  </Route>

                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:id" element={<Post />} />
                  <Route path="contatti" element={<Contatti />} />
                  <Route path="contatti/:id" element={<Contatti />} />
                  <Route path="profilo" element={<Profilo />} />
                </Route>

                <Route
                  path="login"
                  element={
                    <ProtectedAuth>
                      <Login />
                    </ProtectedAuth>
                  }
                />
                <Route
                  path="signup"
                  element={
                    <ProtectedAuth>
                      <Signup />
                    </ProtectedAuth>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </PrenotazioneContextProvider>
          </CarrelloContextProvider>
        </BrowserRouter>
        <ToasterWrapper />
      </QueryClientProvider>
    </DarkModeContextProvider>
  );
}

export default App;
