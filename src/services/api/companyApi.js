import apiClient from "./axiosInstance";

export const getCompanyProduct = async (company_id, token) => {
  const response = await apiClient.post(
    "/company/products",
    { company_id },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data.result.response;
};

export const getCompanyDealers = async (company_id, token) => {
  const response = await apiClient.post(
    "/company/dealer",
    { company_id },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data.result.response;
};
