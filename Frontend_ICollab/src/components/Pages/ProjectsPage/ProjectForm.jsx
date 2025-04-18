import React, { useState, useEffect } from 'react';

function ProjectForm({ onSaveDraft, onCreateProject, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    startDate: '',
    endDate: '',
    tags: [],
    collaborators: '',
    roles: '',
    attachments: []
  });

  const [errors, setErrors] = useState({});
  const [isOngoing, setIsOngoing] = useState(false); // New state for ongoing checkbox
  const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean); // Split by commas and trim spaces
    setFormData({ ...formData, tags });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: [...e.target.files]
    });
  };

  const handleOngoingChange = (e) => {
    setIsOngoing(e.target.checked); // Update ongoing state based on checkbox
    if (e.target.checked) {
      setFormData({ ...formData, endDate: '' }); // Clear end date when ongoing
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Check required fields
    if (!formData.title) newErrors.title = 'Project title is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!isOngoing && !formData.endDate) newErrors.endDate = 'End date is required.';
    if (!formData.collaborators) newErrors.collaborators = 'Collaborators are required.';
    if (!formData.roles) newErrors.roles = 'Role is required.';
    if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required.';

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreateProject(formData);
    }
  };

  // Disable typing for date inputs
  useEffect(() => {
    const startDateInput = document.querySelector('input[name="startDate"]');
    const endDateInput = document.querySelector('input[name="endDate"]');

    // Disable typing for start date
    if (startDateInput) {
      startDateInput.addEventListener('keydown', (e) => {
        e.preventDefault();
      });
    }

    // Disable typing for end date
    if (endDateInput) {
      endDateInput.addEventListener('keydown', (e) => {
        e.preventDefault();
      });
    }

    return () => {
      // Cleanup the event listeners when the component is unmounted
      if (startDateInput) {
        startDateInput.removeEventListener('keydown', (e) => {
          e.preventDefault();
        });
      }
      if (endDateInput) {
        endDateInput.removeEventListener('keydown', (e) => {
          e.preventDefault();
        });
      }
    };
  }, []);

  return (
    <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Create a New Project</h2>

      {/* Project Title */}
      <div>
        <label className="block font-medium">Project Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter project title"
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter project description"
          required
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter project category"
          required
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      {/* Start and End Date */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
            max={today} // Prevent future dates for the start date (allow today's date and earlier)
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required={!isOngoing} // Disable requirement if ongoing
            disabled={isOngoing} // Disable the field if ongoing
            min={formData.startDate} // Set end date to not be before the start date
            max={today} // Set end date to not be after today
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
        </div>
      </div>

      {/* Ongoing Checkbox */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isOngoing}
            onChange={handleOngoingChange}
            className="form-checkbox"
          />
          <span className="ml-2">This project is ongoing</span>
        </label>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-medium">Tags </label>
        <input
          type="text"
          name="tags"
          value={formData.tags.join(', ')} // join tags into a string
          onChange={handleTagsChange}
          className={`w-full p-2 border ${errors.tags ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter tags"
          required
        />
        {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
      </div>

      {/* Team Members (Collaborators) */}
      <div>
        <label className="block font-medium">Add Collaborators</label>
        <input
          type="text"
          name="collaborators"
          value={formData.collaborators}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.collaborators ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Add team members"
          required
        />
        {errors.collaborators && <p className="text-red-500 text-sm">{errors.collaborators}</p>}
      </div>

      {/* Roles */}
      <div>
        <label className="block font-medium">Roles</label>
        <input
          type="text"
          name="roles"
          value={formData.roles}
          onChange={handleInputChange}
          className={`w-full p-2 border ${errors.roles ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          placeholder="Enter project role"
          required
        />
        {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
      </div>

      {/* File Upload */}
      <div>
        <label className="block font-medium">Upload Files</label>
        <input
          type="file"
          multiple
          name="attachments"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button type="button" onClick={onSaveDraft} className="bg-gray-500 text-white px-4 py-2 rounded-md w-full sm:w-auto">
          Save Draft
        </button>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Create Project
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
