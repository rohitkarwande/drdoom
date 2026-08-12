import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { HowToPlay } from './pages/HowToPlay';
import { Manual } from './pages/Manual';
import { Game } from './pages/Game';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />
        <Route path="/doom" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
