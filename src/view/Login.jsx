const Login = ({supabase}) => {

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