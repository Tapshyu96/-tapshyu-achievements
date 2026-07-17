// Achievement Data
const achievements = [
    {
        id: 1,
        title: "Automated 150+ APIs with 1,000+ Test Cases",
        description: "Developed comprehensive API automation framework using Postman, Newman, Jenkins, and Allure reporting for McDonald's client at EYLX Digital, covering entire microservices ecosystem.",
        icon: "🔧",
        tags: ["API Testing", "Automation", "CI/CD"],
        category: "api",
        metrics: {
            coverage: "Increased API coverage by 40%",
            execution: "Reduced test execution time by 30%"
        }
    },
    {
        id: 2,
        title: "Identified 120+ Critical API & Backend Defects",
        description: "Detected and documented over 120 critical defects across multiple sprints at Torana Inc., significantly improving release quality and system reliability.",
        icon: "🐛",
        tags: ["Defect Detection", "API Testing", "Backend Testing"],
        category: "api",
        metrics: {
            defect_detection: "Improved defect detection efficiency by 25%"
        }
    },
    {
        id: 3,
        title: "Optimized Test Execution Through Automation",
        description: "Created Python scripts to automate weekly system information checking and store item pricing scans, optimizing test cycles and enabling proactive monitoring.",
        icon: "⚡",
        tags: ["Automation", "Python", "Scripting"],
        category: "automation",
        metrics: {
            efficiency: "Optimized test execution cycle by 25%"
        }
    },
    {
        id: 4,
        title: "Enhanced Data Validation with SQL-Driven Workflows",
        description: "Increased API test coverage by 35% through SQL-driven verification workflows for data pipelines and transformation logic at Torana Inc.",
        icon: "📊",
        tags: ["SQL", "Data Validation", "Backend Testing"],
        category: "backend",
        metrics: {
            coverage: "Increased API test coverage by 35%"
        }
    },
    {
        id: 5,
        title: "Performance & Stress Testing Expertise",
        description: "Performed API performance and stress testing validating throughput, latency, and reliability metrics using JMeter across multiple projects.",
        icon: "📈",
        tags: ["Performance Testing", "JMeter", "Load Testing"],
        category: "performance",
        metrics: {
            reliability: "Validated throughput and latency metrics"
        }
    },
    {
        id: 6,
        title: "CI/CD Pipeline Implementation",
        description: "Executed CI/CD pipeline executions and deployments using Jenkins and Git, supporting 3 production releases with near-zero critical post-release issues.",
        icon: "🔄",
        tags: ["CI/CD", "Jenkins", "Git", "DevOps"],
        category: "automation",
        metrics: {
            releases: "Supported 3 production releases",
            stability: "Near-zero critical post-release issues"
        }
    },
    {
        id: 7,
        title: "Cross-Functional Team Collaboration",
        description: "Collaborated with developers, product owners, and business analysts to troubleshoot API-related issues and service failures, decreasing mean time to resolution.",
        icon: "🤝",
        tags: ["Collaboration", "Communication", "Problem Solving"],
        category: "leadership",
        metrics: {
            mttr: "Decreased mean time to resolution by 20%"
        }
    },
    {
        id: 8,
        title: "UAT & Regression Testing Excellence",
        description: "Verified 1,500+ banking transactions and API workflows per quarter while executing smoke, regression, and UAT cycles for banking systems at Yalamanchili Software.",
        icon: "✅",
        tags: ["UAT", "Regression Testing", "Banking"],
        category: "testing",
        metrics: {
            transactions: "Verified 1,500+ banking transactions quarterly"
        }
    },
    {
        id: 9,
        title: "Kubernetes-Based Deployment Validation",
        description: "Executed Kubernetes-based deployment testing and validated container logs for service stability ensuring microservices reliability in production environments.",
        icon: "☸️",
        tags: ["Kubernetes", "Deployment Testing", "Microservices"],
        category: "performance",
        metrics: {
            stability: "Validated container logs for service stability"
        }
    },
    {
        id: 10,
        title: "Data Quality Assurance with iCEDQ",
        description: "Utilized iCEDQ for enterprise data validation services, ensuring data integrity and quality across complex data pipelines and transformation processes.",
        icon: "🛡️",
        tags: ["Data Quality", "iCEDQ", "Data Validation"],
        category: "backend",
        metrics: {
            quality: "Ensured data integrity across pipelines"
        }
    }
];

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const achievementsContainer = document.getElementById('achievementsContainer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayAchievements(achievements); // Show all initially
    setupFilterButtons();
    setupModal();
});

// Display achievements based on filter
function displayAchievements(filteredAchievements) {
    achievementsContainer.innerHTML = '';

    if (filteredAchievements.length === 0) {
        achievementsContainer.innerHTML = '<p class="no-results">No achievements match the selected filter.</p>';
        return;
    }

    filteredAchievements.forEach(achievement => {
        const card = createAchievementCard(achievement);
        achievementsContainer.appendChild(card);
    });
}

// Create achievement card element
function createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    card.dataset.id = achievement.id;

    card.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-content">
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            ${achievement.metrics ? `
                <div class="achievement-metrics">
                    ${Object.entries(achievement.metrics).map(([key, value]) =>
                        `<span class="achievement-metric">${key.replace('_', ' ').toUpperCase()}: ${value}</span>`
                    ).join('')}
                </div>
            ` : ''}
            <div class="achievement-meta">
                <span class="date">Added: ${new Date().toLocaleDateString()}</span>
                <div class="tags">
                    ${achievement.tags.map(tag => `<span class="achievement-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    // Add click event to open modal
    card.addEventListener('click', () => openModal(achievement));

    return card;
}

// Filter button functionality
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter achievements
            const filter = button.dataset.filter;
            const filtered = filter === 'all'
                ? achievements
                : achievements.filter(a => a.category === filter);

            displayAchievements(filtered);
        });
    });
}

// Modal functionality
function setupModal() {
    const modal = document.getElementById('achievementModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');

    // Open modal
    window.openModal = function(achievement) {
        modalTitle.textContent = achievement.title;
        modalBody.innerHTML = `
            <p>${achievement.description}</p>
            ${achievement.metrics ? `
                <h3>Key Metrics:</h3>
                <ul>
                    ${Object.entries(achievement.metrics).map(([key, value]) =>
                        `<li><strong>${key.replace('_', ' ')}:</strong> ${value}</li>`
                    ).join('')}
                </ul>
            ` : ''}
            <h3>Technologies & Skills:</h3>
            <div class="tags">
                ${achievement.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        modal.style.display = 'flex';
    }

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Add modal HTML to document (inject after body)
document.addEventListener('DOMContentLoaded', () => {
    const modalHTML = `
        <div id="achievementModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">Achievement Details</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Content loaded via JavaScript -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
});