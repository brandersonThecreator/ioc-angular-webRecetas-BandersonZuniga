import { ElementApiResponse, ElementCataleg } from "../models/element.model";

export function adaptarElementApi(
  apiResponse: ElementApiResponse,
): ElementCataleg {
  return {
    id: apiResponse.id,
    nom: apiResponse.name,
    titol: apiResponse.name,
    descripcio: apiResponse.description,
    categoria: apiResponse.category,
    preu: apiResponse.price,
    imatgeUrl: apiResponse.image_url,
    esPopular: apiResponse.is_popular,
    unitats: apiResponse.units_available,
  };
}

export function adaptarElementsApi(
  apiResponses: ElementApiResponse[],
): ElementCataleg[] {
  return apiResponses.map(adaptarElementApi);
}
