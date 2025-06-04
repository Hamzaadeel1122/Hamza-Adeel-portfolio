document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after page is loaded
    setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 500);

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.hamburger')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Navigation - Combined functionality
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('sticky');
            navbar.classList.remove('scrolled');
        }
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    const projectDetailsBtns = document.querySelectorAll('.project-details-btn');

    // Project details data - original projects restored (with some removed)
    const projectDetails = {
        'makeup-light': {
            title: 'The Makeup Light',
            client: 'Oscar-winning Makeup Artist',
            description: `
                <p>Led the development of a custom Shopify store for an Oscar-winning makeup artist's professional lighting brand.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Customized the theme with advanced product filtering and comparison features</li>
                    <li>Implemented complex Sale for Black Friday and Cyber Monday</li>
                    <li>Created custom landing pages for special promotions</li>
                    <li>Optimized site speed achieving higher PageSpeed score</li>
                </ul>
                <h4>Results:</h4>
                <p>Significantly improved conversion rates and reduced cart abandonment through enhanced user experience and streamlined checkout process.</p>
            `,
            technologies: ['Shopify Liquid', 'JavaScript', 'Dawn Theme']
        },
        'wellnesse': {
            title: 'Wellnesse',
            client: 'Natural Personal Care Brand',
            description: `
                <p>Developed custom landing pages and implemented advanced tracking for this natural personal care brand.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Created high-converting landing pages for product launches</li>
                    <li>Implemented comprehensive data tracking with analytics tools</li>
                    <li>Performed theme migration to improve site performance</li>
                    <li>Optimized product page templates for improved conversion</li>
                </ul>
                <h4>Results:</h4>
                <p>Achieved higher conversion rates on landing pages compared to standard product pages, with enhanced tracking providing valuable customer journey insights.</p>
            `,
            technologies: ['Shopify Liquid', 'JavaScript', 'GA4', 'GTM', 'Customer Events']
        },
        'minkaa-daisy': {
            title: 'Minkaa Daisy',
            client: 'Fashion Accessories Brand',
            description: `
                <p>Successfully migrated this fashion accessories store from an outdated theme to a modern, responsive design.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Migrated from legacy theme to modern framework while preserving custom functionality</li>
                    <li>Implemented CRO strategies based on heatmap and user session recordings</li>
                    <li>Optimized site speed, improving Core Web Vitals scores</li>
                    <li>Enhanced mobile shopping experience</li>
                </ul>
                <h4>Results:</h4>
                <p>Delivered faster page load times and improved mobile conversion rates, enhancing overall user experience and business performance.</p>
            `,
            technologies: ['Shopify Liquid', 'Dawn Theme', 'JavaScript', 'CSS3']
        },
        'upgraded-formulas': {
            title: 'Upgraded Formulas',
            client: 'Health Supplements Brand',
            description: `
                <p>Developed a streamlined purchase section, enhanced customer portal, and custom checkout experience for this health supplements brand.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Created a custom customer portal with test reports and authentication</li>
                    <li>Integrated subscription management functionality</li>
                    <li>Developed a quiz-based product recommendation system</li>
                    <li>Implemented secure document delivery system</li>
                    <li>Built custom Checkout Extensions for enhanced purchase flow</li>
                    <li>Developed Web Pixel Extensions for advanced tracking and analytics</li>
                </ul>
                <h4>Results:</h4>
                <p>Boosted subscription sign-ups and improved customer retention through enhanced portal features and personalized product recommendations.</p>
            `,
            technologies: ['Shopify Liquid', 'JavaScript', 'ReCharge API', 'Customer Accounts API', 'Checkout Extensions', 'Web Pixel Extensions']
        },
        'desmonies-shoes': {
            title: 'Desmonies Shoes',
            client: 'Premium Footwear Brand',
            description: `
                <p>Developed a custom store for a premium footwear brand with focus on product presentation.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Created advanced filtering system for shoe styles, sizes, and materials</li>
                    <li>Implemented 360-degree product view functionality</li>
                    <li>Developed size recommendation tool based on foot measurements</li>
                    <li>Optimized checkout flow for higher conversion</li>
                </ul>
                <h4>Results:</h4>
                <p>Decreased product return rates through better size recommendations and improved product visualization, enhancing customer satisfaction.</p>
            `,
            technologies: ['Shopify Liquid', 'JavaScript', 'Three.js', 'Dawn Theme', 'CSS3']
        },
        'gameon-event': {
            title: 'Gameon Event',
            client: 'Gaming Convention Platform',
            description: `
                <p>Developed a comprehensive employee management platform as a Shopify private app for gaming conventions.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Built a custom backend with API endpoints for employee management</li>
                    <li>Implemented a complete employee management system with role-based permissions</li>
                    <li>Created operations for events, exhibitors, attendees, and schedules</li>
                    <li>Developed custom reporting and analytics dashboard for event organizers</li>
                    <li>Implemented achievement tracking system for employees</li>
                </ul>
                <h4>Results:</h4>
                <p>Successfully managed large-scale events with high attendee satisfaction, increased exhibitor participation, and improved operational efficiency.</p>
            `,
            technologies: ['Next.js', 'Shopify Private App', 'React', 'Node.js', 'MongoDB']
        },
        'ncc-health': {
            title: 'NCC Health Store',
            client: 'Health Products Retailer',
            description: `
                <p>Developed a comprehensive health products store with custom powder formulation system and personalized health tracking.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Created custom powder formulation system allowing customers to create personalized supplement blends</li>
                    <li>Implemented ingredient interaction checker for safety validation</li>
                    <li>Developed health assessment quiz with product recommendations</li>
                    <li>Built customer health tracking dashboard with progress visualization</li>
                    <li>Integrated with health wearables for data synchronization</li>
                    <li>Implemented subscription system with dynamic adjustment based on health metrics</li>
                </ul>
                <h4>Results:</h4>
                <p>Achieved high subscription rates for custom formulations, increased average order values, and strong customer retention for subscription products.</p>
            `,
            technologies: ['Shopify Liquid', 'JavaScript', 'ReCharge API', 'Custom Formulation Engine', 'Health API Integrations']
        },
        'just-thrive': {
            title: 'Just Thrive',
            client: 'Premium Probiotic Brand',
            description: `
                <p>Executed comprehensive theme development and implemented advanced checkout customizations for this premium probiotic brand.</p>
                <h4>Highlights:</h4>
                <ul>
                    <li>Developed custom theme components for product education and scientific research presentation</li>
                    <li>Created interactive product comparison tools to highlight product benefits</li>
                    <li>Implemented Checkout Extensions for upsell opportunities and subscription options</li>
                    <li>Built custom Web Pixel Extensions for enhanced conversion tracking</li>
                    <li>Developed personalized product recommendation engine based on health goals</li>
                    <li>Optimized mobile experience with focus on educational content</li>
                </ul>
                <h4>Results:</h4>
                <p>Enhanced checkout conversion rates, improved customer education metrics, and increased subscription enrollment through seamless user experience.</p>
            `,
            technologies: ['Shopify Liquid', 'JavaScript', 'Checkout Extensions', 'Web Pixel Extensions', 'Dawn Theme', 'Customer Events API']
        }
    };

    // Open modal with project details
    projectDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                // Create tech tags HTML if technologies exist
                let techHtml = '';
                if (project.technologies) {
                    project.technologies.forEach(tech => {
                        techHtml += `<span class="tech-tag">${tech}</span>`;
                    });
                }
                
                modalContent.innerHTML = `
                    <div class="project-modal-header">
                        <h2>${project.title}</h2>
                        <p class="project-client">${project.client}</p>
                    </div>
                    <div class="project-modal-body">
                        <div class="project-description">
                            ${project.description}
                        </div>
                        ${project.technologies ? `
                        <div class="project-technologies">
                            <h4>Technologies Used:</h4>
                            <div class="tech-tags">
                                ${techHtml}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Section animation on scroll
    function animateSections() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize section animations
    animateSections();

    // Skill bar animation on scroll
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.querySelector('.skill-level');
                    if (skillLevel) {
                        skillLevel.style.transform = 'scaleX(1)';
                    }
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize skill bar animations
    animateSkillBars();

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize ScrollReveal animations
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200
        });

        sr.reveal('.section-title', {});
        sr.reveal('.hero-content', {});
        sr.reveal('.about-content', {});
        sr.reveal('.skill-category', { interval: 200 });
        sr.reveal('.project-card', { interval: 200 });
        sr.reveal('.timeline-item', { interval: 200 });
        sr.reveal('.contact-info', { interval: 200 });
        sr.reveal('.timeline::before', {
            origin: 'top',
            distance: '300px',
            duration: 1500,
            delay: 100
        });
        sr.reveal('.timeline-dot', {
            scale: 0.5,
            duration: 1000,
            delay: 300,
            interval: 200
        });
        sr.reveal('.timeline-date-container', { 
            origin: 'left',
            distance: '50px',
            duration: 1000,
            delay: 400,
            interval: 200
        });
        sr.reveal('.timeline-content', { 
            origin: 'right',
            distance: '50px',
            duration: 1000,
            delay: 500,
            interval: 200
        });
    }
}); 