var posts = [];
var search = null;

/*
 * Hides the main part of the page to show the Ask a Question section
 */
function showAsk(){
    var main = document.getElementById("main");
    var ask = document.getElementById("ask");
    main.style.display = "none";
    ask.style.display = "block";
}

/*
 * Hides the Ask a Question section of the page to show the main part,
 * clearing the question input fields.
 */
function showMain(){
    var main = document.getElementById("main");
    var ask = document.getElementById("ask");
    ask.style.display = "none";
    main.style.display = "block";

    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-tags').value = '';
}

/*
 * Creates a new question/post & send it to the server, before triggering an update for the main part of the page.
 */
function createPost(){

    search = null;

    let post = {
        title: document.getElementById('post-title').value,
        content: document.getElementById('post-content').value,
        tags: document.getElementById('post-tags').value.split(" "),
        upvotes: 0
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Update the page on success
            loadPosts();
            showMain();
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/addpost", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(post));

}

/*
 * Updates the search term then reloads the posts shown
 */
function searchPosts(){

    search = document.getElementById('post-search').value.toUpperCase();
    updatePosts();

}


/*
 * Reloads the posts shown on the page
 * Iterates over the array of post objects, rendering HTML for each and appending it to the page
 * If a search term is being used
 */
function updatePosts() {

    // Reset the page
    document.getElementById('post-list').innerHTML = '';

    // Iterate over each post in the array by index
    for(let i=0; i<posts.length; i++){

        let post = posts[i];

        // Check if a search term used.
        if(search !== null){
            // If so, skip this question/post if title or content doesn't match
            if (post.title.toUpperCase().indexOf(search) < 0 &&
                post.content.toUpperCase().indexOf(search) < 0 ) {
                continue;
            }
        }

        // Generate a set of spans for each of the tags
        let tagSpans = '';
        for(let tag of post.tags){
            tagSpans = tagSpans + `<span class="tag">${tag}</span>`;
        }

        // Generate the post/question element and populate its inner HTML
        let postDiv = document.createElement("DIV");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <div class="votes">
                <button onclick="upvote(${i})">+</button>
                <p><span class="count">${post.upvotes}</span><br />votes</p>
                <button onclick="downvote(${i})">-</button>
            </div>
            <div class="content">
                <h3><a href="#">${post.title}</a></h3>
                <i>By ${post.author}</i>
                <p>${post.content}</p>
                ${tagSpans}<span class="date">${new Date(post.timestamp).toLocaleString()}</span>
            </div>
        `;

        // Append the question/post to the page
        document.getElementById("post-list").appendChild(postDiv);

    }


}

/*
 * Loads posts from the server
 * - Send an AJAX GET request to the server
 * - JSON Array of posts sent in response
 * - Update the
 */
function loadPosts() {

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Parse the JSON and update the posts array
            posts = JSON.parse(this.responseText);
            // Call the updatePosts function to update the page
            updatePosts();
        }
    };

    // Open connection to server
    xmlhttp.open("GET", "/posts", true);

    // Send request
    xmlhttp.send();

}


/*
 * Increase the votes for a given post, then update the page
 */
function upvote(index) {
    posts[index].upvotes ++;
    updatePosts();
}

/*
 * Decrease the votes for a given post, then update the page
 */
function downvote(index) {
    posts[index].upvotes --;
    updatePosts();
}


// function login(){

//     let user = {
//         user: document.getElementById('username').value,
//         pass: document.getElementById('password').value
//     };

//     // Create AJAX Request
//     var xmlhttp = new XMLHttpRequest();

//     // Define function to run on response
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             alert("Welcome "+this.responseText);
//         } else if (this.readyState == 4 && this.status >= 400) {
//             alert("Login failed");
//         }
//     };

//     // Open connection to server & send the post data using a POST request
//     // We will cover POST requests in more detail in week 8
//     xmlhttp.open("POST", "/users/login", true);
//     xmlhttp.setRequestHeader("Content-type", "application/json");
//     xmlhttp.send(JSON.stringify(user));

// }

//I'll write a new login function:

function login(){
  const email = document.getElementById('email').value;
  const password  = document.getElementById('password').value;

  fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then((res) => res.json())
  .then((data) => {
    if (data && data.user) {
      if (data.user.role == "owner") {
        window.location = "owner-dashboard.html";
      } else if (data.user.role == "walker") {
        window.location = "walker-dashboard.html";
      } else {
        alert("no idea what role that is");
      }
    } else {
      alert("wrong email or pass maybe");
    }
  })
  .catch((err) => {
    console.log("something broke", err);
    alert("server or smth is down");
  });
}

function logout() {
  fetch('/api/users/logout', { method: 'POST' })
    .then(() => window.location.href = 'index.html')
    .catch(err => {
      console.error('Logout failed', err);
      alert('Could not log out');
    });
}



//newly added by me
window.addEventListener('DOMContentLoaded', () => {
  loadDogs();
});

async function loadDogs() {
  try {
    // 1) get list of dogs
    const res = await fetch('/api/dogs');
    if (!res.ok) throw new Error('Could not load dogs');
    const dogs = await res.json();

    const tbody = document.querySelector('#dogsTable tbody');
    tbody.innerHTML = ''; // clear any existing rows

    // 2) for each dog, fetch a random photo & append a row
    for (const d of dogs) {
      let imgUrl = '';
      try {
        const photoRes = await fetch('https://dog.ceo/api/breeds/image/random');
        const photoData = await photoRes.json();
        imgUrl = photoData.message;
      } catch {
        imgUrl = ''; // fallback if fetch fails
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${d.dog_name}</td>
        <td>${d.size}</td>
        <td>${d.owner_username}</td>
        <td>
          ${imgUrl
            ? `<img src="${imgUrl}" alt="Random dog" width="100">`
            : `<span class="text-muted">no image</span>`
          }
        </td>
      `;
      tbody.appendChild(tr);
    }

  } catch (err) {
    console.error(err);
    const tbody = document.querySelector('#dogsTable tbody');
    tbody.innerHTML = `<tr><td colspan="4" class="text-danger">Failed to load dogs</td></tr>`;
  }
}