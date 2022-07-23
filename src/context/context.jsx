import { createContext, useReducer } from "react";

const userContext = createContext();

const initialState = {
    user:null,
    client:null,
    conversations:{},
    // message:{},
    activeConv:null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'identity':
            return {
                ...state,
                user: {
                    user_name: action.user.user_name,
                    avatar_url: action.user.avatar_url
                },
            };
        case 'addClient':
            return { ...state, client:action.data };
        case 'setActiveConv':
            return { ...state, activeConv:action.ID };
        case 'clearActiveConv':
            return { ...state, activeConv:action.data }; // eliminar case
        case 'addConversation':
            return {
                ...state,
                conversations:{
                    ...state.conversations,
                    [action.data.sid]: action.data
                }
            };
        case 'removedConversation':
            const { [action.sid]:d, ...resto } = state.conversations
            return {
                ...state,
                conversations: resto,
                activeConv:null
            };
        case 'setMessage':
            return {
                ...state,
                message : {
                    hasNextPage: action.data.hasNextPage,
                    hasPrevPage : action.data.hasPrevPage,
                    items : action.data.items,
                    nextPage : action.data.nextPage,
                    prevPage : action.data.prevPage,
                },
            };
        case 'loggout':
            return { ...state, user:null };
        default:
            return state;
    }
}

const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <userContext.Provider value={ { state , dispatch } } >
            {children}
        </userContext.Provider>
    );
}

export { Context , userContext }