document.addEventListener("DOMContentLoaded", function (event) {
    var videos = document.getElementsByClassName("video__play-button");
    var video_fullscreen = document.getElementsByClassName("video__fullscreen-button");

    for (var i = 0; i < videos.length; i++) {
        videos[i].onclick = function () {

            video = this.nextElementSibling;
            video_wrapper = this.parentElement;

            if (video.paused == true) {
                video.play();
                video.setAttribute('data-state', 'play');
                video.setAttribute('data-state-reload', 'false');
                video_wrapper.setAttribute('data-state', 'play');

                this.setAttribute('data-button-state', 'play');
                this.setAttribute('data-button-state-reload', 'false');
            } else {
                video.pause();
                video.setAttribute('data-state', 'pause');
                video_wrapper.setAttribute('data-state', 'pause');

                this.setAttribute('data-button-state', 'pause');
            }

            video.onended = (event) => {
                video.setAttribute('data-state', 'pause');
                video.setAttribute('data-state-reload', 'true');

                this.setAttribute('data-button-state', 'pause');
                this.setAttribute('data-button-state-reload', 'true');
            };

        }

    }


    // Loop through all videos
    for (var i = 0; i < video_fullscreen.length; i++) {
        // On click play button
        video_fullscreen[i].onclick = function () {

            // Find video element
            video = this.nextElementSibling.nextElementSibling;

            if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullScreen) {
                video.webkitRequestFullScreen();
            }

        }

    }

    const animatedSvg = document.querySelector(".wrap");
    let timeout;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Wait 1 second before triggering the animation
                    timeout = setTimeout(() => {
                        animatedSvg.classList.add("animate");
                    }, 100); // 1-second delay
                } else {
                    clearTimeout(timeout); // Clear timeout if the element leaves the viewport before 1 second
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the div is visible
    );

    observer.observe(animatedSvg);
});

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');

    for (i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
    }

    if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
    }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));