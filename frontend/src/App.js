import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './Pages/HomeScreen';
import ChatScreen from './Pages/ChatScreen';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/chats" element={<ChatScreen />} />
      </Routes>
    </div>
  );
}

export default App;