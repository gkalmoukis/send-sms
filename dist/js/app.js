import { ConversationList } from "twilio/lib/rest/conversations/v1/conversation";

const form = document.querySelector('form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    
    // disable button to prevent multiple submissions
    form.querySelector('button').disabled = true;

    // make the request to submit the form
    try {
      const response = await fetch('/', {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // parse and submit all included form data
        body: new URLSearchParams(new FormData(form)).toString()
      });

      console.log(form);
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


  document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      $notification = $delete.parentNode;
  
      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
      });
    });
  });