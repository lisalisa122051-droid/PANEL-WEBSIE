// Data Produk
const products = [
    { id: 1, name: "Paket Panel 2GB RAM", price: 1000, displayPrice: "Rp 1.000", details: "Cocok untuk server ringan atau testing." },
    { id: 2, name: "Paket Panel 5GB RAM", price: 3000, displayPrice: "Rp 3.000", details: "Pilihan populer untuk server game kecil." },
    { id: 3, name: "Paket Panel 10GB RAM", price: 7000, displayPrice: "Rp 7.000", details: "Performa tinggi untuk komunitas atau proyek besar." },
    { id: 4, name: "Paket Panel Unlimited", price: 10000, displayPrice: "Rp 10.000", details: "Spesifikasi tidak terbatas untuk performa maksimal." }
];

// Data Fitur Unggulan
const features = [
    { icon: 'shield-check', title: 'Keamanan Berlapis', description: 'Melindungi data Anda dengan enkripsi dan firewall canggih.' },
    { icon: 'lock', title: 'Anti Pencurian', description: 'Sistem deteksi anomali untuk mencegah akses tidak sah.' },
    { icon: 'database', title: 'Database 837+', description: 'Kapasitas dan kecepatan database yang superior.' },
    { icon: 'zap', title: 'Uptime 99.99%', description: 'Jaminan server selalu aktif dan berjalan lancar.' },
    { icon: 'globe', title: 'Jaringan Global', description: 'Koneksi cepat ke seluruh dunia berkat jaringan CDN kami.' },
    { icon: 'messages-square', title: 'Layanan Pelanggan', description: 'Dukungan teknis 24/7 siap membantu Anda.' }
];

let currentPurchaseProduct = null;
let currentAdmin = { name: '', number: '' };
let purchaseContext = null;

// ------------------
// UTILITY FUNCTIONS
// ------------------

/**
 * Mengganti tampilan (View)
 * @param {string} viewId 
 */
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('hidden');
    });
    document.getElementById(`${viewId}-view`).classList.remove('hidden');

    // Gulir ke atas halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ------------------
// RENDER & INITIALIZATION
// ------------------

document.addEventListener('DOMContentLoaded', () => {
    // Memicu Transisi Fade-In (Transisi Semen)
    document.body.classList.remove('initial-load');
    document.body.classList.add('is-loaded'); 

    // Menginisialisasi ikon Lucide
    lucide.createIcons();
    
    // Merender konten
    renderProducts();
    renderFeatures();
    
    // Tampilkan Home View saat halaman dimuat
    showView('home'); 
});

/**
 * Merender daftar produk di Shop View (1 kolom vertikal)
 */
function renderProducts() {
    const productListElement = document.getElementById('product-list');
    productListElement.innerHTML = products.map(product => `
        <div id="product-${product.id}" class="product-card p-4 bg-gray-800/50 rounded-xl border-2 border-gray-700 shadow-lg" 
             onclick="handleProductClick(${product.id}, this)">
            <h3 class="text-xl font-bold mb-2 text-cyan-400">${product.name}</h3>
            <p class="text-3xl font-extrabold text-neon mb-3">
                ${product.displayPrice}
            </p>
            <p class="text-gray-400 mb-4">${product.details}</p>
            <button onclick="event.stopPropagation(); showBuyNowModal(${product.id})" 
                    class="glow-button w-full px-4 py-2 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-600 transition duration-300 text-sm">
                <span class="flex items-center justify-center space-x-2">
                    <div data-lucide="zap" class="w-4 h-4"></div>
                    <span>Beli Sekarang</span>
                </span>
            </button>
        </div>
    `).join('');
    // Ulangi pembuatan ikon setelah merender konten baru
    lucide.createIcons();
}

/**
 * Merender daftar fitur unggulan di Home View (1 kolom vertikal)
 */
function renderFeatures() {
    const featureListElement = document.getElementById('features-list');
    featureListElement.innerHTML = features.map(feature => `
        <div class="feature-card p-4 bg-gray-800/50 border border-cyan-400/30 rounded-xl shadow-inner shadow-cyan-500/10 text-left cursor-pointer flex items-start space-x-4">
            <div data-lucide="${feature.icon}" class="w-8 h-8 text-neon flex-shrink-0"></div>
            <div>
                <h4 class="text-lg font-bold mb-1 text-white">${feature.title}</h4>
                <p class="text-gray-400 text-sm">${feature.description}</p>
            </div>
        </div>
    `).join('');
    // Ulangi pembuatan ikon setelah merender konten baru
    lucide.createIcons();
}

// ------------------
// INTERACTION HANDLERS
// ------------------

/**
 * Menangani klik pada kartu produk untuk efek shine
 * @param {number} productId 
 * @param {HTMLElement} element 
 */
function handleProductClick(productId, element) {
    element.classList.add('shining');
    setTimeout(() => {
        element.classList.remove('shining');
    }, 500); 
}

/**
 * Menampilkan loading 4 detik sebelum pindah ke Shop View
 */
