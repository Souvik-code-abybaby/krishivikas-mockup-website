import apiClient from "./axiosInstance";
export const getCategoryWiseProduct = async (
  category_id,
  type,
  skip,
  take,
 
  brand_id,

  token
) => {
  const response = await apiClient.post(
    "/category-filter",
    {
      category_id,
      type,
      
    
     
      skip ,
      take ,
        brand_id,
    },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data.result.response;
};