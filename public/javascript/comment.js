async function commentFormHandler(event) {
    event.preventDefault();

const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
const pub_id = document.location.href.toString().split('pub/')[1]
  

  console.log(pub_id)

  if (comment_text) {
    
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        pub_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
     
      document.location.reload();
      
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

console.log(EventTarget)