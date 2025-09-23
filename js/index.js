// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) { // 检查navbar是否存在
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2', 'shadow');
        }
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 数字统计动画
const animateStats = () => {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return; // 如果不存在统计区域则退出
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = document.querySelectorAll('.stat-item div');
                statElements.forEach(el => {
                    const value = el.innerText;
                    el.innerText = '0';
                    
                    let startTimestamp = null;
                    const duration = 2000; // 动画持续时间（毫秒）
                    
                    const updateCount = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        
                        // 处理包含逗号或百分比的数值
                        if (value.includes(',')) {
                            const num = parseInt(value.replace(',', ''));
                            el.innerText = Math.floor(progress * num).toLocaleString();
                        } else if (value.includes('%')) {
                            const num = parseFloat(value);
                            el.innerText = (progress * num).toFixed(1) + '%';
                        } else {
                            el.innerText = Math.floor(progress * parseInt(value));
                        }
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(updateCount);
                        } else {
                            el.innerText = value; // 确保最终显示正确值
                        }
                    };
                    
                    window.requestAnimationFrame(updateCount);
                });
                statsObserver.unobserve(statsSection);
            }
        });
    }, { threshold: 0.1 });
    
    statsObserver.observe(statsSection);
};

// 页面加载完成后启动统计动画
window.addEventListener('load', animateStats);

// 为播放按钮添加点击效果
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
        // 这里可以添加视频播放逻辑
        alert('视频播放功能即将实现');
    });
});