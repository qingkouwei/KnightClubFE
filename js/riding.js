document.addEventListener('DOMContentLoaded', function() {
    // 模式选择功能
    const modeItems = document.querySelectorAll('.mode-item');
    
    modeItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active类
            modeItems.forEach(mode => mode.classList.remove('active'));
            // 添加active类到当前点击元素
            this.classList.add('active');
            
            // 显示选择的骑行模式
            const modeName = this.querySelector('.mode-name').textContent;
            document.querySelector('.ride-status').textContent = `准备${modeName}模式`;
        });
    });

    // 地图控制按钮功能
    const locateBtn = document.querySelector('.locate-btn');
    const layersBtn = document.querySelector('.layers-btn');
    
    if (locateBtn) {
        locateBtn.addEventListener('click', function() {
            // 显示定位中提示
            document.querySelector('.locating-status').style.display = 'flex';
            
            // 模拟定位完成
            setTimeout(() => {
                document.querySelector('.locating-status').style.display = 'none';
                alert('已定位到当前位置');
            }, 2000);
        });
    }
    
    if (layersBtn) {
        layersBtn.addEventListener('click', function() {
            alert('选择地图图层：标准、卫星、地形');
        });
    }

    // 开始骑行按钮
    const startBtn = document.querySelector('.start-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            // 隐藏准备状态面板，显示骑行中面板
            document.querySelector('.riding-controls').style.display = 'none';
            document.querySelector('.riding-controls-active').style.display = 'block';
            
            // 启动计时器（实际应用中）
            startRidingTimer();
            
            // 模拟轨迹记录开始
            alert('开始记录骑行轨迹');
        });
    }

    // 暂停骑行按钮
    const pauseBtn = document.querySelector('.pause-btn');
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            // 隐藏骑行中面板，显示暂停面板
            document.querySelector('.riding-controls-active').style.display = 'none';
            document.querySelector('.riding-controls-paused').style.display = 'block';
            
            // 暂停计时器（实际应用中）
            pauseRidingTimer();
        });
    }

    // 继续骑行按钮
    const resumeBtn = document.querySelector('.resume-btn');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            // 隐藏暂停面板，显示骑行中面板
            document.querySelector('.riding-controls-paused').style.display = 'none';
            document.querySelector('.riding-controls-active').style.display = 'block';
            
            // 继续计时器（实际应用中）
            resumeRidingTimer();
        });
    }

    // 结束骑行按钮
    const stopBtn = document.querySelector('.stop-btn');
    
    if (stopBtn) {
        stopBtn.addEventListener('click', function() {
            const confirmed = confirm('确定要结束本次骑行吗？');
            
            if (confirmed) {
                // 显示结束页面
                document.querySelector('.ride-complete-overlay').style.display = 'flex';
            }
        });
    }

    // 保存骑行按钮（暂停状态）
    const saveBtn = document.querySelector('.save-btn');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // 显示结束页面
            document.querySelector('.ride-complete-overlay').style.display = 'flex';
        });
    }

    // 锁定屏幕按钮
    const lockBtn = document.querySelector('.lock-btn');
    
    if (lockBtn) {
        lockBtn.addEventListener('click', function() {
            alert('屏幕已锁定，双击屏幕解锁');
            // 这里应该实现实际的屏幕锁定功能
        });
    }

    // 标记点按钮
    const markerBtn = document.querySelector('.marker-btn');
    
    if (markerBtn) {
        markerBtn.addEventListener('click', function() {
            alert('已在当前位置添加标记点');
        });
    }

    // 设置按钮
    const settingsBtn = document.querySelector('.settings-btn');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            alert('打开骑行设置');
        });
    }

    // 路线按钮
    const routesBtn = document.querySelector('.routes-btn');
    
    if (routesBtn) {
        routesBtn.addEventListener('click', function() {
            alert('选择骑行路线');
        });
    }

    // 快捷路线使用按钮
    const useRouteBtns = document.querySelectorAll('.use-route-btn');
    
    useRouteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const routeCard = this.closest('.quick-route-card');
            const routeName = routeCard.querySelector('.route-name').textContent;
            
            const confirmed = confirm(`确定要使用"${routeName}"路线作为导航吗？`);
            if (confirmed) {
                alert(`已加载"${routeName}"路线导航`);
            }
        });
    });

    // 心情选择功能
    const moodOptions = document.querySelectorAll('.mood-option');
    
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选中状态
            moodOptions.forEach(opt => opt.style.transform = '');
            
            // 添加选中效果
            this.style.transform = 'scale(1.1)';
            
            const mood = this.textContent.trim();
            console.log(`选择的心情: ${mood}`);
        });
    });

    // 分享骑行按钮
    const shareRideBtn = document.querySelector('.share-ride-btn');
    
    if (shareRideBtn) {
        shareRideBtn.addEventListener('click', function() {
            alert('打开骑行分享选项');
        });
    }

    // 保存骑行结果按钮
    const saveRideBtn = document.querySelector('.save-ride-btn');
    
    if (saveRideBtn) {
        saveRideBtn.addEventListener('click', function() {
            alert('骑行记录已保存');
            
            // 关闭结束页面，回到准备状态
            document.querySelector('.ride-complete-overlay').style.display = 'none';
            document.querySelector('.riding-controls-paused').style.display = 'none';
            document.querySelector('.riding-controls').style.display = 'block';
            
            // 重置数据
            resetRidingData();
        });
    }

    // 计时器相关函数（模拟）
    function startRidingTimer() {
        console.log('开始计时');
    }
    
    function pauseRidingTimer() {
        console.log('暂停计时');
    }
    
    function resumeRidingTimer() {
        console.log('继续计时');
    }
    
    // 重置骑行数据
    function resetRidingData() {
        // 重置显示数据
        document.querySelector('.riding-controls .data-item.large .data-value').textContent = '0.00';
        document.querySelector('.riding-controls .data-group:first-child .data-item:last-child .data-value').textContent = '00:00:00';
        document.querySelector('.riding-controls .data-group:last-child .data-item:first-child .data-value').textContent = '0.0';
        document.querySelector('.riding-controls .data-group:last-child .data-item:last-child .data-value').textContent = '0';
    }
    
    // 初始化时隐藏定位状态
    const locatingStatus = document.querySelector('.locating-status');
    if (locatingStatus) {
        locatingStatus.style.display = 'none';
    }
});
