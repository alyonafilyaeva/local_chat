import React, { useState } from "react";
import Chat from "./chat";
import '../styles.css'


const Login = () => {
    let [userName, setUserName] = useState()
    let [roomId, setRoomId] = useState()
    let [chatId, setChatId] = useState()
    let [messages, setMessages] = useState()
    let [isConnected, setIsConnected] = useState(false)
    let [yetCreated, setYetCreated] = useState(false)
    let [state, setState] = useState('checking')

    const onChangeName = (e) => {
        setUserName(e.target.value)
    }

    const onChangeroomId = (e) => {
        setRoomId(e.target.value)
    }

    const checkChat = (userName, roomId, e) => {
        if (roomId && userName) {
            if (localStorage.chats !== undefined) {
                const localStorageJson = JSON.parse(localStorage.chats)
                const chatsId = localStorageJson.map(el => parseInt(el.id))

                if (chatsId.includes(+roomId)) {
                    setChatId(chatsId.indexOf(+roomId))
                    setYetCreated(true)
                    setState('connecting')
                } else {
                    setYetCreated(false)
                    setState('creating')
                }
            } else {
                setState('creating')
            }
        }
        e.preventDefault()
        
    }
    const onCreateChat = (userName, roomId, e) => {
        if (yetCreated == false) {
            if (localStorage.chats) {
                let oldChats = JSON.parse(localStorage.chats)
                /* if(localStorage.chats) */
                let chatsLength = (JSON.parse(localStorage.chats)).length
                oldChats[chatsLength] = { id: roomId, users: [{ name: userName }], title: `Комната № ${roomId}`, messages: [] }
                localStorage.chats = JSON.stringify(oldChats)

                setChatId((JSON.parse(localStorage.chats)).length - 1)
                setIsConnected(true)
            } else {
                localStorage.chats = JSON.stringify([{ id: roomId, users: [{ name: userName }], title: `Комната № ${roomId}`, messages: [] }])

                setChatId(0)
                setIsConnected(true)
            }
        }

        sessionStorage.sessionName = userName
        document.getElementById('form').classList.add('clicked')
        setState('checking')
        e.preventDefault()
    }

    const onConnectChat = (userName, roomId, e) => {
        if (roomId && userName) {
            let oldData = JSON.parse(localStorage.chats)
            const usersLength = (oldData[chatId]).users.length
            setMessages(oldData[chatId].messages)
            const oldUsers = oldData[chatId].users.map(el => (el.name))
            if (!oldUsers.includes(userName)) {
                oldData[chatId].users[usersLength] = { name: userName }
            }
            localStorage.chats = JSON.stringify(oldData)
            sessionStorage.sessionName = userName

            setIsConnected(true)
            setChatId(chatId)
            setState('checking')
        }
        document.getElementById('form').classList.add('clicked')
        e.preventDefault()
    }

    return (
        <div className="container">
            <div className="form" id="form">
                {state == 'connecting' && <p>Такой чат существует. Нажмите, чтобы войти </p>}
                {state == 'creating' && <p>Такого чата еще не существует. Нажмите, чтобы создать </p>}
                <form>
                    <input value={userName} name="name" type="text" onChange={(e) => onChangeName(e)} placeholder="Ваше имя" />
                    <input value={roomId} name="roomId" type="number" onChange={(e) => onChangeroomId(e)} placeholder="Номер комнаты" />
                    {state == 'checking' && <button onClick={(e) => checkChat(userName, roomId, e)}>Найти чат</button>}
                    {state == 'creating' && <button onClick={(e) => onCreateChat(userName, roomId, e)}>Создать чат</button>}
                    {state == 'connecting' && <button onClick={(e) => onConnectChat(userName, roomId, e)}>Войти в чат</button>}
                </form>
            </div>
            <div>
                {isConnected && <Chat chatId={chatId} messages={messages} userName={userName} roomId={roomId} />}
            </div>
        </div>
    )
}

export default Login;