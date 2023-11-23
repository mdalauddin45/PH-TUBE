let videos = [];
let categories = [];
let isAscending = false;
function formatTime(seconds) {
  return seconds < 60
    ? `${seconds} seconds ago`
    : seconds < 3600
      ? `${Math.floor(seconds / 60)} ${Math.floor(seconds / 60) === 1 ? "minute" : "minutes"
      } ago`
      : `${Math.floor(seconds / 3600)} ${Math.floor(seconds / 3600) === 1 ? "hour" : "hours"
      } ${Math.floor((seconds % 3600) / 60)} ${Math.floor((seconds % 3600) / 60) === 1 ? "minute" : "minutes"
      } ago`;
}
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((res) => res.json())
    .then((data) => {
      displyCategories(data?.data);
    });
};
const displyCategories = (data) => {
  // console.log(data);
  const allCategory = document.getElementById("allCategory");
  allCategory.innerHTML = "";
  data.forEach((category,index) => {
    // console.log(category);
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="${category.category_id}" onclick="handleCategoryClick(${index}, ${category.category_id})" class="btn ${index === 0 ? 'bg-[#ff1f3d] text-white' : ''}">${category?.category}</button>    `;
    allCategory.appendChild(div);
  });
};
const handleCategoryClick = (index, categoryId) => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.classList.remove("bg-[#ff1f3d]");
    button.classList.remove("text-white");
  });
  const clickedButton = document.getElementById(categoryId);
  clickedButton.classList.add("bg-[#ff1f3d]");
  clickedButton.classList.add("text-white");
  loadVideos(categoryId);
};

const loadVideos = (id) => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displyVideos(data.data);
      spinner.style.display = "none";
      videos = data.data;
    })
    .catch((error) => {
      console.error("Error loading videos:", error);
      spinner.style.display = "none";
    });
};
const displyVideos = (data) => {
  const allVideos = document.getElementById("allVideos");
  const empty = document.getElementById("empty");
  if (data.length == 0) {
    allVideos.innerHTML = "";
    empty.innerHTML = `
      <div class="flex flex-col mt-20 items-center justify-center">
          <img src="/image/Icon.png" class="h-[140px] w-[140px]" alt="" />
          <h2 class="mt-8 text-3xl text-center font-bold md:w-[400px] w-[80%] mx-auto"> Oops!! Sorry, There is no content here</h2>
      </div>
      `;
  } else if (data.length > 1) {
    empty.innerHTML = "";
    allVideos.innerHTML = "";
    data.forEach((video) => {
      // console.log(video);
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="h-fit rounded-lg">
            <figure class="w-full min-h-[100px] h-full   sm:h-[200px] relative">
            <img src="${video.thumbnail
        }" class="h-full w-full rounded-md" alt="product"/>
            <div class="absolute bottom-3 right-3 text-white text-xs bg-[#171717] p-0.5 rounded-md">
            <span> ${video?.others?.posted_date &&
        formatTime(video?.others?.posted_date)
        }</span>
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
                <h3 class="text-neutral-950 max-w-prose line-clamp-2 font-bold text-base ">${video.title
        }</h3>
                <div class="flex gap-2  mt-2 mb-2 items-center">
                    <p class="text-sm text-heroText">${video?.authors[0].profile_name
        }</p>
                    ${video?.authors[0].verified
          ? '<img src="/Image/verified.svg" alt="" />'
          : ""
        }
                </div>
                <p class="text-sm mt-2 text-heroText">${video?.others?.views
        } views</p>
            </div>
            </div>
        </div>
        `;
      allVideos.appendChild(div);
    });
  }
};

const handleSort = () => {
  isAscending = !isAscending;
  const sortContainer = document.getElementById("sort-container");

  if (!isAscending) {
    sortContainer.setAttribute("data-tip", "Highest to Lowest");
    videos.sort((a, b) => (parseInt(b.others.views) || 0) - (parseInt(a.others.views) || 0));
  } else {
    sortContainer.setAttribute("data-tip", "Lowest to Highest");
    videos.sort((a, b) => (parseInt(a.others.views) || 0) - (parseInt(b.others.views) || 0));
  }
  displyVideos(videos);
};

loadVideos(1000);
loadCategories();
