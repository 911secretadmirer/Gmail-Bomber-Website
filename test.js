url = 'http://127.0.0.1:5000'

fetch(url)
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((e)=>console.log(e)
  );
  
  