// ==========================================
// 1. DATA ARTIKEL BLOG
// ==========================================
const articles = [
  {
    id: 1,
    title: "Mengenal Karakter Kopi Muria: Cita Rasa Lokal yang Dekat dengan Jepara",
    category: "Cerita Kopi",
    date: "18 November 2026",
    readTime: "4 menit baca",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    excerpt: "Tumbuh di lereng Gunung Muria, biji kopi lokal ini menyimpan karakter rasa manis alami dan body yang tebal.",
    content: `
      <p>Berada tidak jauh dari lereng Gunung Muria membuat Jepara memiliki kedekatan khusus dengan tradisi kopi lokal. Kopi Muria dikenal luas karena karakter rasanya yang seimbang—memiliki tingkat keasaman rendah dengan sentuhan rasa cokelat dan rempah ringan.</p>
      <p>Di Atmosfera Coffee and Eatery, kami menyeduh biji pilihan ini baik melalui metode manual brew seperti V60 maupun sebagai campuran espresso untuk menu kopi susu signature kami.</p>
      <p>Bagi penikmat kopi yang menginginkan rasa nyaman tanpa terlalu asam, seduhan kopi lokal Muria bisa menjadi pilihan utama saat berkunjung ke Jepara.</p>
    `
  },
  {
    id: 2,
    title: "Rekomendasi Tempat Kerja Nyaman (WFC) dengan Wi-Fi Kencang di Jepara",
    category: "Panduan Jepara",
    date: "14 November 2026",
    readTime: "3 menit baca",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
    excerpt: "Mencari suasana tenang untuk menyelesaikan tugas kuliah atau pekerjaan kantor? Simak sudut terbaik untuk WFC di Atmosfera.",
    content: `
      <p>Bekerja dari kafe atau Work From Cafe (WFC) kini menjadi rutinitas banyak mahasiswa dan pekerja kreatif di Jepara. Kunci utama kenyamanan WFC tentu terletak pada pencahayaan, koneksi internet stabil, dan ketersediaan colokan listrik.</p>
      <p>Area indoor Atmosfera dirancang khusus dengan pencahayaan hangat yang tidak membuat mata cepat lelah, lengkap dengan meja ergonomis serta akses Wi-Fi berkecepatan tinggi.</p>
      <p>Waktu terbaik untuk datang bekerja dengan tenang adalah pukul 09.00 hingga 15.00 WIB, ditemani segelas Iced Americano atau Latte hangat.</p>
    `
  },
  {
    id: 3,
    title: "Di Balik Dapur Atmosfera: Meracik Pairing Kopi dan Camilan Sore",
    category: "Di Balik Dapur",
    date: "10 November 2026",
    readTime: "5 menit baca",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    excerpt: "Kombinasi rasa gurih dan manis yang pas membuat waktu bersantai sore hari di Jepara terasa jauh lebih berkesan.",
    content: `
      <p>Secangkir kopi yang baik akan terasa semakin lengkap ketika dipadukan dengan sajian makanan yang tepat. Tim dapur Atmosfera merancang menu camilan sore dengan memadukan cita rasa lokal dan modern.</p>
      <p>Salah satu kombinasi favorit pelanggan kami adalah Es Kopi Susu Gula Aren yang dipadukan dengan Pisang Goreng Krispi tabur gula palem. Rasa legit gula aren bertemu dengan tekstur renyah yang hangat.</p>
      <p>Untuk makan malam, tersedia juga beragam pilihan Rice Bowl dan pasta yang dimasak segar setiap kali pesanan masuk.</p>
    `
  }
];

