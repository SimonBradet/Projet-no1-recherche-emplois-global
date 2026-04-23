// Custom Mock Data for Quebec specific search
const quebecMockJobs = [
    {
        title: "Architecte Datacenter Senior",
        company_name: "Québec Cloud Solutions",
        candidate_required_location: "Québec, QC (Hybride)",
        job_type: "Temps plein",
        publication_date: new Date().toISOString(),
        salary: "110k$ - 140k$",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description du poste</h3><p>Nous recherchons un Architecte Datacenter Senior pour concevoir, déployer et maintenir des infrastructures résilientes et hautement disponibles pour nos clients gouvernementaux et corporatifs au Québec.</p><h4>Responsabilités</h4><ul><li>Concevoir des architectures réseau et serveur haute disponibilité.</li><li>Gérer les migrations de données critiques vers des environnements de cloud hybride.</li><li>Assurer la continuité des affaires et les plans de reprise après sinistre.</li></ul><h4>Exigences</h4><ul><li>10+ années d'expérience en infrastructure TI.</li><li>Certifications Cisco, VMware ou équivalentes.</li><li>Bilinguisme (Français/Anglais).</li></ul>"
    },
    {
        title: "Spécialiste Sécurité & Lutte Anti-Rançongiciel",
        company_name: "CyberDefensio",
        candidate_required_location: "Lévis, QC (Présentiel)",
        job_type: "Temps plein",
        publication_date: new Date(Date.now() - 86400000).toISOString(),
        salary: "95k$ - 130k$",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description du poste</h3><p>En tant que spécialiste de la cybersécurité, vous ferez partie de notre équipe d'intervention rapide (Blue Team) spécialisée dans la détection, la prévention et la remédiation des attaques par rançongiciel.</p><h4>Responsabilités</h4><ul><li>Monitorer les alertes SIEM et analyser les menaces avancées.</li><li>Intervenir lors d'incidents critiques (Ransomware) chez nos clients.</li><li>Mettre en place des stratégies de sauvegarde inaltérables.</li></ul><h4>Exigences</h4><ul><li>Expérience pratique en réponse aux incidents.</li><li>Certification CISSP ou CEH souhaitée.</li></ul>"
    },
    {
        title: "Analyste de Relève TI",
        company_name: "Ministère des Technologies",
        candidate_required_location: "Québec, QC",
        job_type: "Contrat",
        publication_date: new Date(Date.now() - 172800000).toISOString(),
        salary: "45$/h - 65$/h",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description du poste</h3><p>Poste contractuel pour appuyer les équipes d'infrastructure en tant que relève durant les périodes de transition technologique. Vous participerez au maintien en condition opérationnelle des systèmes critiques du gouvernement.</p><h4>Responsabilités</h4><ul><li>Soutenir les opérations journalières du centre de données.</li><li>Documenter les processus d'escalade.</li><li>Participer aux tests de relève (DRP).</li></ul>"
    },
    {
        title: "Ingénieur Infrastructure (Datacenter)",
        company_name: "Nordia Tech",
        candidate_required_location: "Sainte-Foy, QC",
        job_type: "Temps plein",
        publication_date: new Date(Date.now() - 345600000).toISOString(),
        salary: "90k$ - 115k$",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description du poste</h3><p>Rejoignez notre équipe dynamique pour opérer l'un des centres de données les plus verts d'Amérique du Nord. Vous travaillerez sur l'automatisation de nos processus de déploiement physique et virtuel.</p><h4>Responsabilités</h4><ul><li>Gérer les baies de stockage (SAN/NAS).</li><li>Automatiser avec Ansible et Terraform.</li><li>Maintenir l'environnement de virtualisation VMware.</li></ul>"
    },
    {
        title: "Architecte Sécurité et Réseaux",
        company_name: "Optima Conseils",
        candidate_required_location: "Québec, QC (Télétravail autorisé)",
        job_type: "Temps plein",
        publication_date: new Date(Date.now() - 518400000).toISOString(),
        salary: "105k$ - 135k$",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description du poste</h3><p>Optima Conseils recherche un architecte spécialisé dans la conception de réseaux ultra-sécurisés pour le secteur financier.</p><h4>Exigences</h4><ul><li>Maîtrise des concepts Zero Trust.</li><li>Expérience avec les pare-feux de nouvelle génération (Palo Alto, Fortinet).</li><li>Excellentes capacités de communication.</li></ul>"
    }
];

// DOM Elements
const jobsContainer = document.getElementById('jobs-container');
const searchForm = document.getElementById('search-form');
const jobTitleInput = document.getElementById('job-title');
const jobLocationInput = document.getElementById('job-location');
const jobRadiusInput = document.getElementById('job-radius');
const loader = document.getElementById('loader');

// State
let allFetchedJobs = [];

