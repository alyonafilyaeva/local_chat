import React, { useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import smile from '../smile.png'

const InputMesssage = ({ userName, chatId }) => {
    const [message, setMessage] = useState('')
    const [emoji, setEmoji] = useState(false)
    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const toSendMessage = () => {
        debugger
        if (message) {
            const oldData = JSON.parse(localStorage.chats)
            const chat = (oldData[chatId])
            let date = new Date()
            date = date.toLocaleTimeString();

            const oldMessages = chat['messages']
            oldMessages[oldMessages.length] = {
                user: sessionStorage.sessionName,
                id: oldMessages.length,
                text: message,
                time: date
            }
            chat['messages'] = oldMessages
            localStorage.chats = JSON.stringify(oldData)
            setMessage('')
            setEmoji(false)
        }
    }

    return (
        <div className="input-container">
            {emoji && <EmojiPicker
                pickerStyle={{ width: '100%' }}
                onEmojiClick={(emojiObject) => setMessage((oldMsg) => oldMsg + emojiObject.emoji)} />}
            <div className="input-block">
                <input type={'text'} name={'message'} value={message} placeholder="Сообщение" className="input-msg" onChange={(e) => onChangeMessage(e)} />
                <div onClick={() => setEmoji(!emoji)}>
                    <img src={smile} alt={'smile'} className="smile" />
                </div>
                <button onClick={() => toSendMessage()}>Отправить</button>
            </div>

        </div>
    )
}

export default InputMesssage;