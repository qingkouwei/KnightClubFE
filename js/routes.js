document.addEventListener('DOMContentLoaded', function() {
    // 筛选标签点击效果
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 移除所有active类
            filterTags.forEach(item => item.classList.remove('active'));
            // 添加active类到当前点击元素
            this.classList.add('active');
            
            // 模拟筛选功能，未来可以实现实际筛选
            const filterText = this.textContent.trim();
            console.log(`筛选条件: ${filterText}`);
        });
    });

    // 搜索框功能
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 2px rgba(74, 128, 240, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log(`搜索关键词: ${this.value}`);
                // 隐藏键盘
                this.blur();
            }
        });
    }

    // 收藏按钮功能
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();  // 阻止事件冒泡到路线卡片
            this.classList.toggle('active');
            
            const heartIcon = this.querySelector('i');
            if (this.classList.contains('active')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
            }
            
            const routeTitle = this.closest('.route-card').querySelector('.route-title').textContent;
            if (this.classList.contains('active')) {
                console.log(`已收藏: ${routeTitle}`);
            } else {
                console.log(`取消收藏: ${routeTitle}`);
            }
        });
    });

    // 路线卡片点击效果
    const routeCards = document.querySelectorAll('.route-card');
    
    routeCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.route-title').textContent;
            console.log(`正在打开路线: ${title}`);
            
            // 模拟页面跳转，未来可以实现实际跳转
            alert(`即将打开路线详情: ${title}`);
        });
    });

    // 地图入口点击效果
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            console.log('打开地图视图');
            alert('即将打开全部路线地图视图');
        });
    }

    // 城市选择点击效果
    const cityItems = document.querySelectorAll('.city-item');
    
    cityItems.forEach(city => {
        city.addEventListener('click', function() {
            const cityName = this.querySelector('.city-name').textContent;
            const routeCount = this.querySelector('.route-count').textContent;
            console.log(`选择城市: ${cityName} (${routeCount})`);
            
            // 模拟页面跳转，未来可以实现实际跳转
            alert(`即将显示${cityName}的路线列表`);
        });
    });

    // 路线分类点击效果
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            const categoryCount = this.querySelector('.category-count').textContent;
            console.log(`选择分类: ${categoryName} (${categoryCount})`);
            
            // 模拟页面跳转，未来可以实现实际跳转
            alert(`即将显示${categoryName}的路线列表`);
        });
    });

    // 开启定位按钮
    const locationBtn = document.querySelector('.enable-location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            this.textContent = '定位中...';
            
            // 模拟定位过程
            setTimeout(() => {
                const locationPrompt = document.querySelector('.location-prompt');
                locationPrompt.innerHTML = `
                    <i class="fas fa-check-circle" style="color: #4caf50;"></i>
                    <p>已获取您的位置</p>
                    <div style="margin-top: 10px; color: #888;">
                        <small>正在加载附近路线...</small>
                    </div>
                `;
                
                // 模拟数据加载
                setTimeout(() => {
                    const nearbyRoutesContainer = document.querySelector('.nearby-routes');
                    nearbyRoutesContainer.innerHTML = `
                        <div class="route-card">
                            <div class="route-image">
                                <img src="images/route-nearby1.jpg" alt="附近路线">
                                <span class="route-difficulty easy">初级</span>
                                <span class="route-distance">1.2公里</span>
                                <button class="favorite-btn">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                            <div class="route-info">
                                <h3 class="route-title">城西湿地公园环线</h3>
                                <div class="route-stats">
                                    <span><i class="fas fa-road"></i> 5.3公里</span>
                                    <span><i class="fas fa-mountain"></i> 20m</span>
                                    <span><i class="fas fa-clock"></i> 约30分钟</span>
                                </div>
                                <div class="route-meta">
                                    <div class="route-rating">
                                        <span class="stars">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                        </span>
                                        <span class="rating-count">4.7</span>
                                    </div>
                                    <div class="route-rides">
                                        <i class="fas fa-bicycle"></i> 876人骑行
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // 重新绑定收藏按钮事件
                    const newFavBtn = nearbyRoutesContainer.querySelector('.favorite-btn');
                    if (newFavBtn) {
                        newFavBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            this.classList.toggle('active');
                            
                            const heartIcon = this.querySelector('i');
                            if (this.classList.contains('active')) {
                                heartIcon.classList.remove('far');
                                heartIcon.classList.add('fas');
                            } else {
                                heartIcon.classList.remove('fas');
                                heartIcon.classList.add('far');
                            }
                        });
                    }
                    
                    // 重新绑定路线卡片点击事件
                    const newRouteCard = nearbyRoutesContainer.querySelector('.route-card');
                    if (newRouteCard) {
                        newRouteCard.addEventListener('click', function() {
                            const title = this.querySelector('.route-title').textContent;
                            alert(`即将打开路线详情: ${title}`);
                        });
                    }
                    
                }, 2000);
            }, 1500);
        });
    }

    // 刷新定位按钮
    const refreshLocation = document.querySelector('.refresh-location');
    if (refreshLocation) {
        refreshLocation.addEventListener('click', function(e) {
            e.preventDefault();
            alert('正在刷新位置信息...');
        });
    }

    // 确保首页链接可用
    const homeNavItem = document.querySelector('.nav-item:first-child');
    if (homeNavItem) {
        homeNavItem.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
