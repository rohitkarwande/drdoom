import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const LEADERBOARD_FILE = path.join(__dirname, 'leaderboard.json');

// Initialize leaderboard file if it doesn't exist
if (!fs.existsSync(LEADERBOARD_FILE)) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify([]));
}

const getLeaderboard = () => {
  try {
    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading leaderboard:", error);
    return [];
  }
};

const saveLeaderboard = (data) => {
  try {
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving leaderboard:", error);
  }
};

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);
  
  // Send current leaderboard to newly connected client
  socket.emit('leaderboardUpdate', getLeaderboard());

  socket.on('saveScore', (scoreData) => {
    console.log('Received new score:', scoreData);
    const currentBoard = getLeaderboard();
    
    // Add new score
    currentBoard.push({
      ...scoreData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    });
    
    // Sort by score descending, then by time remaining descending, then by strikes ascending
    currentBoard.sort((a, b) => {
      if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
      if (b.remainingTime !== a.remainingTime) return b.remainingTime - a.remainingTime;
      return a.strikes - b.strikes;
    });

    saveLeaderboard(currentBoard);
    
    // Broadcast updated leaderboard to all clients
    io.emit('leaderboardUpdate', currentBoard);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Leaderboard server running on port ${PORT}`);
});
