import { useContext } from "react";
import { userContext } from "../context/context";

const ItemConv = ({ID}) => {
    
    const { state, dispatch } = useContext(userContext);
    const isActive = state.activeConv === ID;

    const setActiveConv = () => {
        !isActive && dispatch( { type:"setActiveConv", ID } );
    }

    return(
        <li className={isActive ? "active" : ""} onClick={setActiveConv}>
            <h2>{state.conversations[ID].uniqueName}</h2>
            <span>{state.conversations[ID].createdBy}</span>
        </li>
    );
}
export default ItemConv;