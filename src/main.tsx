import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from './components/RootLayout.tsx';
import './index.css';
import AboutPage from './pages/AboutPage.tsx';
import IndexPage from './pages/IndexPage.tsx';
import { DataWrapper } from './components/Context.tsx';
import DailyPage from './pages/DailyPage.tsx';
import RatiosPage from './pages/RatiosPage.tsx';
import ZonePage from './pages/ZonePage.tsx';
import StatsPage from './pages/StatsPage.tsx';
import CardsPage from './pages/CardPage.tsx';
import CookingPage from './pages/CookingPage.tsx';
import HacksPage from './pages/HacksPage.tsx';
import HackDayPage from './pages/HacksPage.HackDayPage.tsx';
import NGUsPage from './pages/NgusPage.tsx';
import NGUsSadisticPage from './pages/NgusPage.NgusSadisticPage.tsx';
import NGUsEvilPage from './pages/NgusPage.NgusEvilPage.tsx';
import NGUsComparePage from './pages/NgusPage.ComparePage.tsx';
import WandoosPage from './pages/WandoosPage.tsx';
import WishesPage from './pages/WishesPage.tsx';
import YggPage from './pages/YggPage.tsx';

const root = document.getElementById('root')!;
// localStorage.clear()


createRoot(root).render(
  <StrictMode>
    <DataWrapper>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="cards" element={<CardsPage />} />
            <Route path="cooking" element={<CookingPage />} />
            <Route path="daily" element={<DailyPage />} />
            <Route path="hacks" element={<HacksPage />} />
              <Route path="hacks/hackday" element={<HackDayPage />} />
            <Route path="ngus" element={<NGUsPage />} />
              <Route path="ngus/sadistic" element={<NGUsSadisticPage />} /> 
              <Route path="ngus/evil" element={<NGUsEvilPage />} /> 
              <Route path="ngus/compare" element={<NGUsComparePage />} /> 
            <Route path="ratios" element={<RatiosPage />} />
            <Route path="wandoos" element={<WandoosPage />} />
            <Route path="wishes" element={<WishesPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="ygg" element={<YggPage />} />
            <Route path="zone" element={<ZonePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataWrapper>
  </StrictMode>
)

