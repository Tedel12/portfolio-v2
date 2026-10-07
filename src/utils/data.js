import {
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
    Terminal,
    Bot,
    Cpu,
    Eye,
    LineChart,
    BrainCircuit,
    Boxes,
    Compass,
    Sparkles,
    ShieldCheck,
    Layers,
    Smartphone
} from "lucide-react";

import { FiGithub, FiLinkedin } from "react-icons/fi";
import {
    SiPython,
    SiTypescript,
    SiJavascript,
    SiCplusplus,
    SiPhp,
    SiHtml5,
    SiDart,
    SiRos,
    SiPytorch,
    SiReact,
    SiFlutter,
    SiLaravel,
    SiPandas,
    SiTailwindcss,
    SiGit,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiDocker,
    SiVercel,
    SiLinux
} from "react-icons/si";

import PROJECT_IMG_1 from "../assets/images/project-1.webp";
import PROJECT_IMG_2 from "../assets/images/project-2.webp";
import PROJECT_IMG_3 from "../assets/images/project-3.webp";
import PROJECT_IMG_5 from "../assets/images/project-5.png";
import PROJECT_IMG_6 from "../assets/images/project-6.png";
import PROJECT_IMG_LIFAC from "../assets/images/project-lifac.png";
import PROJECT_IMG_SMART_RESTO from "../assets/images/project-smart-resto.png";
import PROJECT_IMG_DENTWISE from "../assets/images/project-dentwise.png";
import PROJECT_IMG_QUICKSHOW from "../assets/images/project-quickshow.jpg";

import CERT_CURSOR from "../assets/certificates/cert-cursor-hackathon.png";
import CERT_NASA from "../assets/certificates/cert-nasa-space-apps.png";
import CERT_DATACAMP_DATA from "../assets/certificates/cert-datacamp-data.png";
import CERT_MIABE from "../assets/certificates/cert-miabe-hackathon.png";
import CERT_DATACAMP_AI from "../assets/certificates/cert-datacamp-ai.png";

// ==========================================
// 1. SERVICES COMPLETS (Fidèle à la Capture 1)
// ==========================================
export const SERVICE_CATEGORIES = [
    { id: "all", label: "Tous les services", count: 6 },
    { id: "dev", label: "Développement Web", count: 2 },
    { id: "mobile", label: "Mobile iOS & Android", count: 1 },
    { id: "ai", label: "IA, Vision & Robotique", count: 2 },
    { id: "data", label: "Data & Tableaux de bord", count: 1 },
];

export const SERVICE_TAGS = [
    "Machine Learning & DL",
    "Physical AI & ROS2",
    "Embedded AI (TinyML)",
    "React 19 & Next.js",
    "Flutter & React Native",
    "Data Visualisation",
    "APIs Laravel & Node",
    "PostgreSQL & Vector DB"
];

