let cars = [];
let currentCarIndex = 0;
let currentSlide = 0;

const adminPass = "2004"; // Mật khẩu mở panel chỉnh sửa

function initPage() {
    loadCars();
    checkAdmin();
    renderCars();

    document.getElementById("prevBtn").onclick = prevSlide;
    document.getElementById("nextBtn").onclick = nextSlide;

    document.getElementById("uploadMainImg").onchange = function () {
        addMainImage(this);
    };

    document.getElementById("uploadExtraImg").onchange = function () {
        addExtraImages(this);
    };
}

/* ============================
        LƯU – TẢI XE
============================ */

function saveCars() {
    localStorage.setItem("carsData", JSON.stringify(cars));
}

function loadCars() {
    const data = localStorage.getItem("carsData");

    if (data) {
        cars = JSON.parse(data);
        return;
    }

    // ----------------------------
    // DỮ LIỆU XE MẶC ĐỊNH
    // ----------------------------
    cars = [
        {
            name:"Toyota Vios 2018",
            price:"275.000.000 VND",
            mainImg:"https://i.postimg.cc/SRJ7rmxh/IMG-5426.jpg",
            imgs:["https://i.postimg.cc/SRJ7rmxh/IMG-5426.jpg"],
            note:"Vios 2018 form mới 2019, Số sàn động cơ 1.5 , odo 7.7v ..."
        },
        {
            name:"Toyota Vios 2019",
            price:"265.000.000 VND",
            mainImg:"https://i.postimg.cc/VLY53zym/z7268117325966-3703ad59d14d4a1cb7f2ddd7da6682c6.jpg",
            imgs:["https://i.postimg.cc/VLY53zym/z7268117325966-3703ad59d14d4a1cb7f2ddd7da6682c6.jpg"],
            note:"Vios 2019 số sàn bản đầy đủ trang bị 7 túi khí..."
        },
        {
            name:"Huyndai i10 2016",
            price:"185.000.000 VND",
            mainImg:"https://i.postimg.cc/hPgyWpqF/i10.jpg",
            imgs:["https://i.postimg.cc/hPgyWpqF/i10.jpg"],
            note:"Huyndai i10 2016mt bản đủ máy 1.2..."
        },

    {
                name: "Xpander 2019",
                price: "395.000.000 VND",
                mainImg: "https://i.postimg.cc/C5JjVCjm/z7260228784873-191bf311ee6e8462269ca8df0faf9cc8.jpg",
                imgs: ["https://i.postimg.cc/C5JjVCjm/z7260228784873-191bf311ee6e8462269ca8df0faf9cc8.jpg"],
                note: "Xpander 2019 số tự động, động cơ 1,5. bản Eco, tư nhân chính chủ máy zin, nội ngoại thất sạch sẽ, mình thùng thẳng tắp. Trang bị  khóa cửa thông minh, phím bấm vô lăng, khởi động nút đề, chân ga tự động, màn hình androi, cam lùi cam hành trình, đặc biệt có cam 360, bao rút hồ sơ, ngân hàng hỗ trợ 50% ,bảo hành máy 6  tháng."
},
             {
                name: "Huyndai Elentra 2018",
                price: "385.000.000 VND",
                mainImg: "https://i.postimg.cc/xdTGt4H7/z7250481960902-846663297a4b90ce4b2ab19354b2cc52.jpg",
                imgs: ["https://i.postimg.cc/xdTGt4H7/z7250481960902-846663297a4b90ce4b2ab19354b2cc52.jpg"],
                note: "Huyndai elentra 2018 at 1.6 bản Gls,econ tiết kiệm,cân bằng điện tử,crucantron,4 thắng đĩa... Xe gia đình 1 chủ từ đầu Phân khúc c,full cửa nóc Chào 385tr bao hồ sơ Có bán thiếu ko lãi Bank hỗ trợ 50% Xem xe An Phú Thuận An Bình Dương"
            },
             {
                name: "BWM 320i 2010",
                price: "265.000.000 VND",
                mainImg: "https://i.postimg.cc/VvLc61b7/z7271328539372-a5f6aabb31fcf10fc8a6a91100e787c3.jpg",
                imgs: ["https://i.postimg.cc/VvLc61b7/z7271328539372-a5f6aabb31fcf10fc8a6a91100e787c3.jpg"],
                note: "BMW 320i đời 2010 số tự động, động cơ 2.0, 1 mẫu xe mang thương hiệu Đức, chạy đầm chắc, xe gia đình sử dụng máy số bao êm, ko lỗi Giá 265tr bao rút hồ sơ gốc, bao quay đầu xe, bảo hành máy 6 tháng"
            },
             {
                name: "Mitsubishi Jolie 2004",
                price: "79.000.000 VND",
                mainImg: "https://i.postimg.cc/GpGBPPg6/z7259715844685-71ab715dc8e5fb84d6060b823412935b.jpg",
                imgs: ["https://i.postimg.cc/GpGBPPg6/z7259715844685-71ab715dc8e5fb84d6060b823412935b.jpg"],
                note: "Mitsubishi Jolie 2004 bản Ss cao cấp nhất 8 chỗ ngồi, Xe đẹp, máy số chạy êm mượt, Nội thất ghế nỉ nguyên bản, Xe trang bị đèn cột mắt liếc, lốp treo dự phòng, 2 giàn lạnh, Giá bán 79 triệu"
            },
             {
                name: "Huyndai Accent 2020",
                price: "375.000.000 VND",
                mainImg: "https://i.postimg.cc/yxg2WTTn/vinh1.jpg",
                imgs: ["https://i.postimg.cc/yxg2WTTn/vinh1.jpg"],
                note: "Xe đi 6v7 , số tự động , Nội , Ngoại thất mới , màn hình Android ,..."
            },
             {
                name: "Honda Civic 2009 ",
                price: "185.000.000 VND",
                mainImg: "https://i.postimg.cc/nrq5xh2C/ff.jpg",
                imgs: ["https://i.postimg.cc/nrq5xh2C/ff.jpg"],
                note: "Xe chính chủ Honda civic 2009 mt máy 1.8, 185tr bao hồ sơ, Bán thiếu 40tr ko lãi, Bảo hành máy 3 tháng  chủ, đi ít."
            },
             {
                name: "Xpander",
                price: "415.000.000 VND",
                mainImg: "https://i.postimg.cc/pTwYPQc6/v.jpg",
                imgs: ["https://i.postimg.cc/pTwYPQc6/v.jpg"],
                note: "Xe chính chủ, đi ít."
            },
             {
                name: "Toyota Innova 2019",
                price: "385.000.000 VND",
                mainImg: "https://i.postimg.cc/6pCsKzHf/b.jpg",
                imgs: ["https://i.postimg.cc/6pCsKzHf/b.jpg"],
                note: "Innova 2019 số sàn bản E. động cơ 2.0.màu trắng, máy còn mới, được trang bị camera, màn hình đầy đủ, ghế da còn mới, nét căng. ODO hơn 12v, Giá 385  bao rút hồ sơ gốc, bán thiếu 50tr, ht banhk 50%, bảo hành động cơ 6 tháng"
            },
             {
                name: "Vinfast Fadil 2021 ",
                price: "295.000.000 VND",
                mainImg: "https://i.postimg.cc/XvF9QBYr/ff.jpg",
                imgs: ["https://i.postimg.cc/XvF9QBYr/ff.jpg"],
                note: "Cam kết không tai nạn , không ngập nước , máy móc keo chỉ zin đét , xe bán 295trieu , ngân hàng hỗ trợ 50% giá trị xe , bảo hành máy 6 tháng "
            },
            {
                name: "Kia K3 2015 AT",
                price: "325.000.000 VND",
                mainImg: "https://i.postimg.cc/dVqr9rsz/image.png",
                imgs: ["https://i.postimg.cc/dVqr9rsz/image.png"],
                note: "Kia K3 2015 AT máy 1.6,full cửa sổ nóc,Odo 11,5 van ,xe đẹp máy zin. Trang bị đầy đủ màn hình cam lùi cam hành trình ,khởi động đề nổ startop ...Giá 325 tr bao rút hồ sơ gốc . Bán thiếu 40 tr ko lãi  . Bảo hành máy 6 tháng"
            },
             {
                name: "Toyota Vios 2016 ",
                price: "295.000.000 VND",
                mainImg: "https://i.postimg.cc/3J0sYT12/image.png",
                imgs: ["https://i.postimg.cc/3J0sYT12/image.png"],
                note: "Vios 2016 số tự động bản G màu trắng Ngọc Trinh, động cơ 1,5, máy số zin, ko lỗi, nội ngoại thất đẹp sẽ vào màn hình cam de, cam lùi Giá 295 bao rút hồ sơ gốc, ngân hàng hỗ trợ 50%, bán thiếu 30 tr , bảo hành máy 6 tháng" }
        ];
        saveCars();

}

