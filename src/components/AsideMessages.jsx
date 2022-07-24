import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/context";
import trash from "../assets/trash.png";

const AsideMessages = ({setType, setModal, newData, setNewData,}) => {

    const { state } = useContext(userContext);
    const convActive = state.activeConv;
    const [participants, setParticipants] = useState([]);

    const addParti = async () => {
        setType("newParti");
        setModal(true);
    }
    const removeParti = async (identity) => {
        await state.conversations[convActive].removeParticipant(identity);
        const partis = participants.filter(e=> e.identity !== identity);
        setParticipants(partis);
    }

    const getParticipants = async() => {
        const partis = await state.conversations[convActive].getParticipants();
        
        const users = [];
        partis.forEach(async parti => {        
            const {identity, attributes:{avatar}} = await parti.getUser();
            users.push({identity, avatar, roleSid:parti.roleSid, sid:parti.sid});
        });
        setParticipants(users);
    }

    const deleteConv = async () => {
        const rest = await state.conversations[convActive].delete();
    }

    useEffect(() => {
        if(convActive)  getParticipants();
        return () => {}
    }, [convActive]);

    useEffect(() => {
        if(newData) setParticipants([...participants, newData]);
        return () => {setNewData(null)}
    }, [newData]);

    return(
        <aside>
            <button className="addParti" onClick={addParti}>Add participant</button>
            <ul >
                {
                    participants?.map( (e,i) => {
                        return(
                            <li key={i} >
                                <img className="userAvatar" src={e.avatar} alt={e.identity} />
                                <span>{e.identity}</span>
                                <button onClick={()=>removeParti(e.identity)}>
                                    <img src={trash} alt="Delete" />
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <button className="deleteConv" onClick={deleteConv}>Delete conversation</button>
        </aside>
    );
}

export default AsideMessages;