import { getToken } from './api/get-access-token';
// import './App.css';
import { Client } from "@twilio/conversations";
import { Context, userContext } from './context/context';
import Login from './view/Login';
import { useContext, useEffect, useState } from 'react';

import { createClient } from '@supabase/supabase-js';
import Dashboard from './view/Dashboard';

let t;

const supabase = createClient('https://zsakaajxrwcmeaozunuz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzYWthYWp4cndjbWVhb3p1bnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1NjU5MTMsImV4cCI6MTk3MzE0MTkxM30.wEkiDpXnuqcq_mJIn44jV7aWAg1QaAQVHqmNiMFmmuc');

function App() {

  // nombre , client=Client, participantes, noti
  const addConversation = async () => {
    const cliente = new Client(t);
    cliente.on('stateChanged', async state => {
      if (state === 'initialized') {
        let conversation;

        // console.log(conversation)
        // await conversation.add("user00");
        // await conversation.add("user01");
        // conversation.sendMessage("prueba de envio de mensaje");
        // const pagination = await conversation.getMessages();
        // const msg = pagination.items.map(({body,author})=>{ return {body,author} });
        // console.log(msg);
        // resolve(conversation)          
      }
    });


    cliente.on("conversationAdded", (asd) => {
      console.log(asd);
    });


  }

  const { state, dispatch } = useContext(userContext);

  const startSession = (session) => {
    const { avatar_url , user_name } = session.user.user_metadata;
    dispatch( { type:"identity", user:{avatar_url , user_name} } );
  }

  useEffect(() => {
    // const session = supabase.auth.session();
    // if (session != null){
    //   startSession(session);
    // }
    supabase.auth.onAuthStateChange((_event, session) => {
      if(_event === "SIGNED_OUT") dispatch( { type:"loggout", user:null } );
      if(state.user === null && _event === "SIGNED_IN") startSession(session);
    });
  }, []);

  return (
      !state.user ? <Login supabase={supabase} /> : <Dashboard supabase={supabase} />
  )
}

export default App
