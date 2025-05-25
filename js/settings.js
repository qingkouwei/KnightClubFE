// 设置页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化开关状态
    initializeSwitches();
    
    // 初始化选择框
    initializeSelects();
    
    // 绑定退出登录事件
    setupLogoutButton();
    
    // 绑定清除缓存事件
    setupClearCache();
});

// 初始化所有开关状态
function initializeSwitches() {
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchInput => {
        // 从本地存储获取开关状态
        const settingKey = switchInput.closest('.settings-item').querySelector('.item-left span').textContent;
        const savedState = localStorage.getItem(`setting_${settingKey}`);
        if (savedState !== null) {
            switchInput.checked = savedState === 'true';
        }
        
        // 监听开关变化
        switchInput.addEventListener('change', function() {
            // 保存状态到本地存储
            localStorage.setItem(`setting_${settingKey}`, this.checked);
            
            // 显示保存成功提示
            showToast('设置已保存');
            
            // 处理特殊设置项
            handleSpecialSettings(settingKey, this.checked);
        });
    });
}

// 初始化选择框
function initializeSelects() {
    const selects = document.querySelectorAll('.settings-select');
    selects.forEach(select => {
        const settingKey = select.closest('.settings-item').querySelector('.item-left span').textContent;
        const savedValue = localStorage.getItem(`setting_${settingKey}`);
        if (savedValue) {
            select.value = savedValue;
        }
        
        select.addEventListener('change', function() {
            localStorage.setItem(`setting_${settingKey}`, this.value);
            showToast('设置已保存');
        });
    });
}

// 处理特殊设置项的逻辑
function handleSpecialSettings(settingKey, value) {
    switch(settingKey) {
        case '深色模式':
            document.documentElement.classList.toggle('dark-mode', value);
            break;
        case '新消息通知':
            if (value) {
                requestNotificationPermission();
            }
            break;
        // 可以添加其他特殊设置项的处理逻辑
    }
}

// 设置退出登录按钮
function setupLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', function() {
        showConfirmDialog('确定要退出登录吗？', function() {
            // 清除本地存储的用户信息
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
            
            // 跳转到登录页面
            window.location.href = 'login.html';
        });
    });
}

// 设置清除缓存功能
function setupClearCache() {
    const clearCacheItem = document.querySelector('.settings-item:has(.item-left span:contains("清除缓存"))');
    if (clearCacheItem) {
        clearCacheItem.addEventListener('click', function() {
            showConfirmDialog('确定要清除缓存吗？', async function() {
                try {
                    // 清除缓存的实现
                    await clearAppCache();
                    
                    // 更新显示的缓存大小
                    const cacheSize = await calculateCacheSize();
                    clearCacheItem.querySelector('.item-value').textContent = formatSize(cacheSize);
                    
                    showToast('缓存已清除');
                } catch (error) {
                    showToast('清除缓存失败');
                    console.error('Clear cache error:', error);
                }
            });
        });
    }
}

// 显示确认对话框
function showConfirmDialog(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// 显示提示消息
function showToast(message) {
    // 如果存在toast元素则移除
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 添加动画类
    setTimeout(() => toast.classList.add('show'), 10);
    
    // 3秒后移除toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 请求通知权限
async function requestNotificationPermission() {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            showToast('需要通知权限才能接收消息提醒');
        }
    } catch (error) {
        console.error('Request notification permission error:', error);
    }
}

// 清除应用缓存
async function clearAppCache() {
    // 清除localStorage中的缓存数据
    const preserveKeys = ['userToken', 'userData']; // 保留的键
    Object.keys(localStorage).forEach(key => {
        if (!preserveKeys.includes(key)) {
            localStorage.removeItem(key);
        }
    });
    
    // 清除IndexedDB数据
    const databases = await window.indexedDB.databases();
    databases.forEach(db => {
        window.indexedDB.deleteDatabase(db.name);
    });
    
    // 如果使用了Service Worker，也需要清除Service Worker缓存
    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(registration => 
            registration.active.postMessage({ type: 'CLEAR_CACHE' })
        ));
    }
}

// 计算缓存大小
async function calculateCacheSize() {
    // 这里返回一个模拟的缓存大小
    // 实际应用中应该计算真实的缓存大小
    return 1024 * 1024 * Math.random() * 50; // 0-50MB
}

// 格式化文件大小
function formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    
    return `${size.toFixed(1)}${units[unitIndex]}`;
}
