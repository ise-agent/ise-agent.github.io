// 视频播放功能
function initVideoPlayer() {
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.getElementById('close-modal');
    const playButtons = document.querySelectorAll('.play-button');
    
 // 打开视频模态框（改为按钮点击）
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取父容器的视频路径和封面图
            const videoContainer = this.closest('.video-container');
            const videoPath = videoContainer.getAttribute('data-video');
            const posterPath = videoContainer.getAttribute('data-poster');
            
            // 设置视频源和封面
            modalVideo.src = videoPath;
            modalVideo.poster = posterPath;
            
            // 显示模态框并播放视频
            videoModal.classList.remove('hidden');
            videoModal.classList.add('flex');
            modalVideo.play();
            
            // 阻止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭视频模态框
    closeModal.addEventListener('click', closeVideoModal);
    
    // 点击模态框背景关闭
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // 按ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
            closeVideoModal();
        }
    });
    
    // 关闭视频的函数
    function closeVideoModal() {
        modalVideo.pause();
        videoModal.classList.add('hidden');
        videoModal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

// 页面加载完成后初始化视频播放器
window.addEventListener('load', initVideoPlayer);
