const BASE_URL = `${process.env.REACT_APP_BE_URL || 'http://localhost:3000'}/api/v1`;

export const cookbookApi = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/cookbook`, {
      credentials: 'include',
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
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete cookbook');
    }

    return response.json();
  },

  async create(cookbookData) {
    const response = await fetch(`${BASE_URL}/cookbook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(cookbookData),
    });

    if (!response.ok) {
      throw new Error('Failed to create cookbook');
    }

    return response.json();
  },
};
