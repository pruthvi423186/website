document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
   
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('open');
        });
    }
   
    // Services slide-down toggle
    const servicesToggle = document.querySelector('.services-toggle');
    const servicesSubmenu = document.querySelector('.services-submenu');

    if (servicesToggle && servicesSubmenu) {
        servicesToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            servicesSubmenu.classList.toggle('active');
        });
    }
   
    // Sticky header
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
   
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
   
    // Animation on scroll for existing elements
    const observerOptions = {
        threshold: 0.3
    };
   
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
   
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
   
    // Ensure the clients slider animates when in view
    const clientsTrack = document.querySelector('.clients-track');
    if (clientsTrack) {
        const clientsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });

        clientsObserver.observe(clientsTrack);
    }
   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Skip smooth scrolling for services toggle to allow slide-down
            if (this.classList.contains('services-toggle')) {
                return; // Let the services toggle handle its own behavior
            }
           
            e.preventDefault();
           
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
            }
           
            const targetId = this.getAttribute('href');
            
            // Skip empty anchors or just "#"
            if (targetId === '#' || targetId === '') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
           
            if (targetElement) {
                const scrollPosition = targetElement.offsetTop - headerHeight;
               
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
                
                // If this is a service submenu link, also hide the submenu after clicking
                if (this.closest('.services-submenu')) {
                    servicesSubmenu.classList.remove('active');
                }
            }
        });
    });

    // Hero slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slider .slide');
   
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
   
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Service Modal Functionality
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    
    // Define the service content objects
    const serviceContent = {
        'vdf-flooring': {
            title: 'VDF Flooring',
            mainImage: 'images/vdfjs.jpg',
            description: `
                <div class="service-detail-section">
                    <h3>What is VDF Flooring?</h3>
                    <p>VDF (Vacuum Dewatered Flooring) is an advanced concrete flooring technique that significantly enhances the strength and durability of concrete floors by removing excess water using a specialized vacuum process.</p>
                    <p>The process creates a dense, compact concrete surface with superior load-bearing capacity, increased abrasion resistance, and reduced maintenance requirements, making it ideal for industrial and commercial applications.</p>
                </div>
                
                <div class="service-detail-section">
                    <h3>The VDF Process</h3>
                    <p>The VDF process involves several key steps:</p>
                    <ul>
                        <li><strong>Concrete Laying:</strong> Pouring high-quality concrete mixture onto the prepared surface.</li>
                        <li><strong>Vibration:</strong> Using specialized equipment to remove air bubbles and ensure proper settlement.</li>
                        <li><strong>Vacuum Dewatering:</strong> Applying vacuum suction to extract excess water from the concrete.</li>
                        <li><strong>Floating:</strong> Smoothing the surface using power floats for initial leveling.</li>
                        <li><strong>Troweling:</strong> Final finishing to achieve the desired smoothness and appearance.</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Benefits of VDF Flooring</h3>
                    <ul>
                        <li>Increased strength and load-bearing capacity</li>
                        <li>Superior abrasion and impact resistance</li>
                        <li>Reduced shrinkage and cracking</li>
                        <li>Faster curing time compared to conventional concrete</li>
                        <li>Extended lifespan with minimal maintenance</li>
                        <li>Dust-free surface that's easy to clean</li>
                        <li>Cost-effective solution for industrial spaces</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Applications</h3>
                    <p>VDF flooring is ideal for:</p>
                    <ul>
                        <li>Warehouses and distribution centers</li>
                        <li>Manufacturing facilities</li>
                        <li>Logistics hubs and loading docks</li>
                        <li>Industrial workshops</li>
                        <li>Commercial garages and parking areas</li>
                        <li>Retail spaces with heavy foot traffic</li>
                    </ul>
                </div>
            `
        },
        'epoxy-flooring': {
            title: 'Epoxy Flooring',
            mainImage: 'images/efjs.jpeg',
            description: `
                <div class="service-detail-section">
                    <h3>What is Epoxy Flooring?</h3>
                    <p>Epoxy flooring is a durable and protective surface created by applying multiple layers of epoxy resin over a concrete base. The result is a seamless, high-performance floor with excellent resistance to chemicals, impacts, and wear.</p>
                    <p>Our epoxy flooring solutions combine functionality with aesthetics, offering a wide range of colors, patterns, and finishes to match your specific requirements.</p>
                </div>
                
                <div class="service-detail-section">
                    <h3>The Epoxy Flooring Process</h3>
                    <p>Our professional epoxy flooring installation includes:</p>
                    <ul>
                        <li><strong>Surface Preparation:</strong> Thorough cleaning, repairing, and grinding of the concrete substrate.</li>
                        <li><strong>Primer Application:</strong> Applying a high-quality epoxy primer to ensure proper adhesion.</li>
                        <li><strong>Base Coat:</strong> Laying the main epoxy layer with your chosen color and additives.</li>
                        <li><strong>Decorative Elements:</strong> Adding color flakes, metallic pigments, or other decorative elements if desired.</li>
                        <li><strong>Top Coat:</strong> Applying a clear protective sealer to enhance durability and shine.</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Benefits of Epoxy Flooring</h3>
                    <ul>
                        <li>Exceptional durability and longevity</li>
                        <li>Resistance to chemicals, oils, acids, and solvents</li>
                        <li>Impact and abrasion resistance</li>
                        <li>Seamless, non-porous surface that's easy to clean</li>
                        <li>Customizable appearance with various colors and finishes</li>
                        <li>Enhanced light reflection for brighter spaces</li>
                        <li>Anti-slip options for improved safety</li>
                        <li>Environmentally friendly and low-maintenance</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Applications</h3>
                    <p>Epoxy flooring is ideal for:</p>
                    <ul>
                        <li>Industrial facilities and factories</li>
                        <li>Warehouses and storage areas</li>
                        <li>Commercial kitchens and food processing areas</li>
                        <li>Hospitals and healthcare facilities</li>
                        <li>Pharmaceutical and laboratory environments</li>
                        <li>Showrooms and retail spaces</li>
                        <li>Residential garages and basements</li>
                    </ul>
                </div>
            `
        },
        'stamped-concrete-flooring': {
            title: 'Stamped Concrete Flooring',
            mainImage: 'images/scfjs.jpg',
            description: `
                <div class="service-detail-section">
                    <h3>What is Stamped Concrete Flooring?</h3>
                    <p>Stamped concrete flooring is a decorative technique where concrete is patterned, textured, or embossed to resemble natural materials like brick, stone, slate, tile, or even wood. This versatile flooring option combines the durability of concrete with stunning aesthetic appeal.</p>
                    <p>Our stamped concrete solutions offer the beauty of natural materials at a fraction of the cost, with superior durability and minimal maintenance requirements.</p>
                </div>
                
                <div class="service-detail-section">
                    <h3>The Stamped Concrete Process</h3>
                    <p>Our professional stamped concrete installation includes:</p>
                    <ul>
                        <li><strong>Site Preparation:</strong> Properly preparing and grading the area.</li>
                        <li><strong>Concrete Pouring:</strong> Mixing and pouring high-quality concrete.</li>
                        <li><strong>Color Application:</strong> Adding integral colors, color hardeners, or release agents.</li>
                        <li><strong>Stamping:</strong> Imprinting patterns using specialized stamps while concrete is still workable.</li>
                        <li><strong>Detailing:</strong> Hand-detailing for authentic textures and patterns.</li>
                        <li><strong>Sealing:</strong> Applying protective sealers to enhance color and durability.</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Benefits of Stamped Concrete</h3>
                    <ul>
                        <li>Endless design possibilities with numerous patterns and colors</li>
                        <li>Authentic appearance of premium materials at lower cost</li>
                        <li>Superior durability and weather resistance</li>
                        <li>Low maintenance requirements</li>
                        <li>Longer lifespan than many natural materials</li>
                        <li>Seamless installation without gaps or joints</li>
                        <li>Environmentally friendly alternative to quarried stone</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Applications</h3>
                    <p>Stamped concrete is ideal for:</p>
                    <ul>
                        <li>Patios and outdoor living spaces</li>
                        <li>Driveways and walkways</li>
                        <li>Pool decks and surrounds</li>
                        <li>Interior flooring</li>
                        <li>Commercial entryways and courtyards</li>
                        <li>Theme parks and decorative public spaces</li>
                        <li>Retail environments</li>
                    </ul>
                </div>
            `
        },
        'waterproofing-services': {
            title: 'Waterproofing Services',
            mainImage: 'images/waterproofing.jpg',
            description: `
                <div class="service-detail-section">
                    <h3>Professional Waterproofing Solutions</h3>
                    <p>Our comprehensive waterproofing services protect your home or commercial space from water damage, leakage, and moisture-related issues. We employ advanced techniques and high-quality materials to ensure long-lasting protection against water infiltration.</p>
                    <p>From foundations to rooftops, our expert team provides tailored waterproofing solutions that safeguard your property's structural integrity and create healthier living and working environments.</p>
                </div>
                
                <div class="service-detail-section">
                    <h3>Our Waterproofing Process</h3>
                    <p>Our professional waterproofing service includes:</p>
                    <ul>
                        <li><strong>Thorough Inspection:</strong> Identifying existing and potential water intrusion points.</li>
                        <li><strong>Surface Preparation:</strong> Cleaning and repairing surfaces to ensure proper application.</li>
                        <li><strong>Priming:</strong> Applying specialized primers for optimal adherence.</li>
                        <li><strong>Membrane Application:</strong> Installing high-performance waterproofing membranes.</li>
                        <li><strong>Protective Layer:</strong> Adding drainage or protective layers as needed.</li>
                        <li><strong>Finishing:</strong> Completing with appropriate finishing materials.</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Benefits of Professional Waterproofing</h3>
                    <ul>
                        <li>Prevention of structural damage to buildings</li>
                        <li>Protection against mold and mildew growth</li>
                        <li>Improved indoor air quality</li>
                        <li>Increased property value</li>
                        <li>Reduced maintenance and repair costs</li>
                        <li>Energy efficiency improvements</li>
                        <li>Extended lifespan of building materials</li>
                        <li>Peace of mind during severe weather conditions</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Areas We Waterproof</h3>
                    <p>Our waterproofing services cover:</p>
                    <ul>
                        <li>Basements and foundations</li>
                        <li>Bathrooms and wet areas</li>
                        <li>Rooftops and terraces</li>
                        <li>Balconies and exposed areas</li>
                        <li>Swimming pools and water features</li>
                        <li>Retaining walls</li>
                        <li>Commercial buildings and facilities</li>
                        <li>Industrial structures</li>
                    </ul>
                </div>
            `
        },
        'color-hardener-flooring': {
            title: 'Color Hardener Flooring',
            mainImage: 'images/chfjs.jpg',
            description: `
                <div class="service-detail-section">
                    <h3>What is Color Hardener Flooring?</h3>
                    <p>Color hardener flooring is a specialized concrete treatment that enhances the strength, durability, and visual appeal of concrete surfaces. It uses a dry-shake powder containing cement, pigments, and hardening agents that is applied to freshly poured concrete.</p>
                    <p>The result is a vibrant, long-lasting colored surface with significantly improved wear resistance, making it ideal for both decorative and high-traffic applications.</p>
                </div>
                
                <div class="service-detail-section">
                    <h3>The Color Hardener Process</h3>
                    <p>Our professional color hardener application includes:</p>
                    <ul>
                        <li><strong>Concrete Preparation:</strong> Pouring and initial leveling of the concrete base.</li>
                        <li><strong>Timing:</strong> Waiting for the optimal moment when bleed water has evaporated.</li>
                        <li><strong>Color Hardener Application:</strong> Broadcasting the dry-shake powder evenly over the surface in multiple passes.</li>
                        <li><strong>Floating:</strong> Working the material into the surface using mechanical or hand floats.</li>
                        <li><strong>Troweling:</strong> Final finishing to achieve the desired smoothness and texture.</li>
                        <li><strong>Curing and Sealing:</strong> Properly curing the surface and applying a protective sealer.</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Benefits of Color Hardener Flooring</h3>
                    <ul>
                        <li>Superior abrasion and wear resistance</li>
                        <li>Rich, consistent coloration</li>
                        <li>Increased surface strength (up to 80% harder than regular concrete)</li>
                        <li>Enhanced durability in freeze-thaw environments</li>
                        <li>Reduced dusting and maintenance</li>
                        <li>Excellent UV stability for long-lasting color</li>
                        <li>Can be used in conjunction with stamping techniques</li>
                        <li>Wide range of color options</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Applications</h3>
                    <p>Color hardener flooring is ideal for:</p>
                    <ul>
                        <li>Commercial entrances and walkways</li>
                        <li>Plazas and public spaces</li>
                        <li>Residential driveways and patios</li>
                        <li>Stamped and decorative concrete</li>
                        <li>Pool decks and surrounds</li>
                        <li>Retail floors</li>
                        <li>Restaurant and hospitality environments</li>
                    </ul>
                </div>
            `
        },
        'rcc-flooring': {
            title: 'RCC Flooring',
            mainImage: 'images/rcfjs.png',
            description: `
                <div class="service-detail-section">
                    <h3>What is RCC Flooring?</h3>
                    <p>Reinforced Cement Concrete (RCC) flooring is a high-strength flooring solution that combines concrete with steel reinforcement to create exceptionally durable surfaces. The steel reinforcement, typically in the form of rebar or mesh, significantly enhances the concrete's tensile strength and load-bearing capacity.</p>
                    <p>RCC flooring provides superior structural integrity and longevity, making it ideal for areas subject to heavy loads, high traffic, or demanding industrial environments.</p>
                </div>
                
                <div class="service-detail-section">
                    <h3>The RCC Flooring Process</h3>
                    <p>Our professional RCC flooring installation includes:</p>
                    <ul>
                        <li><strong>Site Preparation:</strong> Excavation, leveling, and compaction of the base.</li>
                        <li><strong>Formwork:</strong> Creating boundaries and establishing the final floor level.</li>
                        <li><strong>Reinforcement Placement:</strong> Installing steel rebar or mesh in a calculated pattern.</li>
                        <li><strong>Concrete Pouring:</strong> Using high-grade concrete mix with appropriate strength class.</li>
                        <li><strong>Compaction and Leveling:</strong> Ensuring proper concrete distribution and removing air pockets.</li>
                        <li><strong>Finishing:</strong> Power troweling for smooth finish or specialized texturing if required.</li>
                        <li><strong>Curing:</strong> Proper moisture maintenance for optimal strength development.</li>
                        <li><strong>Joint Cutting:</strong> Creating controlled expansion and contraction joints as needed.</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Benefits of RCC Flooring</h3>
                    <ul>
                        <li>Exceptional structural strength and load-bearing capacity</li>
                        <li>Superior durability and extended service life</li>
                        <li>Resistance to cracking, bending, and deformation</li>
                        <li>Excellent performance under dynamic and static loads</li>
                        <li>Reduced maintenance requirements</li>
                        <li>Fire resistance and safety</li>
                        <li>Sound insulation properties</li>
                        <li>Cost-effective long-term solution</li>
                        <li>Versatility for various applications</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Applications</h3>
                    <p>RCC flooring is ideal for:</p>
                    <ul>
                        <li>Heavy industrial facilities</li>
                        <li>Manufacturing plants</li>
                        <li>Warehouses with heavy machinery</li>
                        <li>Loading docks and shipping areas</li>
                        <li>Multi-story commercial buildings</li>
                        <li>Data centers</li>
                        <li>Cold storage facilities</li>
                        <li>High-rise residential structures</li>
                        <li>Institutional buildings</li>
                    </ul>
                </div>
            `
        },
        'industrial-flooring': {
            title: 'Industrial Flooring',
            mainImage: 'images/industrialflooring.jpg',
            description: `
                <div class="service-detail-section">
                    <h3>Industrial Flooring Solutions</h3>
                    <p>Our industrial flooring solutions are engineered to meet the demanding requirements of manufacturing facilities, warehouses, and production environments. We provide specialized flooring systems that deliver exceptional performance under heavy machinery, chemical exposure, and continuous use.</p>
                    <p>With our extensive experience in industrial applications, we offer customized flooring solutions that combine durability, safety, and functionality for your specific operational needs.</p>
                </div>
                
                <div class="service-detail-section">
                    <h3>Our Industrial Flooring Systems</h3>
                    <p>We offer a comprehensive range of industrial flooring solutions:</p>
                    <ul>
                        <li><strong>Heavy-Duty Concrete Floors:</strong> Reinforced high-strength concrete systems.</li>
                        <li><strong>Chemical-Resistant Epoxy Systems:</strong> Protection against acids, alkalis, solvents, and other chemicals.</li>
                        <li><strong>Anti-Static/ESD Flooring:</strong> For electronics manufacturing and sensitive equipment areas.</li>
                        <li><strong>Impact-Resistant Surfaces:</strong> Designed to withstand heavy drops and equipment movement.</li>
                        <li><strong>Thermal-Resistant Flooring:</strong> For high-temperature environments.</li>
                        <li><strong>Non-Slip Safety Surfaces:</strong> Enhanced traction in wet or oily conditions.</li>
                        <li><strong>Hygienic Antimicrobial Floors:</strong> For food processing and pharmaceutical facilities.</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Benefits of Our Industrial Flooring</h3>
                    <ul>
                        <li>Exceptional durability under extreme conditions</li>
                        <li>Resistance to chemicals, oils, and industrial fluids</li>
                        <li>High compressive and tensile strength</li>
                        <li>Abrasion and impact resistance</li>
                        <li>Easy maintenance and cleaning</li>
                        <li>Customizable slip resistance for safety</li>
                        <li>Temperature and thermal shock resistance</li>
                        <li>Seamless installation options</li>
                        <li>Dust-free surfaces for sensitive environments</li>
                        <li>Compliance with industry standards and regulations</li>
                    </ul>
                </div>
                
                <div class="service-detail-section">
                    <h3>Industries We Serve</h3>
                    <p>Our industrial flooring solutions are ideal for:</p>
                    <ul>
                        <li>Manufacturing facilities</li>
                        <li>Automotive and aerospace industries</li>
                        <li>Food and beverage processing</li>
                        <li>Pharmaceutical and healthcare</li>
                        <li>Chemical processing plants</li>
                        <li>Electronics manufacturing</li>
                        <li>Warehousing and distribution centers</li>
                        <li>Power plants and utilities</li>
                        <li>Military and defense facilities</li>
                        <li>Transportation and logistics hubs</li>
                    </ul>
                </div>
            `
        }
    };
    
    // Function to open modal for a specific service
    function openServiceModal(serviceId) {
        if (serviceContent[serviceId]) {
            const service = serviceContent[serviceId];
            
            // Populate modal with content
            modalContent.innerHTML = `
                <img src="${service.mainImage}" alt="${service.title}" class="service-detail-image">
                <h2 class="service-detail-title">${service.title}</h2>
                <div class="service-detail-content">
                    ${service.description}
                </div>
            `;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            
            // Close the services submenu if it's open
            if (servicesSubmenu && servicesSubmenu.classList.contains('active')) {
                servicesSubmenu.classList.remove('active');
            }
        }
    }
    
    // Handle click on Read More links
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            openServiceModal(serviceId);
        });
    });
    
    // Handle click on service submenu links
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            openServiceModal(serviceId);
        });
    });
    
    // Close modal when clicking X button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close modal if clicking outside content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form element
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;  // Fixed typo here
            });
            
            // Send data to Google Sheet using the Fetch API
            fetch('https://script.google.com/macros/s/AKfycbxBVwDUOujgL-HwaWkK-QrIShKooCKDBErxNv9Dn9SR5m5TK1lv37EQJfvbeop3ZWk8/exec', {
                method: 'POST',
                body: JSON.stringify(formDataObj),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors' // This is important for CORS issues
            })
            .then(response => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.appendChild(successMessage);
                
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error-message';
                errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                contactForm.appendChild(errorMessage);
                
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            });
        });
    }
});
