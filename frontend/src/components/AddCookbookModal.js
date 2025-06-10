import { useState } from 'react';
import { cookbookApi } from '../api/cookbookApi';

const AddCookbookModal = ({ isOpen, onClose, refrashFun }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await cookbookApi.create({
        title: title.trim(),
        description: description.trim(),
      });

      // Reset form
      setTitle('');
      setDescription('');

      // Refresh the cookbook list and close modal
      refrashFun();
      onClose();
    } catch (err) {
      console.log('Failed to create cookbook:', err.message);
      alert('Failed to create cookbook');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setTitle('');
    setDescription('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="recipe-details-overlay">
      <div className="recipe-details-modal">
        <div className="modal-header">
          <h3>Create New Cookbook</h3>
          <button onClick={handleClose} className="remove-button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cookbook-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter cookbook title"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter cookbook description"
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading || !title.trim()}>
              {loading ? 'Creating...' : 'Create Cookbook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCookbookModal;