export const SERVICES = [
    {
        id: "mobile-cross",
        category: "mobile",
        subCategory: "Mobile Cross-Platform iOS & Android",
        title: "Applications Mobiles Cross-Platform",
        description: "Une expérience mobile native fluide sur iOS et Android avec un code unifié et ultra-performant sous Flutter et React Native.",
        icon: Smartphone,
        colorAccent: "emerald",
        features: [
            "Codebase unique iOS & Android (React Native / Flutter)",
            "API RESTful & Webhooks sécurisés en Laravel / Node.js",
            "Authentification multi-fournisseurs (Google, Apple, JWT)",
            "Synchronisation locale & mode hors-ligne fluide"
        ],
        deliverablesTitle: "LIVRABLES CLÉS",
        deliverables: [
            "Code source 100% propre, documenté et typé",
            "Builds iOS & Android prêts pour publication stores"
        ],
        timeline: "3 à 8 semaines selon la complexité",
        price: "À partir de 600.000 FCFA (~915 EUR)",
        pricingType: "Forfait clé en main",
    },
    {
        id: "saas-architecture",
        category: "dev",
        subCategory: "SaaS & Cloud Scalable",
        title: "Expertise React & Architecture SaaS",
        description: "Des architectures logicielles taillées pour la croissance, combinant React 19, Next.js, Node.js et bases de données relationnelles.",
        icon: Cpu,
        colorAccent: "emerald",
        features: [
            "Architecture SaaS scalable et modulaire",
            "React 19 + TypeScript strict & Next.js App Router",
            "Dashboards réactifs & visualisations de flux en temps réel",
            "Sécurité des rôles (RBAC) & facturation Stripe/CinetPay"
        ],
        deliverablesTitle: "LIVRABLES CLÉS",
        deliverables: [
            "Code source 100% propre & typé",
            "Dashboard & interface ultra réactive avec monitoring"
        ],
        timeline: "2 à 8 semaines selon périmètre",
        price: "TJM : 150.000 FCFA / jour (~230 EUR)",
        pricingType: "Régie ou Forfait",
    },
    {
        id: "physical-ai-ros2",
        category: "ai",
        subCategory: "Physical AI, Robotique & Systèmes Embarqués",
        title: "Physical AI & Robotique ROS2",
        description: "Conception de comportements robotiques intelligents, simulation sous Gazebo, navigation autonome et intégration de capteurs sous ROS2 (C++ / Python).",
        icon: Bot,
        colorAccent: "emerald",
        features: [
            "Architecture de nœuds ROS2 (rclpy / rclcpp)",
            "Algorithmes de navigation SLAM & évitement d'obstacles",
            "Contrôle moteur & perception capteurs (LiDAR, Caméras, IMU)",
            "Simulation environnementale sous Gazebo / Isaac Sim"
        ],
        deliverablesTitle: "LIVRABLES CLÉS",
        deliverables: [
            "Packages ROS2 testés et documentés",
            "Scène de simulation virtuelle & scripts de lancement"
        ],
        timeline: "4 à 10 semaines",
        price: "À partir de 850.000 FCFA (~1.300 EUR)",
        pricingType: "Projet ou R&D",
    },
    {
        id: "ml-deeplearning-embed",
        category: "ai",
        subCategory: "Intelligence Artificielle & Vision",
        title: "Machine Learning & Embedding IA",
        description: "Entraînement de modèles de Machine Learning / Deep Learning, recherche vectorielle (embeddings), vision par ordinateur et déploiement edge sur microcontrôleurs (TinyML).",
        icon: BrainCircuit,
        colorAccent: "emerald",
        features: [
            "Modèles supervisés / non supervisés (Scikit-Learn, PyTorch)",
            "Génération et recherche sémantique par Embeddings (RAG)",
            "Embedded AI / TinyML sur Arduino, ESP32 et Edge Impulse",
            "Déploiement d'APIs d'inférence ultra-rapides sous FastAPI"
        ],
        deliverablesTitle: "LIVRABLES CLÉS",
        deliverables: [
            "Pipelines de données et modèles entraînés vérifiés",
            "Micro-service d'inférence sécurisé & conteneurisé"
        ],
        timeline: "3 à 6 semaines",
        price: "Dès 700.000 FCFA (~1.070 EUR)",
        pricingType: "Sur cahier des charges",
    },
    {
        id: "data-vis",
        category: "data",
        subCategory: "Data Science & Visualisation",
        title: "Visualisation de Données & Tableaux Décisionnels",
        description: "Transformation de données brutes volumineuses en représentations graphiques interactives, claires et directement exploitables pour la prise de décision.",
        icon: LineChart,
        colorAccent: "emerald",
        features: [
            "Pipelines d'analyse avec Pandas, NumPy, Seaborn & Matplotlib",
            "Graphiques interactifs web (D3.js, Chart.js, Recharts)",
            "Indicateurs de performance (KPI) financiers et opérationnels",
            "Export de rapports automatisés et filtres multi-dimensionnels"
        ],
        deliverablesTitle: "LIVRABLES CLÉS",
        deliverables: [
            "Tableau de bord interactif intégré à votre web app",
            "Notebooks d'analyse et scripts ETL automatisés"
        ],
        timeline: "2 à 4 semaines",
        price: "Dès 450.000 FCFA (~685 EUR)",
        pricingType: "Mission packagée",
    },
    {
        id: "frontend-spa",
        category: "dev",
        subCategory: "Web Apps & SPAs",
        title: "Développement Frontend & Applications Web",
        description: "Des interfaces qui convertissent, ultra-réactives et animées avec finesse, respectant les normes d'accessibilité et la performance Core Web Vitals.",
        icon: Code2,
        colorAccent: "emerald",
        features: [
            "Single Page Applications (SPA) et architectures SSR dynamiques",
            "Intégration Pixel-Perfect (Figma vers Tailwind CSS)",
            "Micro-interactions et animations soignées avec Motion",
            "Optimisation extrême de la vitesse de chargement"
        ],
        deliverablesTitle: "LIVRABLES CLÉS",
        deliverables: [
            "Interface web responsive, fluide et testée multi-navigateurs",
            "Formulaires validés avec gestion d'erreurs intuitive"
        ],
        timeline: "1 à 4 semaines",
        price: "Dès 400.000 FCFA (~610 EUR)",
        pricingType: "Forfait d'intégration",
    },
];

