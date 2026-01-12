window.addEventListener('load', function () {
    setTimeout(function () {
        const loadingWrapper = document.querySelector('.loading-wrapper');
        loadingWrapper.style.opacity = '0';
        loadingWrapper.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            loadingWrapper.style.display = 'none';
        }, 800);
    }, 1000);
});