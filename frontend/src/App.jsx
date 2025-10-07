import React, { useEffect, useState } from 'react';
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import Tools from './Tools';
import axios from 'axios';

function App() {

  const appID = Number(import.meta.env.VITE_APP_ID);
  const server = import.meta.env.VITE_SERVER_URL;
  const userName = import.meta.env.VITE_USER_NAME;

  const [roomID] = useState(String(Math.floor(Math.random() * 99999)));
  const [userID] = useState(String(Math.floor(Math.random() * 99999)));

  const [token, setToken] = useState("");

  const fetchToken = async () => {

    try {
      const res = await axios.post("http://localhost:3000/api/genrate-token", {
        roomId: roomID,
        userId: userID
      });
      setToken(res.data.token);

    } catch (error) {
      console.log("fetch token error = ", error);
    }
  };

  const zg = new ZegoExpressEngine(appID, server);

  const zegoSuperBoard = ZegoSuperBoardManager.getInstance();
  const [currentTool, setCurrentTool] = useState(null);

  const initBoard = async () => {

    try {

      await zegoSuperBoard.init(zg, {
        parentDomID: 'parentDomID',
        appID,
        userID,
        token
      });

      await zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true });

      setCurrentTool(zegoSuperBoard.getToolType());

      await zegoSuperBoard.createWhiteboardView({
        name: 'Virtual Board',
        perPageWidth: 1600,
        perPageHeight: 900,
        pageCount: 1
      });

    } catch (error) {
      console.log("initBoard error is = ", error);
    };
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (token && zegoSuperBoard) {
      initBoard();
    }
  }, [token]);

  return (
    <div className='h-auto w-100wh overflow-hidden'>
      <div className='h-[100vh] bg-black pt-4 pb-4'>
        <div id="parentDomID" className='h-full w-full'>
        </div>

        <div>
          <Tools currentTool={currentTool} onClick={(tool) => {
            zegoSuperBoard.setToolType(tool.type)
            setCurrentTool(tool.type)
          }} />
        </div>

      </div>
    </div>
  )
}

export default App