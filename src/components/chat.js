import React from "react";
import {useEffect, useRef, useState} from "react";
import Message from "./Message";
import InputMesssage from "./InputMessage";
import '../styles.css'

const Chat = ({chatId, messages, userName, roomId}) => {
    let [messagesInState, setMessagesInState] = useState()
    let messagesEndRef = useRef(null)
    let scrollMessage = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    useEffect((() => {
        setMessagesInState(messages)
        let oldMessagesLength = 0
        let oldTitle = ''
        setInterval(() => {
            const oldData = JSON.parse(localStorage.chats)
            const chat = (oldData[chatId])
            const messages = chat['messages']
            if (messages) {
                const messagesLength = messages.length
                if (oldMessagesLength < messagesLength) {
                    oldMessagesLength = messagesLength
                    setMessagesInState(messages)
                    scrollMessage()
                } 
            }
        }, 1000);

    }), [messages, chatId])

    return(
        <div>
            <div className="chat-container">
                <div className="chat-top">
                <h1>Комната номер {roomId}</h1>
                <p onClick={() => window.location.reload()} className="exit">Выйти</p>
                </div>
                
                <div className="chat">
                    {messagesInState && messagesInState.map(({text, user, id, time}) => (
                        <div className={userName == user ? `my message` : 'notMy message'} key={id}>
                            <Message userName={user} messageText={text} time={time} className='' />
                            <div ref={messagesEndRef}/>
                        </div>
                    ))}
                </div>
                <InputMesssage userName={userName} chatId={chatId}/>
            </div>
        </div>
    )
}

export default Chat;