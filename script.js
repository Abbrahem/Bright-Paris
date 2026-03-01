window.addEventListener('DOMContentLoaded', function() {
    const languageSelected = localStorage.getItem('languageSelected');
    
    if (!languageSelected) {
        const languageModal = new bootstrap.Modal(document.getElementById('languageModal'));
        languageModal.show();
    }
    
    initScrollAnimations();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

function selectLanguage(lang) {
    if (lang !== 'ar') {
        alert('This language is not available in your country.\nهذه اللغة غير متاحة في بلدك.');
    }
    
    localStorage.setItem('languageSelected', 'true');
    
    const languageModal = bootstrap.Modal.getInstance(document.getElementById('languageModal'));
    languageModal.hide();
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone1 = document.getElementById('phone1').value;
    const phone2 = document.getElementById('phone2').value;
    
    const message = `
🌟 *طلب جديد من موقع Bright Paris* 🌟

📦 *المنتج:* أمبولات برايت باريس لعلاج تساقط الشعر
💰 *السعر:* 1300 جنيه مصري

👤 *بيانات العميل:*
━━━━━━━━━━━━━━━━
📝 *الاسم:* ${name}
📍 *العنوان:* ${address}
📱 *رقم الموبايل 1:* ${phone1}
📱 *رقم الموبايل 2:* ${phone2}

✅ يرجى التواصل مع العميل لتأكيد الطلب
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappNumber = '201234567890';
    
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    this.reset();
    
    alert('جاري تحويلك إلى واتساب لإتمام الطلب...');
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});
