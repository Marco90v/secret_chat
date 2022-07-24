import { useContext } from "react";
import { userContext } from "../context/context";
import ItemConv from "./ItemConv";

const AsideDashboard = ({supabase, setType, setModal}) => {
    const { state } = useContext(userContext);
    const newConversation = (t) => {
        setType(t);
        setModal(true);
    }
    const signout = async() => {
        const { error } = await supabase.auth.signOut();
        console.log(error);
    }

    return(
        <aside >
            <h1>Secret Chat <span>{state.user.user_name}</span></h1>
            <button className='newConversation' onClick={()=>newConversation("newConv")}>New conversation</button>
            <div>
                <ul>
                    { Object.keys(state.conversations).map(key => <ItemConv key={key} ID={key} /> ) }
                </ul>
            </div>
            <button className='loggout' onClick={signout}>Loggout</button>
        </aside>
    );
}

export default AsideDashboard