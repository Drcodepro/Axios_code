
// Axios Global 

axios.defaults.headers.common["global-Tokan"]=" ********any tokan value******** ";




// GET REQUEST
function getTodos() {
    // axios({
    //   method:"get",
    //   url:"https://jsonplaceholder.typicode.com/todos",
    //   params:{ _limit:5 }    // adding parameters in the url (it will just show 5 length data)

    // })

    //short form 
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then(response => showOutput(response))
    .catch(err => console.log(err))
  }
  




  // POST REQUEST
  function addTodo() {
    axios.post("https://jsonplaceholder.typicode.com/todos",{title:"new posted data",comleted:"false"})
    .then(response => showOutput(response))
    .catch(err => console.log(err))
  }


  
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    // axios.put("https://jsonplaceholder.typicode.com/todos/1",{title:"updated data (PUT)",comleted:"true"})
    // .then(response => showOutput(response))
    // .catch(err => console.log(err))


    axios.patch("https://jsonplaceholder.typicode.com/todos/1",{title:"updated data (PUT)",comleted:"true"})
    .then(response => showOutput(response))
    .catch(err => console.log(err))

  }
  



  // DELETE REQUEST
  function removeTodo() {
    axios.delete("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => showOutput(response))
    .catch(err => console.log(err))
  }




  
  // SIMULTANEOUS DATA  // at same time we can do request on 2 or more urls....
  function getData() {
    axios.all([
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=4"),
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=6")
    ])
    // .then((res)=>{console.log(res[0]);
    //               console.log(res[1]);
    //               showOutput(res[0])
    // })
    .then(axios.spread((posts,todos)=>showOutput(todos)))
    .catch(err=>console.log(err))
    }
  




  // CUSTOM HEADERS
  function customHeaders() {
   const config = {
    headers:{
       "Content-Type":"application/json",
       Authorization : "custom header added"
    }
   };

   axios.post("https://jsonplaceholder.typicode.com/todos",{title:"new posted data",comleted:"false"},config)
   .then(response => showOutput(response))
   .catch(err => console.log(err))
  }
  



  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    console.log('Transform Response');
  }
  


  // ERROR HANDLING
  function errorHandling() {
    axios.get("https://jsonplaceholder.typicode.com/todosss")
    .then(res => showOutput(res))
    .catch(err =>{
        if(err.response){  // requeste sent and got response status other then range 200
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)

            if(err.response.status==404) alert("Error:Page not found")
        }
        else if(err.request){ // request sent but no response from server
            console.log(err.request)
        }
        else{ // any other error thennn 
            console.log(err.message)
        }

    })
  }

  



  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();

    axios.get('https://jsonplaceholder.typicode.com/todos', {cancelToken: source.token
      })
      .then(res => showOutput(res))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        }
      });

    if (true) {
      source.cancel('Request canceled!');
    }
  }


  
  // INTERCEPTING REQUESTS & RESPONSES   // that will going to log(print) the time and url link  of request  when we send a request
  
  axios.interceptors.request.use((config) =>{
        console.log(`${config.method.toUpperCase()} sent to ${config.url} at time =  ${new Date()}`);
    return config;
    },
    (error)=>{return promise.reject(error)}
  );



  // AXIOS INSTANCES
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);