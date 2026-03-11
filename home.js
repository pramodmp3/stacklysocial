// 1. SHORTS DATASET
const shortsData = [];
for (let i = 0; i < 20; i++) {
  shortsData.push({
    id: i,
    title: `Cool Tech Moment #${i + 1} #shorts`,
    channel: `TechQuickie`,
    views: `${(Math.random() * 50).toFixed(1)}M`,
    thumbnail: `https://picsum.photos/seed/short${i}/400/711`, // Vertical ratio
    avatar: `https://i.pravatar.cc/150?u=tech${i % 5}`,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
  });
}

let currentShortIndex = 0;

// 2. UPDATED SHORTS SHELF RENDERER (Modified from existing)
function getShortsShelf() {
  let html = `
                <div class="feed-divider">
                    <div class="section-header">
                        <svg viewBox="0 0 24 24" width="24" height="24" style="color:red"><path fill="currentColor" d="M17.77 10.32l-1.2-.5L18 8.82a3.74 3.74 0 00-3.5-5.5 3.75 3.75 0 00-2.14.67L6 7.45a3.75 3.75 0 001.3 7l1.2.5L7 16.18a3.75 3.75 0 005.64 4.14l6.36-3.46a3.75 3.75 0 00-1.23-6.54zM10 14.5v-5l4.5 2.5-4.5 2.5z"/></svg>
                        Shorts
                    </div>
                    <div class="shorts-shelf">`;

  // Render from shortsData instead of random picsum
  shortsData.slice(0, 6).forEach((short, idx) => {
    html += `
                    <div class="short-card" onclick="openShort(${short.id})">
                        <div class="short-thumb"><img src="${short.thumbnail}"></div>
                        <div class="short-title">${short.title}</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-top:4px">${short.views} views</div>
                    </div>`;
  });

  html += `</div></div>`;
  return html;
}

// 3. SHORTS CLICK BEHAVIOR & PLAYER LOGIC
function openShort(shortId) {
  currentShortIndex = shortsData.findIndex((s) => s.id === shortId);
  const short = shortsData[currentShortIndex];

  const playerPage = document.getElementById("shortsPlayerPage");
  const video = document.getElementById("shortVideoPlayer");

  // Set content
  video.src = short.videoUrl;
  document.getElementById("shortTitle").innerText = short.title;
  document.getElementById("shortChannel").innerText = "@" + short.channel;
  document.getElementById("shortAvatar").src = short.avatar;

  // Show page and play
  playerPage.classList.add("active");
  video
    .play()
    .catch((e) => console.log("Autoplay blocked, user interaction required"));

  // Stop background video if watch page was open
  if (typeof currentPageId !== "undefined" && currentPageId === "watch") {
    const mainVid = document.getElementById("mainVideo");
    if (mainVid) mainVid.pause();
  }
}

function closeShorts() {
  const playerPage = document.getElementById("shortsPlayerPage");
  const video = document.getElementById("shortVideoPlayer");
  video.pause();
  video.src = "";
  playerPage.classList.remove("active");
}

function navShort(direction) {
  currentShortIndex += direction;

  // Wrap around logic
  if (currentShortIndex >= shortsData.length) currentShortIndex = 0;
  if (currentShortIndex < 0) currentShortIndex = shortsData.length - 1;

  openShort(shortsData[currentShortIndex].id);
}

// 4. MOUSE WHEEL NAVIGATION
document.getElementById("shortsPlayerPage").addEventListener(
  "wheel",
  (e) => {
    if (e.deltaY > 50) navShort(1);
    else if (e.deltaY < -50) navShort(-1);
  },
  { passive: true },
);

// 5. TOAST FALLBACK (If not already defined)
if (typeof showToast !== "function") {
  function showToast(msg) {
    console.log("Toast:", msg);
    // Simple implementation if user doesn't have it
    const t = document.getElementById("toast") || document.createElement("div");
    t.id = "toast";
    t.style.position = "fixed";
    t.style.bottom = "20px";
    t.style.left = "50%";
    t.style.transform = "translateX(-50%)";
    t.style.background = "#333";
    t.style.color = "white";
    t.style.padding = "10px 20px";
    t.style.borderRadius = "20px";
    t.style.zIndex = "3000";
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }
}