// ==========================================
// 2. STACK TECHNIQUE STRUCTURÉE (Logos officiels de marques SANS contour)
// ==========================================
export const TECH_COLUMNS = [
    {
        title: "Langages de programmation",
        items: [
            {
                name: "Python",
                icon: SiPython,
                iconColor: "#3776AB",
                category: "Langage Fondateur IA & Scripting",
                description: "Machine Learning (Scikit-Learn, PyTorch), traitement de données (Pandas, NumPy) et scripts robotiques ROS2.",
                officialDocUrl: "https://docs.python.org/fr/3/",
                benUsage: "Utilisé par Ben pour concevoir des pipelines d'entraînement de réseaux neuronaux, scripter des nœuds de contrôle ROS2 (rclpy), et orchestrer des analyses statistiques approfondies dans ses projets de recherche et data science.",
                keyHighlights: ["Calcul scientifique (NumPy/Pandas)", "Frameworks IA & Deep Learning", "Nœuds robotiques ROS2 (rclpy)", "APIs rapides avec FastAPI / Flask"]
            },
            {
                name: "TypeScript",
                icon: SiTypescript,
                iconColor: "#3178C6",
                category: "Développement Web & Typage Statique",
                description: "Superset de JS apportant un typage statique strict. Indispensable pour garantir la robustesse des architectures volumineuses.",
                officialDocUrl: "https://www.typescriptlang.org/docs/",
                benUsage: "Ben applique TypeScript sur l'ensemble de ses architectures React 19 et backends Node.js pour éliminer les erreurs à l'exécution, garantir des interfaces de données strictes et faciliter la maintenance collaborative.",
                keyHighlights: ["Typage statique à la compilation", "Interfaces et Types génériques avancés", "Productivité et autocomplétion IDE", "Architecture SaaS pérenne"]
            },
            {
                name: "JavaScript",
                icon: SiJavascript,
                iconColor: "#F7DF1E",
                category: "Standard Web & Interactivité",
                description: "Le cœur de l'interactivité web moderne. Interfaces dynamiques, manipulation du DOM et logique asynchrone.",
                officialDocUrl: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
                benUsage: "Maîtrise approfondie des concepts ES6+ : promesses, async/await, closures, Web Workers et manipulation d'APIs navigateur pour construire des expériences utilisateur ultra-rapides et réactives.",
                keyHighlights: ["Moteur V8 asynchrone", "Manipulation avancée du DOM", "Écosystème NPM universel", "Intégration d'APIs modernes"]
            },
            {
                name: "C++ / Arduino",
                icon: SiCplusplus,
                iconColor: "#00599C",
                category: "Systèmes Temps Réel & Embarqué",
                description: "Programmation temps réel pour microcontrôleurs, nœuds ROS2 critiques et TinyML sur systèmes embarqués.",
                officialDocUrl: "https://isocpp.org/",
                benUsage: "Utilisé pour la programmation de microcontrôleurs Arduino et ESP32, l'écriture de nœuds ROS2 à faible latence (rclcpp), et le déploiement de modèles compressés TinyML avec gestion manuelle de la mémoire.",
                keyHighlights: ["Performance brute sans surcoût", "Gestion bas niveau de la mémoire", "Temps réel critique (ROS2 rclcpp)", "Déploiement sur microcontrôleurs"]
            },
            {
                name: "PHP",
                icon: SiPhp,
                iconColor: "#777BB4",
                category: "Backend & Services Métiers",
                description: "Backends robustes, API RESTful structurées et écosystème Laravel pour des applications métiers pérennes.",
                officialDocUrl: "https://www.php.net/docs.php",
                benUsage: "Utilisé notamment lors de ses expériences chez Exowpee et Digitalis Bénin pour modéliser des bases de données relationnelles, concevoir des endpoints RESTful sécurisés et implémenter des logiques métier avec Laravel.",
                keyHighlights: ["Écosystème Laravel mature", "ORM Eloquent & Migrations", "Gestion sécurisée des sessions et JWT", "Fiabilité en production"]
            },
            {
                name: "HTML / CSS",
                icon: SiHtml5,
                iconColor: "#E34F26",
                category: "Structure Sémantique & Stylisation",
                description: "Fondations du web : structure sémantique et design responsive pixel-perfect aux normes W3C.",
                officialDocUrl: "https://developer.mozilla.org/fr/docs/Web/HTML",
                benUsage: "Ben accorde une attention maniaque à la sémantique HTML5 (SEO, accessibilité WCAG) et à la maîtrise des layouts modernes (Flexbox, CSS Grid, conteneurs de requêtes et variables CSS dynamiques).",
                keyHighlights: ["Sémantique stricte & SEO", "Accessibilité WCAG 2.1", "CSS Grid & Flexbox modernes", "Performance Core Web Vitals"]
            },
            {
                name: "Dart",
                icon: SiDart,
                iconColor: "#0175C2",
                category: "Langage Mobile AOT",
                description: "Langage moderne compilé AOT pour des applications mobiles Flutter ultra-fluides à 60/120 FPS.",
                officialDocUrl: "https://dart.dev/guides",
                benUsage: "Utilisé avec le framework Flutter pour développer des applications mobiles performantes multi-plateformes, avec programmation réactive par streams et gestion d'état centralisée (Bloc / Riverpod).",
                keyHighlights: ["Compilation Ahead-Of-Time (AOT)", "Null Safety sound et rigoureux", "Programmation réactive par Streams", "Animations fluides à 60/120 FPS"]
            },
        ]
    },
    {
        title: "Frameworks, IA & Systèmes",
        items: [
            {
                name: "ROS2 & Physical AI",
                icon: SiRos,
                iconColor: "#22314E",
                category: "Robotique Autonome & Systèmes Physiques",
                description: "Robot Operating System 2 pour la robotique autonome, communication par topics/services et contrôle temps réel.",
                officialDocUrl: "https://docs.ros.org/en/humble/index.html",
                benUsage: "Ben développe des packages robotiques complets : orchestration de nœuds via rclpy et rclcpp, simulation d'environnements et de dynamiques sous Gazebo, cartographie SLAM et navigation autonome avec évitement d'obstacles.",
                keyHighlights: ["Architecture Publish / Subscribe (DDS)", "Simulation d'environnements sous Gazebo", "SLAM & Navigation Nav2", "Coordination multi-capteurs (LiDAR, Caméras)"]
            },
            {
                name: "Machine Learning & DL",
                icon: SiPytorch,
                iconColor: "#EE4C2C",
                category: "Deep Learning & Réseaux de Neurones",
                description: "Apprentissage supervisé/non-supervisé, réseaux de neurones, Scikit-Learn et fine-tuning de modèles.",
                officialDocUrl: "https://pytorch.org/docs/stable/index.html",
                benUsage: "Construction, entraînement et évaluation de modèles de classification et de régression, fine-tuning de réseaux de neurones sous PyTorch et optimisation des hyperparamètres pour des tâches prédictives concrètes.",
                keyHighlights: ["PyTorch & Tenseurs GPU", "Classification & Régression supervisée", "Scikit-Learn & Cross-Validation", "Optimisation de fonctions de perte"]
            },
            {
                name: "Embedded AI & TinyML",
                icon: Cpu,
                iconColor: "#10B981",
                category: "Edge Computing & IA Embarquée",
                description: "Inférence IA sur edge devices : Edge Impulse, Arduino, capteurs embarqués et contraintes basse consommation.",
                officialDocUrl: "https://docs.edgeimpulse.com/",
                benUsage: "Déploiement de modèles de Deep Learning compressés directement sur cartes Arduino / ESP32 pour reconnaître des patterns de capteurs en temps réel sans nécessiter de connexion Internet ni de serveur distant.",
                keyHighlights: ["Quantification et compression de modèles", "Edge Impulse & Microcontrôleurs", "Inférence en quelques millisecondes", "Ultra-faible consommation énergétique"]
            },
            {
                name: "React & Next.js",
                icon: SiReact,
                iconColor: "#61DAFB",
                category: "Frontend Moderne & Full-Stack",
                description: "Composants composables, Server Components (RSC) et gestion d'état haute performance.",
                officialDocUrl: "https://react.dev/",
                benUsage: "Création d'architectures web complètes comme le LMS et QuickMovie : hooks personnalisés, mémorisation poussée (useMemo, useCallback), Server Actions et rendu hybride SSR/SSG pour des temps de chargement records.",
                keyHighlights: ["React 19 & React Server Components", "Hooks sur-mesure & État optimisé", "Next.js App Router & SSR", "Expérience utilisateur dynamique"]
            },
            {
                name: "React Native & Flutter",
                icon: SiFlutter,
                iconColor: "#02569B",
                category: "Applications Mobiles Cross-Platform",
                description: "Développement mobile multiplateforme iOS et Android avec code partagé et animations natives.",
                officialDocUrl: "https://flutter.dev/docs",
                benUsage: "Conception d'applications mobiles fluides avec un code unique pour iOS et Android, accès direct aux APIs natives (caméra, géolocalisation, stockage sécurisé) et gestion des modes déconnectés.",
                keyHighlights: ["Base de code unique pour iOS et Android", "Composants natifs 60 FPS", "Synchronisation hors-ligne (Offline-first)", "Déploiement App Store & Google Play"]
            },
            {
                name: "Laravel & Node.js",
                icon: SiLaravel,
                iconColor: "#FF2D20",
                category: "Architectures Backend & APIs",
                description: "Frameworks backend complets pour APIs sécurisées, files d'attente (queues) et architecture MVC/Hexagonale.",
                officialDocUrl: "https://laravel.com/docs",
                benUsage: "Développement d'APIs RESTful et de microservices chez Exowpee : authentification OAuth/JWT, gestion des tâches en arrière-plan avec queues Redis, ORM Eloquent et validation stricte des requêtes.",
                keyHighlights: ["Architecture MVC & Clean Code", "Files de traitement asynchrone (Queues)", "Sécurité CSRF / CORS / JWT", "Tests unitaires et d'intégration"]
            },
            {
                name: "Data Vis (Pandas/Seaborn)",
                icon: SiPandas,
                iconColor: "#150458",
                category: "Analyse Statistique & Graphiques",
                description: "Visualisation statistique poussée, nettoyage de données volumineuses et dashboards graphiques.",
                officialDocUrl: "https://pandas.pydata.org/docs/",
                benUsage: "Nettoyage de jeux de données complexes, identification de corrélations, génération de heatmaps, graphiques interactifs et exports analytiques pour aider à la prise de décision stratégique.",
                keyHighlights: ["DataFrames et manipulation vectorielle", "Visualisations Seaborn & Matplotlib", "Agrégation et traitement statistique", "Intégration dans des dashboards web"]
            },
            {
                name: "Tailwind CSS & Motion",
                icon: SiTailwindcss,
                iconColor: "#06B6D4",
                category: "Design System & Micro-Interactions",
                description: "Stylisation utilitaire rapide et micro-interactions haut de gamme à 60 FPS.",
                officialDocUrl: "https://tailwindcss.com/docs",
                benUsage: "Création de design systems sur mesure, gestion d'un thème sombre/clair harmonisé sans scintillement et implémentation de micro-animations interactives naturelles avec la bibliothèque Motion.",
                keyHighlights: ["Classes utilitaires sans surcoût CSS", "Thématisation sombre / claire dynamique", "Animations physiques par ressort (Springs)", "Design adaptatif mobile / tablette / desktop"]
            },
        ]
    },
    {
        title: "DevOps, SGBD & Infrastructure",
        items: [
            {
                name: "Git / GitHub / GitLab",
                icon: SiGit,
                iconColor: "#F05032",
                category: "Versionnage & Collaboration CI/CD",
                description: "Gestion de versions d'équipe, workflows Git flow, pull requests, revues de code et intégration continue.",
                officialDocUrl: "https://git-scm.com/doc",
                benUsage: "Discipline rigoureuse avec plus de 450 contributions annuelles : commits atomiques et conventionnels, rebases propres, revues de code d'équipe et pipelines d'intégration GitLab CI / GitHub Actions.",
                keyHighlights: ["GitFlow & branches fonctionnelles", "CI/CD automatisé", "Revue de code & Pull Requests", "Sécurité des secrets de dépôts"]
            },
            {
                name: "PostgreSQL & Vector DB",
                icon: SiPostgresql,
                iconColor: "#4169E1",
                category: "Bases de Données & Recherche Vectorielle",
                description: "Bases relationnelles avancées, requêtes SQL complexes, indexation et pgvector pour recherche d'embeddings IA.",
                officialDocUrl: "https://www.postgresql.org/docs/",
                benUsage: "Conception de schémas relationnels normalisés, indexation B-Tree et GIN pour requêtes à forte charge, et utilisation de pgvector pour la recherche sémantique par similarité cosinus dans des projets IA.",
                keyHighlights: ["Conformité ACID intégrale", "Extension pgvector pour Embeddings IA", "Indexation avancée & requêtes complexes", "Transactions et intégrité référentielle"]
            },
            {
                name: "MySQL & MongoDB",
                icon: SiMysql,
                iconColor: "#4479A1",
                category: "Bases Relationnelles & NoSQL",
                description: "Gestion des données documentaires NoSQL et systèmes transactionnels relationnels.",
                officialDocUrl: "https://dev.mysql.com/doc/",
                benUsage: "Utilisé pour les projets MERN comme LMS et TaskFlow (stockage de documents flexibles JSON dans MongoDB) et systèmes relationnels classiques sous MySQL avec requêtes optimisées.",
                keyHighlights: ["Schémas flexibles NoSQL (MongoDB)", "Agrégations de données poussées", "Optimisation des requêtes MySQL", "Sauvegardes et réplication"]
            },
            {
                name: "Docker & Conteneurs",
                icon: SiDocker,
                iconColor: "#2496ED",
                category: "Conteneurisation & Environnements",
                description: "Environnements de développement et de production reproductibles et isolés.",
                officialDocUrl: "https://docs.docker.com/",
                benUsage: "Création de Dockerfiles multi-stage pour packager les applications React, Laravel et nœuds ROS2 avec des environnements reproductibles à l'identique entre local et production.",
                keyHighlights: ["Docker Compose multi-conteneurs", "Builds multi-étapes allégés", "Isolation des dépendances système", "Déploiement continu sans friction"]
            },
            {
                name: "Vercel & Cloud Deploy",
                icon: SiVercel,
                iconColor: "#FFFFFF",
                category: "Hébergement Cloud & Edge Functions",
                description: "Plateformes cloud managées pour déploiement instantané d'applications web et fonctions Edge.",
                officialDocUrl: "https://vercel.com/docs",
                benUsage: "Déploiement et monitoring continu de toutes ses applications web et prototypes avec previews automatiques sur chaque Pull Request, certificats SSL automatiques et performances CDN mondiales.",
                keyHighlights: ["Déploiement continu automatisé", "Réseau CDN mondial Edge", "Environnements de prévisualisation (Previews)", "Monitoring de performance et analytics"]
            },
            {
                name: "Linux & Bash Scripting",
                icon: SiLinux,
                iconColor: "#FCC624",
                category: "Administration Système & Scripting",
                description: "Administration système, automatisation de tâches et déploiement sous Ubuntu / Debian pour ROS2.",
                officialDocUrl: "https://www.kernel.org/doc/html/latest/",
                benUsage: "Utilisation quotidienne d'Ubuntu pour le développement ROS2, écriture de scripts Bash pour automatiser le build d'environnements, la gestion des permissions et le déploiement sur serveurs distants via SSH.",
                keyHighlights: ["Environnement natif pour ROS2", "Scripts d'automatisation Bash", "Gestion des services systemd", "Sécurité SSH et gestion des accès"]
            },
        ]
    }
];

