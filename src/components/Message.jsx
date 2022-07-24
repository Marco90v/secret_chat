import { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../context/context";
import AsideMessages from "./AsideMessages";

const Message = ( {notify, setModal, setType, newData, setNewData, newMsg, setNewMsg} ) => {
    const { state } = useContext(userContext);
    const [messages, setMessages] = useState([]);
    const convActive = state.activeConv;
    const message = useRef();
    const scroll = useRef(null);


    const getMessages = async() => {
        const msg = await state.conversations[convActive].getMessages();
        setMessages(msg)
    }

    const send = async () => {
        const text = message.current.value
        const rest = await state.conversations[convActive].sendMessage(text);
        message.current.value = "";
    }

    useEffect(() => {
        if(convActive) getMessages();
        return () => {}
    }, [convActive]);


    useEffect(() => {
        if(newMsg) setMessages({ ...messages, items:[...messages.items, newMsg] });
        // return () => {setNewMsg(null)}
    }, [newMsg]);
    
    useEffect(() => {
        if(scroll.current){
            const s = scroll.current.scrollHeight - scroll.current.clientHeight;
            scroll.current.scrollTo(0, s);
        }
      return () => {}
    }, [messages])
      
    
    return(
        <>
            <section>
                <div className="messages">
                    <div className="notify" style={notify ? {top:0} : {}} >
                        <p>{notify}</p>
                    </div>
                    <div>
                        <ul ref={scroll}>
                            {
                                messages.items?.map( (e,i) => {
                                    return(
                                        <li key={i} style={ e.author === state.user.user_name ? {textAlign: "end"} : {} }>
                                            <span>{e.author}</span>
                                            <p>{e.body}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="inputMessage">
                        <input type="text" ref={message} />
                        <button onClick={send}>Enviar</button>
                    </div>
                </div>
                <AsideMessages setType={setType} setModal={setModal} newData={newData} setNewData={setNewData} />
            </section>
        </>
    );
}

export default Message;