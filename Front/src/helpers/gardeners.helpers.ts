import { IServiceProvider } from "@/interfaces/IServiceProvider";
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getGardenersDB = async (
  token: string,
  order: "ASC" | "DESC" = "ASC",
  calification?: number,
  name?: string,
  availability?: string
): Promise<{ data: IServiceProvider[] }> => {
  if (!token) {
    console.error("Token is missing or invalid.");
    return { data: [] }; 
  }
  const params = new URLSearchParams();
  params.append("order", order);
  if (calification) params.append("calification", calification.toString());
  if (name) params.append("name", name.toString());
  if (availability) params.append("availability", availability);
  const response = await fetch(`${APIURL}/gardener?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

// Función para obtener un gardener por ID
export async function getProviderById(id: string): Promise<IServiceProvider | null> {
  let TOKEN = null;

  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("userSession");
    TOKEN = storedToken ? JSON.parse(storedToken) : null;
  }

  if (!TOKEN || !TOKEN.token) {
    console.error("Token is missing or invalid.");
    return null; 
  }

  try {
    const res = await fetch(`${APIURL}/gardener/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 1200 },
    });

    if (!res.ok) throw new Error(`Failed to fetch gardener with ID ${id}`);

    const response = await res.json();

    if (response && typeof response === "object" && !Array.isArray(response)) {
      return response.data || response; 
    } else {
      throw new Error("Invalid data format, expected object in 'data'");
    }
  } catch (error: any) {
    console.error(`Error fetching gardener with ID ${id}:`, error);
    return null;
  }
}


export async function getCarrouselById(id: string) {
  try {
 
    let TOKEN = null;
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("userSession");
      TOKEN = storedToken ? JSON.parse(storedToken) : null;
    }

   
    if (!TOKEN?.token) {
      console.error("Token is missing or invalid.");
      return null;
    }


    const res = await fetch(`${APIURL}/gardener/carrousel/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 1200 },
    });


    if (!res.ok) {
      throw new Error(`Error con el jardinero ${id}: ${res.status} ${res.statusText}`);
    }

 
    const response = await res.json();


    if (response && typeof response === "object" && !Array.isArray(response)) {
      return response.data || response; 
    } else {
      throw new Error("Formato invalido.");
    }
  } catch (error: any) {
    console.error(`Error con el jardinero ${id}:`, error.message || error);
    return null; 
  }
}

  export async function postCarrouselImage(formData: FormData, id : string | undefined) {
    try {
      let TOKEN = null;
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("userSession");
        TOKEN = storedToken ? JSON.parse(storedToken) : null;
      }
  
      if (!TOKEN?.token) {
        console.error("Token is missing or invalid.");
        return null;
      }
  
      const res = await fetch(`${APIURL}/gardener/carrousel/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN.token}`,
        },
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error(`Error al subir la imagen: ${res.status} ${res.statusText}`);
      }
  
      const response = await res.json();
  
      if (response && typeof response === "object" && !Array.isArray(response)) {
        return response.data || response; 
      } else {
        throw new Error("Formato invalido.");
      } 
    } catch (error: any) {
      console.error("Error al subir la imagen:", error.message || error);
      return null;
    }
  }




  

