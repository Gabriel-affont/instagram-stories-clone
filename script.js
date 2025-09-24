const storiesContainer = document.getElementById('stories');
const demoStories = [
    "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Story+1",
    "https://via.placeholder.com/150x150/4ECDC4/FFFFFF?text=Story+2",
    "https://via.placeholder.com/150x150/45B7D1/FFFFFF?text=Story+3"
];

demoStories.forEach(url => {
    const storyDiv = document.createElement("div");
    storyDiv.classList.add("story");
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Story";
    storyDiv.appendChild(img);
    storiesContainer.appendChild(storyDiv);
});

const addStoryBtn = document.getElementById("add-story");
const fileInput = document.getElementById("file-input");

addStoryBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Image = e.target.result;
        addStory(base64Image);
    };
    reader.readAsDataURL(file);
});

function addStory(imageSrc) {
    const storyDiv = document.createElement("div");
    storyDiv.classList.add("story");

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Story";

    storyDiv.appendChild(img);
    storiesContainer.appendChild(storyDiv);
}