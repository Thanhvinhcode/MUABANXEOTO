const PHONE = "0397670298";

let shops = [
  { id:"daiThang", name:"Đại Thắng Ô Tô" },
  { id:"shop1", name:"Auto Minh" },
  { id:"shop2", name:"Sài Gòn Car" },
  { id:"shop3", name:"Thành Vinh Ô TÔ" }
];

let allCars = [];
let cars = [];
let currentShop = "daiThang";
let minPrice = 0, maxPrice = 9999;

function car(name, price, shop, note, img){
  return {
    name,
    price,
    shop,
    note,
    phone: PHONE,
    img: img || "https://via.placeholder.com/400"
  };
}


function initPage(){
  allCars = [
    car("Vios 2019",265,"daiThang","Xe gia đình, máy zin","https://i.postimg.cc/fTfq4jYf/elantra2016.png"),
    car("Innova 2020",420,"daiThang","7 chỗ rộng, xe đẹp"),



    car("Xpander 2019",395,"shop1","Một chủ từ đầu"),
    car("Kia K3 2018",325,"shop1","Sedan tiết kiệm"),


    car("Mazda 3 2020",450,"shop2","Xe cá nhân"),
    car("i10 2017",180,"shop2","Giá rẻ dễ mua"),

    car("i10 2015",145,"shop3","Giá rẻ dễ mua"),



    
  ];
  renderShops();
  selectShop(currentShop);
}

function renderShops(){
  shopBar.innerHTML="";
  shops.forEach(s=>{
    const count = allCars.filter(c=>c.shop===s.id).length;
    shopBar.innerHTML += `
      <button class="shop-btn" onclick="selectShop('${s.id}',this)">
        ${s.name}
        <span>${count}</span>
      </button>`;
  });
}

function selectShop(id, btn){
  currentShop = id;
  document.querySelectorAll(".shop-btn")
    .forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");
  shopInfo.innerText = shops.find(s=>s.id===id).name;
  applyFilter();
}

function setRange(min,max){
  minPrice=min;
  maxPrice=max;
  applyFilter();
}

function applyFilter(){
  const key = searchInput.value.toLowerCase();
  cars = allCars.filter(c =>
    c.shop===currentShop &&
    c.price>=minPrice &&
    c.price<=maxPrice &&
    c.name.toLowerCase().includes(key)
  );
  sortCars(true);
}

function sortCars(skip){
  if(!skip){
    const v = sortPrice.value;
    if(v==="asc") cars.sort((a,b)=>a.price-b.price);
    if(v==="desc") cars.sort((a,b)=>b.price-a.price);
  }
  renderCars();
}

function renderCars(){
  carList.innerHTML="";
  cars.forEach((c,i)=>{
    carList.innerHTML += `
      <div class="car-card" onclick="showDetail(${i})">
        <img src="${c.img}">
        <div class="info">
          <h4>${c.name}</h4>
          <div class="price">${c.price} triệu</div>
        </div>
      </div>`;
  });
}

function showDetail(i){
  const c = cars[i];
  detailName.innerText = c.name;
  detailImg.src = c.img;
  detailPrice.innerText = c.price + " triệu";
  detailNote.innerText = c.note;

  document.querySelector(".call").href = "tel:" + c.phone;

  const msg = "Tôi đang tìm xe tầm 100–400 triệu, xem trên website";
  document.querySelector(".zalo").href =
    `https://zalo.me/${c.phone}?text=${encodeURIComponent(msg)}`;

  carDetail.style.display = "block";
}

function closeDetail(){
  carDetail.style.display="none";
}
function clickOutside(e){
  if(e.target.id==="carDetail") closeDetail();
}
