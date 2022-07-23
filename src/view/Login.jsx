import { useContext } from "react";
import { userContext } from "../context/context";

const Login = ({supabase}) => {
    const { state, dispatch } = useContext(userContext);

    const signInWithGithub = async() => {
        const { user, session, error } = await supabase.auth.signIn({
          provider: 'github',
        });
    }
    
    return(
        <main className="login">
            <h1>Secret Chat</h1>
            <section>
                <button onClick={signInWithGithub}>Login with Github</button>
            </section>
        </main>
    );
}

export default Login;