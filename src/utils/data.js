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
    Brain
} from "lucide-react";

import { FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";

import PROJECT_IMG_1 from "../assets/images/project-1.webp";
import PROJECT_IMG_2 from "../assets/images/project-2.webp";
import PROJECT_IMG_3 from "../assets/images/project-3.webp";
import PROJECT_IMG_4 from "../assets/images/project-4.jpg";
import PROJECT_IMG_5 from "../assets/images/project-5.png";
import PROJECT_IMG_6 from "../assets/images/project-6.png";
import PROJECT_IMG_7 from "../assets/images/project-7.png";
import { AiFillTikTok } from "react-icons/ai";

export const SKILLS_CATEGORY = [
    {
        title: "Frontend",
        icon: Code2,
        description: "Crétion de très belles interfaces utilisateur en utilisant les technologies modernes.",
        skills: [
            { name: "React", level: 95, color: "bg-blue-500" },
            { name: "TypeScript", level: 90, color: "bg-blue-600" },
            { name: "Next.js", level: 80, color: "bg-gray-400" },
            { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
            { name: "Framer Motion", level: 85, color: "bg-pink-500" },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        description: "Construction d'APIs robustes et évolutives pour alimenter vos applications.",
        skills: [
            { name: "Node.js", level: 90, color: "bg-green-500" },
            { name: "Express.js", level: 92, color: "bg-gray-700" },
            { name: "REST APIs", level: 90, color: "bg-yellow-500" },
            { name: "SQL", level: 88, color: "bg-pink-500" },
            { name: "Laravel", level: 95, color: "bg-orange-500/30" },
        ],
    },
    {
        title: "Bases de données",
        icon: Database,
        description: "Gestion et optimisation du stockage des données.",
        skills: [
            { name: "MongoDB", level: 88, color: "bg-green-600" },
            { name: "Postgre SQL", level: 80, color: "bg-blue-700" },
            { name: "Prisma", level: 82, color: "bg-red-500" },
            { name: "MySQL", level: 90, color: "bg-indigo-600" },
            { name: "Firebase", level: 77, color: "bg-orange-500/20" },
        ]
    },
    {
        title: "DevOps",
        icon: Cloud,
        description: "Déploiement et mise à l'échelle des applications puis suivi et monitoring",
        skills: [
            { name: "Docker", level: 68, color: "bg-indigo-600/20" },
            { name: "AWS", level: 72, color: "bg-blue-600" },
            { name: "Vercel", level: 95, color: "bg-orange-900" },
            { name: "Git", level: 90, color: "bg-purple-700" },
            { name: "CI/CD", level: 79, color: "bg-gray-600" },
        ]
    },
]


export const TECH_STACK = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Notion",
    "GitHub",
    "Figma",
    "Vite",
    "PHP",
    "Laravel",
]


export const STATS = [
    { number: "20+", label: "Projets réalisés" },
    { number: "3+", label: "Années d'expérience" },
    { number: "15+", label: "Technologies" },
    { number: "10+", label: "Clients satisfaits" },
]



export const PORJECTS = [
    {
        id: 1,
        title: "LMS - Plateforme e-learning",
        description: "Plateforme e-learning pour cours en ligne avec vidéos, quiz et suivi des progrès.",
        image: PROJECT_IMG_2,
        tags: ["React", "Node.js", "MongoDB", "Tailwind"],
        liveUrl: "https://lms-frontend-one-rose.vercel.app",
        githubUrl: "https://github.com/Tedel12/lms",
        featured: true,
        category: "Full Stack",
    },
    {
        id: 2,
        title: "QuickMovie - Application de recherche de films et réservation de billets",
        description: "Application web pour rechercher des films, voir les horaires et réserver des billets en ligne.",
        image: PROJECT_IMG_1,
        tags: ["React", "API tierce", "Tailwind"],
        liveUrl: "https://quick-show-client-snowy.vercel.app",
        githubUrl: "https://github.com/Tedel12/QuickShow-client",
        featured: true,
        category: "Frontend",
    },
    {
        id: 3,
        title: "Gestion des tâches et de projets   - Application de productivité",
        description: "Application web pour gérer les tâches, suivre les projets et collaborer en équipe.",
        image: PROJECT_IMG_3,
        tags: ["React.js", "Node.js", "Express", "MongoDB"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 4,
        title: "BeninPlantes - Site de e-commerce pour plantes en ligne",
        description: "Site e-commerce pour acheter des plantes en ligne avec options de livraison.",
        image: PROJECT_IMG_5,
        tags: ["React.js", "Tailwind", "Framer Motion"],
        liveUrl: "https://beninplantes.vercel.app/",
        githubUrl: "https://github.com/Tedel12/beninplantes-frontend",
        featured: true,
        category: "Frontend",
    },
    {
        id: 5,
        title: "AgencyAI - Site web d'agence de marketing numérique propulsé par l'IA",
        description: "Site web pour une agence de marketing numérique utilisant l'IA pour optimiser les campagnes.",
        image: PROJECT_IMG_6,
        tags: ["React.js", "Tailwind", "AI Integration"],
        liveUrl: "https://agency-ai-omega-hazel.vercel.app/",
        githubUrl: "https://github.com/Tedel12/agency-ai",
        featured: true,
        category: "Frontend",
    },
    // {
    //     id: 6,
    //     title: "QuickBlog - Application de gestion de blog",
    //     description: "Site web pour partager ses articles, photos et contenus puis recevoir des retours de possibles utilisateurs.",
    //     image: PROJECT_IMG_4,
    //     tags: ["React.js", "Tailwind", "AI Integration", "MongoDB"],
    //     liveUrl: "https://quick-blog-sand.vercel.app/",
    //     githubUrl: "https://github.com/Tedel12/quick-blog",
    //     featured: true,
    //     category: "Web app",
    // },
     {
        id: 7,
        title: "Portfolio personnel - version 1",
        description: "Mon porfolio personnel qui montre qui je suis et mes compétences techniques et parallèles.",
        image: PROJECT_IMG_7,
        tags: ["Next.js", "Tailwind", "Framer Motion"],
        liveUrl: "https://portfolio-liart-psi-68.vercel.app",
        githubUrl: "https://github.com/Tedel12/portfolio",
        featured: true,
        category: "Frontend",
    },
]


export const JOURNEY_STEPS = [
    {
        year: "2022",
        title: "Baccalauréat profesionnel",
        company: "CEG Houègbo - ATLANTIQUE",
        description: "Obtention de mon Bac professionnel et choix de ma carrière en informatique.",
        icon: GraduationCap,
        color: "bg-blue-500",
    },
    {
        year: "2023",
        title: "Début d'études en informatiques",
        company: "ISM Adonaï - AUTO-DIDACTE",
        description: "Je commence par apprendre les bases de la programmation et du développement web avec HTML, CSS, JavaScript. Je construit mon premier site web qui était tant bien que mal encourageant.",
        icon: Code2,
        color: "bg-green-500",
    },
    {
        year: "2024",
        title: "Premier stage en entreprise",
        company: "Digitalis Bénin",
        description: "Je me joins à Digitalis Bénin comme stagiaire junior en développement web en apprenant d'abord avec du Laravel accompagné de projets pratiques et très interessants.",
        icon: Briefcase,
        color: "bg-purple-500",
    },
    {
        year: "2024",
        title: "Developper full stack",
        company: "Freelance - AUTO-DIDACTE",
        description: "Je deviens développeur full stack avec des compétences en MERN stack, en PHP, en web avancé et autres domaines du IT. Je contruit jusqu'à présent des applications web 100% fiables et multi-plateforme.",
        icon: Rocket,
        color: "bg-orange-500",
    },
    {
        year: "2026",
        title: "Licence Professionnel en Sciences Informatique et Logiciels (SIL)",
        company: "Institut Supérieur de Management ADONAÏ",
        description: "Obtention de ma licence profesionnel en SIL prouvant réellement mes compétences.",
        icon: Award,
        color: "bg-pink-500",
    },
]



export const PASSIONS = [
    {
        icon: Heart,
        title: "Expérience Utilisateur",
        description: "Créer des interfaces intuitives et attrayantes pour une expérience utilisateur optimale.",
    },
    {
        icon: Coffee,
        title: "Résolution de Problèmes",
        description: "Apprécier le défi de résoudre des problèmes complexes avec des solutions efficaces.",
    },
    {
        icon: BookOpen,
        title: "Apprentissage Continu",
        description: "Toujours curieux d'apprendre de nouvelles technologies et de rester à jour dans le domaine.",
    },
    {
        icon: Zap,
        title: "Innovation Technologique",
        description: "Passionné par l'exploration des dernières tendances et innovations technologiques.",
    },
    {
        icon: Brain,
        title: "Intelligence Artificielle et Machine Learning",
        description: "Fasciné par le potentiel de l'IA et du ML pour transformer les industries et améliorer la vie quotidienne.",
    }
]


export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com/Tedel12",
        color: "hover:text-gray-400",
        bgColor: "hover:bg-gray-500/40",
    },
    {
        name: "LikedIn",
        icon: FiLinkedin,
        url: "https://www.linkedin.com/in/ben-ephra%C3%AFm-agbannon-948819311",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10",
    },
    {
        name: "Instagram",
        icon: FiInstagram,
        url: "https://www.instagram.com/declan_3.5",
        color: "hover:text-pink-400",
        bgColor: "hover:bg-pink-500/10",
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:benagbannon@gmail.com",
        color: "hover:text-green-400",
        bgColor: "hover:bg-green-500/10",
    },
    {
        name: "Facebook",
        icon: FiFacebook,
        url: "#",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10",
    },
    {
        name: "Tiktok",
        icon: AiFillTikTok,
        url: "#",
        color: "hover:text-black",
        bgColor: "hover:bg-black/10",
    },
]


export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: "Localisation",
        value: "Abomey-Calavi, ATLANTIQUE, Bénin"
    },
    {
        icon: Mail,
        label: "Email",
        value: "benagbannon@gmail.com"
    },
    {
        icon: Phone,
        label: "Téléphone",
        value: "+229 01 55 69 98 25 / 01 62 49 81 40"
    },
]