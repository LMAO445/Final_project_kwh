window.onload = () => {
  renderRecentHistory();
};

function renderRecentHistory() {
  const recentContainer = document.getElementById("recent-container");
  const username = localStorage.getItem("loggedInUser");

  
  if (!username) {
    recentContainer.innerHTML = "<p>Please login to view your watch history.</p>";
    return;
  }

  const history = JSON.parse(localStorage.getItem(`history_${username}`)) || [];

  recentContainer.innerHTML = ""; 

  if (history.length === 0) {
    recentContainer.innerHTML = "<p>You haven't watched anything recently.</p>";
    return;
  }

  history.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("recent-item");

    const formattedDate = new Date(item.timestamp).toLocaleString();
    div.innerHTML = `<p><strong>${item.title}</strong> (Watched on: ${formattedDate}) - ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>`;

    const unwatchButton = document.createElement("button");
    unwatchButton.textContent = "Mark as Unwatched";
    unwatchButton.onclick = () => {
      markAsUnwatched(item.title, item.type);
    };

    div.appendChild(unwatchButton);
    recentContainer.appendChild(div);
  });
}

function markAsUnwatched(title, type) {
  const username = localStorage.getItem("loggedInUser");

  if (!username) {
    alert("You need to be logged in to remove items from your history.");
    return;
  }
  
  let history = JSON.parse(localStorage.getItem(`history_${username}`)) || [];

  history = history.filter(item => !(item.title === title && item.type === type));
  
  localStorage.setItem(`history_${username}`, JSON.stringify(history));

  renderRecentHistory();
}
