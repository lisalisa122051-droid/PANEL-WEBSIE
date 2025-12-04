// BUY BUTTON WHATSAPP SELECTOR
document.querySelectorAll('.buyBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.parentElement.getAttribute("data-plan");
        alert(`Pilih WhatsApp Support untuk membeli: ${plan}`);
    });
});

// WA SUPPORT MESSAGE SENDER
document.querySelectorAll('.waBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        const number = btn.getAttribute("data-wa");
        const name = btn.getAttribute("data-name");
        const message = encodeURIComponent(`Halo ${name}, saya ingin membeli panel!`);
        window.location.href = `https://wa.me/${number}?text=${message}`;
    });
});