// ==========================================
// 3. MON PROCESS (Fidèle à la Capture 3)
// ==========================================
export const PROCESS_STEPS = [
    {
        stepNumber: "01",
        stepTag: "ÉTAPE",
        title: "Découverte",
        meta: "30 MIN • GRATUIT",
        description: "On clarifie votre vision ensemble. Vous repartez avec une roadmap claire et un premier cadrage technique précis.",
        sideNote: "Un échange sans pression pour comprendre votre métier, vos contraintes et le résultat attendu.",
        accentColor: "from-emerald-500 to-emerald-600",
        badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: Compass,
    },
    {
        stepNumber: "02",
        stepTag: "ÉTAPE",
        title: "Proposition & Architecture",
        meta: "48H MAX • DEVIS FIXE",
        description: "Proposition détaillée avec prix ferme, timeline exacte et stack technique validée. Aucune surprise sur le budget.",
        sideNote: "Vous validez le périmètre, les livrables et le calendrier avant la moindre ligne de code.",
        accentColor: "from-amber-500 to-orange-500",
        badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: Layers,
    },
    {
        stepNumber: "03",
        stepTag: "ÉTAPE",
        title: "Conception & Développement",
        meta: "SPRINTS HEBDOMADAIRES",
        description: "Développement itératif avec des démonstrations hebdomadaires. Vous testez l'avancement en conditions réelles.",
        sideNote: "Code propre, typé et versions intermédiaires déployées sur environnement de prévisualisation dédié.",
        accentColor: "from-blue-500 to-cyan-500",
        badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        icon: Code2,
    },
    {
        stepNumber: "04",
        stepTag: "ÉTAPE",
        title: "Déploiement & Transmission",
        meta: "CLÉ EN MAIN • DOCUMENTÉ",
        description: "Mise en production, tests de charge, transfert complet du code source et formation pour une autonomie totale.",
        sideNote: "Documentation complète, support post-lancement inclus et garantie de fonctionnement.",
        accentColor: "from-rose-500 to-red-600",
        badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        icon: Rocket,
    },
];

