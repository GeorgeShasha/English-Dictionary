const inputField = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchApi(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainer.style.display = "none";
    infoTextEl.innerHTML = `Searching the meaning of the word ${word}`;
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    console.log(data);

    if (data.title) {
      meaningContainer.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerHTML = word;
      meaningEl.innerHTML = `Can't find the meaning of the word ${word}. Please double check it!`;
      audioEl.style.display = "none";
    } else {
      audioEl.style.display = "inline-flex";
      titleEl.innerHTML = data[0].word;
      meaningEl.innerHTML = data[0].meanings[0].definitions[0].definition;
      audioEl.src = data[0].phonetics[0].audio;
      infoTextEl.style.display = "none";
      meaningContainer.style.display = "block";
    }
  } catch (error) {
    infoTextEl.innerHTML = "An error occured. Please try again later.";
    console.log(error);
  }
}

inputField.addEventListener("keypress", (event) => {
  if (event.target.value && event.key === "Enter") {
    fetchApi(event.target.value);
  }
});