function showShopWithDelay() {
    showView('loading');
    document.getElementById('loading-message').textContent = 'Memuat etalase produk... (4 detik)';
    
    let timer = 4;
    const loadingInterval = setInterval(() => {
        timer--;
        document.getElementById('loading-message').textContent = `Memuat etalase produk... (${timer} detik)`;
        if (timer <= 0) {
            clearInterval(loadingInterval);
            showView('shop');
        }
    }, 1000);
}

// ------------------
// WHATSAPP CONFIRMATION LOGIC (MODALS)
// ------------------

/**
 * Menampilkan Modal Konfirmasi Admin (dari Contact Support)
 * @param {string} name 
 * @param {string} number 
 */
function showAdminConfirmation(name, number) {
    currentAdmin = { name, number };
    purchaseContext = null;
    document.getElementById('admin-confirm-title').textContent = `Hubungi Admin ${name}`;
    document.getElementById('admin-confirm-yes').onclick = initiateContactLoading;
    document.getElementById('admin-confirm-modal').classList.remove('hidden');
    document.getElementById('admin-confirm-modal').classList.add('flex');
}

/**
 * Menutup Modal Konfirmasi Admin
 */
function closeAdminConfirmation() {
    document.getElementById('admin-confirm-modal').classList.add('hidden');
    document.getElementById('admin-confirm-modal').classList.remove('flex');
}

/**
 * Menutup Modal Beli Sekarang
 */
function closeBuyNowModal() {
    document.getElementById('buy-now-modal').classList.add('hidden');
    document.getElementById('buy-now-modal').classList.remove('flex');
    currentPurchaseProduct = null;
}

/**
 * Memulai proses loading 10 detik sebelum diarahkan ke WhatsApp
 */
function initiateContactLoading() {
    closeAdminConfirmation();
    closeBuyNowModal();
    
    document.getElementById('admin-loading-modal').classList.remove('hidden');
    document.getElementById('admin-loading-modal').classList.add('flex');
    
    let timer = 10;
    const adminLoadingEl = document.getElementById('admin-loading-timer');
    
    const loadingInterval = setInterval(() => {
        timer--;
        adminLoadingEl.textContent = `Menghubungkan ke Admin ${currentAdmin.name} dalam ${timer} detik.`;

        if (timer <= 0) {
            clearInterval(loadingInterval);
            finalizeWhatsappContact();
            document.getElementById('admin-loading-modal').classList.add('hidden');
            document.getElementById('admin-loading-modal').classList.remove('flex');
        }
    }, 1000);
}

/**
 * Mengarahkan pengguna ke WhatsApp setelah timer
 */
function finalizeWhatsappContact() {
    let message = "Halo Admin, saya tertarik dengan Layanan Panel Pterodactyl Foxzi.";
    if (purchaseContext) {
        // Jika dari tombol Beli Sekarang
        message = `Halo Admin, saya ingin melakukan pembelian "${purchaseContext.name}" seharga ${purchaseContext.displayPrice}. Mohon dibantu proses pembayarannya.`;
    }

    const url = `https://wa.me/${currentAdmin.number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    showNotification(`Selamat berbelanja! Anda dialihkan ke WhatsApp Admin ${currentAdmin.name}.`, 'bg-green-600', 5000);
    
    // Reset context setelah selesai
    currentAdmin = { name: '', number: '' };
    purchaseContext = null;
}

// ------------------
// BUY NOW LOGIC
// ------------------

/**
 * Menampilkan Modal Pilih Admin setelah Beli Sekarang
 * @param {number} productId 
 */
function showBuyNowModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentPurchaseProduct = product;

    document.getElementById('purchase-item-name').textContent = product.name;
    document.getElementById('purchase-item-price').textContent = product.displayPrice;
    
    document.getElementById('buy-now-modal').classList.remove('hidden');
    document.getElementById('buy-now-modal').classList.add('flex');
}

/**
 * Mengatur konteks pembelian dan memulai proses loading kontak
 * @param {string} name 
 * @param {string} number 
 */
function confirmAdmin(name, number) {
    currentAdmin = { name, number };
    purchaseContext = currentPurchaseProduct; // Set konteks produk yang dibeli
    initiateContactLoading();
}

// ------------------
// CUSTOM NOTIFICATION
// ------------------

/**
 * Menampilkan notifikasi kustom (pengganti alert)
 * @param {string} message 
 * @param {string} bgColor Tailwind class untuk warna background
 * @param {number} duration Durasi tampil dalam ms
 */
function showNotification(message, bgColor = 'bg-cyan-600', duration = 2000) {
    let notification = document.getElementById('custom-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'custom-notification';
        notification.className = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded-xl shadow-2xl text-white font-bold transition-all duration-500 ease-out z-50 opacity-0';
        document.body.appendChild(notification);
    }

    notification.className = `fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 rounded-xl shadow-2xl text-white font-bold transition-all duration-500 ease-out z-50 ${bgColor} opacity-100`;
    notification.textContent = message;

    setTimeout(() => {
        notification.classList.remove('opacity-100');
        notification.classList.add('opacity-0');
    }, duration);
}