// ==========================================
// 4. PROJETS SÉLECTIONNÉS
// ==========================================
export const PROJECTS = [
    {
        id: "dentwise",
        title: "Dentwise — Votre Santé Protégée par l'IA",
        description: "Plateforme e-santé connectée (Bénin Santé) : carnet de santé numérique intelligent, prise de rendez-vous médicaux et assistant vocal conversationnel propulsé par l'IA pour le suivi préventif.",
        problem: "Difficulté d'accès rapide aux conseils médicaux préventifs, dispersion des antécédents médicaux et lenteur de l'orientation clinique pour les patients.",
        solution: "Écosystème e-santé interactif unifié avec tri médical assisté par IA, assistant vocal en langage naturel, carnet de santé digitalisé et coordination avec praticiens de santé.",
        image: PROJECT_IMG_DENTWISE,
        tags: ["React", "Intelligence Artificielle", "Assistant Vocal", "E-Santé", "Tailwind CSS"],
        liveUrl: "https://dentw.vercel.app/",
        githubUrl: "https://github.com/Tedel12/dentw",
        featured: true,
        badgeText: "⭐ Projet Coup de Cœur",
        category: "Full-Stack",
    },
    {
        id: "lifac",
        title: "LiFAC — Light For All Center",
        description: "Plateforme chrétienne d'impact mondial pour l'évangélisation, la diffusion de messages d'édification, l'organisation de croisades et la collecte de dons humanitaires.",
        problem: "Offrir un canal numérique d'évangélisation universel, moderne et interactif pour fédérer les communautés chrétiennes et centraliser les initiatives spirituelles et d'aide.",
        solution: "Application web hautement responsive, optimisée pour le streaming d'événements, la gestion des dons sécurisés et la publication d'enseignements spirituels.",
        image: PROJECT_IMG_LIFAC,
        tags: ["React", "TypeScript", "Tailwind CSS", "Plateforme Chrétienne"],
        liveUrl: "https://lifac.org/",
        githubUrl: "https://github.com/Tedel12/lifac",
        featured: true,
        category: "Full-Stack",
    },
    {
        id: "smart-resto",
        title: "Smart Resto — Menu Digital & Commande en Ligne",
        description: "Solution SaaS de digitalisation pour la restauration : menu interactif par table via QR Code, prise de commandes instantanée (sur place / emporter) et gestion fluide du panier client.",
        problem: "Réduire les temps d'attente en salle aux heures de pointe, supprimer les menus papier obsolètes et fluidifier la transmission des commandes en cuisine.",
        solution: "Application web mobile-first réactive avec filtrage par catégorie de plats, personnalisation des commandes et calcul instantané du total.",
        image: PROJECT_IMG_SMART_RESTO,
        tags: ["React", "Tailwind CSS", "QR Code", "SaaS Restauration"],
        liveUrl: "https://smart-resto-delta.vercel.app/",
        githubUrl: "https://github.com/Tedel12/smart-resto",
        featured: true,
        category: "Full-Stack",
    },
    {
        id: "quickshow",
        title: "QuickShow : Découverte & Billetterie Cinéma",
        description: "Interface web de consultation de programmations cinématographiques, détails des séances, bandes-annonces et simulation de réservation instantanée.",
        problem: "Offrir une recherche fluide et ultra-rapide sans rechargement pour consulter les affiches et horaires de projection en temps réel.",
        solution: "Architecture réactive consommant une API cinéma avec filtres par genre, mise en cache locale et lecteur de bandes-annonces optimisé.",
        image: PROJECT_IMG_QUICKSHOW,
        tags: ["React", "API REST", "Tailwind CSS", "Motion"],
        liveUrl: "https://quick-show-client-snowy.vercel.app",
        githubUrl: "https://github.com/Tedel12/QuickShow-client",
        featured: true,
        category: "Frontend",
    },
    {
        id: 1,
        title: "LMS : Plateforme d'apprentissage en ligne",
        description: "Application complète de gestion de cours avec modules vidéo, quiz interactifs et suivi en temps réel de la progression des apprenants.",
        problem: "Permettre aux formateurs de publier des cours structurés et de suivre individuellement l'avancement des étudiants avec des évaluations automatiques.",
        solution: "Architecture MERN avec authentification JWT sécurisée, tableau de bord réactif et stockage optimisé des ressources multimédias.",
        image: PROJECT_IMG_2,
        tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        liveUrl: "https://lms-frontend-one-rose.vercel.app",
        githubUrl: "https://github.com/Tedel12/lms",
        featured: true,
        category: "Full-Stack",
    },
    {
        id: 4,
        title: "BeninPlantes : E-commerce végétal",
        description: "Boutique en ligne dédiée à l'achat de plantes avec panier dynamique, gestion de stock et catalogue par espèces.",
        problem: "Présenter un catalogue visuel soigné avec gestion de panier fluide et calcul des frais de livraison.",
        solution: "Développement React avec gestion d'état centralisée et mise en page responsive conçue pour mobile.",
        image: PROJECT_IMG_5,
        tags: ["React", "Tailwind CSS", "Motion"],
        liveUrl: "https://beninplantes.vercel.app/",
        githubUrl: "https://github.com/Tedel12/beninplantes-frontend",
        featured: true,
        category: "Frontend",
    },
    {
        id: 5,
        title: "AgencyAI : Audit & Intégration d'API",
        description: "Plateforme vitrine avec intégration d'API d'analyse de contenu et génération automatisée d'audits marketing.",
        problem: "Permettre aux prospects de tester directement des suggestions de copywriting automatisées.",
        solution: "Interface épurée avec intégration d'endpoints API sécurisés et rendu en streaming des réponses.",
        image: PROJECT_IMG_6,
        tags: ["React", "Tailwind CSS", "OpenAI API"],
        liveUrl: "https://agency-ai-omega-hazel.vercel.app/",
        githubUrl: "https://github.com/Tedel12/agency-ai",
        featured: false,
        category: "Frontend",
    },
    {
        id: 3,
        title: "TaskFlow : Gestion collaborative de projets",
        description: "Outil de gestion de projets agile avec organisation par colonnes (Kanban), attribution de priorités et historique d'activités.",
        problem: "Simplifier la coordination d'équipes légères sans la lourdeur d'outils d'entreprise complexes.",
        solution: "Backend Node.js/Express avec validation stricte des données et interface React modulaire.",
        image: PROJECT_IMG_3,
        tags: ["React", "Node.js", "Express", "MongoDB"],
        liveUrl: "https://github.com/Tedel12",
        githubUrl: "https://github.com/Tedel12",
        featured: false,
        category: "Full-Stack",
    },
];