// Fetch Jobs from Remotive API or Mock if Quebec specific
async function fetchJobs(searchTerm = '') {
    const titleValue = jobTitleInput.value.toLowerCase();
    const locationValue = jobLocationInput.value.toLowerCase();
    const radiusValue = jobRadiusInput.value;
    
    // Intercept default custom search for the Quebec prototype
    const isQuebecSearch = 
        (titleValue.includes('datacenter') || titleValue.includes('architecture') || titleValue.includes('relève') || titleValue.includes('rançongiciel') || titleValue === '') && 
        (locationValue.includes('québec') || locationValue.includes('quebec'));

    // Show loading state
    jobsContainer.innerHTML = '';
    loader.classList.remove('hidden');
    jobsContainer.style.opacity = '0.5';

    try {
        if (isQuebecSearch) {
            // 1. USE CUSTOM MOCK DATA FOR THE DEFAULT QUEBEC DEMO
            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 800));
            
            let filteredMock = quebecMockJobs;
            if (titleValue && !titleValue.includes('datacenter, architecture')) {
                filteredMock = quebecMockJobs.filter(job => job.title.toLowerCase().includes(titleValue));
            }
            
            // We could use radiusValue here to filter technically, but since it's mock data we'll just show them
            
            allFetchedJobs = filteredMock;
            renderJobs(allFetchedJobs);
            
        } else {
            // 2. USE REAL API FOR OTHER SEARCHES
            let url = 'https://remotive.com/api/remote-jobs';
            if (searchTerm) {
                url += `?search=${encodeURIComponent(searchTerm)}`;
            } else {
                url += '?category=software-dev&limit=30';
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur réseau: ${response.status}`);
            }
            
            const data = await response.json();
            allFetchedJobs = data.jobs || [];
            
            let filteredJobs = allFetchedJobs;
            
            // Ignore the default prototype location 'québec, qc' when using the global API
            if (locationValue && locationValue !== 'québec, qc') {
                filteredJobs = allFetchedJobs.filter(job => 
                    (job.candidate_required_location && job.candidate_required_location.toLowerCase().includes(locationValue)) ||
                    (job.company_name && job.company_name.toLowerCase().includes(locationValue))
                );
            }

            filteredJobs = filteredJobs.slice(0, 30);
            
            // Update global state with exactly what is rendered so the index matches
            allFetchedJobs = filteredJobs;
            renderJobs(filteredJobs);
        }
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

// Job detail navigation
window.viewJobDetails = function(index) {
    const job = allFetchedJobs[index];
    if (job) {
        // Save the job data to localStorage so the new tab can read it
        localStorage.setItem('selectedJob', JSON.stringify(job));
        window.open('details.html', '_blank');
    }
};

// Render Job Cards
function renderJobs(jobsToRender) {
    jobsContainer.innerHTML = '';
    
    if (jobsToRender.length === 0) {
        jobsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>Aucun emploi trouvé</h3>
                <p>Essayez de modifier vos critères de recherche. Note : L'API est anglophone pour les recherches générales, essayez des mots-clés en anglais (ex: Developer, Design).</p>
            </div>
        `;
        return;
    }

    jobsToRender.forEach((job, index) => {
        const delayClass = `delay-${(index % 3) + 1}`;
        const card = document.createElement('div');
        card.className = `job-card animate-fade-in ${delayClass}`;
        
        const logoHtml = job.company_logo_url 
            ? `<img src="${job.company_logo_url}" alt="${job.company_name} logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px;">`
            : `<i class="fa-solid fa-building" style="color: var(--accent); font-size: 1.5rem;"></i>`;

        const jobType = job.job_type ? job.job_type.replace('_', ' ') : 'Non spécifié';
        const salary = job.salary ? job.salary : 'Salaire compétitif';

        card.innerHTML = `
            <div class="job-header">
                <div class="company-logo" style="background: white; display:flex; align-items:center; justify-content:center;">
                    ${logoHtml}
                </div>
                <span class="job-type" style="text-transform: capitalize;">${jobType}</span>
            </div>
            
            <div class="job-info">
                <h3 style="font-size: 1.2rem;">${job.title}</h3>
                <span class="company-name">${job.company_name}</span>
            </div>
            
            <div class="job-meta">
                <span><i class="fa-solid fa-location-dot"></i> ${job.candidate_required_location || 'Worldwide'}</span>
                <span><i class="fa-regular fa-clock"></i> ${formatDate(job.publication_date)}</span>
            </div>
            
            <div class="job-footer">
                <span class="salary" style="font-size: 0.95rem; font-weight: 600;">${salary}</span>
                <button onclick="viewJobDetails(${index})" class="btn btn-apply">Voir l'offre</button>
            </div>
        `;
        
        jobsContainer.appendChild(card);
    });
}

// Initial render - Fetch jobs on load
document.addEventListener('DOMContentLoaded', () => {
    fetchJobs(); 
    
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
