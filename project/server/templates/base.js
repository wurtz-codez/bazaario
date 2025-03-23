const { createPrimaryColorVariables } = require('./utils');

/**
 * Generates the base HTML template structure
 * @param {Object} website - The website object
 * @param {Array} products - Array of product objects
 * @param {String} slug - The website slug/domain
 * @returns {String} - HTML template string
 */
function generateBaseTemplate(website, products, slug) {
  // Extract RGB values for gradient backgrounds
  const primaryColorRGB = createPrimaryColorVariables(website.settings?.colors?.primary || '#3f51b5');
  const secondaryColorRGB = createPrimaryColorVariables(website.settings?.colors?.secondary || '#f50057');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${website.name}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${website.description || 'Website created with Bazaario'}">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary-color: ${website.settings?.colors?.primary || '#3f51b5'};
            --primary-color-rgb: ${primaryColorRGB};
            --secondary-color: ${website.settings?.colors?.secondary || '#f50057'};
            --secondary-color-rgb: ${secondaryColorRGB};
            --text-color: ${website.settings?.colors?.text || '#333333'};
            --background-color: ${website.settings?.colors?.background || '#ffffff'};
            --header-font: "${website.settings?.fonts?.heading || 'Poppins'}", sans-serif;
            --body-font: "${website.settings?.fonts?.body || 'Inter'}", sans-serif;
            --content-width: ${website.settings?.layout?.contentWidth === 'contained' ? '1200px' : '100%'};
            --transition-speed: 0.3s;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
            --spacing-xs: 0.5rem;
            --spacing-sm: 1rem;
            --spacing-md: 2rem;
            --spacing-lg: 3rem;
            --border-radius: 8px;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: var(--body-font);
            margin: 0;
            padding: 0;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--header-font);
            color: var(--primary-color);
            line-height: 1.3;
          }
          
          a {
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-speed);
          }
          
          img {
            max-width: 100%;
          }
          
          /* Header and Navigation */
          header {
            background-color: var(--primary-color);
            color: white;
            padding: var(--spacing-md) var(--spacing-sm);
            text-align: center;
            position: relative;
            box-shadow: var(--shadow-sm);
          }
          
          .logo {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: var(--spacing-xs);
            letter-spacing: -0.5px;
          }
          
          .navbar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            background-color: rgba(255,255,255,0.1);
            padding: var(--spacing-xs);
            border-radius: var(--border-radius);
            margin-top: var(--spacing-xs);
          }
          
          .navbar a {
            color: white;
            text-decoration: none;
            padding: var(--spacing-xs) var(--spacing-sm);
            margin: 0 var(--spacing-xs);
            border-radius: var(--border-radius);
            transition: background-color var(--transition-speed), transform var(--transition-speed);
            font-weight: 500;
          }
          
          .navbar a:hover {
            background-color: rgba(255,255,255,0.2);
            transform: translateY(-2px);
          }
          
          /* Mobile menu toggle */
          .menu-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin: 0 auto;
            margin-top: var(--spacing-xs);
          }
          
          /* Main Content */
          main {
            max-width: var(--content-width);
            margin: 0 auto;
            padding: var(--spacing-md);
          }
          
          /* Hero Section */
          .hero {
            text-align: center;
            padding: var(--spacing-lg) var(--spacing-sm);
            background-color: var(--background-color);
            margin-bottom: var(--spacing-lg);
            position: relative;
            overflow: hidden;
            border-radius: var(--border-radius);
          }
          
          .hero::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(135deg, rgba(var(--primary-color-rgb), 0.1) 0%, rgba(var(--secondary-color-rgb), 0.1) 100%);
            z-index: -1;
          }
          
          .hero h1 {
            font-size: 2.8rem;
            margin-bottom: var(--spacing-sm);
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }
          
          .hero p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto var(--spacing-md);
            opacity: 0.9;
          }
          
          /* Buttons */
          .btn {
            background-color: var(--secondary-color);
            color: white;
            border: none;
            padding: 0.75rem 1.75rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            display: inline-block;
            margin-top: var(--spacing-sm);
            text-decoration: none;
            transition: all var(--transition-speed);
            box-shadow: var(--shadow-md);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .btn:hover {
            background-color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
          }
          
          .btn-outline {
            background-color: transparent;
            color: var(--secondary-color);
            border: 2px solid var(--secondary-color);
            margin-left: var(--spacing-sm);
          }
          
          .btn-outline:hover {
            background-color: var(--secondary-color);
            color: white;
          }
          
          /* Products/Services Grid */
          .section-title {
            text-align: center;
            margin-bottom: var(--spacing-md);
            position: relative;
            padding-bottom: var(--spacing-xs);
          }
          
          .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: var(--secondary-color);
          }
          
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: var(--spacing-md);
            margin-top: var(--spacing-md);
          }
          
          .product-card {
            border-radius: var(--border-radius);
            overflow: hidden;
            transition: transform var(--transition-speed), box-shadow var(--transition-speed);
            background-color: white;
            box-shadow: var(--shadow-sm);
            position: relative;
          }
          
          .product-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-lg);
          }
          
          .product-badge {
            position: absolute;
            top: var(--spacing-xs);
            right: var(--spacing-xs);
            background-color: var(--secondary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 2;
          }
          
          .product-image-container {
            position: relative;
            overflow: hidden;
            height: 220px;
          }
          
          .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform var(--transition-speed);
          }
          
          .product-card:hover .product-image {
            transform: scale(1.05);
          }
          
          .product-info {
            padding: var(--spacing-sm);
          }
          
          .product-info h3 {
            margin-bottom: var(--spacing-xs);
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-color);
            transition: color var(--transition-speed);
          }
          
          .product-card:hover .product-info h3 {
            color: var(--primary-color);
          }
          
          .product-price {
            font-weight: bold;
            color: var(--secondary-color);
            font-size: 1.3rem;
            margin-top: var(--spacing-xs);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .product-actions {
            margin-top: var(--spacing-sm);
            display: flex;
            justify-content: space-between;
          }
          
          .btn-sm {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }
          
          /* About Section */
          .about-section {
            margin-top: var(--spacing-lg);
            text-align: center;
            padding: var(--spacing-md);
            border-top: 1px solid #eee;
            background-color: rgba(0,0,0,0.02);
            border-radius: var(--border-radius);
          }
          
          /* Features Section */
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: var(--spacing-md);
            margin: var(--spacing-lg) 0;
          }
          
          .feature-card {
            text-align: center;
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            background-color: white;
            box-shadow: var(--shadow-sm);
            transition: transform var(--transition-speed), box-shadow var(--transition-speed);
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-md);
          }
          
          .feature-icon {
            font-size: 2.5rem;
            margin-bottom: var(--spacing-sm);
            color: var(--primary-color);
          }
          
          /* Footer */
          footer {
            background-color: var(--primary-color);
            color: white;
            padding: var(--spacing-lg) var(--spacing-md);
            text-align: center;
            margin-top: var(--spacing-lg);
          }
          
          .footer-content {
            max-width: var(--content-width);
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-lg);
            text-align: left;
          }
          
          .footer-column h3 {
            color: white;
            margin-bottom: var(--spacing-sm);
            font-size: 1.2rem;
          }
          
          .footer-links {
            display: flex;
            flex-direction: column;
          }
          
          .footer-links a {
            color: rgba(255, 255, 255, 0.8);
            margin: 0.3rem 0;
            transition: color var(--transition-speed);
          }
          
          .footer-links a:hover {
            color: white;
            text-decoration: underline;
          }
          
          .social-links {
            display: flex;
            gap: var(--spacing-sm);
            margin-top: var(--spacing-xs);
          }
          
          .social-icon {
            background-color: rgba(255,255,255,0.2);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color var(--transition-speed), transform var(--transition-speed);
          }
          
          .social-icon:hover {
            background-color: rgba(255,255,255,0.4);
            transform: scale(1.1);
          }
          
          .copyright {
            margin-top: var(--spacing-md);
            padding-top: var(--spacing-sm);
            border-top: 1px solid rgba(255,255,255,0.1);
            text-align: center;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.8);
          }
          
          .copyright a {
            color: white;
            text-decoration: underline;
          }
          
          /* Preview Badge */
          .preview-badge {
            position: fixed;
            top: 0;
            right: 0;
            background-color: #ff5722;
            color: white;
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 1000;
            box-shadow: var(--shadow-md);
            border-bottom-left-radius: var(--border-radius);
          }
          
          /* Responsive Adjustments */
          @media (max-width: 992px) {
            :root {
              --spacing-lg: 2.5rem;
            }
            
            .hero h1 {
              font-size: 2.5rem;
            }
          }
          
          @media (max-width: 768px) {
            :root {
              --spacing-md: 1.5rem;
              --spacing-lg: 2rem;
            }
            
            .hero h1 {
              font-size: 2rem;
            }
            
            .products-grid {
              grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            }
            
            .navbar {
              display: none;
              flex-direction: column;
              width: 100%;
            }
            
            .navbar.active {
              display: flex;
            }
            
            .navbar a {
              margin: 0.3rem 0;
              width: 100%;
              text-align: center;
            }
            
            .menu-toggle {
              display: block;
            }
            
            .footer-content {
              grid-template-columns: 1fr;
              gap: var(--spacing-md);
            }
          }
          
          @media (max-width: 480px) {
            :root {
              --spacing-sm: 0.75rem;
              --spacing-md: 1.25rem;
            }
            
            .hero h1 {
              font-size: 1.75rem;
            }
            
            .hero p {
              font-size: 1rem;
            }
            
            .products-grid {
              grid-template-columns: 1fr;
            }
            
            .btn {
              display: block;
              width: 100%;
              margin-bottom: var(--spacing-xs);
            }
            
            .btn-outline {
              margin-left: 0;
            }
          }
        </style>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const navbar = document.querySelector('.navbar');
            
            if (menuToggle) {
              menuToggle.addEventListener('click', function() {
                navbar.classList.toggle('active');
              });
            }
            
            // Add to cart functionality
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            
            addToCartButtons.forEach(button => {
              button.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = this.getAttribute('data-product');
                
                // Show a simple notification
                const notification = document.createElement('div');
                notification.textContent = productName + ' added to cart!';
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.backgroundColor = 'var(--primary-color)';
                notification.style.color = 'white';
                notification.style.padding = '10px 15px';
                notification.style.borderRadius = 'var(--border-radius)';
                notification.style.boxShadow = 'var(--shadow-md)';
                notification.style.zIndex = '1000';
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.3s';
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                  notification.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                  notification.style.opacity = '0';
                  setTimeout(() => {
                    document.body.removeChild(notification);
                  }, 300);
                }, 3000);
              });
            });
            
            // Smooth scroll for navigation
            const navLinks = document.querySelectorAll('.navbar a');
            
            navLinks.forEach(link => {
              link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                  window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                  });
                  
                  // Close mobile menu if open
                  navbar.classList.remove('active');
                }
              });
            });
          });
        </script>
      </head>
      <body>
        <div class="preview-badge">Preview Mode</div>
        
        <header>
          <div class="logo">${website.name}</div>
          <button class="menu-toggle">☰ Menu</button>
          <nav class="navbar">
            <a href="#home">Home</a>
            <a href="#products">${website.template?.category === 'restaurant' ? 'Menu' : 
              website.template?.category === 'services' ? 'Services' : 'Products'}</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
        
        <main>
          <section class="hero" id="home">
            <h1>Welcome to ${website.name}</h1>
            <p>${website.description || 'Your premier destination for quality products and exceptional service.'}</p>
            <div>
              <a href="#products" class="btn">
                ${website.template?.category === 'restaurant' ? 'View Our Menu' : 
                  website.template?.category === 'services' ? 'Our Services' : 'Shop Now'}
              </a>
              <a href="#contact" class="btn btn-outline">Contact Us</a>
            </div>
          </section>
          
          <section id="products">
            <h2 class="section-title">
              ${website.template?.category === 'restaurant' ? 'Our Menu' : 
                 website.template?.category === 'services' ? 'Our Services' : 'Featured Products'}
            </h2>
            
            <div class="products-grid">
              ${products && products.length > 0 ? 
                products.map((product, index) => `
                  <div class="product-card">
                    ${index === 0 ? '<span class="product-badge">Popular</span>' : ''}
                    <div class="product-image-container">
                      ${product.imageUrl ? 
                        `<img src="${product.imageUrl}" alt="${product.name}" class="product-image">` : 
                        '<div style="height: 100%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">No Image</div>'
                      }
                    </div>
                    <div class="product-info">
                      <h3>${product.name}</h3>
                      <p>${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
                      <div class="product-price">
                        <span>$${product.price.toFixed(2)}</span>
                        <small>${product.compareAtPrice ? `<s>$${product.compareAtPrice.toFixed(2)}</s>` : ''}</small>
                      </div>
                      <div class="product-actions">
                        <a href="#" class="btn btn-sm add-to-cart" data-product="${product.name}">Add to Cart</a>
                        <a href="#" class="btn btn-sm btn-outline">Details</a>
                      </div>
                    </div>
                  </div>
                `).join('') : 
                Array(4).fill().map((_, i) => `
                  <div class="product-card">
                    ${i === 0 ? '<span class="product-badge">Featured</span>' : ''}
                    <div class="product-image-container">
                      <div style="height: 100%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                        Sample Product ${i+1}
                      </div>
                    </div>
                    <div class="product-info">
                      <h3>Sample Product ${i+1}</h3>
                      <p>This is a sample product description. Add real products to your website.</p>
                      <div class="product-price">
                        <span>$19.99</span>
                        ${i === 2 ? '<small><s>$24.99</s></small>' : ''}
                      </div>
                      <div class="product-actions">
                        <a href="#" class="btn btn-sm add-to-cart" data-product="Sample Product ${i+1}">Add to Cart</a>
                        <a href="#" class="btn btn-sm btn-outline">Details</a>
                      </div>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </section>
          
          <section class="features">
            <div class="feature-card">
              <div class="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>We deliver to your doorstep quickly and efficiently.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💯</div>
              <h3>Quality Guarantee</h3>
              <p>All our products come with a satisfaction guarantee.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💁</div>
              <h3>Customer Support</h3>
              <p>Our team is here to help with any questions.</p>
            </div>
          </section>
          
          <section class="about-section" id="about">
            <h2 class="section-title">About Us</h2>
            <p>
              ${website.description ? website.description : 'We are dedicated to providing the highest quality products and services to our customers. Our team is committed to excellence in everything we do.'}
            </p>
            <p style="margin-top: var(--spacing-sm);">
              This website was built with Bazaario using the <strong>${website.template?.name || 'Custom'}</strong> template.
            </p>
          </section>
          
          <section id="contact" style="margin-top: var(--spacing-lg);">
            <h2 class="section-title">Contact Us</h2>
            <div style="max-width: 600px; margin: 0 auto;">
              <form id="contact-form" style="display: grid; gap: var(--spacing-sm);">
                <div>
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: var(--border-radius);" required>
                </div>
                <div>
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: var(--border-radius);" required>
                </div>
                <div>
                  <label for="message">Message</label>
                  <textarea id="message" name="message" rows="5" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: var(--border-radius);" required></textarea>
                </div>
                <button type="submit" class="btn" style="justify-self: start;">Send Message</button>
              </form>
              
              <script>
                document.getElementById('contact-form').addEventListener('submit', function(e) {
                  e.preventDefault();
                  alert('This is a preview mode. In the published site, this form would send a message.');
                  this.reset();
                });
              </script>
            </div>
          </section>
        </main>
        
        <footer>
          <div class="footer-content">
            <div class="footer-column">
              <h3>About ${website.name}</h3>
              <p style="color: rgba(255,255,255,0.8);">
                ${website.description ? website.description.substring(0, 100) + '...' : 'Your premier destination for quality products and services.'}
              </p>
              <div class="social-links">
                <a href="#" class="social-icon">f</a>
                <a href="#" class="social-icon">t</a>
                <a href="#" class="social-icon">in</a>
                <a href="#" class="social-icon">ig</a>
              </div>
            </div>
            
            <div class="footer-column">
              <h3>Quick Links</h3>
              <div class="footer-links">
                <a href="#home">Home</a>
                <a href="#products">Products</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            
            <div class="footer-column">
              <h3>Contact Info</h3>
              <div class="footer-links">
                <a href="mailto:info@${slug}.com">info@${slug}.com</a>
                <a href="tel:+1234567890">123-456-7890</a>
                <p style="color: rgba(255,255,255,0.8);">123 Main Street<br>City, State 12345</p>
              </div>
            </div>
          </div>
          
          <div class="copyright">
            <p>&copy; ${new Date().getFullYear()} ${website.name} - Built with <a href="/">Bazaario</a></p>
            <p style="margin-top: var(--spacing-xs); font-size: 0.8rem;">
              This is a preview of your website. <a href="/">Return to Dashboard</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  `;
}

module.exports = generateBaseTemplate; 