// ==========================================
// 5. PARCOURS & FORMATION (Issu du CV officiel)
// ==========================================
export const JOURNEY_STEPS = [
    {
        year: "Depuis juil. 2026",
        title: "Développeur Full-Stack Web & Mobile",
        company: "BEST EXPERTS GROUP (Gbèdjromèdé)",
        description: "Développement d'applications logicielles web et mobiles de pointe, conception d'architectures robustes, optimisation des performances et collaboration directe avec les équipes produit.",
        icon: Rocket,
        color: "bg-emerald-600",
    },
    {
        year: "Fév. 2026 - Mai 2026",
        title: "Développeur Backend (Stage)",
        company: "Exowpee (Zogbo)",
        description: "Conception et implémentation de backends sous Laravel et PostgreSQL sur des projets complexes, gestion des flux Git/GitLab et intégration professionnelle.",
        icon: Server,
        color: "bg-blue-600",
    },
    {
        year: "Juin 2024 - Sept. 2024",
        title: "Développeur Web (Stage)",
        company: "Digitalis Bénin (Abomey-Calavi)",
        description: "Développement backend PHP et gestion de bases de données MySQL, conception de projets web et travail d'équipe.",
        icon: Briefcase,
        color: "bg-indigo-600",
    },
    {
        year: "2023 - 2026",
        title: "Licence en Sciences Informatiques et Logiciels (SIL)",
        company: "Institut Supérieur de Management (ISM) ADONAÏ",
        description: "Diplôme de Licence SIL validant la rigueur algorithmique, le génie logiciel, les systèmes d'information et les architectures web/mobile.",
        icon: GraduationCap,
        color: "bg-emerald-700",
    },
    {
        year: "2022",
        title: "Baccalauréat",
        company: "CEG Houègbo (Atlantique)",
        description: "Obtention du Baccalauréat et choix décisif de carrière en informatique et technologies de pointe.",
        icon: Award,
        color: "bg-blue-700",
    },
];

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com/Tedel12",
        color: "hover:text-emerald-400",
        bgColor: "hover:bg-emerald-500/10",
    },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "https://www.linkedin.com/in/ben-ephra%C3%AFm-agbannon-948819311",
        color: "hover:text-emerald-400",
        bgColor: "hover:bg-emerald-500/10",
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:benagbannon@gmail.com",
        color: "hover:text-emerald-400",
        bgColor: "hover:bg-emerald-500/10",
    },
];

