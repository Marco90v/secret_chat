import { useContext, useEffect, useRef, useState } from 'react';
import { userContext } from '../../context/context';
import './Modal.css';
const Modal = ({setModal, type}) => {

    const [ animate, setAnimate ] = useState(false);
    const name = useRef();
    const { state } = useContext(userContext);


    const close = () => {
        setAnimate(false);
        setTimeout(()=>setModal(false),500);
    }

    const newConv = async () => {

        const room = name.current.value;
        let conversation = null;
        try {
            conversation = await state.client.getConversationByUniqueName(room);
        } catch (e) {
            try {
                conversation = await state.client.createConversation({ uniqueName: room });
                await conversation.add(state.user.user_name);
            } catch (e) {
                console.error(e)
            }
        }
        if(conversation != null){
            setTimeout(()=>close(),1000);
        } 
    }

    const newParti = async () => {
        const parti = name.current.value;
        const conversation = await state.client.getConversationBySid(state.activeConv);
        await conversation.add(parti);
    }

    const _new = () => {
        type === "newConv" ? newConv() : newParti();
    }

    useEffect(() => {
        setAnimate(true);
      return () => {}
    }, [])
    
    
    return(
        <>
            <div className='overlay'>
                <div className={`modal ${animate && "entra"}`}>
                    <label htmlFor="nameConversation">{type === "newConv" ? "Conversation Name" : "Participant Name"}</label>
                    <input type="text" ref={ name } />
                    <div className='buttons' >
                        <button className='modalCancel' onClick={close}>Cancel</button>
                        <button className='modalCreate' onClick={_new}>Create</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;