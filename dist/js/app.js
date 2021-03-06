const form = document.querySelector('form');
 
form.addEventListener('submit', async event => {
    event.preventDefault();

    // make the request to submit the form
    try {
      const response = await fetch('http://localhost:8888 /', {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // parse and submit all included form data
        body: new URLSearchParams(new FormData(form)).toString()
      });
      
      // if it was successful show success message
      if (response.status === 200) {
        document.querySelector('.when-success').hidden = false;
      } else {
        document.querySelector('.when-error').hidden = false;
      }
    } catch (e) {
      console.error(e);
    }
  });