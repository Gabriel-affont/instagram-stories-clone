const storiesContainer = document.getElementById('stories');
const addStoryBtn = document.getElementById("add-story");
const fileInput = document.getElementById("file-input");


function loadStories(){
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    const now = Date.now();
    stories = stories.filter(story =>{
        return now - story.createdAt < 24 * 60 * 60 * 1000;
    });
    

    if (stories.length === 0) {
        
        const demoStories = [
            "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Story+1",
            "https://via.placeholder.com/150x150/4ECDC4/FFFFFF?text=Story+2",
            "https://via.placeholder.com/150x150/45B7D1/FFFFFF?text=Story+3"
        ];

        demoStories.forEach(url => {
            addStory(url, false); 
        });
    } else {
        stories.forEach(story => {
            addStory(story.image, false); 
        });
    }
}


function addStory(imageSrc, shouldSave = true) {
    const storyDiv = document.createElement("div");
    storyDiv.classList.add("story");

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Story";

    storyDiv.appendChild(img);
    storiesContainer.appendChild(storyDiv);

    if (shouldSave) saveStory(imageSrc);
}


function saveStory(imageSrc){
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.push({ image: imageSrc, createdAt: Date.now() });
    localStorage.setItem("stories", JSON.stringify(stories));
}
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


loadStories();