/* ============================
        DANH SÁCH XE
============================ */

function renderCars() {
    const carList = document.getElementById("carList");
    carList.innerHTML = "";

    cars.forEach((car, index) => {
        const card = document.createElement("div");
        card.className = "car-card";
        card.innerHTML = `
            <img src="${car.mainImg || car.imgs[0]}">
            <h3>${car.name}</h3>
            <p class="price">${car.price}</p>
            <button onclick="showDetail(${index})">Xem chi tiết</button>
        `;

        card.addEventListener("click", e => {
            if (e.target.tagName !== "BUTTON") showDetail(index);
        });

        carList.appendChild(card);
    });
}

/* ============================
        POPUP CHI TIẾT XE
============================ */

function showDetail(i) {
    currentCarIndex = i;
    currentSlide = 0;

    const car = cars[i];

    document.getElementById("detailName").innerText = car.name;
    document.getElementById("detailImg").src = car.imgs[currentSlide];
    document.getElementById("detailPrice").innerText = "Giá: " + car.price;
    document.getElementById("detailNote").innerText = car.note || "Không có ghi chú.";

    document.getElementById("carDetail").style.display = "block";
    document.body.style.overflow = "hidden";

    updateSlideButtons();

    document.getElementById("fontSizeInput").value =
        parseInt(window.getComputedStyle(document.getElementById("detailPrice")).fontSize);

    document.getElementById("fontColorInput").value =
        rgbToHex(window.getComputedStyle(document.getElementById("detailPrice")).color);
}

