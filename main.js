tailwind.config = {
    // 自定义 Tailwind CSS 的主题配置
    theme: {
        extend: {
            // 扩展默认主题，添加自定义颜色和边框圆角值
            colors: {
                // 自定义颜色变量
                primary: '#3b82f6',
                secondary: '#10b981'
            },
            borderRadius: {
                // 自定义边框圆角值
                'none': '0px',
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '20px',
                '2xl': '24px',
                '3xl': '32px',
                'full': '9999px',
                'button': '8px'
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const versionToggle = document.getElementById('version-toggle');
    const versionDropdown = document.getElementById('version-dropdown');
    const careerBtn = document.getElementById('career-btn');
    const academicBtn = document.getElementById('academic-btn');
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileVersionToggle = document.getElementById('mobile-version-toggle');
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const careerVersion = document.getElementById('career-version');
    const academicVersion = document.getElementById('academic-version');
    const careerNav = document.querySelector('.career-nav');
    const academicNav = document.querySelector('.academic-nav');
    const careerMobileNav = document.querySelector('.career-mobile-nav');
    const academicMobileNav = document.querySelector('.academic-mobile-nav');
    const versionText = document.getElementById('version-text');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    const skillBars = document.querySelectorAll('.skill-bar');
    // Project Slider
    const slider = document.getElementById('project-slider');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    const indicators = document.querySelectorAll('[data-index]');
    let currentSlide = 0;
    const totalSlides = 4;
    // Publication Filters
    const publicationFilters = document.querySelectorAll('.publication-filter');
    const publicationItems = document.querySelectorAll('.publication-item');
    // Citation Chart
    let citationChart;
    if (document.getElementById('citation-chart')) {
        citationChart = echarts.init(document.getElementById('citation-chart'));
        const citationOption = {
            animation: false,
            grid: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 50
            },
            xAxis: {
                type: 'category',
                data: ['2020', '2021', '2022', '2023', '2024'],
                axisLabel: {
                    color: '#1f2937'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#1f2937'
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: '#e5e7eb',
                textStyle: {
                    color: '#1f2937'
                }
            },
            series: [{
                data: [420, 932, 1290, 2340, 3200],
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: 'rgba(87, 181, 231, 1)'
                },
                itemStyle: {
                    color: 'rgba(87, 181, 231, 1)'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(87, 181, 231, 0.2)'
                        }, {
                            offset: 1,
                            color: 'rgba(87, 181, 231, 0.05)'
                        }]
                    }
                },
                showSymbol: false
            }]
        };
        citationChart.setOption(citationOption);
    }
    // Initialize
    let currentVersion = 'career';
    let currentLang = 'en';
    let isDarkMode = false;
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
    // Version Toggle Dropdown
    versionToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        versionDropdown.classList.toggle('hidden');
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
        versionDropdown.classList.add('hidden');
    });
    // Version Selection
    careerBtn.addEventListener('click', function () {
        switchVersion('career');
        versionDropdown.classList.add('hidden');
    });
    academicBtn.addEventListener('click', function () {
        switchVersion('academic');
        versionDropdown.classList.add('hidden');
    });
    // Mobile Version Toggle
    mobileVersionToggle.addEventListener('click', function () {
        if (currentVersion === 'career') {
            switchVersion('academic');
        } else {
            switchVersion('career');
        }
    });
    // Language Toggle
    langToggle.addEventListener('click', function () {
        toggleLanguage();
    });
    mobileLangToggle.addEventListener('click', function () {
        toggleLanguage();
    });
    // Theme Toggle
    themeToggle.addEventListener('click', function () {
        toggleTheme();
    });
    mobileThemeToggle.addEventListener('click', function () {
        toggleTheme();
    });
    // Smooth Scrolling for Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            smoothScroll(e);
            mobileMenu.classList.add('hidden');
        });
    });
    // Project Slider Controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        nextBtn.addEventListener('click', function () {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function () {
                currentSlide = parseInt(this.getAttribute('data-index'));
                updateSlider();
            });
        });
    }
    // Publication Filters
    if (publicationFilters.length > 0) {
        publicationFilters.forEach(filter => {
            filter.addEventListener('click', function () {
                const category = this.getAttribute('data-filter');
                // Update active filter
                publicationFilters.forEach(f => {
                    f.classList.remove('bg-primary', 'text-white');
                    f.classList.add('bg-gray-200', 'text-gray-700');
                });
                this.classList.remove('bg-gray-200', 'text-gray-700');
                this.classList.add('bg-primary', 'text-white');
                // Filter publications
                publicationItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category').includes(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    // Scroll Event for Navbar and Skill Bars
    window.addEventListener('scroll', function () {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.remove('shadow-md');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.add('shadow-md');
        }
        // Animate Skill Bars
        if (isInViewport(document.getElementById('about'))) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
        // Highlight active nav link
        highlightActiveNavLink();
    });
    // Functions
    function switchVersion(version) {
        currentVersion = version;
        if (version === 'career') {
            careerVersion.style.display = 'block';
            academicVersion.style.display = 'none';
            careerNav.style.display = 'flex';
            academicNav.style.display = 'none';
            careerMobileNav.style.display = 'block';
            academicMobileNav.style.display = 'none';
            versionText.textContent = 'Career';
            mobileVersionToggle.textContent = 'Career';
            careerBtn.classList.add('text-primary');
            academicBtn.classList.remove('text-primary');
        } else {
            careerVersion.style.display = 'none';
            academicVersion.style.display = 'block';
            careerNav.style.display = 'none';
            academicNav.style.display = 'flex';
            careerMobileNav.style.display = 'none';
            academicMobileNav.style.display = 'block';
            versionText.textContent = 'Academic';
            mobileVersionToggle.textContent = 'Academic';
            careerBtn.classList.remove('text-primary');
            academicBtn.classList.add('text-primary');
            // Resize citation chart if switching to academic
            if (citationChart) {
                setTimeout(() => {
                    citationChart.resize();
                }, 100);
            }
        }
        // Scroll to top when switching versions
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        // Update toggle button text
        langToggle.textContent = currentLang.toUpperCase();
        mobileLangToggle.textContent = currentLang.toUpperCase();
        // Update all text elements with data-en and data-zh attributes
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
    }
    /**
     * 切换主题模式
     * 该函数会根据当前的主题模式，更新页面元素的样式和图标显示
     */
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            // 深色模式
            // 给 body 元素添加 dark-mode 类，用于可能的全局样式控制
            document.body.classList.add('dark-mode');
            // 更新桌面端主题切换按钮的图标为月亮图标
            themeToggle.innerHTML = '<i class="ri-moon-line ri-lg"></i>';
            // 更新移动端主题切换按钮的图标为月亮图标
            mobileThemeToggle.innerHTML = '<i class="ri-moon-line ri-lg"></i>';
            // Update dark mode styles
            // 更新背景颜色为深色模式对应的颜色
            document.querySelectorAll('.bg-white').forEach(el => {
                // 移除浅色模式的背景白色类
                el.classList.remove('bg-white');
                // 添加深色模式的背景深灰色类
                el.classList.add('bg-gray-800');
            });
            document.querySelectorAll('.bg-gray-50').forEach(el => {
                // 移除浅色模式的背景浅灰色类
                el.classList.remove('bg-gray-50');
                // 添加深色模式的背景中灰色类
                el.classList.add('bg-gray-700');
            });
            document.querySelectorAll('.bg-gray-100').forEach(el => {
                // 移除浅色模式的背景浅灰色类
                el.classList.remove('bg-gray-100');
                // 添加深色模式的背景中灰色类
                el.classList.add('bg-gray-600');
            });
            // 更新文字颜色为深色模式对应的颜色
            document.querySelectorAll('.text-gray-600').forEach(el => {
                // 移除浅色模式的文字中灰色类
                el.classList.remove('text-gray-600');
                // 添加深色模式的文字浅灰色类
                el.classList.add('text-gray-300');
            });
            document.querySelectorAll('.text-gray-800').forEach(el => {
                // 移除浅色模式的文字深灰色类
                el.classList.remove('text-gray-800');
                // 添加深色模式的文字白色类
                el.classList.add('text-gray-100');
            });
            // 更新边框颜色为深色模式对应的颜色
            document.querySelectorAll('.border-gray-300').forEach(el => {
                // 移除浅色模式的边框浅灰色类
                el.classList.remove('border-gray-300');
                // 添加深色模式的边框中灰色类
                el.classList.add('border-gray-600');
            });
            // 更新鼠标悬停背景颜色为深色模式对应的颜色
            document.querySelectorAll('.hover\\:bg-gray-100').forEach(el => {
                // 移除浅色模式的鼠标悬停背景浅灰色类
                el.classList.remove('hover:bg-gray-100');
                // 添加深色模式的鼠标悬停背景中灰色类
                el.classList.add('hover:bg-gray-600');
            });
            document.querySelectorAll('.hover\\:bg-gray-200').forEach(el => {
                // 移除浅色模式的鼠标悬停背景中灰色类
                el.classList.remove('hover:bg-gray-200');
                // 添加深色模式的鼠标悬停背景深灰色类
                el.classList.add('hover:bg-gray-700');
            });
        } else {
            // 如果切换到浅色模式
            // 移除 body 元素的 dark-mode 类
            document.body.classList.remove('dark-mode');
            // 更新桌面端主题切换按钮的图标为太阳图标
            themeToggle.innerHTML = '<i class="ri-sun-line ri-lg"></i>';
            // 更新移动端主题切换按钮的图标为太阳图标
            mobileThemeToggle.innerHTML = '<i class="ri-sun-line ri-lg"></i>';
            // Restore light mode styles
            // 恢复背景颜色为浅色模式对应的颜色
            document.querySelectorAll('.bg-gray-800').forEach(el => {
                // 移除深色模式的背景深灰色类
                el.classList.remove('bg-gray-800');
                // 添加浅色模式的背景白色类
                el.classList.add('bg-white');
            });
            document.querySelectorAll('.bg-gray-700').forEach(el => {
                // 移除深色模式的背景中灰色类
                el.classList.remove('bg-gray-700');
                // 添加浅色模式的背景浅灰色类
                el.classList.add('bg-gray-50');
            });
            document.querySelectorAll('.bg-gray-600').forEach(el => {
                // 移除深色模式的背景中灰色类
                el.classList.remove('bg-gray-600');
                // 添加浅色模式的背景浅灰色类
                el.classList.add('bg-gray-100');
            });
            // 恢复文字颜色为浅色模式对应的颜色
            document.querySelectorAll('.text-gray-300').forEach(el => {
                // 移除深色模式的文字浅灰色类
                el.classList.remove('text-gray-300');
                // 添加浅色模式的文字中灰色类
                el.classList.add('text-gray-600');
            });
            document.querySelectorAll('.text-gray-100').forEach(el => {
                // 移除深色模式的文字白色类
                el.classList.remove('text-gray-100');
                // 添加浅色模式的文字深灰色类
                el.classList.add('text-gray-800');
            });
            // 恢复边框颜色为浅色模式对应的颜色
            document.querySelectorAll('.border-gray-600').forEach(el => {
                // 移除深色模式的边框中灰色类
                el.classList.remove('border-gray-600');
                // 添加浅色模式的边框浅灰色类
                el.classList.add('border-gray-300');
            });
            // 恢复鼠标悬停背景颜色为浅色模式对应的颜色
            document.querySelectorAll('.hover\\:bg-gray-600').forEach(el => {
                // 移除深色模式的鼠标悬停背景中灰色类
                el.classList.remove('hover:bg-gray-600');
                // 添加浅色模式的鼠标悬停背景浅灰色类
                el.classList.add('hover:bg-gray-100');
            });
            document.querySelectorAll('.hover\\:bg-gray-700').forEach(el => {
                // 移除深色模式的鼠标悬停背景深灰色类
                el.classList.remove('hover:bg-gray-700');
                // 添加浅色模式的鼠标悬停背景中灰色类
                el.classList.add('hover:bg-gray-200');
            });
        }
        // Update chart theme if it exists
        // Update chart theme if it exists
        if (citationChart) {
            const textColor = isDarkMode ? '#f3f4f6' : '#1f2937';
            citationChart.setOption({
                xAxis: {
                    axisLabel: {
                        color: textColor
                    }
                },
                yAxis: {
                    axisLabel: {
                        color: textColor
                    }
                }
            });
        }
    }
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    function updateSlider() {
        const translateValue = -currentSlide * 100 + '%';
        slider.style.transform = `translateX(${translateValue})`;
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.remove('bg-gray-300');
                indicator.classList.add('bg-primary');
            } else {
                indicator.classList.remove('bg-primary');
                indicator.classList.add('bg-gray-300');
            }
        });
    }
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    function highlightActiveNavLink() {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        // Get all sections
        const sections = document.querySelectorAll('section');
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('text-primary', 'active');
                });
                mobileNavLinks.forEach(link => {
                    link.classList.remove('text-primary', 'active');
                });
                // Add active class to current link
                const activeLinks = document.querySelectorAll(`a[href="#${id}"]`);
                activeLinks.forEach(link => {
                    link.classList.add('text-primary', 'active');
                });
            }
        });
    }
    // Initialize the page
    highlightActiveNavLink();
    // Resize event for the chart
    window.addEventListener('resize', function () {
        if (citationChart) {
            citationChart.resize();
        }
    });
});