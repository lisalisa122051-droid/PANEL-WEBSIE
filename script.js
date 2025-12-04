const products = [
    { id: 1, name: "Paket Panel 2GB RAM", price: 1000, displayPrice: "Rp 1.000" },
    { id: 2, name: "Paket Panel 5GB RAM", price: 3000, displayPrice: "Rp 3.000" },
    { id: 3, name: "Paket Panel 10GB RAM", price: 7000, displayPrice: "Rp 7.000" },
    { id: 4, name: "Paket Panel Unlimited", price: 10000, displayPrice: "Rp 10.000" }
];

const features = [
    { icon: 'shield-check', title: 'Keamanan Berlapis' },
    { icon: 'lock', title: 'Anti Pencurian' },
    { icon: 'database', title: 'Database 837+' },
    { icon: 'zap', title: 'Uptime 99.99%' },
    { icon: 'globe', title: 'Jaringan Global' },
    { icon: 'messages-square', title: 'Layanan Pelanggan' }
];

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('initial-load');
    document.body.classList.add('is-loaded');
    lucide.createIcons();
    renderProducts();
    renderFeatures();
});

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(`${viewId}-view`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showShopWithDelay() {
    showView('loading');
    document.getElementById('loading-message').textContent = "Memuat etalase produk... (4 detik)";
    let timer = 4;
    let x = setInterval(() => {
        timer--;
        document.getElementById('loading-message').textContent = `Memuat etalase produk... (${timer} detik)`;
        if (timer <= 0) { clearInterval(x); showView('shop'); }
    }, 1000);
}

function renderProducts() {
    const el = document.getElementById('product-list');
    el.innerHTML = products.map(p => `
        <div onclick="highlight(this)" class="product-card p-4 bg-gray-800/50 rounded-xl border-2 border-gray-700">
            <h3 class="text-xl font-bold text-cyan-400">${p.name}</h3>
            <p class="text-3xl font-extrabold text-neon">${p.displayPrice}</p>
            <button onclick="event.stopPropagation(); buy('${p.name}','${p.displayPrice}')" class="glow-button w-full px-4 py-2 bg-cyan-700 text-white rounded-lg">Beli Sekarang</button>
        </div>
    `).join('');
}

function renderFeatures() {
    document.getElementById('features-list').innerHTML = features.map(f => `
        <div class="feature-card p-4 bg-gray-800/50 border border-cyan-400/30 rounded-xl flex items-start space-x-4">
            <div data-lucide="${f.icon}" class="w-8 h-8 text-neon"></div>
            <h4 class="text-lg font-bold text-white">${f.title}</h4>
        </div>
    `).join('');
    lucide.createIcons();
}

function highlight(el) {
    el.classList.add('shining');
    setTimeout(() => el.classList.remove('shining'), 500);
}

function buy(name, price) {
    const admin = prompt("Pilih admin:\n1. Adam\n2. WoolCynder");
    if (admin === "1") sendWa("6287710238940", name, price);
    if (admin === "2") sendWa("6283130830451", name, price);
}

function showAdminConfirmation(nm, no) { sendWa(no, "Layanan Panel", ""); }
function sendWa(num, service, price) {
    const url = `https://wa.me/${num}?text=${encodeURIComponent(`Halo, saya ingin membeli ${service} ${price}`)}`;
    window.open(url, "_blank");
}
