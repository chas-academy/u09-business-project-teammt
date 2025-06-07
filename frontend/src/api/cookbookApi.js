const BASE_URL = 'https://u09-backend-4tzl.onrender.com/api/v1';

export const cookbookApi = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/cookbook`);
    const data = await response.json();
    return data.cookbooks; // Extract just the cookbooks array
  },
};
