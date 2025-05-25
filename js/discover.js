document.addEventListener('DOMContentLoaded', function() {
    // Tab切换功能
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active类
            tabs.forEach(t => t.classList.remove('active'));
            // 添加active类到当前点击的标签
            this.classList.add('active');
            
            // 隐藏所有内容面板
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // 显示对应的内容面板
            if (tabPanes[index]) {
                tabPanes[index].classList.add('active');
            }
        });
    });

    // 关注按钮功能
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
            const actionItem = this.parentElement;
            const countElement = this.nextElementSibling;
            let count = parseInt(countElement.textContent);
            
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
            
            countElement.textContent = count;
        });
    });

    // 收藏功能
    const bookmarkIcons = document.querySelectorAll('.fa-bookmark');
    
    bookmarkIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            if (this.classList.contains('far')) {
                this.classList.remove('far');
                this.classList.add('fas');
                this.style.color = '#4a80f0';
            } else {
                this.classList.remove('fas');
                this.classList.add('far');
                this.style.color = '';
            }
        });
    });

    // 活动报名功能
    const joinEventBtns = document.querySelectorAll('.join-event-btn');
    
    joinEventBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventName = this.closest('.event-info').querySelector('.event-name').textContent;
            const confirmed = confirm(`确定要报名参加"${eventName}"活动吗？`);
            
            if (confirmed) {
                this.textContent = '已报名';
                this.style.backgroundColor = '#999';
                this.disabled = true;
            }
        });
    });

    // 视频播放功能
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            alert('视频播放功能将在App内实现');
        });
    });

    // 动态发布功能
    const postInput = document.querySelector('.post-input');
    
    if (postInput) {
        postInput.addEventListener('click', function() {
            alert('打开动态发布页面');
        });
    }

    // 话题点击功能
    const topicItems = document.querySelectorAll('.topic-item');
    
    topicItems.forEach(topic => {
        topic.addEventListener('click', function() {
            const topicName = this.querySelector('span').textContent;
            alert(`查看${topicName}话题的相关内容`);
        });
    });

    // 查看评论功能
    const moreComments = document.querySelectorAll('.more-comments');
    
    moreComments.forEach(item => {
        item.addEventListener('click', function() {
            alert('查看全部评论');
        });
    });

    // 分享功能
    const shareIcons = document.querySelectorAll('.fa-share-square');
    
    shareIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            alert('打开分享菜单');
        });
    });

    // 模拟加载更多功能
    const loadMore = document.querySelector('.load-more');
    
    if (loadMore) {
        loadMore.addEventListener('click', function() {
            const spinner = this.querySelector('.fa-spinner');
            
            // 显示加载中
            spinner.style.display = 'inline-block';
            
            // 模拟加载延迟
            setTimeout(() => {
                spinner.style.display = 'none';
                alert('已加载更多内容');
            }, 1500);
        });
    }

    // 初始化时隐藏加载图标
    const spinner = document.querySelector('.fa-spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
});
