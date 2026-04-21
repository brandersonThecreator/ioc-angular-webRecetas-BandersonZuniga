import { ElementApiResponse, ElementCataleg } from "../models/element.model";

/**
 * Adapta un element des de l'API al model intern
 */
export function adaptarElementApi(
  apiResponse: ElementApiResponse,
): ElementCataleg {
  return {
    id: apiResponse.id,
    nom: apiResponse.name, // Usar name com a nom únic
    titol: apiResponse.name,
    descripcio: apiResponse.description,
    categoria: apiResponse.category,
    preu: apiResponse.price,
    imatgeUrl: apiResponse.image_url,
    esPopular: apiResponse.is_popular,
    unitats: apiResponse.units_available,
  };
}

/**
 * Adapta un array d'elements des de l'API al model intern
 */
export function adaptarElementsApi(
  apiResponses: ElementApiResponse[],
): ElementCataleg[] {
  return apiResponses.map(adaptarElementApi);
}
