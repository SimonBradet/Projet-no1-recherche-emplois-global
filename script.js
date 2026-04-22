// Mock Data for Jobs
const jobs = [
    {
        id: 1,
        title: "Développeur Frontend React",
        company: "TechGlobal",
        location: "Paris, France (Hybride)",
        type: "Temps plein",
        salary: "55k€ - 70k€",
        postedAt: "Il y a 2h",
        logoColor: "#4cc9f0",
        icon: "fa-react"
    },
    {
        id: 2,
        title: "Senior UI/UX Designer",
        company: "CreativeStudio",
        location: "Remote",
        type: "Freelance",
        salary: "400€ - 600€ / jour",
        postedAt: "Il y a 5h",
        logoColor: "#f72585",
        icon: "fa-figma"
    },
    {
        id: 3,
        title: "Ingénieur Machine Learning",
        company: "AI Solutions",
        location: "Montréal, Canada",
        type: "Temps plein",
        salary: "$90k - $130k",
        postedAt: "Hier",
        logoColor: "#4361ee",
        icon: "fa-brain"
    },
    {
        id: 4,
        title: "Développeur Backend Node.js",
        company: "FinTech App",
        location: "Londres, UK",
        type: "Temps plein",
        salary: "£60k - £85k",
        postedAt: "Hier",
        logoColor: "#3f37c9",
        icon: "fa-node-js"
    },
    {
        id: 5,
        title: "Chef de Projet Digital",
        company: "Agence Web Nova",
        location: "Genève, Suisse",
        type: "CDI",
        salary: "80k CHF - 110k CHF",
        postedAt: "Il y a 2 jours",
        logoColor: "#7209b7",
        icon: "fa-list-check"
    },
    {
        id: 6,
        title: "Data Analyst",
        company: "Data Corp",
        location: "Remote (Europe)",
        type: "Temps plein",
        salary: "45k€ - 60k€",
        postedAt: "Il y a 3 jours",
        logoColor: "#4cc9f0",
        icon: "fa-chart-pie"
    }
];

// DOM Elements
const jobsContainer = document.getElementById('jobs-container');
const searchForm = document.getElementById('search-form');
const jobTitleInput = document.getElementById('job-title');
const jobLocationInput = document.getElementById('job-location');

// Render Job Cards
function renderJobs(jobsToRender) {
    jobsContainer.innerHTML = '';
    
    if (jobsToRender.length === 0) {
        jobsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>Aucun emploi trouvé</h3>
                <p>Essayez de modifier vos critères de recherche.</p>
            </div>
        `;
        return;
    }

    jobsToRender.forEach((job, index) => {
        const delayClass = `delay-${(index % 3) + 1}`;
        const card = document.createElement('div');
        card.className = `job-card animate-fade-in ${delayClass}`;
        
        // Handling font-awesome icons for mock logos
        const iconClass = job.icon.startsWith('fa-') && job.icon !== 'fa-list-check' && job.icon !== 'fa-brain' && job.icon !== 'fa-chart-pie' 
            ? `fa-brands ${job.icon}` 
            : `fa-solid ${job.icon}`;

        card.innerHTML = `
            <div class="job-header">
                <div class="company-logo" style="color: ${job.logoColor}; background: rgba(255,255,255,0.05);">
                    <i class="${iconClass}"></i>
                </div>
                <span class="job-type">${job.type}</span>
            </div>
            
            <div class="job-info">
                <h3>${job.title}</h3>
                <span class="company-name">${job.company}</span>
            </div>
            
            <div class="job-meta">
                <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                <span><i class="fa-regular fa-clock"></i> ${job.postedAt}</span>
            </div>
            
            <div class="job-footer">
                <span class="salary">${job.salary}</span>
                <a href="#" class="btn btn-apply">Postuler</a>
            </div>
        `;
        
        jobsContainer.appendChild(card);
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderJobs(jobs);
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-header, .cta-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });
});

// Search functionality
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const titleTerm = jobTitleInput.value.toLowerCase();
    const locationTerm = jobLocationInput.value.toLowerCase();
    
    // Show a loading effect
    jobsContainer.style.opacity = '0.5';
    
    setTimeout(() => {
        const filteredJobs = jobs.filter(job => {
            const matchTitle = job.title.toLowerCase().includes(titleTerm) || job.company.toLowerCase().includes(titleTerm);
            const matchLocation = job.location.toLowerCase().includes(locationTerm);
            return matchTitle && matchLocation;
        });
        
        renderJobs(filteredJobs);
        jobsContainer.style.opacity = '1';
    }, 500); // simulate network request
});

// Tags clicking functionality
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        jobTitleInput.value = tag.textContent;
        searchForm.dispatchEvent(new Event('submit'));
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
    } else {
        navbar.style.boxShadow = "none";
    }
});
