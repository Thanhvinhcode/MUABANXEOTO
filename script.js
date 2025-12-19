const PHONE = "0397670298";

let shops = [
  { id:"daiThang", name:"Đại Thắng Ô Tô" },
  { id:"shop1", name:"Thành Vinh Ô TÔ" },
  { id:"shop2", name:"Chuyên Hợp Tác Bán Xe Ô TÔ Miền Nam" },
  { id:"shop3", name:"UY TÍN _ LÂU DÀI" }
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
    car("Vios 2018 SS",265,"daiThang","Vios 2018 from mới 2019, số sàn động cơ 1.5, odo 7.7v. Nội ngoại thất đẹp","https://i.postimg.cc/g2wMw9fV/Vios-2018.png"),
    car("Huyndai Elantra 2016 SS",295,"daiThang","Xe gia đình,không qua dịch vụ","https://i.postimg.cc/fTfq4jYf/elantra2016.png"),
    car("Mitsubishi 2004 SS ",79,"daiThang","Xe bản đặc biệt 8 chỗ ngoài , nội thất khá mới , hộp số chuyển động nhẹ nhàng ","https://i.postimg.cc/4yd6rVGh/jolie.png"),
    car("Kia K3 2015 STĐ ",325,"daiThang","Innova 2019 số sàn bản E. động cơ 2.0.màu trắng, máy còn mới, được trang bị camera, màn hình đầy đủ, ghế da còn mới, nét căng","https://i.postimg.cc/VkBRTj09/innova2019.png"),
    car("Vios 2016 STĐ ",290,"daiThang","Xe gia đình,không qua dịch vụ","https://i.postimg.cc/SKPD7mz3/vios-2016.png"),
    car("Huyndai i10 2014 SS",145,"daiThang","Xe gia đình,không qua dịch vụ","https://i.postimg.cc/t45cP05L/i10-2014.png"),
    car("Huyndai i10 2016 SS Bản Đủ",185,"daiThang","Xe gia đình,không qua dịch vụ","https://i.postimg.cc/jqDrbjX7/i10-2016.png"),
    car("Huyndai i10 2018 STĐ Bản đủ ",275,"daiThang","Xe gia đình,không qua dịch vụ","https://i.postimg.cc/JzcfqH1S/i10-2018.png"),

    car("Đợi chủ đầu tư hoa hồng ",3,"shop1","hợp tác bán xe","https://i.postimg.cc/JhssJ88j/profile.png"),
    car("Đợi chủ đầu tư hoa hồng ",3,"shop2","hợp tác bán xe","https://i.postimg.cc/JhssJ88j/profile.png"),
    car("Đợi chủ đầu tư hoa hồng ",3,"shop3","hợp tác bán xe","https://i.postimg.cc/JhssJ88j/profile.png"),


   



    
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
