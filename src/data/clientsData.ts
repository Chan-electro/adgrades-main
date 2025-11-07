// Client data shared between Portfolio and ClientDetails components

export interface ClientData {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  logo: string;
  tags: string[];
  duration: string;
  services: string[];
  about: string; // Company overview
  howWeHelped: string; // How Ad Grades helped
  year?: string;
  results?: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
  };
}

export interface ProjectData {
  id: number;
  title: string;
  category: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  tags: string[];
}

// Combined data that adds required fields for both Portfolio and ClientDetails views
export const clientsData: ClientData[] = [
  {
    id: "os-code-solutions",
    name: "OS CODE Solutions",
    category: "IT Solutions",
    description:
      "Emerging IT solutions startup - Social Media Management & Lead Generation",
    logo: "/client/oscode.png",
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop",
    tags: ["Social Media Management", "Lead Generation", "4 months"],
    duration: "4 months",
    services: [
      "Brand Identity Design",
      "Social Media Marketing",
      "Web Development",
    ],
    about:
      "OS Code Solutions is a tech-driven company offering smart digital solutions for businesses looking to scale and streamline. From custom software and ERP systems to automation and workflow optimization, they specialize in turning complex operational needs into seamless digital processes. Known for their practical approach and innovation-first mindset, OS Code Solutions helps businesses become more efficient, responsive, and future-ready. Their strong commitment to client satisfaction and technical excellence has made them a trusted partner for startups and enterprises alike.",
    howWeHelped:
      "Ad Grades teamed up with OS Code Solutions to translate their technical expertise into a compelling online presence. Through strategic *Social Media Management*, we simplified complex offerings into engaging, easy-to-understand content that resonated with their target audience. In parallel, our *Lead Generation campaigns* focused on connecting with business decision-makers and industry-specific prospects — delivering high-quality leads that aligned with OS Code’s service capabilities. Together, these efforts strengthened their brand positioning and opened doors to new business opportunities in competitive digital markets.",
    year: "2024",
    results: [
      {
        metric: "Brand Recognition",
        value: "150%",
        description: "increase in brand awareness",
      },
      {
        metric: "Website Traffic",
        value: "200%",
        description: "growth in organic traffic",
      },
      {
        metric: "Social Engagement",
        value: "300%",
        description: "increase in social media engagement",
      },
    ],
    testimonial: {
      quote:
        "AdGrades transformed our digital presence completely. Their creative approach and technical expertise helped us stand out in the competitive IT market.",
      author: "Founder, OS CODE Solutions",
    },
  },
  {
    id: "delhi-65",
    name: "Delhi 65 – Ranchi Restaurant",
    category: "Food & Beverage",
    description:
      "Restaurant marketing with targeted ad campaigns and social media management",
    logo: "/client/delhi65.png",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?w=400&h=300&fit=crop",
    tags: ["Targeted Ad Campaigns", "Social Media Management", "3 months"],
    duration: "3 months",
    services: [
      "Social Media Marketing",
      "Performance Advertising",
      "Brand Photography",
    ],
    about:
      "Delhi 65 is a vibrant multicuisine restaurant known for its diverse flavors and welcoming atmosphere. Offering a rich blend of North Indian, South Indian, Chinese, and continental dishes, it caters to a wide audience seeking quality dining experiences. Whether it's a casual family dinner or a weekend gathering with friends, Delhi 65 delivers delicious food with a memorable experience. With a commitment to taste, variety, and service, it’s quickly becoming a standout destination in the city’s culinary landscape. The restaurant also regularly updates its menu and ambience to match evolving customer preferences, making every visit feel fresh and exciting.",
    howWeHelped:
      "At Ad Grades, we worked closely with Delhi 65 to bring their brand to life online through dynamic *Social Media Management* and focused *Targeted Ad Campaigns*. Our creative content captured the essence of their cuisine and ambiance, helping build a strong digital presence that resonated with local audiences. Through precise audience targeting and mouth-watering visuals, we drove higher engagement and real-time footfall, turning online interest into repeat diners. We also introduced time-bound promotional campaigns that significantly boosted daily customer inflow and kept the brand top-of-mind in a competitive food space.",
    year: "2024",
    results: [
      {
        metric: "Footfall",
        value: "180%",
        description: "increase in restaurant visitors",
      },
      {
        metric: "Online Orders",
        value: "250%",
        description: "growth in delivery orders",
      },
      {
        metric: "Social Following",
        value: "400%",
        description: "increase in Instagram followers",
      },
    ],
    testimonial: {
      quote:
        "Our restaurant's popularity soared after partnering with AdGrades. Their social media campaigns brought in so many new customers!",
      author: "Owner, Delhi 65",
    },
  },
  {
    id: "medhavi-classes",
    name: "Medhavi Classes",
    category: "Education",
    description:
      "Online education platform with comprehensive digital marketing strategy",
    logo: "/client/medhavi.png",
    image:
      "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?w=400&h=300&fit=crop",
    tags: ["Social Media Management", "Lead Generation", "6 months"],
    duration: "6 months",
    services: ["Digital Marketing", "Student Acquisition", "Content Strategy"],
    about:
      "Medhavi Classes is a modern educational platform dedicated to transforming how students learn. By focusing on practical understanding rather than rote memorization, Medhavi helps students develop strong foundational clarity and real-world problem-solving skills. Their courses are designed to simplify complex academic subjects, making learning more engaging and meaningful. With experienced mentors and a student-first approach, Medhavi has quickly built a reputation for delivering results that go beyond just marks — building confidence, curiosity, and clarity in every learner. Today, Medhavi stands as a trusted name for students who seek both academic excellence and personal growth.",
    howWeHelped:
      "Ad Grades joined hands with Medhavi Classes to turn their powerful educational mission into a strong digital brand. We provided end-to-end *Social Media Management, creating engaging content, visuals, and student-focused messaging that truly reflected Medhavi’s identity. Alongside this, our **Lead Generation strategies* helped bring in a steady stream of qualified student inquiries by targeting the right audience through paid campaigns and optimized funnels. As a result, Medhavi saw significant growth in both visibility and admissions — positioning them as a go-to choice for practical academic learning. Our collaboration helped Medhavi reach more students online while staying true to their core mission of meaningful education.",
    year: "2023",
    results: [
      {
        metric: "Student Enrollments",
        value: "400%",
        description: "increase in new students",
      },
      {
        metric: "Social Following",
        value: "250%",
        description: "growth in social media presence",
      },
      {
        metric: "Engagement Rate",
        value: "300%",
        description: "increase in student interaction",
      },
    ],
    testimonial: {
      quote:
        "AdGrades' marketing strategies helped us reach more students than ever before. Our enrollments quadrupled within months!",
      author: "Director, Medhavi Classes",
    },
  },
  {
    id: "uplifto",
    name: "Uplifto",
    category: "IT Services",
    description:
      "Tech-based startup for IT services with lead generation focus",
    logo: "/client/upliftio.png",
    image:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=300&fit=crop",
    tags: ["Lead Generation", "Social Media Management", "4 months"],
    duration: "4 months",
    services: ["Lead Generation", "Social Media Management", "B2B Marketing"],
    about:
      "Uplifto is a modern hybrid agency that merges digital creativity with smart business tech to help brands grow with purpose. From brand storytelling and content strategy to workflow automation and digital tools, Uplifto is built for businesses that want both visibility and efficiency. With a unique mix of creative insight and technical know-how, they work across industries to solve real challenges while building long-term brand value. Their adaptable, results-driven approach makes them a go-to partner for startups and scaling businesses alike.",
    howWeHelped:
      "At Ad Grades, we helped Uplifto sharpen their brand voice and expand their outreach with strategic *Social Media Management* and *Lead Generation*. We created content that reflected their dual personality — creative and tech-savvy — while targeting the right business audiences through smart, data-backed campaigns. Our lead funnels brought in relevant, conversion-ready prospects, while consistent social content built trust and engagement around the Uplifto name. This partnership helped position Uplifto as not just a service provider, but a brand that uplifts others through innovation and design.",
    year: "2024",
    results: [
      {
        metric: "B2B Leads",
        value: "300%",
        description: "increase in qualified leads",
      },
      {
        metric: "Conversion Rate",
        value: "200%",
        description: "improvement in lead-to-client conversions",
      },
      {
        metric: "Market Presence",
        value: "350%",
        description: "expansion in brand recognition",
      },
    ],
    testimonial: {
      quote:
        "The lead generation campaigns designed by AdGrades transformed our business development approach and brought us high-value clients.",
      author: "CEO, Uplifto",
    },
  },
  {
    id: "vinayaka-enterprises",
    name: "Vinayaka Enterprises",
    category: "Interior Design",
    description:
      "Interior Design Studio with comprehensive business development",
    logo: "/client/vinayaka.jpg",
    image:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=400&h=300&fit=crop",
    tags: [
      "Website Development",
      "Business Strategy",
      "Social Media Management",
    ],
    duration: "5 months",
    services: [
      "Website Development",
      "Business Strategy",
      "Social Media Management",
      "Business Development",
    ],
    about:
      "Vinayaka Enterprises is an innovative Interior Design Studio that blends aesthetics with function to create spaces that inspire. Specializing in residential, commercial, and custom interior solutions, their work is defined by craftsmanship, detail, and design that speaks to individual lifestyle needs. Beyond interiors, Vinayaka also extends into *comprehensive business development*, helping clients structure their ventures with a strong foundation in branding, strategy, and identity. Their multi-dimensional approach ensures that every space they design — and every business they support — grows with purpose and character.",
    howWeHelped:
      "Ad Grades partnered with Vinayaka Enterprises to strengthen their digital and strategic presence from the ground up. We delivered a clean, responsive *Website* that reflected their design sensibility and business vision. Our support in *Business Strategy* and *Development* helped them streamline their services, define clear market positioning, and connect with potential clients in a more structured way. The result was not just a polished online presence, but a smarter, growth-ready business framework that aligned with their long-term goals.",
    year: "2023",
    results: [
      {
        metric: "Project Inquiries",
        value: "250%",
        description: "increase in qualified leads",
      },
      {
        metric: "Online Presence",
        value: "400%",
        description: "growth in digital visibility",
      },
      {
        metric: "Client Value",
        value: "200%",
        description: "increase in average project value",
      },
    ],
    testimonial: {
      quote:
        "AdGrades transformed our business approach. Their strategic guidance and digital marketing expertise helped us attract premium clients and grow our studio.",
      author: "Founder, Vinayaka Enterprises",
    },
  },
  {
    id: "mk-streetwear",
    name: "M K Streetwear",
    category: "Fashion",
    description: "Streetwear Fashion Brand with complete brand development",
    logo: "/client/mk.png",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=400&h=300&fit=crop",
    tags: ["Brand Strategy", "Website Development", "Social Media Management"],
    duration: "6 months",
    services: [
      "Brand Strategy Development",
      "Social Media Management",
      "Website Development",
      "Business Development",
    ],
    about:
      "MK Streetwear is a rising online fashion brand redefining urban style with bold designs and uncompromising attitude. Built for the trendsetters and the street culture community, the brand blends statement pieces with comfort and originality. From curated collections to limited drops, MK Streetwear reflects individuality and edge — made for those who wear their identity out loud. With a focus on quality, design, and culture, it's more than a brand — it’s a movement in the making.",
    howWeHelped:
      "Ad Grades worked with MK Streetwear to shape a bold identity that stands out in the saturated online fashion space. We led their Brand Strategy Development, giving the brand a strong tone, visual direction, and clear market positioning. Our team designed a sleek, mobile-optimized Website that matched their urban aesthetic, and managed their Social Media to build hype, drop engagement, and foster a loyal community. The result: increased traffic, stronger conversions, and a brand voice that hits as hard as the fashion it represents.",
    year: "2024",
    results: [
      {
        metric: "Online Sales",
        value: "500%",
        description: "increase in e-commerce transactions",
      },
      {
        metric: "Social Following",
        value: "400%",
        description: "growth in Instagram audience",
      },
      {
        metric: "Brand Recognition",
        value: "350%",
        description: "improvement in brand awareness",
      },
    ],
    testimonial: {
      quote:
        "AdGrades understood our vision perfectly. Their brand strategy and social media approach helped us stand out in the crowded fashion market and reach our target audience effectively.",
      author: "Founder, M K Streetwear",
    },
  },
  {
    id: "adhyayan",
    name: "Adhyayan",
    category: "Education",
    description: "Online Coaching Institute with social media focus",
    logo: "/client/aadhyan.jpg",
    image:
      "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?w=400&h=300&fit=crop",
    tags: ["Social Media Management", "Education Marketing"],
    duration: "3 months",
    services: [
      "Social Media Management",
      "Content Marketing",
      "Student Acquisition",
    ],
    about:
      "Adhyayan is a coaching and motivation platform dedicated to empowering students and young individuals with the clarity, mindset, and direction they need to succeed. Combining academic guidance with real-life motivation, Adhyayan focuses on holistic growth — helping learners build confidence, discipline, and mental strength alongside their studies. With daily content that educates and inspires, Adhyayan has built a loyal following of individuals striving to better themselves every day. It’s not just about marks or motivation — it’s about mindset, movement, and meaningful progress.",
    howWeHelped:
      "Ad Grades partnered with Adhyayan to transform their vision into a consistent and powerful digital presence. Through tailored *Social Media Management*, we developed content that resonated emotionally — combining educational value, motivational messaging, and personal branding. From reels to infographics to interactive posts, every piece was designed to spark action and build community. This helped Adhyayan expand its reach, deepen engagement, and build a recognizable identity in the online learning and motivation space.",
    year: "2024",
    results: [
      {
        metric: "Student Inquiries",
        value: "250%",
        description: "increase in student leads",
      },
      {
        metric: "Content Engagement",
        value: "300%",
        description: "growth in educational content reach",
      },
      {
        metric: "Brand Authority",
        value: "200%",
        description: "improvement in market perception",
      },
    ],
    testimonial: {
      quote:
        "The social media strategy developed by AdGrades helped us connect with students in a meaningful way. Our enrollment numbers have seen tremendous growth.",
      author: "Director, Adhyayan",
    },
  },
  {
    id: "dew-drop-homestay",
    name: "Dew Drop Homestay",
    category: "Hospitality",
    description: "Premium Hilltop Stay with comprehensive digital presence",
    logo: "/client/dewdrop.png",
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?w=400&h=300&fit=crop",
    tags: [
      "Website Development",
      "Social Media Management",
      "Business Development",
    ],
    duration: "4 months",
    services: [
      "Website Development",
      "Social Media Management",
      "Business Development",
      "Travel Marketing",
    ],
    about:
      "Dew Drop Homestay offers a peaceful retreat for travelers seeking comfort, authenticity, and a home away from home. Nestled in a scenic location, it combines cozy living with personalized hospitality — perfect for families, solo explorers, and weekend wanderers. Whether it’s the thoughtfully designed rooms, local experiences, or warm host interactions, every stay at Dew Drop is designed to feel personal and memorable. It’s more than just a stay — it’s a slow, serene escape from the everyday rush.",
    howWeHelped:
      "Ad Grades collaborated with Dew Drop Homestay to bring their warm, welcoming vibe online through intuitive *Website Development, engaging **Social Media Management, and focused **Business Development* support. We crafted a user-friendly website with strong visuals and easy booking integration, while our social content highlighted the calm experience, guest reviews, and local charm. Our business development insights also helped streamline their offerings and position the homestay more effectively for tourism growth and seasonal visibility.",
    year: "2023",
    results: [
      {
        metric: "Bookings",
        value: "300%",
        description: "increase in direct reservations",
      },
      {
        metric: "Online Visibility",
        value: "400%",
        description: "growth in travel platform presence",
      },
      {
        metric: "Customer Reviews",
        value: "250%",
        description: "increase in positive feedback",
      },
    ],
    testimonial: {
      quote:
        "AdGrades helped us transform from a local homestay to a sought-after destination. Their comprehensive digital approach brought us guests from across the country.",
      author: "Owner, Dew Drop Homestay",
    },
  },
  {
    id: "nataraj-dance-studios",
    name: "Nataraj Dance Studios",
    category: "Entertainment",
    description: "Dance training academy with social media marketing",
    logo: "/client/nataraj.png",
    image:
      "https://media.istockphoto.com/id/1371152823/photo/natraj-images-god-shiva-as-nataraj.jpg?b=1&s=612x612&w=0&k=20&c=J_33eBtYQwYcCDSWyO-zmdUJk4TsFiqbLmLYP85dbLY=",
    tags: ["Social Media Management", "Creative Marketing"],
    duration: "4 months",
    services: [
      "Social Media Marketing",
      "Event Promotion",
      "Video Content Creation",
    ],
    about:
      "Natraj Dance Studios is a premier dance academy that blends traditional and contemporary styles to inspire the next generation of performers. Known for its disciplined training environment and passionate instructors, the studio offers classes in classical, Bollywood, freestyle, and fusion forms. With a focus on creativity, expression, and skill-building, Natraj has become a trusted space for learners of all ages to grow and shine on and off the stage. Its vibrant student community and regular stage performances make it more than a studio — it’s a celebration of movement and culture.",
    howWeHelped:
      "Ad Grades partnered with Natraj Dance Studios to craft a digital presence that matched the energy and elegance of their on-ground performances. Through engaging *Social Media Management*, we highlighted their training sessions, student showcases, and behind-the-scenes moments in a way that connected emotionally with their audience. Our content strategy focused on storytelling — turning every reel, post, and testimonial into a reflection of the studio’s spirit. This helped boost online visibility, attract new enrollments, and build a loyal digital following that now dances along with the brand.",
    year: "2024",
    results: [
      {
        metric: "Student Enrollments",
        value: "200%",
        description: "increase in new dance students",
      },
      {
        metric: "Event Attendance",
        value: "180%",
        description: "increase in workshop attendance",
      },
      {
        metric: "Video Engagement",
        value: "350%",
        description: "growth in dance content views",
      },
    ],
    testimonial: {
      quote:
        "AdGrades helped us showcase our passion for dance beautifully. Their video content and social media strategy brought us many talented students.",
      author: "Founder, Nataraj Dance Studios",
    },
  },
  {
    id: "pureblend-foods",
    name: "Pureblend Foods",
    category: "Food & Beverage",
    description: "B2B Food Supply Chain Brand with comprehensive strategy",
    logo: "/client/pureblend.jpg",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop",
    tags: ["Business Strategy", "Website Development", "Lead Generation"],
    duration: "6 months",
    services: [
      "B2B Marketing",
      "Website Development",
      "Content Strategy",
      "Lead Generation",
    ],
    about:
      "Pureblend Foods is a B2B food supply chain brand specializing in high-quality, scalable sourcing solutions for retailers, wholesalers, and foodservice companies. With a sharp focus on consistency, compliance, and customer satisfaction, they connect trusted producers with growing businesses through an efficient, transparent supply network. Their strength lies in simplifying bulk food procurement while maintaining purity, standards, and timely delivery. Pureblend isn’t just a supplier — it’s a dependable partner in your food business growth journey.",
    howWeHelped:
      "Ad Grades partnered with Pureblend Foods to give their B2B brand a digital edge through *Social Media Management, **Business Strategy, and a professional **Website Development*. We built a modern website that clearly communicated their value proposition and made their offerings accessible to business buyers. On social media, we focused on brand trust, supply transparency, and industry insights to attract the right decision-makers. Our strategy support refined their market positioning and helped generate interest from larger food service clients and distributors.",
    year: "2023-2024",
    results: [
      {
        metric: "B2B Clients",
        value: "250%",
        description: "increase in business clients",
      },
      {
        metric: "Supply Volume",
        value: "300%",
        description: "growth in supply orders",
      },
      {
        metric: "Market Reach",
        value: "200%",
        description: "expansion in market coverage",
      },
    ],
    testimonial: {
      quote:
        "AdGrades understood our B2B needs perfectly. Their marketing strategies helped us connect with the right business clients and grow our supply network.",
      author: "Director, Pureblend Foods",
    },
  },
  {
    id: "as-tech-industries",
    name: "AS Tech Industries",
    category: "Engineering",
    description:
      "Engineering and Manufacturing Services with digital transformation",
    logo: "/client/asti.png",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=400&h=300&fit=crop",
    tags: ["Business Strategy", "Website Development", "Lead Generation"],
    duration: "7 months",
    services: [
      "Technical Marketing",
      "Website Development",
      "Content Strategy",
      "Industry Networking",
    ],
    about:
      "AS Tech Industries is a forward-looking engineering and manufacturing company delivering precision, performance, and process innovation. Specializing in industrial-grade components and custom fabrication, the company supports sectors like automotive, machinery, and infrastructure with dependable, quality-first solutions. Driven by a commitment to excellence and continuous improvement, AS Tech is also embracing digital transformation to modernize operations and stay future-ready. Their work bridges the gap between traditional engineering and smart manufacturing.",
    howWeHelped:
      "Ad Grades supported AS Tech Industries in redefining their brand for the digital age through *Website Development, **Social Media Management, and **Business Strategy*. We created a sharp, industry-appropriate website that clearly presented their services and technical expertise, while our social content highlighted their projects, capabilities, and transformation journey. On the strategy front, we helped reposition AS Tech as a digitally evolving brand — not just a manufacturer, but a modern industrial partner built for the next phase of growth.",
    year: "2023-2024",
    results: [
      {
        metric: "Industrial Projects",
        value: "200%",
        description: "increase in project contracts",
      },
      {
        metric: "Technical Credibility",
        value: "250%",
        description: "growth in industry recognition",
      },
      {
        metric: "Client Retention",
        value: "180%",
        description: "improvement in client loyalty",
      },
    ],
    testimonial: {
      quote:
        "AdGrades helped us communicate our technical expertise effectively. Their marketing strategies positioned us as industry leaders and brought us major contracts.",
      author: "Director, AS Tech Industries",
    },
  },
  {
    id: "sp-enterprises",
    name: "SP Enterprises",
    category: "Engineering",
    description:
      "Heavy Earthmoving Equipment & Spares with complete digital strategy",
    logo: "/client/splogo.png",
    image: "https://images.pexels.com/photos/1238864/pexels-photo-1238864.jpeg",
    tags: ["Business Strategy", "Website Development", "Lead Generation"],
    duration: "5 months",
    services: [
      "Industrial Marketing",
      "Website Development",
      "B2B Lead Generation",
      "Content Strategy",
    ],
    about:
      "SP Enterprises is a trusted name in the heavy earthmoving equipment and spares sector, delivering durable machinery and critical components to infrastructure, mining, and construction industries. Known for reliability, supply strength, and technical know-how, they support mission-critical operations across challenging terrains and timelines. With an extensive product line and deep industry knowledge, SP Enterprises ensures clients get the right equipment, at the right time, with no compromise on quality. They’re more than just a supplier — they’re a backbone to heavy-duty progress.",
    howWeHelped:
      "Ad Grades worked with SP Enterprises to bring their industrial credibility into the digital spotlight through *Website Development, **Social Media Management, and **Business Strategy*. We developed a streamlined website tailored for B2B engagement, showcasing their inventory, sectors served, and service reliability. Our content strategy focused on building authority in the industry, using platforms to highlight machinery insights, client success stories, and technical updates. With strategic positioning and digital clarity, we helped SP Enterprises attract new leads, strengthen brand trust, and stand out in a competitive heavy equipment market.",
    year: "2024",
    results: [
      {
        metric: "Industrial Clients",
        value: "180%",
        description: "increase in equipment buyers",
      },
      {
        metric: "Inquiry Volume",
        value: "220%",
        description: "growth in business inquiries",
      },
      {
        metric: "Sales Revenue",
        value: "200%",
        description: "increase in equipment sales",
      },
    ],
    testimonial: {
      quote:
        "AdGrades helped us modernize our industrial business. Their digital marketing approach brought us serious buyers and increased our equipment sales significantly.",
      author: "Owner, SP Enterprises",
    },
  },
];

