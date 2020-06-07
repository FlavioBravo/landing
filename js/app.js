//Add click event for menu item, so add item-active-nav to selected item.
const menu = document.getElementById("menu");

const addActiveClass = (evt) => {
  const items = document.getElementsByTagName("a");
  for (const item of items) {
    if (item.innerHTML === evt.target.textContent) {
      let element = document.getElementById(item.id);
      element.classList.remove("item-nav");
      element.classList.add("item-active-nav");

      const sectionId = item.hash.split("#");
      const section = document.getElementById(sectionId[1]);
      section.scrollIntoView({
        behavior: "smooth",
      });
      evt.preventDefault();
    } else {
      let element = document.getElementById(item.id);
      element.classList.remove("item-active-nav");
      element.classList.add("item-nav");
    }
  }
};

menu.addEventListener("click", addActiveClass);

//active state in the menu when a section is in the viewport
const activeScroll = (event) => {
  let fromTop = window.scrollY + 55;
  const items = document.getElementsByTagName("a");

  for (const link of items) {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.remove("item-nav");
      link.classList.add("item-active-nav");
    } else {
      link.classList.remove("item-active-nav");
      link.classList.add("item-nav");
    }
  }
};
window.addEventListener("scroll", activeScroll);

//function to verify the number of new item.
const isOddOrEvenNumber = (number) => {
  return number % 2 === 0 ? true : false;
};

//function to get a new number item.
const getNewNumber = () => {
  const items = document.getElementsByTagName("a");
  return items.length + 1;
};

//function to get the last item.
const getLastNumber = () => {
  const items = document.getElementsByTagName("a");
  return items.length;
};

//function to add the new item.
const addNewMenuItem = (number) => {
  const menu = document.getElementById("menu");
  const newA = document.createElement("a");
  newA.classList.add("item-nav");
  newA.setAttribute("href", `#section${number}`);
  newA.setAttribute("id", `sect${number}`);
  newA.textContent = `Section ${number}`;
  menu.appendChild(newA);
};

//add click event in + button, new section is created.
const addButton = document.getElementById("add");
const addNewSection = (evt) => {
  const newNumber = getNewNumber();
  if (newNumber === 11) {
    alert("10 is the maximun quantity of section.");
    return;
  }

  addNewMenuItem(newNumber);

  const container = document.getElementById("main-container");
  const newSection = document.createElement("section");
  if (isOddOrEvenNumber(newNumber)) {
    newSection.classList.add("bg-section-alt");
  } else {
    newSection.classList.add("bg-section");
  }
  newSection.setAttribute("id", `section${newNumber}`);

  const newImg = document.createElement("img");
  newImg.classList.add("bg-img");
  newImg.setAttribute("src", "./img/view4.jpg");
  newImg.setAttribute("alt", `view number ${newNumber}`);

  const newDiv = document.createElement("div");
  if (isOddOrEvenNumber(newNumber)) {
    newDiv.classList.add("bg-sub-section-alt");
  } else {
    newDiv.classList.add("bg-sub-section");
  }
  newDiv.classList.add("nunito");

  const newH2 = document.createElement("h2");
  newH2.textContent = `Section number ${newNumber}`;
  const newP = document.createElement("p");
  newP.classList.add("text-base");
  newP.textContent = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, amet
  nam. Debitis non aliquid praesentium reprehenderit repellat error
  quaerat libero quos ab? Fugit possimus eos natus totam ad atque
  modi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Incidunt non perferendis, ad beatae eaque id similique repellat
  perspiciatis. Cupiditate laboriosam libero autem earum, totam
  assumenda ipsa soluta recusandae ipsam voluptatibus!`;

  newDiv.appendChild(newH2);
  newDiv.appendChild(newP);

  newSection.appendChild(newImg);
  newSection.appendChild(newDiv);

  container.appendChild(newSection);
};

addButton.addEventListener("click", addNewSection);

//add click event in - button, new section is removed.
const removeButton = document.getElementById("remove");
const removeLastSection = (evt) => {
  const lastNumber = getLastNumber();

  if (lastNumber === 3) {
    alert("3 is the minimum quantity of section.");
    return;
  }

  const menu = document.getElementById("menu");
  const lastMenuItem = document.getElementById(`sect${lastNumber}`);
  menu.removeChild(lastMenuItem);

  const container = document.getElementById("main-container");
  const lastSection = document.getElementById(`section${lastNumber}`);
  container.removeChild(lastSection);
};

removeButton.addEventListener("click", removeLastSection);

//button on the page that’s only visible when the user scrolls below the fold of the page
const scrollToTopButton = document.getElementById("topButton");

// Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
const scrollFunc = () => {
  let y = window.scrollY;

  if (y > 0) {
    scrollToTopButton.className = "btn-up";
  } else {
    scrollToTopButton.className = "btn-up-hide";
  }
};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {
  // Let's set a variable for the number of pixels we are from the top of the document.
  const c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 10);
  }
};

scrollToTopButton.addEventListener("click", scrollToTop);
