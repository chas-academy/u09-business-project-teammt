const BASE_URL = `${process.env.REACT_APP_BE_URL || 'http://localhost:3000'}/api/v1`;

const getAuthHeaders = () => {
  const authToken = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}` // Send token in header
  };
};

export const cookbookApi = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/cookbook`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cookbooks');
    }

    const data = await response.json();
    return data.cookbooks;
  },

  async update(cookbookId, data) {
    const response = await fetch(`${BASE_URL}/cookbook/${cookbookId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update cookbook');
    }

    return response.json();
  },

  async delete(cookbookId) {
    const response = await fetch(`${BASE_URL}/cookbook/${cookbookId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to delete cookbook');
    }

    return response.json();
  },

  async create(cookbookData) {
    const response = await fetch(`${BASE_URL}/cookbook`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(cookbookData),
    });

    if (!response.ok) {
      throw new Error('Failed to create cookbook');
    }

    return response.json();
  },
};