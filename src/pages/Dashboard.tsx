import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(`http://${window.location.hostname}:3001`);
    
    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('leaderboardUpdate', (data) => {
      setLeaderboard(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leaderboard, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "leaderboard.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-8 bg-[#0a0f12] text-emerald-400 font-mono relative overflow-hidden flex flex-col items-center">
      
      {/* Evil background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px]" />
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <div className="z-10 w-full max-w-6xl relative flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-widest text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
            Doom's Ledger
          </h1>
          <p className="mt-4 text-emerald/70 tracking-widest text-sm uppercase flex items-center justify-center gap-4">
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]' : 'bg-red-500'}`} />
            {connected ? 'LINK TO LATVERIAN MAINFRAME ESTABLISHED' : 'MAINFRAME DISCONNECTED'}
          </p>
        </div>

        {/* Action Bar */}
        <div className="w-full flex justify-end mb-4">
          <Button variant="secondary" size="sm" onClick={handleDownload} className="border-emerald/50 text-emerald hover:bg-emerald/20 hover:text-emerald">
            DOWNLOAD LEDGER DATA
          </Button>
        </div>

        {/* Table */}
        <div className="w-full border-2 border-emerald/40 bg-black/60 backdrop-blur-md rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald/10 border-b-2 border-emerald/40 text-emerald uppercase text-sm tracking-wider">
                <th className="p-4">Rank</th>
                <th className="p-4">Team Designation</th>
                <th className="p-4 text-right">Final Score</th>
                <th className="p-4 text-center">Outcome</th>
                <th className="p-4 text-right">Time Remaining</th>
                <th className="p-4 text-center">Strikes</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-emerald/50 italic tracking-widest">
                    NO ENTRIES FOUND. WAITING FOR IMPENDING FAILURES.
                  </td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry.id} className="border-b border-emerald/10 hover:bg-emerald/5 transition-colors">
                    <td className="p-4 text-xl font-bold text-emerald/80">#{index + 1}</td>
                    <td className="p-4 font-bold text-white text-lg tracking-wide uppercase">{entry.name}</td>
                    <td className="p-4 text-right text-2xl font-bold text-emerald">{entry.finalScore}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${entry.isWin ? 'bg-emerald/20 text-emerald border border-emerald/50' : 'bg-red-900/30 text-red-500 border border-red-900/50'}`}>
                        {entry.isWin ? 'SURVIVED' : 'OBLITERATED'}
                      </span>
                    </td>
                    <td className="p-4 text-right text-emerald/80">{formatTime(entry.remainingTime)}</td>
                    <td className="p-4 text-center text-emerald/80">{entry.strikes}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-xs text-emerald/30 tracking-widest uppercase">
          Confidential Latverian Property. Do not distribute.
        </div>
      </div>
    </div>
  );
};
