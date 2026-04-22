// DOM Elements
const jobsContainer = document.getElementById('jobs-container');
const searchForm = document.getElementById('search-form');
const jobTitleInput = document.getElementById('job-title');
const jobLocationInput = document.getElementById('job-location');
const loader = document.getElementById('loader');

// State
let allFetchedJobs = [];

// Fetch Jobs from Remotive API
async function fetchJobs(searchTerm = '') {
    // Show loading state
    jobsContainer.innerHTML = '';
    loader.classList.remove('hidden');
    jobsContainer.style.opacity = '0.5';

    try {
        let url = 'https://remotive.com/api/remote-jobs';
        if (searchTerm) {
            url += `?search=${encodeURIComponent(searchTerm)}`;
        } else {
            // Limit to Software Development category for initial load to be faster and relevant
            url += '?category=software-dev&limit=30';
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur réseau: ${response.status}`);
        }
        
        const data = await response.json();
        
        allFetchedJobs = data.jobs || [];
        
        // Apply secondary local filter for location if user typed something
        const locationTerm = jobLocationInput.value.toLowerCase().trim();
        let filteredJobs = allFetchedJobs;
        
        if (locationTerm) {
            filteredJobs = allFetchedJobs.filter(job => 
                (job.candidate_required_location && job.candidate_required_location.toLowerCase().includes(locationTerm)) ||
                (job.company_name && job.company_name.toLowerCase().includes(locationTerm))
            );
        }

        // Limit to max 30 jobs to avoid browser freezing during rendering
        filteredJobs = filteredJobs.slice(0, 30);

        renderJobs(filteredJobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        jobsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #ff6b6b;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>Erreur de connexion</h3>
                <p>Impossible de récupérer les offres d'emploi. L'API est peut-être temporairement indisponible.</p>
            </div>
        `;
    } finally {
        loader.classList.add('hidden');
        jobsContainer.style.opacity = '1';
    }
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return "Récemment";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays < 30) return `Il y a ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Render Job Cards
function renderJobs(jobsToRender) {
    jobsContainer.innerHTML = '';
    
    if (jobsToRender.length === 0) {
        jobsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>Aucun emploi trouvé</h3>
                <p>Essayez de modifier vos critères de recherche. Note : L'API est anglophone, essayez des mots-clés en anglais (ex: Developer, Design, Data).</p>
            </div>
        `;
        return;
    }

    jobsToRender.forEach((job, index) => {
        const delayClass = `delay-${(index % 3) + 1}`;
        const card = document.createElement('div');
        card.className = `job-card animate-fade-in ${delayClass}`;
        
        // Use company_logo_url based on Remotive API format
        const logoHtml = job.company_logo_url 
            ? `<img src="${job.company_logo_url}" alt="${job.company_name} logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;">`
            : `<i class="fa-solid fa-building" style="color: var(--accent);"></i>`;

        // Format Job Type
        const jobType = job.job_type ? job.job_type.replace('_', ' ') : 'Remote';
        
        // Format Salary
        const salary = job.salary ? job.salary : 'Non spécifié';

        card.innerHTML = `
            <div class="job-header">
                <div class="company-logo" style="background: white;">
                    ${logoHtml}
                </div>
                <span class="job-type" style="text-transform: capitalize;">${jobType}</span>
            </div>
            
            <div class="job-info">
                <h3>${job.title}</h3>
                <span class="company-name">${job.company_name}</span>
            </div>
            
            <div class="job-meta">
                <span><i class="fa-solid fa-location-dot"></i> ${job.candidate_required_location || 'Worldwide'}</span>
                <span><i class="fa-regular fa-clock"></i> ${formatDate(job.publication_date)}</span>
            </div>
            
            <div class="job-footer">
                <span class="salary" style="font-size: 0.95rem; font-weight: 600;">${salary}</span>
                <a href="${job.url}" target="_blank" rel="noopener noreferrer" class="btn btn-apply">Voir l'offre</a>
            </div>
        `;
        
        jobsContainer.appendChild(card);
    });
}

// Initial render - Fetch jobs on load
document.addEventListener('DOMContentLoaded', () => {
    fetchJobs(''); // Fetch default jobs
    
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
    const titleTerm = jobTitleInput.value.trim();
    fetchJobs(titleTerm);
});

// Tags clicking functionality
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        jobTitleInput.value = tag.textContent;
        // Directly trigger fetch to avoid dispatchEvent issues
        const titleTerm = jobTitleInput.value.trim();
        fetchJobs(titleTerm);
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
