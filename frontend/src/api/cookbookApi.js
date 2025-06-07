const BASE_URL = 'https://u09-backend-4tzl.onrender.com/api/v1';

export const cookbookApi = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/cookbook`);
    const data = await response.json();
    return data.cookbooks; // Extract just the cookbooks array
  },
  async update(cookbookId, data) {
    const response = await fetch(`${BASE_URL}/cookbook/${cookbookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(cookbookId) {
    const response = await fetch(`${BASE_URL}/cookbook/${cookbookId}`, {
      method: 'DELETE'
    });
    return response.json();
  },
};
