import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMessagesByChat, sendMessage } from '../../Api/Chat';
import Landing from './Landing';
import SingleChat from './SingleChat';

function Conversation({ selected, refreshList, socket, goback }) {

    const { id } = useSelector(state => state.user)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const containerRef = useRef(null)
    const [changeList, setChangeList] = refreshList
    const [dataLoaded, setDataLoaded] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isTyping, setIsTyping] = useState(false)
    let timer = useRef(null)

    useEffect(() => {
        dataLoaded && setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [dataLoaded])

    useEffect(() => {
        const getData = async () => {
            setMessages(await getMessagesByChat(selected?._id))
            setDataLoaded(!dataLoaded)
            socket?.emit("join_chat", selected?._id)
        }
        selected && getData()
    }, [selected, socket])

    useEffect(() => {
        dataLoaded && message !== "" && socket.emit("typing", selected?._id)
        timer.current = setTimeout(() => {
            socket.emit("stoptyping", selected?._id)
        }, 3000)
        return () => {
            clearTimeout(timer.current)
        }
    }, [message])

    socket.on("typing", (room) => setIsTyping(true))
    socket.on("stoptyping", (room) => setIsTyping(false))

    const sendNow = async (e) => {
        if (e !== "click") {
            e.preventDefault()
        }
        if (message.trim().length === 0) return
        const messageData = {
            content: message,
            chat_id: selected?._id,
            sender: id
        }
        const response = await sendMessage(messageData)
        socket?.emit("new_message", response)
        clearTimeout(timer.current)
        socket.emit("stoptyping", selected?._id)
        setMessages([...messages, response])
        setMessage("")
        dataChange()
    }

    const dataChange = useCallback(async () => {
        setChangeList(!changeList)
    }, [setChangeList, changeList])

    useEffect(() => {
        socket.on("receive_message", async (receivedData) => {
            if (selected?._id === receivedData.chat_id._id) {
                setMessages([...messages, receivedData])
            } else {
            }
            dataChange()
        })

    }, [socket, messages, dataChange, selected?._id])

    useEffect(() => {
        socket.emit("setup", id)
    }, [])

    useEffect(() => {
        if (containerRef?.current)
            containerRef?.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [messages])

    return (
        <>
            {!selected && <Landing />}
            {selected && <SingleChat typeAction={[isTyping, setIsTyping]} socket={socket} goback={goback} messages={messages} id={id} sendNow={sendNow} message={message} setMessage={setMessage} selected={selected} containerRef={containerRef} loading={loading} />}
        </>
    )
}

export default Conversation
