const postsPerPage = 12;

const posts = document.querySelectorAll(".post-card");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

function showPage(page) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;

  posts.forEach((post, index) => {
    post.style.display =
      index >= start && index < end ? "grid" : "none";
  });
}

function createPagination() {
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      showPage(currentPage);
      createPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    pagination.appendChild(btn);
  }
}

// Initial load
showPage(currentPage);
createPagination();
