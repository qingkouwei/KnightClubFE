document.addEventListener('DOMContentLoaded', function() {
    // 时间选择功能
    const timeSelectors = document.querySelectorAll('.time-selector span');
    
    timeSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            // 移除所有active类
            timeSelectors.forEach(s => s.classList.remove('active'));
            // 添加active类到当前点击元素
            this.classList.add('active');
            
            // 更新骑行数据显示（模拟）
            const timePeriod = document.querySelector('.time-period');
            const mainStatValues = document.querySelectorAll('.main-stat-item .stat-value');
            const subStatValues = document.querySelectorAll('.sub-stat-value');
            
            if (this.textContent === '本月') {
                timePeriod.textContent = '2025年5月';
                updateStats(mainStatValues, ['385.6', '24.5', '9650']);
                updateStats(subStatValues, ['15次', '2860米', '78.3公里', '22.4公里/时']);
            } else if (this.textContent === '今年') {
                timePeriod.textContent = '2025年';
                updateStats(mainStatValues, ['1685.4', '98.2', '42350']);
                updateStats(subStatValues, ['63次', '12450米', '105.6公里', '20.8公里/时']);
            } else if (this.textContent === '全部') {
                timePeriod.textContent = '累计';
                updateStats(mainStatValues, ['5243.8', '325.7', '128750']);
                updateStats(subStatValues, ['218次', '38650米', '156.2公里', '19.5公里/时']);
            }
        });
    });

    // 更新数据的辅助函数
    function updateStats(elements, values) {
        elements.forEach((el, index) => {
            if (values[index]) {
                el.textContent = values[index];
            }
        });
    }

    // 编辑资料按钮
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            alert('进入编辑个人资料页面');
        });
    }

    // 修改头像按钮
    const editAvatarBtn = document.querySelector('.edit-avatar');
    
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('打开更换头像选项');
        });
    }

    // 查看详细骑行数据
    const statsMoreLink = document.querySelector('.section-header .section-more');
    
    if (statsMoreLink) {
        statsMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('.section-container');
            const title = section.querySelector('.section-title').textContent;
            alert(`查看${title}详细信息`);
        });
    }

    // 查看骑行记录详情
    const rideRecordItems = document.querySelectorAll('.ride-record-item');
    
    rideRecordItems.forEach(item => {
        item.addEventListener('click', function() {
            const recordName = this.querySelector('.record-name').textContent;
            alert(`查看骑行记录详情：${recordName}`);
        });
    });

    // 功能模块点击
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            const featureName = this.querySelector('.feature-name').textContent;
            alert(`打开${featureName}功能`);
        });
    });

    // 查看成就详情
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    achievementItems.forEach(item => {
        item.addEventListener('click', function() {
            const achievementTitle = this.querySelector('.achievement-title').textContent;
            if (this.classList.contains('achieved')) {
                alert(`您已获得"${achievementTitle}"成就！`);
            } else {
                alert(`成就"${achievementTitle}"尚未解锁，继续加油！`);
            }
        });
    });

    // 动态操作菜单
    const actionMenus = document.querySelectorAll('.post-actions-menu');
    
    actionMenus.forEach(menu => {
        menu.addEventListener('click', function() {
            alert('打开动态操作菜单：编辑、删除、分享等');
        });
    });

    // 设置按钮
    const settingsButton = document.querySelector('.header-right i.fa-cog');
    
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            alert('打开设置页面');
        });
    }

    // 点赞功能
    const heartIcons = document.querySelectorAll('.fa-heart');
    
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const statItem = this.parentElement;
            const countText = statItem.textContent.trim().split(' ')[1];
            let count = parseInt(countText);
            
            if (this.classList.contains('far')) {
                // 未点赞状态，点赞
                this.classList.remove('far');
                this.classList.add('fas');
                count++;
            } else {
                // 已点赞状态，取消点赞
                this.classList.remove('fas');
                this.classList.add('far');
                count--;
            }
            
            statItem.innerHTML = `<i class="${this.className}"></i> ${count}`;
        });
    });

    // 评论功能
    const commentIcons = document.querySelectorAll('.fa-comment');
    
    commentIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('打开评论列表');
        });
    });
});
