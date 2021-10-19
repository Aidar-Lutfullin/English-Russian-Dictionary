const input1 = document.getElementById("form-1-input");
const input2 = document.getElementById("form-2-input");
const inputs = document.getElementsByClassName("input");
const btnAdd = document.getElementById("form-3");
const wordsTable = document.getElementById("box__text");

let words;
let btnsDelete;

localStorage.length < 1
  ? (words = [])
  : (words = JSON.parse(localStorage.getItem("words")));

const addWordToTable = (index) => {
  wordsTable.innerHTML += `
  <tr class="text-words" id="text-words">
    <td class="text-eng">${words[index].english}</td>
    <td class="text-rus">${words[index].russian}</td>
    <td>
    <button class="text-delete" id="text-delete">Удалить</button>
    </td>
  </tr>`;
};

words.forEach((element, i) => {
  addWordToTable(i);
});

btnAdd.addEventListener("click", () => {
  if (
    input1.value.length < 1 ||
    input2.value.length < 1 ||
    !isNaN(input1.value) ||
    !isNaN(input2.value)
  ) {
    for (let key of inputs) {
      key.classList.add("error");
    }
  } else {
    for (let key of inputs) {
      key.classList.remove("error");
    }
    words.push(new CreateWord(input1.value, input2.value));
    localStorage.setItem("words", JSON.stringify(words));
    addWordToTable(words.length - 1);
    input1.value = null;
    input2.value = null;
  }
});

function CreateWord(english, russian) {
  this.english = english;
  this.russian = russian;
}

const deleteWord = (e) => {
  const rowIndex = e.target.parentNode.parentNode.rowIndex;
  e.target.parentNode.parentNode.parentNode.remove();
  words.splice(rowIndex, 1);
  localStorage.removeItem("words");
  localStorage.setItem("words", JSON.stringify(words));
};

const addEventDelete = () => {
  if (words.length > 0) {
    btnsDelete = document.querySelectorAll(".text-delete");
    for (let btn of btnsDelete) {
      btn.addEventListener("click", (e) => {
        deleteWord(e);
      });
    }
  }
};

addEventDelete();
