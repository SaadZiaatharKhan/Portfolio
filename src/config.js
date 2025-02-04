export const config = {
    title: "Welcome To My Portfolio",
    sections: ["home", "about", "projects", "contact"],
    home: {
        title: "SAAD",
        subtitle: "KHAN"
    },
    skills : [
    // {
    //     name: "React",
    //     icon: "icons/react-native.png",
    //     level:87
    // },
    // {
    //     name: "JavaScipt",
    //     icon: "icons/javascript.png",
    //     level: 88
    // },
    {
        name: "Three.js",
        icon: "icons/threejs.png",
        level: 70
    },
    {
        name: "MERN Full Stack",
        icon: "icons/mern.png",
        level: 83
    },
    {
        name: "NextJs",
        icon: "icons/next.png",
        level: 77,
    },
    {
        name: "Python",
        icon: "icons/python.png",
        level: 92
    },
    {
        name: "C/C++",
        icon: "icons/cpp.png",
        level:89
    },
    {
        name: "English",
        icon: "icons/english.png",
        level: 79
    },
    {
        name: "Hindi",
        icon: "icons/hindi.png",
        level: 95
    },
],
    projects: [
        {
            name: "3D Zoo",
            description: "This is a Zoo made with the help of React Three Fiber and React Three Drei.",
            image: "projects/Zoo.png",
            link: "https://github.com/SaadZiaatharKhan/Zoo"
        },
        {
            name: "CareConnect",
            description: "An emergency alert system designed to assist senior citizens living alone in connecting with nearby nurses",
            image: "projects/CareConnect.png",
            link: "https://github.com/SaadZiaatharKhan/CareConnect-search-nurses-near-you"
        },
        {
            name: "HealthVision AI",
            description: "AI-powered healthcare solution designed to diagnose medical conditions using text and imaging data",
            image: "projects/HealthVisionAI.png",
            link: "https://github.com/SaadZiaatharKhan/HealthVision-AI"
        },
        {
            name: "AgriGuardian",
            description: "AI Driven Crop Disease Detection System",
            image: "projects/PlantDoc.png",
            link: "https://www.youtube.com/watch?v=yMERHD2QKTg"
        },
    ],
    contact: {
        name: "Saad Khan",
        address: "Pune, India",
        socials: {
            linkedin: "https://www.linkedin.com/in/saad-khan-468a9728b/",
            github: "https://github.com/SaadZiaatharKhan"
        },
        mail: "saadziaatharkhan@gmail.com"
    }
}