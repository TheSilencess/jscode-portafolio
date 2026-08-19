/**
 * ==========================================================================
 * JsCode - Lógica Principal y Gestión Dinámica de Proyectos
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. ESTRUCTURA DE DATOS DE PROYECTOS (AGREGAR NUEVOS PROYECTOS AQUÍ)
    // ==========================================================================
    /*
     * INSTRUCCIONES PARA AGREGAR UN NUEVO PROYECTO:
     * Copia y pega un objeto dentro de la lista 'projects' respetando la siguiente estructura:
     * 
     * {
     *     id: 4, // ID único
     *     title: "Título de tu proyecto",
     *     category: "Categoría", // Opciones recomendadas: "Landing Pages", "E-Commerce", "Sistemas Web"
     *     description: "Breve descripción para la tarjeta.",
     *     fullDescription: "Descripción extendida que se mostrará al abrir el modal.",
     *     image: "assets/proyecto-ejemplo.jpg", // Ruta de la imagen
     *     technologies: ["HTML", "CSS", "JavaScript"], // Lista de tecnologías utilizadas
     *     url: "https://enlace-a-tu-proyecto.com" // Enlace al sitio web en vivo o repositorio
     * }
     */

    // // AGREGAR NUEVOS PROYECTOS AQUÍ // //
    const projects = [
        {
            id: 1,
            title: "TutiMami",
            category: "Landing Pages",
            description: "Landing Page corporativa de una tienda de ropa, zapatos y accesorios para la familia",
            fullDescription: "Sistema de gestión SaaS diseñado para ingenieros DevOps. Incluye métricas en vivo, integración con APIs RESTful, gestión de alertas y modo oscuro nativo con rendimiento ultra rápido.",
            image: "assests/tutimami.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "React"],
            url: "https://tutimami-landing.vercel.app"
        },
        {
            id: 2,
            title: "Kadosh",
            category: "E-Commerce",
            description: "Tienda online de diseño minimalista con experiencia de compra fluida y pasarela de pago optimizada.",
            fullDescription: "E-commerce de moda de lujo con navegación rápida, catálogo interactivo, filtro instantáneo de productos y carrito de compras sin recarga de página.",
            image: "assests/kadosh.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "MySQL"],
            url: "https://kadoshguate.com"
        },
        {
            id: 3,
            title: "Olam Salon",
            category: "Landing Pages",
            description: "Landing page salon de belleza con alta velocidad de carga.",
            fullDescription: "Sitio web enfocado en la conversión para una firma de arquitectura sustentable. Incluye animaciones sutiles al hacer scroll, galería interactiva y formulario integrado.",
            image: "assests/olam.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "React"],
            url: "https://olam-salon.vercel.app"
        },
        {
            id: 4,
            title: "Transformacion S.E.R",
            category: "Landing Pages",
            description: "Landing page corporativa para couching de negocios con alta velocidad de carga.",
            fullDescription: "Sitio web enfocado en la conversión para una firma de arquitectura sustentable. Incluye animaciones sutiles al hacer scroll, galería interactiva y formulario integrado.",
            image: "assests/transformacionser.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "React"],
            url: "https://rosales-couch.vercel.app"
        },
        {
            id: 5,
            title: "LightHouse",
            category: "Landing Pages",
            description: "Landing page corporativa para iglesia cristiana con alta velocidad de carga.",
            fullDescription: "Sitio web enfocado en la conversión para una firma de arquitectura sustentable. Incluye animaciones sutiles al hacer scroll, galería interactiva y formulario integrado.",
            image: "assests/lh.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "React"],
            url: "https://lighthouse-church-eosin.vercel.app"
        },
        {
            id: 6,
            title: "CoffeTime",
            category: "Landing Pages",
            description: "Landing page corporativa para tienda de café y comida con alta velocidad de carga.",
            fullDescription: "Sitio web enfocado en la conversión para una firma de arquitectura sustentable. Incluye animaciones sutiles al hacer scroll, galería interactiva y formulario integrado.",
            image: "assests/CoffeTime.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "React"],
            url: "https://glamstore-gt.vercel.app"
        }
    ];

    // ==========================================================================
    // 2. RENDERIZADO DINÁMICO DE TARJETAS DE PROYECTOS
    // ==========================================================================
    const projectsGrid = document.getElementById('projectsGrid');

    function renderProjects(filterCategory = 'all') {
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';

        const filteredProjects = filterCategory === 'all' 
            ? projects 
            : projects.filter(p => p.category === filterCategory);

        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">No hay proyectos disponibles en esta categoría.</p>`;
            return;
        }

        filteredProjects.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card fade-element visible';
            card.dataset.id = project.id;

            const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

            card.innerHTML = `
                <div class="project-image-container">
                    <img src="${project.image}" alt="Vista previa de ${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-category">${project.category}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    <span class="project-link-btn">
                        Ver detalles 
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                </div>
            `;

            // Evento para abrir Modal
            card.addEventListener('click', () => openModal(project));

            projectsGrid.appendChild(card);
        });
    }

    // Inicializar renderizado
    renderProjects();

    // ==========================================================================
    // 3. FILTRADO DE PROYECTOS SIN RECARGAR PÁGINA
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });

    // ==========================================================================
    // 4. MODAL DETALLE DE PROYECTO
    // ==========================================================================
    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalUrl = document.getElementById('modalUrl');

    function openModal(project) {
        if (!modal) return;
        
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalDescription.textContent = project.fullDescription || project.description;
        modalUrl.href = project.url;

        modalTech.innerHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // 5. NAVBAR STICKY & MENÚ HAMBURGUESA
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 6. ANIMACIONES SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-element').forEach(el => {
        observer.observe(el);
    });
});