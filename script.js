// Base de données locale étendue (Option C)
const localDatabase = [
    // --- QUÉBEC ---
    {
        title: "Architecte Datacenter Senior",
        company_name: "Québec Cloud Solutions",
        candidate_required_location: "Québec, QC",
        work_mode: "Hybride",
        source: "LinkedIn",
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
        candidate_required_location: "Lévis, QC",
        work_mode: "Présentiel",
        source: "Indeed",
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
        work_mode: "Présentiel",
        source: "Emploi-Québec",
        job_type: "Contrat",
        publication_date: new Date(Date.now() - 172800000).toISOString(),
        salary: "45$/h - 65$/h",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description du poste</h3><p>Poste contractuel pour appuyer les équipes d'infrastructure en tant que relève durant les périodes de transition technologique. Vous participerez au maintien en condition opérationnelle des systèmes critiques du gouvernement.</p><h4>Responsabilités</h4><ul><li>Soutenir les opérations journalières du centre de données.</li><li>Documenter les processus d'escalade.</li><li>Participer aux tests de relève (DRP).</li></ul>"
    },
    // --- MONTRÉAL ---
    {
        title: "Développeur Fullstack React/Node",
        company_name: "Montréal Tech Hub",
        candidate_required_location: "Montréal, QC",
        work_mode: "Hybride",
        source: "LinkedIn",
        job_type: "Temps plein",
        publication_date: new Date(Date.now() - 40000000).toISOString(),
        salary: "85k$ - 110k$",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description</h3><p>Rejoignez notre équipe montréalaise dynamique pour construire des applications web modernes pour nos clients internationaux.</p><h4>Responsabilités</h4><ul><li>Développer des interfaces utilisateur avec React.</li><li>Créer des API REST avec Node.js et Express.</li></ul>"
    },
    {
        title: "Ingénieur de Données (Data Engineer)",
        company_name: "FinTech MTL",
        candidate_required_location: "Montréal, QC",
        work_mode: "Hybride",
        source: "Glassdoor",
        job_type: "Temps plein",
        publication_date: new Date(Date.now() - 90000000).toISOString(),
        salary: "90k$ - 120k$",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description</h3><p>En tant qu'Ingénieur de données, vous construirez les pipelines de données alimentant nos modèles d'intelligence artificielle financiers.</p><h4>Exigences</h4><ul><li>Maitrise de Python et SQL.</li><li>Expérience avec AWS ou GCP.</li></ul>"
    },
    // --- TORONTO ---
    {
        title: "DevOps Cloud Engineer",
        company_name: "Toronto Cloud Inc.",
        candidate_required_location: "Toronto, ON",
        work_mode: "À distance",
        source: "GlobalTech Jobs",
        job_type: "Temps plein",
        publication_date: new Date(Date.now() - 50000000).toISOString(),
        salary: "100k$ - 130k$",
        url: "#",
        company_logo_url: "",
        description: "<h3>Description</h3><p>Manage Kubernetes clusters and automate deployments across multiple cloud providers.</p>"
    }
];

// Dictionnaire de traduction (Option B)
const keywordMap = {
    'développeur': 'developer',
    'developpeur': 'developer',
    'concepteur': 'designer',
    'réseau': 'network',
    'reseau': 'network',
    'données': 'data',
    'donnees': 'data',
    'logiciel': 'software',
    'sécurité': 'security',
    'securite': 'security',
    'rançongiciel': 'security',
    'architecture': 'architecture',
    'relève': 'support',
    'releve': 'support'
};

function translateKeyword(term) {
    let translated = term.toLowerCase();
    for (const [fr, en] of Object.entries(keywordMap)) {
        if (translated.includes(fr)) {
            translated = translated.replace(new RegExp(fr, 'g'), en);
        }
    }
    return translated;
}

// Validation de localisation intelligente et stricte (Sprint 5)
function isLocationMatch(jobLocation, searchLocation, radiusValue) {
    if (!searchLocation) return true;
    const jl = (jobLocation || '').toLowerCase();
    const sl = searchLocation.toLowerCase();
    
    // Match direct
    if (jl.includes(sl) || sl.includes(jl)) return true;
    
    // Règle de rayon (Si != "0", on veut du strict local)
    const isStrictRadius = radiusValue !== "0";
    
    // Règle spéciale : Gestion des offres de l'API (qui sont principalement Worldwide)
    const isCanadianSearch = sl.includes('montréal') || sl.includes('montreal') || sl.includes('québec') || sl.includes('quebec') || sl.includes('toronto') || sl.includes('canada');
    if (isCanadianSearch) {
        if (isStrictRadius) {
            // SPRINT 5: Filtre Strict - Bloque les offres européennes/mondiales si une distance est exigée
            if (jl === 'canada' || jl === 'canada only' || jl.includes('quebec') || jl.includes('qc')) {
                return true;
            }
        } else {
            // SPRINT 5: Filtre Partout - Permet les offres Worldwide/Americas (qui incluent le Canada)
            if (jl.includes('worldwide') || jl.includes('americas') || jl.includes('canada') || jl.includes('anywhere')) {
                return true;
            }
        }
    }
    
    return false;
}

