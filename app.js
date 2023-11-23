function formatTime(seconds) {
  return seconds < 60
    ? `${seconds} seconds ago`
    : seconds < 3600
    ? `${Math.floor(seconds / 60)} ${
        Math.floor(seconds / 60) === 1 ? "minute" : "minutes"
      } ago`
    : `${Math.floor(seconds / 3600)} ${
        Math.floor(seconds / 3600) === 1 ? "hour" : "hours"
      } ${Math.floor((seconds % 3600) / 60)} ${
        Math.floor((seconds % 3600) / 60) === 1 ? "minute" : "minutes"
      } ago`;
}

const loadCategies = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((res) => res.json())
    .then((data) => displyCategories(data?.data));
};
const displyCategories = (data) => {
  // console.log(data);
  const allCategory = document.getElementById("allCategory");
  allCategory.innerHTML = "";
  data.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");
    div.innerHTML = `
        <button class="btn glass">${category?.category}</button>
        `;
    allCategory.appendChild(div);
  });
};

loadCategies();

const loadVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => displyVideos(data.data));
};
const displyVideos = (data) => {
  // console.log(data);
  const allVideos = document.getElementById("allVideos");
  allVideos.innerHTML = "";
  data.forEach((video) => {
    // console.log(video);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="h-fit rounded-lg">
            <figure class="w-full min-h-[100px] h-full   sm:h-[200px] relative">
            <img src="${video.thumbnail}" class="h-full w-full rounded-md" alt="product"/>
            <div class="absolute bottom-3 right-3 text-white text-xs bg-[#171717] p-0.5 rounded-md">
            <span> ${video?.others?.posted_date && formatTime(video?.others?.posted_date)}</span>
        </div>
        </figure>
        <div class="flex gap-3 mt-5">
            <div class="w-fit mt-0.5">
                <div class="avatar">
                    <div class="w-10  rounded-full">
                        <img src=${video?.authors[0].profile_picture} />
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <h3 class="text-neutral-950 max-w-prose line-clamp-2 font-bold text-base ">${video.title}</h3>
                <div class="flex gap-2  mt-2 mb-2 items-center">
                    <p class="text-sm text-heroText">${video?.authors[0].profile_name}</p>
                    ${video?.authors[0].verified ? '<img src="/Image/verified.svg" alt="" />' : ""}
                </div>
                <p class="text-sm mt-2 text-heroText">${video?.others?.views} views</p>
            </div>
            </div>
        </div>
        `;
    allVideos.appendChild(div);
  });
};
loadVideos(1000);
