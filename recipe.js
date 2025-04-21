// accessing the form data for searching

(function check() {
    if (localStorage.getItem("loggedin") == 1)
      document.getElementById("signup").innerHTML = "cart";
  })();
  
  let cartArr = [];
  function addCart(id) {
    let cartData = mealData.find((ele) => ele.idMeal === id);
  
    let prstObj = cartArr.find((ele) => ele.id === id);
    if (prstObj) prstObj.count++;
    else {
      let objData = {
        id,
        name: cartData.strMeal,
        count: 1,
      };
  
      cartArr.push(objData);
    }
  
    refresh(id);
  }
  
  let mealData = [];
  let modal = document.getElementsByClassName("modal")[0];
  let loader = document.getElementsByClassName("block")[0];
  loader.style.display = "none";
  let form = document.getElementById("form");
  function userData(event) {
    event.preventDefault();
  }
  
  function fCrossBtn() {
    form.style.display = "none";
  }
  
  async function modalToggle(id) {
    modal.innerHTML = "";
    let crossbtn = document.createElement("button");
    let buyPara = document.createElement("p");
    buyPara.setAttribute("class", "buyPara");
    let addToCartBtn = document.createElement("button");
    addToCartBtn.setAttribute("class", "addToCartBtn");
    let procedure = document.createElement("p");
    procedure.setAttribute("class", "procedure");
    const toShow = mealData.find((ele) => ele.idMeal === id);
    procedure.innerHTML = "Instructions : " + toShow.strInstructions;
    addToCartBtn.innerHTML = "Add to cart";
  
    addToCartBtn.onclick = () => {
      // console.log(id);
      addCart(id);
    };
  
    buyPara.innerHTML = "Buy Now :";
    crossbtn.setAttribute("class", "crossbtn");
    crossbtn.innerHTML = "X";
    modal.style.display = "none";
    crossbtn.onclick = () => {
      modal.style.display = "none";
    };
    modal.style.display = "block";
    console.clear();
    let iframe = document.createElement("iframe");
    iframe.setAttribute("class", "video");
    iframe.setAttribute(
      "src",
      "https://www.youtube.com/embed/" + toShow.strYoutube.split("=")[1]
    );
    console.log(toShow.strYoutube.split("="));
    // modal.append(iframe);
    console.log(toShow);
    modal.append(buyPara, addToCartBtn, iframe, procedure, crossbtn);
  }
  
  // fetching the data from the API
  const fetchData = async (mealName) => {
    loader.style.display = "flex";
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    mealData = data.meals;
    console.log(mealData);
    loader.style.display = "none";
    // to map the data to the html file
  
    const showData = document.getElementById("showData");
    showData.innerHTML = "";
  
    mealData.map((data, i) => {
      console.log(data);
      let div = document.createElement("div");
      let dishName = document.createElement("p");
      let img = document.createElement("img");
      let area = document.createElement("p");
      let viewMore = document.createElement("button");
  
      viewMore.setAttribute("class", "viewMore");
      viewMore.innerHTML = "View Recipe";
      viewMore.onclick = () => {
        modalToggle(data.idMeal);
      };
  
      div.setAttribute("class", "card");
      img.setAttribute("class", "img");
      img.setAttribute("src", data.strMealThumb);
      area.setAttribute("class", "area");
      dishName.setAttribute("class", "dishName");
      dishName.innerHTML = data.strMeal;
      area.innerHTML = "AREA : " + data.strArea;
      div.id = "meal" + i;
      img.id = "meal" + i;
      area.id = "meal" + i;
      div.append(dishName, img, area, viewMore);
      // img.src = data.strMealThumb;
      // console.log(div);
  
      showData.appendChild(div);
    });
  };
  
  // function for searching the meal in the API
  
  function searchMeal(event) {
    event.preventDefault();
    const searchedMeal = document.querySelector("form #searchedMeal").value;
    fetchData(searchedMeal);
  }
  
  function showForm() {
    document.getElementById("signup").innerHTML === "cart"
      ? (document.getElementsByClassName("cart")[0].style.display = "flex")
      : (form.style.display = "flex");
    localStorage.setItem("loggedin", 1);
    let s = localStorage.getItem("loggedin");
    console.log(s);
    document.getElementById("signup").innerHTML = "cart";
  
    console.log(localStorage);
  
    sessionStorage.setItem("id", 123456);
  }
  
  function increase(idMeal) {
    let obj = cartArr.find((obj) => obj.id === idMeal);
    obj.count++;
    refresh(idMeal);
  }
  function decrease(idMeal) {
    let index = 0;
    let obj = cartArr.find((obj, i) => {
      index = i;
      return obj.id === idMeal;
    });
    if (obj.count == 1) {
      cartArr.splice(index, 1);
    } else obj.count--;
  
    refresh(idMeal);
  }
  
  function refresh(id) {
    let cart = document.getElementsByClassName("cart")[0];
    cart.innerHTML = "";
    let table = document.createElement("div");
  
    cartArr.map((obj) => {
      let div = document.createElement("div");
  
      let plus = document.createElement("button");
      plus.innerHTML = "+";
      plus.onclick = () => {
        increase(id);
      };
      let minus = document.createElement("button");
      minus.innerHTML = "-";
      minus.onclick = () => {
        decrease(id);
      };
      let nm = obj.name;
      let cnt = obj.count;
      div.append(plus, nm, cnt, minus);
      table.append(div);
    });
    cart.append(table);
  }
  