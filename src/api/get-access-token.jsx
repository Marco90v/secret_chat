export async function getToken( userName ){
    const requestAddress = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN_SERVICE_URL;
    // const requestAddress = "./api/prueba";
    // const asd = import.meta.env.VITE_PUBLIC_SERVICE_SID;
    // console.log(requestAddress);
    // console.log(username, password);
  
    // try {
    //   const response = await fetch(requestAddress, {
    //     params: { identity: username, password: password },
    //   });
    //   return response.data;
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.response?.status === 401) {
    //     return Promise.reject(error);
    //   }
  
    //   process.stderr?.write(`ERROR received from ${requestAddress}: ${error}\n`);
    //   return Promise.reject(`ERROR received from ${requestAddress}: ${error}\n`);
    // }

    try{
        // const response = await fetch(requestAddress, { params: { identity: username, password: password } });
        const response = await fetch(requestAddress, {
            method: "POST",
            headers: { 'Content-Type': 'application/json', "Accept": "text/html"},
            body: JSON.stringify({ identity: userName })
        });
        // console.log(response);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
  }