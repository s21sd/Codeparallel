import React, { useState } from 'react'
import './home.css'
import { BiSolidUser } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'

const Home = () => {
    const [roomIds, setroomIds] = useState('')
    const [userName, setuserName] = useState('')
    const navigate = useNavigate();
    const createRoom = (e) => {
        e.preventDefault();
        const roomId = uuidv4();
        setroomIds(roomId)
        toast.success("Created a new room")
    }
    const joinRoom = (e) => {

        if (!userName || !roomIds) {
            toast.error("Username and RoomId are required")
            return;
        }
        navigate(`/editor/${roomIds}`, {
            state: {
                userName
            }
        });

    }
    const handleInput = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    }
    return (
        <div className="card">
            <div className="card2">
                <form className="form">
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <FaLaptopCode size={55} color='#9CB1F0' />
                        </div>
                        <div className='flex'>
                            <p className='text-white text-sm font-bold'>Code Parallel <span className='bg-[#9CB1F0] ml-2 p-2 rounded-xl'>

                                Realtime Collaboration</span></p>
                        </div>
                    </div>
                    <div className="field">
                        <BiSolidUser />
                        <input
                            type="text"
                            className="input-field"
                            placeholder="ROOM ID"
                            value={roomIds}
                            onChange={(e) => setroomIds(e.target.value)}
                            required
                            onKeyUp={handleInput}

                        />
                    </div>
                    <div className="field">
                        <MdDriveFileRenameOutline />
                        <input
                            type="text"
                            className="input-field"
                            value={userName}
                            placeholder="USERNAME"
                            onChange={(e) => setuserName(e.target.value)}
                            required
                            onKeyUp={handleInput}
                        />
                    </div>
                    <div className="btn">
                        <button onClick={joinRoom} className="button2">Join</button>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-gray-500'>If you don't have an invite then create</p>
                        <button onClick={createRoom} className='text-white bg-[#9CB1F0] rounded-full p-2'>New Room</button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Home