// DOM Elements
const jobsContainer = document.getElementById('jobs-container');
const searchForm = document.getElementById('search-form');
const jobTitleInput = document.getElementById('job-title');
const jobLocationInput = document.getElementById('job-location');
const jobRadiusInput = document.getElementById('job-radius');
const loader = document.getElementById('loader');

// State
let allFetchedJobs = [];

// Fonction de recherche principale (Hybride avancée)
async function fetchJobs(searchTerm = '') {
    const titleValue = jobTitleInput.value.toLowerCase().trim();
    const locationValue = jobLocationInput.value.toLowerCase().trim();
    const radiusValue = jobRadiusInput ? jobRadiusInput.value : "50";
    
    // 1. Traduire les termes français pour l'API anglaise
    const apiSearchTerm = translateKeyword(titleValue);

    // Show loading state
    jobsContainer.innerHTML = '';
    loader.classList.remove('hidden');
    jobsContainer.style.opacity = '0.5';

    try {
        let finalResults = [];

        // ÉTAPE 1 : Chercher dans notre base de données locale
        let localResults = localDatabase;
        if (titleValue) {
            localResults = localResults.filter(job => job.title.toLowerCase().includes(titleValue) || job.description.toLowerCase().includes(titleValue));
        }
        if (locationValue) {
            localResults = localResults.filter(job => isLocationMatch(job.candidate_required_location, locationValue, radiusValue));
        }
        
        finalResults = [...localResults];

        // ÉTAPE 2 : Chercher sur l'API Internationale avec le terme traduit
        let url = 'https://remotive.com/api/remote-jobs';
        if (apiSearchTerm) {
            url += `?search=${encodeURIComponent(apiSearchTerm)}`;
        } else {
            url += '?category=software-dev&limit=30';
        }

        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Remotive API warning: ${response.status}`);
        } else {
            const data = await response.json();
            const apiJobs = data.jobs || [];
            
            // Filtrer les emplois de l'API selon la localisation intelligente et le rayon
            const filteredApiJobs = apiJobs.filter(job => isLocationMatch(job.candidate_required_location, locationValue, radiusValue));
            
            // Ajouter les résultats de l'API à nos résultats locaux
            finalResults = [...finalResults, ...filteredApiJobs];
        }

        // ÉTAPE 3 : Rendu final
        finalResults = finalResults.slice(0, 40);
        allFetchedJobs = finalResults;
        
        // Simuler un léger délai réseau pour l'effet UI
        await new Promise(resolve => setTimeout(resolve, 500));
        renderJobs(finalResults);
        
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
                <h3>Aucun emploi trouvé dans ce rayon</h3>
                <p>Essayez de changer le rayon de distance pour "Partout" afin d'inclure les offres en télétravail mondial.</p>
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
        
        // SPRINT 6: Ajout de la source de l'offre
        const sourceName = job.source || "Remotive.com";
        const sourceHtml = `<span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text-muted); padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; margin-left: auto;"><i class="fa-solid fa-share-nodes"></i> ${sourceName}</span>`;

        // Mode de travail logic (Sprint 5)
        const workMode = job.work_mode || "À distance"; // Les offres Remotive sont toujours à distance
        let workModeIcon = "fa-laptop"; 
        if (workMode.toLowerCase() === "hybride") workModeIcon = "fa-house-laptop";
        if (workMode.toLowerCase() === "présentiel") workModeIcon = "fa-building";

        card.innerHTML = `
            <div class="job-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                <div class="company-logo" style="background: white; display:flex; align-items:center; justify-content:center;">
                    ${logoHtml}
                </div>
                <span class="job-type" style="text-transform: capitalize;">${jobType}</span>
                ${sourceHtml}
            </div>
            
            <div class="job-info">
                <h3 style="font-size: 1.2rem;">${job.title}</h3>
                <span class="company-name">${job.company_name}</span>
            </div>
            
            <div class="job-meta">
                <span><i class="fa-solid fa-location-dot"></i> ${job.candidate_required_location || 'Worldwide'}</span>
                <span><i class="fa-solid ${workModeIcon}" style="color: var(--accent);"></i> ${workMode}</span>
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
    fetchJobs();
});

// Tags clicking functionality
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        jobTitleInput.value = tag.textContent;
        fetchJobs();
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
