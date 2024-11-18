let Elname = document.querySelector(".name");
let Ellastname = document.querySelector(".last__name");
let Eladd = document.querySelector(".add");
let newperson = document.querySelector(".new__persons");
let ElsearchInput = document.querySelector(".search__input");
let Elsearch = document.querySelector(".search");
let formSelect = document.querySelector(".form-select-groups");
let doesWork = document.querySelector(".input-does-work");
///////////////////////////////////////////////
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
let persons = getFromLocalStorage("persons");
let countID = getFromLocalStorage("countID") || 0;
///////////////////////////////////////////////
function loadPersons() {
  newperson.innerHTML = "";
  persons.forEach(createPersonElement);
}
///////////////////////////////////////////////
function createPersonElement(person) {
  let div = document.createElement("div");
  div.setAttribute("class", "wrapper");

  let newId = document.createElement("p");
  newId.textContent = person.id;

  let newn = document.createElement("p");
  newn.textContent = person.name;

  let newl = document.createElement("p");
  newl.textContent = person.lastname;

  let group = document.createElement("p");
  group.textContent = person.group;

  let isWork = document.createElement("p");
  isWork.textContent = person.work ? "Ha" : "Yo'q";
  isWork.style.color = person.work ? "green" : "red";
  ///////////////////////////////////////////////
  let editBtn = createButton("Edit", "green", () => {
    let newName = prompt("Ismingizni kiriting", person.name);
    let newLastName = prompt("Familiyangizni kiriting", person.lastname);
    let newGroup = prompt("Kursga qo'shing (N##)", person.group);
    if (newName && newLastName && newGroup) {
      person.name = newName;
      person.lastname = newLastName;
      person.group = newGroup;
      saveToLocalStorage("persons", persons);
      loadPersons();
    }
  });
  ///////////////////////////////////////////////
  let delBtn = createButton("Delete", "red", () => {
    persons = persons.filter((p) => p.id !== person.id);
    saveToLocalStorage("persons", persons);
    loadPersons();
  });

  let eddiv = document.createElement("div");
  eddiv.setAttribute("class", "deledit");
  eddiv.appendChild(editBtn);
  eddiv.appendChild(delBtn);
  div.appendChild(newId);
  div.appendChild(newn);
  div.appendChild(newl);
  div.appendChild(group);
  div.appendChild(isWork);
  div.appendChild(eddiv);
  newperson.appendChild(div);
}

function createButton(text, bgColor, onClick) {
  let btn = document.createElement("button");
  btn.textContent = text;
  btn.style.backgroundColor = bgColor;
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.cursor = "pointer";
  btn.style.padding = "5px 10px";
  btn.style.borderRadius = "4px";
  btn.addEventListener("click", onClick);
  return btn;
}

Eladd.addEventListener("click", function () {
  let name = Elname.value.trim();
  let lastname = Ellastname.value.trim();
  let group = formSelect.value;
  let work = doesWork.checked;
  ///////////////////////////////////////////////
  if (!name || !lastname) {
    alert("Iltimos, ism va familiyani kiriting");
    return;
  }

  countID++;
  saveToLocalStorage("countID", countID);

  let person = { id: countID, name, lastname, group, work };
  persons.push(person);
  saveToLocalStorage("persons", persons);
  createPersonElement(person);

  Elname.value = "";
  Ellastname.value = "";
});

Elsearch.addEventListener("click", function () {
  let search = ElsearchInput.value.trim().toLowerCase();

  if (!search) {
    alert("Qidiruv uchun ma'lumot kiriting");
    return;
  }

  let found = persons.filter((person) => {
    let name = person.name ? person.name.toLowerCase() : "";
    let lastname = person.lastname ? person.lastname.toLowerCase() : "";
    return name.includes(search) || lastname.includes(search);
  });

  newperson.innerHTML = "";
  found.forEach(createPersonElement);
});

loadPersons();