// Projects/case studies data
export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "OS CODE Solutions Digital Growth",
    category: "Digital Marketing",
    client: "OS CODE Solutions",
    challenge:
      "Emerging IT startup needed to establish digital presence and generate quality leads",
    solution:
      "Implemented comprehensive social media strategy with targeted lead generation campaigns",
    result:
      "Generated 150+ qualified leads and increased brand awareness by 300% in 4 months",
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=800&h=600&fit=crop",
    tags: [
      "Social Media Management",
      "Lead Generation",
      "IT Services",
      "Startup Growth",
    ],
  },
  {
    id: 2,
    title: "Delhi 65 Restaurant Marketing",
    category: "Digital Marketing",
    client: "Delhi 65 – Ranchi Restaurant",
    challenge:
      "Local restaurant needed to increase footfall and online orders in competitive market",
    solution:
      "Ran targeted ad campaigns focusing on local audience with engaging social media content",
    result:
      "200% increase in online orders and 150% growth in social media engagement in 3 months",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?w=800&h=600&fit=crop",
    tags: [
      "Targeted Advertising",
      "Social Media",
      "Restaurant Marketing",
      "Local SEO",
    ],
  },
  {
    id: 3,
    title: "Medhavi Classes Student Acquisition",
    category: "Education",
    client: "Medhavi Classes",
    challenge:
      "Online education platform needed to scale student enrollment and engagement",
    solution:
      "Developed comprehensive social media strategy with lead generation funnels",
    result:
      "400% increase in student enrollments and 250% boost in social media following over 6 months",
    image:
      "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?w=800&h=600&fit=crop",
    tags: [
      "Education Marketing",
      "Lead Generation",
      "Social Media",
      "Student Acquisition",
    ],
  },
  {
    id: 4,
    title: "Uplifto Tech Services Growth",
    category: "Digital Marketing",
    client: "Uplifto",
    challenge:
      "Tech startup needed to establish market presence and generate B2B leads",
    solution:
      "Implemented targeted lead generation campaigns with strategic social media positioning",
    result:
      "300% increase in qualified B2B leads and established strong industry presence in 4 months",
    image:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=800&h=600&fit=crop",
    tags: ["B2B Marketing", "Lead Generation", "Tech Services", "Social Media"],
  },
  {
    id: 5,
    title: "Vinayaka Enterprises Digital Transformation",
    category: "Interior Design",
    client: "Vinayaka Enterprises",
    challenge:
      "Interior design studio needed complete digital presence and business strategy",
    solution:
      "Built custom website, developed business strategy, and implemented social media marketing",
    result:
      "Established strong online presence, increased project inquiries by 250%, and streamlined business operations",
    image:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=800&h=600&fit=crop",
    tags: [
      "Website Development",
      "Business Strategy",
      "Interior Design",
      "Social Media",
    ],
  },
  {
    id: 6,
    title: "M K Streetwear Brand Development",
    category: "Fashion",
    client: "M K Streetwear",
    challenge:
      "Fashion brand needed complete brand strategy and digital presence",
    solution:
      "Developed comprehensive brand strategy, built e-commerce website, and managed social media",
    result:
      "500% increase in online sales, established strong brand identity, and grew social media following by 400%",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=800&h=600&fit=crop",
    tags: ["Brand Identity", "E-commerce", "Fashion Marketing", "Social Media"],
  },
];

// Helper function to convert client name to ID format
export const getClientId = (clientName: string): string => {
  const clientIdMap: Record<string, string> = {
    "OS CODE Solutions": "os-code-solutions",
    "Delhi 65 – Ranchi Restaurant": "delhi-65",
    "Medhavi Classes": "medhavi-classes",
    Uplifto: "uplifto",
    "Vinayaka Enterprises": "vinayaka-enterprises",
    "M K Streetwear": "mk-streetwear",
    Adhyayan: "adhyayan",
    "Dew Drop Homestay": "dew-drop-homestay",
    "Nataraj Dance Studios": "nataraj-dance-studios",
    "Pureblend Foods": "pureblend-foods",
    "AS Tech Industries": "as-tech-industries",
    "SP Enterprises": "sp-enterprises",
  };

  return (
    clientIdMap[clientName] || clientName.toLowerCase().replace(/\s+/g, "-")
  );
};