export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: "Localisation",
        value: "Abomey-Calavi, Atlantique, Bénin"
    },
    {
        icon: Mail,
        label: "Email professionnel",
        value: "benagbannon@gmail.com"
    },
    {
        icon: Phone,
        label: "Téléphone direct",
        value: "+229 01 55 69 98 25"
    },
];

// ==========================================
// 8. MES CERTIFICATS & ATTESTATIONS D'EXCELLENCE
// ==========================================
export const CERTIFICATES = [
    {
        id: "nasa-space-apps-2025",
        title: "Galactic Problem Solver - NASA Space Apps Challenge",
        issuer: "NASA & Agences Spatiales Partenaires",
        category: "Hackathon International Spacial",
        badge: "Galactic Problem Solver",
        date: "04 - 05 Octobre 2025",
        credentialId: "NASA-SPACE-APPS-2025-BEN",
        signatory: "Dr. Keith Gaddis (Program Scientist, NASA Space Apps Challenge)",
        description: "Distinction internationale décernée par la NASA pour avoir abordé et résolu avec rigueur et créativité des défis complexes de portée terrestre et spatiale en exploitant la modélisation de données, l'IA et l'analyse géospatiale.",
        partners: "En partenariat avec : CSA, ESA, JAXA, ISRO, ASI, CONAE, SANSA, AEB, TUA, UK Space Agency",
        skills: ["Data Science", "Open Science", "Spatial Problem Solving", "Intelligence Artificielle", "Satellite Data"],
        image: CERT_NASA,
        accentColor: "from-blue-600 to-indigo-700",
        tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    {
        id: "cursor-hackathon-2026",
        title: "Cursor Hackathon UAC 2026 - Attestation de Participation",
        issuer: "Cursor (Anysphere) • Ambassade Cursor Bénin",
        category: "Hackathon IA & Software Engineering",
        badge: "Participation Exceptionnelle",
        date: "21 Mars 2026",
        credentialId: "CURSOR-HACKATHON-UAC-2026",
        signatory: "Régis A. R. KIKI (Ambassadeur Cursor Bénin)",
        location: "Abomey-Calavi, Bénin",
        description: "Reconnaissance d'une participation exceptionnelle au Cursor Hackathon UAC 2026. Atteste d'une maîtrise avancée du développement logiciel augmenté par les agents IA, le prototypage rapide et l'intégration de modèles de langage (LLMs).",
        skills: ["Cursor IDE", "AI Agentic Workflows", "Prompt Engineering", "Full-Stack Rapid Prototyping"],
        image: CERT_CURSOR,
        accentColor: "from-orange-600 to-amber-700",
        tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    {
        id: "datacamp-ai-2026",
        title: "Understanding Artificial Intelligence",
        issuer: "DataCamp",
        category: "Certification Fondamentaux IA",
        badge: "Statement of Accomplishment",
        date: "07 Octobre 2026",
        credentialId: "#46,453,133",
        duration: "2 Heures",
        signatory: "Jonathan Cornelissen (CEO, DataCamp)",
        description: "Certification validant les principes fondamentaux et avancés de l'Intelligence Artificielle : apprentissage automatique (Machine Learning), réseaux de neurones (Deep Learning), éthique algorithmique et automatisation intelligente.",
        skills: ["Machine Learning", "Deep Learning", "Neural Networks", "AI Concepts & Ethics"],
        image: CERT_DATACAMP_AI,
        accentColor: "from-emerald-600 to-teal-700",
        tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
        id: "miabe-hackathon-2026",
        title: "Certificat de Validation de Formation - MIABE Hackathon 2026",
        issuer: "MIABE Hackathon • Plateforme FATA",
        category: "Compétition Panafricaine (15 Pays)",
        badge: "Validation 25 000 XP",
        date: "27 Février 2026",
        credentialId: "MIABE-2026-FATA-XP25000",
        signatory: "Edem GALLEY (Commissaire Général, MIABE Hackathon)",
        description: "Validation avec succès de la phase officielle de formation du MIABE Hackathon (édition panafricaine réunissant 15 nations) avec un score certifié de 25 000 XP. Atteste des compétences solides en algorithmic engineering et développement sous contrainte de temps.",
        skills: ["Algorithmique Avancée", "Compétition Panafricaine", "Résolution Intensive", "Software Craftsmanship"],
        image: CERT_MIABE,
        accentColor: "from-purple-600 to-indigo-700",
        tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    {
        id: "datacamp-data-2026",
        title: "Introduction to Data",
        issuer: "DataCamp",
        category: "Science & Gestion des Données",
        badge: "Statement of Accomplishment",
        date: "21 Mai 2026",
        credentialId: "#47,875,099",
        duration: "2 Heures",
        signatory: "Jonathan Cornelissen (CEO, DataCamp)",
        description: "Validation des concepts fondamentaux de la donnée : cycle de vie des données, architectures relationnelles vs non-relationnelles, structures de pipelines et préparation de datasets pour l'inférence statistique et IA.",
        skills: ["Data Pipelines", "Data Literacy", "Structures Relationnelles", "Exploratory Data Analysis"],
        image: CERT_DATACAMP_DATA,
        accentColor: "from-teal-600 to-emerald-700",
        tagColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    },
];