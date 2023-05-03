import React from "react";
import '../styles.css'

const Message = ({userName, messageText, time}) => {
    console.log({userName, messageText, time})
    return (
            <div className='msg-item'>
                <div className='name'>
                    {userName}
                </div>
                <div className='text'>
                    {messageText}
                </div>
                <div className='time'>
                    {time}
                </div>
            </div>
    )
}

export default Message;