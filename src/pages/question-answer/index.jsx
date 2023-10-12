import React, {useState, useEffect, useRef} from "react";
import "./style.scss";
import customerImg from "../../assets/images/customer.png";
import ProfilePicture from "../../assets/images/profilePicture.png";
import ChatMessage from "../../components/chat-msg";
import fileImg from '../../assets/images/file.png';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import toast from 'react-hot-toast'
import axios from 'axios'
import RightHeader from "../../components/right-header";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const socket = io(BACKEND_URL.slice(0, -4));


const QuestionAnswer = () => {
    const navigate = useNavigate();  
    const [socketConnected, setSocketConnected] = useState(false);
    document.title = 'Savol Javob'
    const [messages, setMessages] = useState({})

    const [chats, setChats] = useState([])
    const UserDatas = JSON.parse(localStorage.getItem("userDatas"));
const [messageInput, setMessageInput] = useState('')
const [isViewMessages, setIsViewMessages] = useState(false)
const [selectedChat, setSelectedChat] = useState()

const messageRef = useRef(null);

async function sendMessage(e){
  try {   
    e.preventDefault();
    socket.emit('sendMessage', {
      sender : UserDatas?._id,
      receiver : messages?.receiver?.receiverId,
      message : messageInput,
      chat : messages?.chat
    })
    const {data} = await axios.post(`${BACKEND_URL}/messages`, {
      chat : messages?.chat,
      message : messageInput,
      receiver : messages?.receiver?.receiverId
    }, {headers : {token : UserDatas?.token}})
    setMessageInput('')
 
  } catch (error) {
    toast.error(error.message)
  }
}

async function fetchConversations (){
  try {
    const {data} = await axios.get(`${BACKEND_URL}/chats`, {headers : {token : UserDatas?.token}})  
    if(data.success){
      setChats(data.data)
      // setSelectedChat(chats[0].conversationId)
    } else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}


async function fetchMessages(chatId,  user){
  try {
    const {data} = await axios.get(`${BACKEND_URL}/messages/${chatId}`, {
      headers : {token : UserDatas?.token}
    })
    if(data.success){
      setMessages({messages : data?.data, receiver :  user, chat : chatId})
      setIsViewMessages(true)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
 
}


useEffect(()=>{
  socket.emit('addUser', UserDatas?._id)
  socket.on('getUsers', users =>{
  })
 socket.on('getMessages', data =>{
   setMessages(prev =>({
    ...prev,
    messages : [...prev.messages, {user : data?.user , message : data?.message}]
  }))
 })
 
}, [socket])

useEffect(()=>{
 fetchConversations()
}, [])


useEffect(()=>{
messageRef?.current?.scrollIntoView({behavior : "smooth"})
}, [messages?.messages])

console.log(messages);

  return (
    <div className="chat-page page">
      <div className="top_header flex items-center justify-between">
      {messages.receiver?.lastname && 
        <div className="selected_user_info flex gap-2 items-center">
          <img
            src={messages?.receiver?.img}
            alt="selected user"
            className="img w-[60px] rounded-5  h-[57px] object-contain"
          />
          <div className="txt_info flex flex-column gap-1">
            <p className="name">{messages?.receiver?.firstname}</p>
            <p className="phone">+998{messages?.receiver?.phone}</p>
          </div>
        </div>
      }
        
        
       <RightHeader/>
      </div>
      <section className="d-flex gap-3 mt-5">
        <div className="chat_users w-[30%] flex flex-column gap-2">
        {chats.length ? chats.map((el, idx)=>(
          <ChatMessage selectedChat = {selectedChat} setSelectedChat={setSelectedChat} data={el} key={idx} reload={fetchMessages}/> 
       )) : <h2 className="not_found">Chatlar topilmadi</h2>}
         
        </div>
      

      {isViewMessages  ?   <div className={` chat_elements w-[75%] flex flex-column gap-2`}>
          <div className="chat_box p-2">
          {messages.messages.length > 0 ? messages.messages.map(({message, user : {_id} ={}}) =>{
            return(
              <>
            <div className={`${_id == UserDatas?._id ? "my msg_txt bg-primary text-light" : "other msg_txt"}`}>{message}</div>
            <div ref={messageRef}></div>
              </>
            )
           
          } ) : <h2 className="not_found">Xabarlar topilmadi</h2> }
          
          </div>
          <form className="write_form" onSubmit={sendMessage}>
            <input placeholder="Write your message..." onChange={(e)=> setMessageInput(e.target.value)} value={messageInput} />
            {/* <label className="custom-upload">
                <img src={fileImg} width={'20px'} height={'45px'} className="cursor-pointer"/>
              <input
                className="d-none"
                type="file"
                accept="image/*"
                // onChange={(e) => uploadAva(e.target.files[0])}
              />
              <b className="ms-2"></b>
            </label> */}
            <button  className={`send ms-3 ${!messageInput && "pointer-events-none"}`} type="submit">
                Send  <i class="fa-solid fa-paper-plane-top"></i>
            </button>
          </form>
        </div> : <h2 className="not_found text-center">Click the users</h2>}
      
      </section>
    </div>
  );
};

export default QuestionAnswer;
