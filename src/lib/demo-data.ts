import {
  BriefcaseBusiness,
  Building2,
  Droplets,
  GraduationCap,
  Leaf,
  Scissors,
  Stethoscope,
  Truck,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FeaturedCategory = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
};

export type DemoBusiness = {
  id: string;
  name: string;
  owner: string;
  category: string;
  specialty: string;
  city: string;
  department: string;
  description: string;
  phone: string;
  whatsapp: string;
  initials: string;
};

// Datos ficticios para previsualizar la experiencia del visitante.
// Cuando tengas la lista real, cambia aqui nombres, categorias, ciudades,
// telefonos y WhatsApp. Los enlaces se generan automaticamente en las tarjetas.
export const departments = [
  "Beni",
  "Santa Cruz",
  "La Paz",
  "Cochabamba",
  "Chuquisaca",
  "Oruro",
  "Pando",
  "Potosi",
  "Tarija"
];

export const citiesByDepartment: Record<string, string[]> = {
  Beni: ["Trinidad", "Riberalta", "Guayaramerin", "San Borja"],
  "Santa Cruz": ["Santa Cruz de la Sierra", "Montero", "Warnes"],
  "La Paz": ["La Paz", "El Alto", "Viacha"],
  Cochabamba: ["Cochabamba", "Quillacollo", "Sacaba"],
  Chuquisaca: ["Sucre"],
  Oruro: ["Oruro"],
  Pando: ["Cobija"],
  Potosi: ["Potosi", "Uyuni"],
  Tarija: ["Tarija", "Yacuiba"]
};

export const featuredCategories: FeaturedCategory[] = [
  {
    name: "Salud",
    slug: "salud",
    description: "Medicos, odontologia, veterinaria y bienestar.",
    icon: Stethoscope
  },
  {
    name: "Construccion",
    slug: "construccion",
    description: "Arquitectura, ingenieria, electricidad y plomeria.",
    icon: Building2
  },
  {
    name: "Automotriz",
    slug: "automotriz",
    description: "Mecanica, repuestos, mantenimiento y transporte.",
    icon: Wrench
  },
  {
    name: "Educacion",
    slug: "educacion",
    description: "Clases, capacitacion, apoyo escolar y cursos.",
    icon: GraduationCap
  },
  {
    name: "Belleza",
    slug: "belleza",
    description: "Peluqueria, barberia, estetica y cuidado personal.",
    icon: Scissors
  },
  {
    name: "Servicios",
    slug: "servicios-profesionales",
    description: "Consultores, tecnicos y profesionales independientes.",
    icon: BriefcaseBusiness
  },
  {
    name: "Comercio",
    slug: "comercio",
    description: "Productos, agua, ropa, calzados y ventas locales.",
    icon: Droplets
  },
  {
    name: "Transporte",
    slug: "transporte",
    description: "Traslados, encomiendas y apoyo logistico.",
    icon: Truck
  },
  {
    name: "Productos artesanales",
    slug: "productos-artesanales",
    description: "Produccion local, jabones, alimentos y detalles.",
    icon: Leaf
  }
];

export const demoBusinesses: DemoBusiness[] = [
  {
    id: "demo-1",
    name: "Clinica Familiar Luz",
    owner: "Dr. Mateo Rojas",
    category: "Medicina",
    specialty: "Medicina general",
    city: "Trinidad",
    department: "Beni",
    description: "Atencion medica general, control preventivo y orientacion familiar.",
    phone: "71122334",
    whatsapp: "71122334",
    initials: "CL"
  },
  {
    id: "demo-2",
    name: "Veterinaria San Jose",
    owner: "Valeria Quiroga",
    category: "Veterinaria",
    specialty: "Consulta y vacunas",
    city: "Riberalta",
    department: "Beni",
    description: "Cuidado basico para mascotas, vacunas y venta de accesorios.",
    phone: "72233445",
    whatsapp: "72233445",
    initials: "VS"
  },
  {
    id: "demo-3",
    name: "Soluciones Civiles Andina",
    owner: "Ing. Camilo Vera",
    category: "Ingenieria",
    specialty: "Obras civiles",
    city: "La Paz",
    department: "La Paz",
    description: "Asesoria tecnica, presupuestos y supervision de construcciones.",
    phone: "73344556",
    whatsapp: "73344556",
    initials: "SA"
  },
  {
    id: "demo-4",
    name: "Taller Ruta Norte",
    owner: "Daniel Paz",
    category: "Mecanica",
    specialty: "Mecanica automotriz",
    city: "Santa Cruz de la Sierra",
    department: "Santa Cruz",
    description: "Diagnostico, mantenimiento preventivo y reparacion automotriz.",
    phone: "74455667",
    whatsapp: "74455667",
    initials: "TR"
  },
  {
    id: "demo-5",
    name: "Jabones Aurora",
    owner: "Lucia Mendez",
    category: "Productos artesanales",
    specialty: "Jabones naturales",
    city: "Cochabamba",
    department: "Cochabamba",
    description: "Jabones artesanales de prueba, empaques para regalos y pedidos pequenos.",
    phone: "75566778",
    whatsapp: "75566778",
    initials: "JA"
  },
  {
    id: "demo-6",
    name: "Agua Clara Express",
    owner: "Samuel Ortiz",
    category: "Comercio",
    specialty: "Venta de agua",
    city: "Trinidad",
    department: "Beni",
    description: "Distribucion demostrativa de botellones de agua para hogares y oficinas.",
    phone: "76677889",
    whatsapp: "76677889",
    initials: "AC"
  },
  {
    id: "demo-7",
    name: "Barberia Escuadra Roja",
    owner: "Nicolas Salvatierra",
    category: "Belleza",
    specialty: "Barberia y peluqueria",
    city: "Santa Cruz de la Sierra",
    department: "Santa Cruz",
    description: "Cortes clasicos, arreglo de barba y atencion por reserva.",
    phone: "77788990",
    whatsapp: "77788990",
    initials: "BR"
  },
  {
    id: "demo-8",
    name: "Transporte Fraterno",
    owner: "Ruben Aguilar",
    category: "Transporte",
    specialty: "Traslados urbanos",
    city: "La Paz",
    department: "La Paz",
    description: "Servicio ficticio de traslados, encomiendas pequenas y apoyo logistico.",
    phone: "78899001",
    whatsapp: "78899001",
    initials: "TF"
  },
  {
    id: "demo-9",
    name: "Ganaderia El Roble",
    owner: "Esteban Molina",
    category: "Ganaderia",
    specialty: "Produccion ganadera",
    city: "Riberalta",
    department: "Beni",
    description: "Perfil de muestra para venta y asesoria basica en produccion ganadera.",
    phone: "79900112",
    whatsapp: "79900112",
    initials: "GR"
  }
];

export const howItWorks = [
  {
    title: "Busca dentro del directorio",
    description: "Escribe una profesion, producto, oficio o servicio y filtra por ubicacion."
  },
  {
    title: "Revisa el perfil",
    description: "Consulta datos de contacto, rubro, ciudad y descripcion del servicio."
  },
  {
    title: "Contacta directo",
    description: "Abre WhatsApp o llama sin intermediarios, pagos internos ni chat adicional."
  }
];
