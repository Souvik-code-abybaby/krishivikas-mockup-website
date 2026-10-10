import apiClient from "./axiosInstance";

export const getWishList = async (token) => {
  const response = await apiClient.get(
    "/wishlist",
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data.result;
};

export const addToWishList = async (category_id, item_id, token) => {
  const response = await apiClient.post(
    "/wishlist-add",
    { category_id, item_id },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data.result;
};

export const removeFromWishList = async (category_id, item_id, token) => {
  const response = await apiClient.post(
    "/wishlist-delete",
    { category_id, item_id },
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data.result;
};