// ==========================================
// 2. LOGIKA BLOG, PENCARIAN & MODAL BACA
// ==========================================
const blogGrid = document.getElementById("blogGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const modal = document.getElementById("articleModal");
const closeModal = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalCategory = document.getElementById("modalCategory");
const modalDate = document.getElementById("modalDate");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

let currentCategory = "all";

function renderArticles(data) {
  blogGrid.innerHTML = "";

  if (data.length === 0) {
    blogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #66615C;">Artikel tidak ditemukan. Coba kata kunci lain.</p>`;
    return;
  }

  data.forEach(article => {
    const card = document.createElement("article");
    card.className = "blog-card";
    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}" class="card-img">
      <div class="card-body">
        <span class="category-tag">${article.category}</span>
        <h3>${article.title}</h3>
        <p class="card-excerpt">${article.excerpt}</p>
        <div class="card-footer">
          <span>${article.readTime}</span>
          <button class="read-btn" onclick="openArticle(${article.id})">Baca Selengkapnya →</button>
        </div>
      </div>
    `;
    blogGrid.appendChild(card);
  });
}

function openArticle(id) {
  const article = articles.find(item => item.id === id);
  if (!article) return;

  modalImg.src = article.image;
  modalCategory.textContent = article.category;
  modalDate.textContent = `${article.date} • ${article.readTime}`;
  modalTitle.textContent = article.title;
  modalText.innerHTML = article.content;

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});

function filterAndSearch() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = articles.filter(article => {
    const matchCategory = currentCategory === "all" || article.category === currentCategory;
    const matchKeyword = article.title.toLowerCase().includes(keyword) ||
                         article.excerpt.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });
  renderArticles(filtered);
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    filterAndSearch();
  });
});

searchInput.addEventListener("input", filterAndSearch);

// Render awal daftar artikel
renderArticles(articles);


// ==========================================
// 3. DATA & LOGIKA DAFTAR MENU (MINUMAN & MAKANAN)
// ==========================================
const menuData = {
  coffee: {
    image: "images/menu-coffee.jpg",
    note: "100% ARABICA BEANS",
    items: [
      { no: 1, name: "Cafe Latte (Hot/Ice)", price: "28K", desc: "Refreshing Cafe Latte." },
      { no: 2, name: "Dirty Latte", price: "25K", desc: "A bold double shot of espresso poured over chilled silky milk. Served without ice to preserve the rich, undiluted flavor." },
      { no: 3, name: "Cappuccino (Only Hot)", price: "28K", desc: "Fresh brewed espresso combined with milk." },
      { no: 4, name: "Split Shot", price: "32K", desc: "1 milk based & 1 espresso based." },
      { no: 5, name: "Espresso", price: "15K", desc: "Fresh brewed espresso." },
      { no: 6, name: "Cafe Mocha", price: "28K", desc: "Classic blend of rich espresso, chocolate, and steamed milk." },
      { no: 7, name: "Affogato", price: "24K", desc: "Vanilla ice cream drowned with a shot of hot espresso." }
    ]
  },
  americano: {
    image: "images/menu-americano.jpg",
    note: "",
    items: [
      { no: 1, name: "Lychee Tamarind", price: "27K", desc: "Floral lychee balanced by tangy tamarind." },
      { no: 2, name: "Apple Peach", price: "27K", desc: "Crisp apple with juicy peach over espresso." },
      { no: 3, name: "Triple Peach", price: "27K", desc: "Juicy and refreshing peach sensation." },
      { no: 4, name: "Americano Ramoe", price: "25K", desc: "Balanced, smooth, and signature style." },
      { no: 5, name: "Americano Cloud", price: "25K", desc: "Bold espresso with light, creamy foam." },
      { no: 6, name: "Floral: Harumanis & Elder", price: "25K", desc: "Honeyed mango with soft floral elderflower." },
      { no: 7, name: "Signature Americano", price: "22K", desc: "Refreshing and bold signatured americano." }
    ]
  },
  signatureDrink: {
    image: "images/menu-signature-drink.jpg",
    note: "",
    items: [
      { no: 1, name: "At The Peach", price: "28K", desc: "A fruity peach tea with espresso touch." },
      { no: 2, name: "Earl Grey Milk Tea", price: "22K", desc: "The O.G milk tea." },
      { no: 3, name: "Mango Frosty Brew", price: "24K", desc: "Mango flavored cold brew." },
      { no: 4, name: "Purple Sonata", price: "24K", desc: "Floral tea and fruity smooth mixing, candylike taste." },
      { no: 5, name: "Lotus (Earl Grey Salted Lotus)", price: "26K", desc: "Salty and crunchy earl grey milktea." }
    ]
  },
  tea: {
    image: "images/menu-tea.jpg",
    note: "",
    items: [
      { no: 1, name: "Lemon Tea", price: "18K", desc: "Freshly brewed iced tea with zesty lemon slice." },
      { no: 2, name: "Strawberry Tea", price: "18K", desc: "Refreshing sweet strawberry infused tea." },
      { no: 3, name: "Black Tea", price: "10K", desc: "Classic freshly brewed black tea." },
      { no: 4, name: "Lychee Tea", price: "18K", desc: "Sweet aromatic tea served with whole lychee fruit." },
      { no: 5, name: "Peach Tea", price: "18K", desc: "Fruity and fragrant peach infused iced tea." },
      { no: 6, name: "Guava Tea", price: "18K", desc: "Tropical sweet guava blended with refreshing tea." }
    ]
  },
  breakfast: {
    image: "images/menu-breakfast.jpg",
    note: "",
    items: [
      { no: 1, name: "Atmos Breakfast", price: "40K", desc: "A hearty platter of sunny-side-up egg, grilled sausage, mushroom, and grilled tomatoes. Served with crispy baguette, fresh salad and red beans." },
      { no: 2, name: "Atmos Salad", price: "25K", desc: "Fresh salad with a tangy, slightly spicy, and refreshing Thai dressing." },
      { no: 3, name: "Caesar Salad", price: "23K", desc: "Fresh salad with creamy dressing and crunchy croutons." },
      { no: 4, name: "Smoothie", price: "40K", desc: "Fresh blend of dragon fruit and banana, topped with crunchy granola and fresh strawberries." }
    ]
  },
  rice: {
    image: "images/menu-rice.jpg",
    note: "Pilihan Saus (Sauce Options): Matah • Cabe Garam • Saus Mentega • Salted Egg",
    items: [
      { no: 1, name: "Nasi Udang", price: "30K", desc: "Crispy golden shrimp and fluffy scrambled eggs, served with your choice of signature sauces." },
      { no: 2, name: "Nasi Ayam", price: "27K", desc: "Crispy chicken and fluffy scrambled eggs, served with your choice of signature sauce." },
      { no: 3, name: "Nasi Cumi", price: "30K", desc: "Crispy fried squid and fluffy scrambled eggs, served with your choice of signature sauce." },
      { no: 4, name: "Nasi Dori", price: "27K", desc: "Crispy dory fish and fluffy scrambled eggs, served with your choice of signature sauce." }
    ]
  },
  pasta: {
    image: "images/menu-pasta.jpg",
    note: "",
    items: [
      { no: 1, name: "Spaghetti Aglio Olio", price: "28K", desc: "Classic spaghetti tossed in olive oil and garlic, topped with savory smoked beef and chili flakes." },
      { no: 2, name: "Spaghetti Carbonara", price: "32K", desc: "Creamy spaghetti served with a rich sauce, savory smoked beef, and a sprinkle of parmesan cheese." },
      { no: 3, name: "Mac N' Cheese", price: "30K", desc: "Classic comfort dish featuring tender macaroni smothered in a creamy cheese sauce." },
      { no: 4, name: "Chicken Cordon Bleu", price: "45K", desc: "Crispy breaded chicken breast stuffed with savory smoked beef and melted cheese, served with fries." },
      { no: 5, name: "Spaghetti Bolognese", price: "30K", desc: "Classic Italian-style pasta topped with a rich, savory bolognese sauce." },
      { no: 6, name: "Spaghetti Parmigiana", price: "35K", desc: "Spaghetti topped with juicy grilled chicken, melted mozzarella, and our signature savory tomato sauce." }
    ]
  },
  snack: {
    image: "images/menu-snack.jpg",
    note: "",
    items: [
      { no: 1, name: "Mix Platter", price: "28K", desc: "French fries, sausage, nuggets." },
      { no: 2, name: "Chicken Karage", price: "30K", desc: "Thigh chicken juicy and crispy." },
      { no: 3, name: "Chicken Pop", price: "28K", desc: "Crispy chicken bites." },
      { no: 4, name: "French Fries", price: "17K", desc: "Crispy, savory, and salty fries." },
      { no: 5, name: "Garlic Bread", price: "15K", desc: "Crispy baguette toasted with savory and aromatic garlic butter." },
      { no: 6, name: "Loaded Fries", price: "28K", desc: "Crispy fries topped with savory bolognese sauce and melted mozzarella." },
      { no: 7, name: "Bruschetta", price: "18K", desc: "Toasted baguette topped with fresh tomato, smoked beef, and melted mozzarella." }
    ]
  }
};

const menuDisplay = document.getElementById("menuDisplay");
const menuTabBtns = document.querySelectorAll(".menu-tab-btn");

function renderMenu(categoryKey) {
  const data = menuData[categoryKey];
  if (!data) return;

  const itemsHTML = data.items.map(item => `
    <div class="menu-item-card">
      <div class="menu-item-header">
        <h4>${item.no}. ${item.name}</h4>
        <span class="menu-price">${item.price}</span>
      </div>
      <p class="menu-item-desc">${item.desc}</p>
    </div>
  `).join("");

  const noteHTML = data.note ? `<div class="menu-note"><strong>Catatan:</strong> ${data.note}</div>` : "";

  menuDisplay.innerHTML = `
    <div class="menu-photo-box">
      <img src="${data.image}" alt="Katalog Menu ${categoryKey}">
    </div>
    <div class="menu-items-list">
      ${noteHTML}
      ${itemsHTML}
    </div>
  `;
}

menuTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    menuTabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.getAttribute("data-menu"));
  });
});

// Render awal kategori Classic Coffee
renderMenu("coffee");