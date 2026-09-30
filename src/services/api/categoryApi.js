import apiClient from "./axiosInstance";

export const getCategoryList = async (languageId, token) => {
  const response = await apiClient.post(
    "/category-list",
    { language_id: languageId },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  console.log(`show data ${response.data.result.res}`);
  return response.data.result.response;
};