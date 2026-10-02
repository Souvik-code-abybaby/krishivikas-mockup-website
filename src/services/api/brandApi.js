import apiClient from "./axiosInstance";
export const getBrandList = async (category_id, type, token) => {
  const response = await apiClient.post(
    "/brand-data-show",
    { category_id, type },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data.result.response;
};