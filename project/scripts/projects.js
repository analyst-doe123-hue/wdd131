// Project data array
const projects = [
    {
        id: 1,
        title: "Modern Office Complex",
        category: "commercial",
        image: "images/office-building.jpg",
        description: "A state-of-the-art commercial building with sustainable features and modern design.",
        details: "This 12-story office complex features energy-efficient systems, modern amenities, and flexible workspace designs. Completed in 2023 with LEED Gold certification.",
        completionDate: "2023",
        size: "85,000 sq ft",
        location: "Maragoli-KE"
    },
    {
        id: 2,
        title: "Luxury Residential Estate",
        category: "residential",
        image: "images/luxury-home.jpg",
        description: "Custom-designed homes with premium finishes and attention to detail.",
        details: "Five luxury homes featuring custom architectural designs, high-end materials, and smart home technology. Each home includes sustainable features and energy-efficient systems.",
        completionDate: "2024",
        size: "3,500-5,000 sq ft per home",
        location: "Wetende Avenue, Kakamega"
    },
    {
        id: 3,
        title: "Community Bridge Project",
        category: "infrastructure",
        image: "images/bridge.jpg",
        description: "A durable infrastructure project connecting communities with safety and reliability.",
        details: "This 250-foot bridge features advanced engineering for earthquake resistance and long-term durability. The project included innovative construction techniques to minimize environmental impact.",
        completionDate: "2022",
        size: "250 ft span",
        location: "Juja-KE"
    },
    {
        id: 4,
        title: "Downtown Retail Center",
        category: "commercial",
        image: "images/retail-center.jpg",
        description: "A vibrant shopping destination with modern storefronts and community spaces.",
        details: "This retail center includes 25 storefronts, food court, and outdoor gathering spaces. The design incorporates natural lighting and sustainable materials throughout.",
        completionDate: "2023",
        size: "120,000 sq ft",
        location: "Ajonde Avenue, Kakamega"
    },
    {
        id: 5,
        title: "Suburban Housing Development",
        category: "residential",
        image: "images/housing-development.jpg",
        description: "A family-friendly community with thoughtfully designed homes and amenities.",
        details: "50 single-family homes with community park, playground, and walking trails. All homes feature energy-efficient designs and modern amenities for comfortable family living.",
        completionDate: "2024",
        size: "20-acre development",
        location: "Horrice Road, Kakamega"
    },
    {
        id: 6,
        title: "Highway Expansion Project",
        category: "infrastructure",
        image: "images/highway.jpg",
        description: "Road expansion to improve traffic flow and transportation efficiency.",
        details: "Added two lanes to a 5-mile stretch of highway, including new interchanges and safety features. The project was completed ahead of schedule with minimal disruption to traffic.",
        completionDate: "2022",
        size: "5-mile expansion",
        location: " Wetende-Jemima Road, Kakamega"
    }
];

// DOM Elements
const projectsContainer = document.getElementById('projects-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load projects function
function loadProjects(filter = 'all') {
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    // Filter projects based on selection
    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    // Display message if no projects found
    if (filteredProjects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="no-projects text-center">
                <p>No projects found in this category.</p>
            </div>
        `;
        return;
    }

    // Create project cards using template literals
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy" class="project-image">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-meta">
                    <span class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                    <span class="project-date">${project.completionDate}</span>
                </div>
                <button class="btn-secondary view-details" data-id="${project.id}">View Details</button>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });

    // Add event listeners to detail buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = parseInt(e.target.getAttribute('data-id'));
            showProjectDetails(projectId);
        });
    });
}

// Show project details modal
function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        // Create modal content using template literals
        const modalContent = `
            <div class="project-modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${project.image}" alt="${project.title}" class="modal-image">
                    <div class="modal-details">
                        <h2>${project.title}</h2>
                        <p>${project.details}</p>
                        <div class="project-specs">
                            <div class="spec-item">
                                <strong>Category:</strong> ${project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                            </div>
                            <div class="spec-item">
                                <strong>Completion Date:</strong> ${project.completionDate}
                            </div>
                            <div class="spec-item">
                                <strong>Size:</strong> ${project.size}
                            </div>
                            <div class="spec-item">
                                <strong>Location:</strong> ${project.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalContent);

        // Add event listeners for modal
        const modal = document.querySelector('.project-modal');
        const closeBtn = document.querySelector('.close-modal');

        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Project filtering
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Filter projects
            const filter = btn.getAttribute('data-filter');
            loadProjects(filter);

            // Save filter preference to localStorage
            localStorage.setItem('projectFilter', filter);
        });
    });
}

// Initialize projects page
document.addEventListener('DOMContentLoaded', function () {
    // Load saved filter or default to 'all'
    const savedFilter = localStorage.getItem('projectFilter') || 'all';
    const activeBtn = document.querySelector(`[data-filter="${savedFilter}"]`);

    if (activeBtn) {
        activeBtn.classList.add('active');
    } else {
        document.querySelector('[data-filter="all"]').classList.add('active');
    }

    loadProjects(savedFilter);
});

// Add modal styles dynamically
const modalStyles = `
    <style>
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 1rem;
        }
        
        .modal-content {
            background-color: white;
            border-radius: 8px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 2rem;
            cursor: pointer;
            color: var(--primary);
            z-index: 1001;
        }
        
        .modal-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
        }
        
        .modal-details {
            padding: 2rem;
        }
        
        .project-specs {
            margin-top: 1.5rem;
            padding: 1rem;
            background-color: var(--light);
            border-radius: 4px;
        }
        
        .spec-item {
            margin-bottom: 0.5rem;
        }
        
        .project-meta {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        .project-category {
            background-color: var(--primary);
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
        }
        
        .no-projects {
            grid-column: 1 / -1;
            padding: 3rem;
            text-align: center;
            color: var(--gray);
        }
    </style>
`;

// Add modal styles to document head
document.head.insertAdjacentHTML('beforeend', modalStyles);