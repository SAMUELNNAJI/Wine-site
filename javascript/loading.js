window.addEventListener('load', function () {
    // Trigger flipInX animation
    document.getElementById("Animate").classList.add('flipInX');
    
    setTimeout(function () {
        const loadingWrapper = document.querySelector('.loading-wrapper');
        loadingWrapper.style.opacity = '0';
        loadingWrapper.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            loadingWrapper.style.display = 'none';
        }, 800);
    }, 1000);
});