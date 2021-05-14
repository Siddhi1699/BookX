import axios from "axios";
import title from "./title.json";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.NEXT_PUBLIC_API_URL;

export const getGenreRecommendations = async (genre) => {
  try {
    const result = await axios.post(url + "/getGenreRecommendations", {
      genre,
    });
    console.log(result);

    // console.log("titles", titles);
    return result;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const getBooksRecommendations = async (userid, title) => {
  try {
    const result = await axios.post(url + "/getBookRecommendations", {
      userid,
      title,
    });
    console.log(result);
    return result;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const listOfGenres = [
  "Art",
  "Biography",
  "Business",

  "Christian",
  "Classics",
  "Comics",
  "Contemporary",
  "Cookbooks",
  "Crime",
  "Ebooks",
  "Fantasy",
  "Fiction",

  "History",
  "Horror",

  "Manga",
  "Memoir",
  "Music",
  "Mystery",
  "Nonfiction",
  "Paranormal",
  "Philosophy",
  "Poetry",
  "Psychology",
  "Religion",
  "Romance",
  "Science",

  "Suspense",
  "Spirituality",
  "Sports",
  "Thriller",
  "Travel",
];

// const titles = [];
// Object.keys(title).map((item)=>{
//   titles.push({
//     label: title[item],
//     value: title[item],
//   });
// })

// console.log("titles", titles)

export const handleSaveToPC = async () => {
  const titles = [];
  Object.keys(title).map((item) => {
    titles.push({
      label: title[item],
      value: title[item],
    });
  });

  const fileData = JSON.stringify(titles);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "filename.json";
  link.href = url;
  link.click();
};
