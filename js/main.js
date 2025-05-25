document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能增强版
    const bannerContainer = document.querySelector('.banner-container');
    const bannerItems = document.querySelectorAll('.banner-item');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    let startX = 0;
    let moveX = 0;
    let isMoving = false;

    // 初始化轮播图宽度和位置
    function initBanner() {
        if (bannerItems.length === 0) return;
        
        showSlide(currentSlide);
    }

    function showSlide(index) {
        // 隐藏所有幻灯片
        bannerItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 显示当前幻灯片
        bannerItems[index].classList.add('active');
        dots[index].classList.add('active');
        
        // 添加过渡动画
        bannerItems.forEach(item => {
            item.style.transition = 'opacity 0.5s ease-in-out';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % bannerItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + bannerItems.length) % bannerItems.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        // 清除之前的定时器
        clearInterval(slideInterval);
        // 设置新的定时器
        slideInterval = setInterval(nextSlide, 4000);
    }

    // 点击导航点切换幻灯片
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                currentSlide = index;
                showSlide(currentSlide);
                startSlideShow();
            });
        });
    }

    // 添加触摸滑动支持
    if (bannerContainer) {
        // 触摸开始
        bannerContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isMoving = true;
            // 暂停自动播放
            clearInterval(slideInterval);
        }, { passive: true });

        // 触摸移动
        bannerContainer.addEventListener('touchmove', (e) => {
            if (!isMoving) return;
            moveX = e.touches[0].clientX;
        }, { passive: true });

        // 触摸结束
        bannerContainer.addEventListener('touchend', () => {
            if (!isMoving) return;
            isMoving = false;
            
            // 判断滑动方向和距离
            const diffX = moveX - startX;
            const threshold = 50; // 滑动阈值
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // 向右滑动，显示上一张
                    prevSlide();
                } else {
                    // 向左滑动，显示下一张
                    nextSlide();
                }
            }
            
            // 重新开始自动播放
            startSlideShow();
        });
    }

    // 添加左右导航按钮的功能
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            startSlideShow();
        });
        
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            startSlideShow();
        });
    }

    // 初始化轮播并启动
    initBanner();
    startSlideShow();

    // 底部导航功能
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 移除所有active类
            navItems.forEach(nav => nav.classList.remove('active'));
            // 添加active类到当前点击元素
            this.classList.add('active');
            
            // 为路线标签添加页面跳转
            if (index === 1) { // 路线标签是第二个，索引为1
                window.location.href = 'routes.html';
            }
        });
    });

    // 社交互动功能
    const followBtns = document.querySelectorAll('.follow-btn');
    
    followBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('followed');
            if (this.classList.contains('followed')) {
                this.textContent = '已关注';
            } else {
                this.textContent = '关注';
            }
        });
    });

    // 点赞功能
    const heartIcons = document.querySelectorAll('.fa-heart');
    
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const statItem = this.parentElement;
            const countText = statItem.textContent.trim().split(' ')[1];
            let count = parseInt(countText);
            
            if (this.classList.contains('far')) {
                // 未点赞状态，点赞
                this.classList.remove('far');
                this.classList.add('fas');
                this.style.color = '#ff5252';
                count++;
            } else {
                // 已点赞状态，取消点赞
                this.classList.remove('fas');
                this.classList.add('far');
                this.style.color = '';
                count--;
            }
            
            statItem.innerHTML = `<i class="${this.className}"></i> ${count}`;
        });
    });

    // 添加页面滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.app-header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        }
    });

    // 模拟点击"开始骑行"按钮效果
    const startRideBtn = document.querySelectorAll('.quick-item')[1];
    if (startRideBtn) {
        startRideBtn.addEventListener('click', function() {
            const icon = this.querySelector('.quick-icon');
            icon.style.backgroundColor = '#4a80f0';
            icon.style.color = '#fff';
            
            setTimeout(() => {
                alert('准备开始骑行记录！');
                icon.style.backgroundColor = '';
                icon.style.color = '';
            }, 300);
        });
    }

    // 模拟加载更多内容
    const moreLinks = document.querySelectorAll('.section-more');
    
    moreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('.section-container');
            const title = section.querySelector('.section-title').textContent;
            alert(`即将加载更多${title}内容`);
        });
    });

    // 模拟路线卡片点击效果
    const routeCards = document.querySelectorAll('.route-card');
    
    routeCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.route-title').textContent;
            alert(`正在加载"${title}"的详细信息...`);
        });
    });

    // 模拟活动报名
    const joinBtns = document.querySelectorAll('.join-btn');
    
    joinBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            
            const confirmed = confirm(`确定要报名参加"${eventTitle}"活动吗？`);
            if (confirmed) {
                this.textContent = '已报名';
                this.style.backgroundColor = '#999';
                this.disabled = true;
            }
        });
    });
});
