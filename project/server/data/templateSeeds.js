const templates = [
  {
    name: "Restaurant Classic",
    description: "A classic restaurant template with menu sections, about page, contact information, and online reservation capabilities.",
    category: "restaurant",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/restaurant-classic",
    features: [
      "Online Menu with Categories",
      "Reservation System",
      "Photo Gallery",
      "Contact Form",
      "Mobile Responsive"
    ],
    settings: {
      colors: {
        primary: "#8d6e63",
        secondary: "#ff5722",
        background: "#ffffff",
        text: "#333333",
        accent: "#4caf50"
      },
      fonts: {
        heading: "Playfair Display",
        body: "Lato"
      },
      layout: {
        headerStyle: "centered",
        footerStyle: "standard",
        contentWidth: "wide",
        productDisplayStyle: "grid"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Welcome to Our Restaurant</h1><p>Enjoy a memorable dining experience with our exquisite cuisine.</p>"
      },
      {
        name: "Menu",
        slug: "menu",
        content: "<h1>Our Menu</h1><p>Explore our chef's special dishes and seasonal offerings.</p>"
      },
      {
        name: "About Us",
        slug: "about",
        content: "<h1>Our Story</h1><p>Learn about our restaurant's history and culinary philosophy.</p>"
      },
      {
        name: "Contact",
        slug: "contact",
        content: "<h1>Get in Touch</h1><p>Make reservations or send us your feedback.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
        price: 12.99,
        imageUrl: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Pizza"
      },
      {
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
        price: 8.99,
        imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Salads"
      },
      {
        name: "Pasta Carbonara",
        description: "Spaghetti with creamy sauce, pancetta, eggs, and parmesan cheese",
        price: 14.99,
        imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Pasta"
      }
    ],
    isActive: true
  },
  {
    name: "Modern Bistro",
    description: "Contemporary bistro theme with a clean, minimalist design. Perfect for cafes, bistros, and modern dining venues.",
    category: "restaurant",
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/modern-bistro",
    features: [
      "Digital Menu Cards with QR Codes",
      "Table Reservation System",
      "Chef's Specials Showcase",
      "Customer Reviews Integration",
      "Social Media Sharing"
    ],
    settings: {
      colors: {
        primary: "#212121",
        secondary: "#f50057",
        background: "#f5f5f5",
        text: "#212121",
        accent: "#03a9f4"
      },
      fonts: {
        heading: "Montserrat",
        body: "Open Sans"
      },
      layout: {
        headerStyle: "minimal",
        footerStyle: "minimal",
        contentWidth: "contained",
        productDisplayStyle: "grid"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Modern Bistro Experience</h1><p>A contemporary dining experience in the heart of the city.</p>"
      },
      {
        name: "Menu",
        slug: "menu",
        content: "<h1>Seasonal Menu</h1><p>Our menu changes with the seasons to bring you the freshest ingredients.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Avocado Toast",
        description: "Artisanal sourdough bread topped with fresh avocado, cherry tomatoes, and micro greens",
        price: 9.99,
        imageUrl: "https://images.unsplash.com/photo-1603046891744-76e6481cf539?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Breakfast"
      },
      {
        name: "Truffle Fries",
        description: "Hand-cut potato fries tossed with truffle oil and parmesan cheese",
        price: 7.99,
        imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Sides"
      }
    ],
    isActive: true
  },
  {
    name: "Fashion Boutique",
    description: "Elegant and clean template designed for clothing stores and fashion boutiques with product showcase and lookbook features.",
    category: "clothing",
    thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/fashion-boutique",
    features: [
      "Product Categories",
      "Size Guide",
      "Wishlist Feature",
      "Instagram Feed Integration",
      "Advanced Product Filters"
    ],
    settings: {
      colors: {
        primary: "#000000",
        secondary: "#e91e63",
        background: "#ffffff",
        text: "#212121",
        accent: "#9c27b0"
      },
      fonts: {
        heading: "Raleway",
        body: "Nunito"
      },
      layout: {
        headerStyle: "minimal",
        footerStyle: "expanded",
        contentWidth: "wide",
        productDisplayStyle: "grid"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Latest Collection</h1><p>Discover our newest arrivals and trending styles.</p>"
      },
      {
        name: "Collections",
        slug: "collections",
        content: "<h1>Our Collections</h1><p>Browse our seasonal collections and signature pieces.</p>"
      },
      {
        name: "Lookbook",
        slug: "lookbook",
        content: "<h1>Fashion Lookbook</h1><p>Get inspired with our style guides and outfit ideas.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Classic Denim Jacket",
        description: "Timeless denim jacket with a comfortable fit and durable construction",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Outerwear"
      },
      {
        name: "Cotton T-Shirt",
        description: "Premium cotton t-shirt with a relaxed fit, available in multiple colors",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Tops"
      },
      {
        name: "Slim Fit Jeans",
        description: "Modern slim fit jeans with stretch technology for maximum comfort",
        price: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Bottoms"
      }
    ],
    isActive: true
  },
  {
    name: "Tech Store",
    description: "Modern e-commerce template optimized for electronics stores with product comparison features and technical specifications.",
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/tech-store",
    features: [
      "Product Comparison Tool",
      "Technical Specifications Tables",
      "Customer Reviews & Ratings",
      "Related Products Suggestions",
      "Recently Viewed Items"
    ],
    settings: {
      colors: {
        primary: "#1976d2",
        secondary: "#ff6d00",
        background: "#eceff1",
        text: "#263238",
        accent: "#43a047"
      },
      fonts: {
        heading: "Roboto",
        body: "Open Sans"
      },
      layout: {
        headerStyle: "standard",
        footerStyle: "expanded",
        contentWidth: "full",
        productDisplayStyle: "grid"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Latest Tech Products</h1><p>Discover the newest gadgets and tech innovations.</p>"
      },
      {
        name: "Deals",
        slug: "deals",
        content: "<h1>Special Offers</h1><p>Limited time deals on our best-selling products.</p>"
      },
      {
        name: "Support",
        slug: "support",
        content: "<h1>Technical Support</h1><p>Get help with your purchases and technical issues.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Wireless Earbuds",
        description: "True wireless earbuds with active noise cancellation and 24-hour battery life",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1606741965429-02a7168658d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Audio"
      },
      {
        name: "Smart Watch",
        description: "Advanced smartwatch with health tracking, GPS, and smartphone notifications",
        price: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Wearables"
      },
      {
        name: "4K Streaming Device",
        description: "Stream your favorite content in 4K HDR with voice control and smart home integration",
        price: 49.99,
        imageUrl: "https://images.unsplash.com/photo-1540829016269-e05840a9b88c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Smart Home"
      }
    ],
    isActive: true
  },
  {
    name: "General Store",
    description: "Versatile e-commerce template suitable for a wide range of products with advanced search and filtering options.",
    category: "ecommerce",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/general-store",
    features: [
      "Advanced Search Functionality",
      "Multi-category Product Management",
      "Customer Accounts",
      "Order Tracking",
      "Featured Products Carousel"
    ],
    settings: {
      colors: {
        primary: "#1565c0",
        secondary: "#ff5722",
        background: "#ffffff",
        text: "#212121",
        accent: "#8bc34a"
      },
      fonts: {
        heading: "Poppins",
        body: "Roboto"
      },
      layout: {
        headerStyle: "standard",
        footerStyle: "standard",
        contentWidth: "contained",
        productDisplayStyle: "grid"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Welcome to Our Store</h1><p>Shop our wide selection of quality products.</p>"
      },
      {
        name: "Sale",
        slug: "sale",
        content: "<h1>Special Offers</h1><p>Discover our latest deals and discounts.</p>"
      },
      {
        name: "FAQ",
        slug: "faq",
        content: "<h1>Frequently Asked Questions</h1><p>Find answers to common questions about our products and services.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Essential Oil Diffuser",
        description: "Ultrasonic aromatherapy diffuser with color-changing LED lights and auto shut-off",
        price: 24.99,
        imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Home"
      },
      {
        name: "Stainless Steel Water Bottle",
        description: "Double-walled insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours",
        price: 19.99,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Lifestyle"
      },
      {
        name: "Bamboo Cutting Board",
        description: "Eco-friendly bamboo cutting board with juice groove and handle",
        price: 29.99,
        imageUrl: "https://images.unsplash.com/photo-1648498265366-07351cbccece?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Kitchen"
      }
    ],
    isActive: true
  },
  {
    name: "Professional Services",
    description: "Clean, professional template designed for service-based businesses like consultants, lawyers, or freelancers.",
    category: "services",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/professional-services",
    features: [
      "Service Packages Display",
      "Testimonials Section",
      "Team Members Profiles",
      "Appointment Booking System",
      "Portfolio/Case Studies"
    ],
    settings: {
      colors: {
        primary: "#263238",
        secondary: "#2196f3",
        background: "#f5f5f5",
        text: "#212121",
        accent: "#009688"
      },
      fonts: {
        heading: "Montserrat",
        body: "Source Sans Pro"
      },
      layout: {
        headerStyle: "standard",
        footerStyle: "minimal",
        contentWidth: "contained",
        productDisplayStyle: "list"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Expert Solutions</h1><p>Professional services tailored to your unique needs.</p>"
      },
      {
        name: "Services",
        slug: "services",
        content: "<h1>Our Services</h1><p>Comprehensive service offerings to help you achieve your goals.</p>"
      },
      {
        name: "About",
        slug: "about",
        content: "<h1>About Us</h1><p>Learn more about our team and our approach.</p>"
      },
      {
        name: "Contact",
        slug: "contact",
        content: "<h1>Get in Touch</h1><p>Schedule a consultation or request more information.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Business Consultation",
        description: "Strategic business advice to optimize operations and improve growth",
        price: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Consulting"
      },
      {
        name: "Website Audit",
        description: "Comprehensive analysis of your website's performance, SEO, and user experience",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Digital"
      },
      {
        name: "Marketing Strategy",
        description: "Customized marketing plan to reach your target audience and achieve business goals",
        price: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Marketing"
      }
    ],
    isActive: true
  },
  {
    name: "Portfolio Showcase",
    description: "Elegant portfolio template for artists, photographers, designers, and creative professionals to showcase their work.",
    category: "other",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/portfolio-showcase",
    features: [
      "Project Gallery with Filtering",
      "Image Lightbox",
      "Client Testimonials",
      "Contact Form",
      "Social Media Integration"
    ],
    settings: {
      colors: {
        primary: "#212121",
        secondary: "#9e9e9e",
        background: "#ffffff",
        text: "#212121",
        accent: "#ec407a"
      },
      fonts: {
        heading: "Playfair Display",
        body: "Raleway"
      },
      layout: {
        headerStyle: "minimal",
        footerStyle: "minimal",
        contentWidth: "wide",
        productDisplayStyle: "grid"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Creative Portfolio</h1><p>Showcasing my best work and creative projects.</p>"
      },
      {
        name: "Portfolio",
        slug: "portfolio",
        content: "<h1>My Work</h1><p>A collection of my most recent and notable projects.</p>"
      },
      {
        name: "About Me",
        slug: "about",
        content: "<h1>About Me</h1><p>Learn more about my background and creative process.</p>"
      },
      {
        name: "Contact",
        slug: "contact",
        content: "<h1>Get in Touch</h1><p>Interested in working together? Let's connect.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Logo Design",
        description: "Custom logo design with multiple iterations and source files",
        price: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Design"
      },
      {
        name: "Portrait Photography",
        description: "Professional portrait photography session with retouched digital images",
        price: 249.99,
        imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Photography"
      }
    ],
    isActive: true
  },
  {
    name: "Fitness Club",
    description: "Dynamic template for fitness centers, gyms, and personal trainers with class schedules and membership options.",
    category: "other",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    previewUrl: "https://demos.bazaario.com/fitness-club",
    features: [
      "Class Schedule Calendar",
      "Trainer Profiles",
      "Membership Plans",
      "Fitness Blog",
      "Online Class Booking"
    ],
    settings: {
      colors: {
        primary: "#f44336",
        secondary: "#212121",
        background: "#f5f5f5",
        text: "#212121",
        accent: "#ffeb3b"
      },
      fonts: {
        heading: "Oswald",
        body: "Roboto"
      },
      layout: {
        headerStyle: "standard",
        footerStyle: "standard",
        contentWidth: "full",
        productDisplayStyle: "grid"
      }
    },
    pages: [
      {
        name: "Home",
        slug: "home",
        content: "<h1>Transform Your Body</h1><p>Start your fitness journey with our expert trainers and state-of-the-art facilities.</p>"
      },
      {
        name: "Classes",
        slug: "classes",
        content: "<h1>Fitness Classes</h1><p>Explore our diverse range of group fitness classes for all levels.</p>"
      },
      {
        name: "Memberships",
        slug: "memberships",
        content: "<h1>Join Our Club</h1><p>Choose the membership plan that suits your fitness goals and schedule.</p>"
      }
    ],
    defaultProducts: [
      {
        name: "Monthly Membership",
        description: "Unlimited access to the gym and fitness classes for one month",
        price: 49.99,
        imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Memberships"
      },
      {
        name: "Personal Training (5 Sessions)",
        description: "Five one-on-one training sessions with a certified personal trainer",
        price: 249.99,
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Training"
      }
    ],
    isActive: true
  }
];

module.exports = templates;
