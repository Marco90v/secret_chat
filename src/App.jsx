import { userContext } from './context/context';
import Login from './view/Login';
import { useContext, useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';
import Dashboard from './view/Dashboard';


const supabase = createClient('https://zsakaajxrwcmeaozunuz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzYWthYWp4cndjbWVhb3p1bnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1NjU5MTMsImV4cCI6MTk3MzE0MTkxM30.wEkiDpXnuqcq_mJIn44jV7aWAg1QaAQVHqmNiMFmmuc');

function App() {
  
  const { state, dispatch } = useContext(userContext);

  const startSession = (session) => {
    const { avatar_url , user_name } = session.user.user_metadata;
    dispatch( { type:"identity", user:{avatar_url , user_name} } );
  }

  useEffect(() => {
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
