window.addEventListener('DOMContentLoaded', function() {
    showLanguageSelection();
    
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

function showLanguageSelection() {
    Swal.fire({
        title: 'اختر اللغة / Choose Language',
        html: `
            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                <button onclick="selectLanguage('ar')" class="swal-lang-btn">
                    <i class="fas fa-globe"></i> العربية
                </button>
                <button onclick="selectLanguage('en')" class="swal-lang-btn">
                    <i class="fas fa-globe"></i> English Language
                </button>
                <button onclick="selectLanguage('fr')" class="swal-lang-btn">
                    <i class="fas fa-globe"></i> Langue Française
                </button>
                <button onclick="selectLanguage('ru')" class="swal-lang-btn">
                    <i class="fas fa-globe"></i> Русский
                </button>
            </div>
        `,
        background: '#000000',
        color: '#D4AF37',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: 'language-popup',
            title: 'language-title'
        }
    });
}

function selectLanguage(lang) {
    if (lang !== 'ar') {
        Swal.fire({
            icon: 'warning',
            title: 'Language Not Available',
            html: '<p style="font-size: 1.3rem; line-height: 1.8;">This language is not available in your country.<br><br>هذه اللغة غير متاحة في بلدك.</p>',
            background: '#000000',
            color: '#ffffff',
            confirmButtonText: 'حسناً / OK',
            confirmButtonColor: '#D4AF37',
            customClass: {
                popup: 'custom-swal',
                confirmButton: 'swal-confirm-btn'
            }
        });
    } else {
        Swal.close();
    }
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone1 = document.getElementById('phone1').value;
    const phone2 = document.getElementById('phone2').value;
    
    if (phone1 === phone2) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ في البيانات',
            html: '<p style="font-size: 1.2rem;">يرجى إدخال رقم موبايل مختلف للتأكيد<br><br>Please enter a different phone number for confirmation</p>',
            background: '#000000',
            color: '#ffffff',
            confirmButtonText: 'حسناً / OK',
            confirmButtonColor: '#D4AF37',
            customClass: {
                popup: 'custom-swal',
                confirmButton: 'swal-confirm-btn'
            }
        });
        return;
    }
    
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
    
    const whatsappNumber = '201033654548';
    
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    Swal.fire({
        icon: 'success',
        title: 'تم إرسال الطلب!',
        html: '<p style="font-size: 1.2rem;">جاري تحويلك إلى واتساب لإتمام الطلب...</p>',
        background: '#000000',
        color: '#ffffff',
        confirmButtonText: 'فتح واتساب',
        confirmButtonColor: '#D4AF37',
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'custom-swal',
            confirmButton: 'swal-confirm-btn'
        }
    }).then(() => {
        window.open(whatsappURL, '_blank');
    });
    
    this.reset();
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
