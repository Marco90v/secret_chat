import { Client } from '@twilio/conversations';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { getToken } from '../api/get-access-token';
import AsideDashboard from '../components/AsideDashboard';
import Message from '../components/Message';
import Modal from '../components/Modal/Modal';
import { userContext } from '../context/context';

const Dashboard = ({supabase}) => {
    const { state, dispatch } = useContext(userContext);
    const [ modal, setModal ] = useState(false);
    const [ type, setType ] = useState(null);
    const [notify, setNotify] = useState("");
    const [newData, setNewData] = useState(null);
    const [newMsg, setNewMsg] = useState(null);

    
    const myToken = async (userName) => {
        const token = await getToken(userName).then(e=>e.text());
        const client = new Client(token);
        dispatch( { type:"addClient", data:client } );
        const myUser = await client.getUser(state.user.user_name);
        !myUser.attributes.avatar && myUser.updateAttributes({avatar:state.user.avatar_url});
    }

    useEffect(() => {
        myToken(state.user.user_name);
      return () => {};
    }, []);

    useEffect(()=>{
        state.client?.on("conversationAdded", (conversation) => {
            dispatch( { type:"addConversation", data:conversation } );
            setNotify(`Added conversation: ${conversation.uniqueName}`);
            setTimeout(() => setNotify(""), 5000);
        });
        state.client?.on("conversationRemoved", ({sid,uniqueName}) => {
            dispatch( { type:"removedConversation", sid } );
            setNotify(`The conversation "${uniqueName}" has been deleted`);
            setTimeout(() => setNotify(""), 5000);
        });
        state.client?.on("participantJoined", async (participant) => {
            const {identity, roleSid, sid} = participant;
            const {attributes:{avatar}} = await participant.getUser();
            setNotify(`"${identity}" was added to the conversation`);
            setNewData({identity, roleSid, sid, avatar});
            setTimeout(() => setNotify(""), 5000);
        });
        state.client?.on("messageAdded", (mensaje) => {
            if(mensaje.conversation.sid === state.activeConv){
                setNewMsg(mensaje);
            }
        });
        return() => {
            state.client?.removeAllListeners();
        }
    },[state.client]);
    
    return(
        <>
            {
                modal && <Modal setModal={setModal} type={type} />
            }
            <main className='dashboard'>
                <AsideDashboard setType={setType} setModal={setModal} supabase={supabase} />
                {
                    state.activeConv &&
                        <Message
                            notify={notify}
                            setModal={setModal}
                            setType={setType}
                            newData={newData}
                            setNewData={setNewData}
                            newMsg={newMsg}
                            setNewMsg={setNewMsg}
                        />
                }
            </main>
        </>
    );
}

export default Dashboard;