function closeDetail() {
    document.getElementById("carDetail").style.display = "none";
    document.body.style.overflow = "auto";
}

function clickOutsidePopup(e) {
    if (!document.querySelector(".modal-content").contains(e.target)) {
        closeDetail();
    }
}

/* ============================
        SLIDE ẢNH
============================ */

function prevSlide() {
    const car = cars[currentCarIndex];
    if (!car.imgs.length) return;

    currentSlide = (currentSlide - 1 + car.imgs.length) % car.imgs.length;
    document.getElementById("detailImg").src = car.imgs[currentSlide];

    updateSlideButtons();
}

function nextSlide() {
    const car = cars[currentCarIndex];
    if (!car.imgs.length) return;

    currentSlide = (currentSlide + 1) % car.imgs.length;
    document.getElementById("detailImg").src = car.imgs[currentSlide];

    updateSlideButtons();
}

function updateSlideButtons() {
    const car = cars[currentCarIndex];

    document.getElementById("prevBtn").style.display = car.imgs.length > 1 ? "block" : "none";
    document.getElementById("nextBtn").style.display = car.imgs.length > 1 ? "block" : "none";
}

/* ============================
        ADMIN PANEL
============================ */

function updatePriceStyle() {
    const price = document.getElementById("detailPrice");
    const size = document.getElementById("fontSizeInput").value;
    const color = document.getElementById("fontColorInput").value;

    price.style.fontSize = size + "px";
    price.style.color = color;
}

/* ============================
        THÊM ẢNH
============================ */

function addMainImage(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = e => {
        const car = cars[currentCarIndex];

        car.mainImg = e.target.result;

        if (!car.imgs) car.imgs = [];
        car.imgs.unshift(e.target.result);

        currentSlide = 0;

        document.getElementById("detailImg").src = car.imgs[0];

        saveCars();
        renderCars();
        updateSlideButtons();
    };

    reader.readAsDataURL(file);
}

function addExtraImages(input) {
    const files = input.files;
    const car = cars[currentCarIndex];

    if (!car.imgs) car.imgs = [];

    [...files].forEach(file => {
        const reader = new FileReader();

        reader.onload = e => {
            car.imgs.push(e.target.result);
            saveCars();
        };

        reader.readAsDataURL(file);
    });

    updateSlideButtons();
}

/* ============================
        XÓA ẢNH HIỆN TẠI
============================ */

function removeCurrentImage() {
    const car = cars[currentCarIndex];
    if (!car.imgs || !car.imgs.length) return;

    if (!confirm("Xóa ảnh hiện tại?")) return;

    const removed = car.imgs.splice(currentSlide, 1)[0];

    if (removed === car.mainImg) {
        car.mainImg = car.imgs[0] || "";
    }

    currentSlide = Math.max(0, currentSlide - 1);

    document.getElementById("detailImg").src =
        car.imgs[currentSlide] || "";

    saveCars();
    renderCars();
    updateSlideButtons();
}

/* ============================
        MÀU RGB → HEX
============================ */

function rgbToHex(rgb) {
    const r = rgb.match(/\d+/g);
    return "#" + ((1 << 24) + (+r[0] << 16) + (+r[1] << 8) + +r[2])
        .toString(16)
        .slice(1);
}

/* ============================
        ADMIN LOGIN
============================ */

function checkAdmin() {
    if (!sessionStorage.getItem("isAdmin")) {
        const pass = prompt("Nhập mật khẩu admin:");

        if (pass === adminPass) {
            sessionStorage.setItem("isAdmin", "true");
        }
    }

    if (sessionStorage.getItem("isAdmin")) {
        document.querySelectorAll(".admin-panel").forEach(el => {
            el.style.display = "block";
        });
    }
}
