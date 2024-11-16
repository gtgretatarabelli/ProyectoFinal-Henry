import { Role } from "src/modules/user/enums/role.enum";
import { serviceMock } from "../serviceSeed/service-mock";


export const gardenersMock = [
    {
        name: "Juan Perez",
        email: "jardinero@gmail.com",
        username : "GardnerJuan",
        password: "password123",
        confirmPassword: "password123",
        phone: "5551234",
        address: "Avenida Jardín 45",
        age : 30,
        role : Role.Gardener,
        experience : "Experto en diseño y mantenimiento de jardines.",
        calification : 4,
        ubication : "Av. Siempre Viva 742",
        costPerHour : 2000,
        profileImageUrl:"gardener/i21jki2m58j7rrgh12rt",
        serviceProvided : [],
        serviceDeails : []
    },
    {
        name: "Ana Lopez",
        email: "ana.lopez@gmail.com",
        username : "GardnerAna",
        password: "password456",
        confirmPassword: "password456",
        phone: "5555678",
        address: "Calle Verde 102",
        age : 28,
        role : Role.Gardener,
        experience : "Especialista en poda y cuidado de césped.",
        calification : 3,
        ubication : "Los Robles 67",
        costPerHour : 1800,
        profileImageUrl:"gardener/vja4j61zfcdl8qk1iccv",
        serviceProvided : [],
        serviceDeails : []
    },
    {
        name: "Carlos Ramirez",
        email: "carlos.ramirez@gmail.com",
        username : "GardnerCarlos",
        password: "password789",
        confirmPassword: "password789",
        phone: "5554321",
        address: "Camino del Árbol 58",
        age : 35,
        role : Role.Gardener,
        experience : "Amplia experiencia en instalación de sistemas de riego y cuidado de plantas.",
        calification : 5,
        ubication : "Jardines del Valle 112",
        costPerHour : 2200,
        profileImageUrl:"gardener/gnfmj6z3a7c0oncgr05i",
        serviceProvided : [],
        serviceDeails : []
    },
    {
        name: "Maria Torres",
        email: "maria.torres@gmail.com",
        username : "GardnerMaria",
        password: "password101",
        confirmPassword: "password101",
        phone: "5558765",
        address: "Ruta Floral 17",
        age : 40,
        role : Role.Gardener,
        experience : "Profesional en diseño de jardines y paisajismo.",
        calification : 2,
        ubication : "Las Margaritas 23",
        costPerHour : 2500,
        profileImageUrl:"gardener/flkyg5ey9eamunc6fnid",
        serviceProvided : [],
        serviceDeails : []
    },
    {
        name: "Lucas Díaz",
        email: "lucas.diaz@gmail.com",
        username : "GardnerLucas",
        password: "password202",
        confirmPassword: "password202",
        phone: "5559876",
        address: "Verde Olivo 92",
        age : 26,
        role : Role.Gardener,
        experience : "Hábil jardinero con experiencia en mantenimiento de jardines.",
        calification : 1,
        ubication : "Pinos de la Colina 34",
        costPerHour : 1900,
        profileImageUrl:"gardener/Perfil7.jpg",
        serviceProvided : [],
        serviceDeails : []
    },
];
