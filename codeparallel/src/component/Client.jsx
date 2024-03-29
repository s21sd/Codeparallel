import React from 'react'
import Avatar from 'react-avatar';
const Client = ({ clientName }) => {
    console.log(clientName);
    return (
        <div className='grid mt-2 items-center justify-center'>
            <Avatar color='#9CB1F0' size={40} className='rounded-xl' name={clientName} />
            <span className='text-white'>{clientName}</span>
        </div>
    )
}

export default Client
