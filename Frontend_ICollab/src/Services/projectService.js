import privateAxios from "./apiService";

export const addProject = async (projectData) => {
    try{
    const response = await privateAxios.post('/project/addproject', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
}
catch (err) {
    return err.response?.data || { error: "Project creation failed" };
}
  };


  export const getCollaboratorSuggestions = async (query) => {
    try{
    const response = await privateAxios.get(`/project/collaboratorsuggestions?qer=${query}`);
    return response;
}
catch (err) {
    return err.response?.data || { error: "Project creation failed" };
}
  };

  export const fetchUserProjects = async (username) => {
    try {
      const response = await privateAxios.get(`/project/userprojects/${username}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching user projects');
    }
  };

export const getOngoingProjects = async (timestamp) => {
  try {
    const response = await privateAxios.get('/project/ongoingfeed', { 
      params: { timestamp } 
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getFinishedProjects = async (timestamp) => {
  try {
    const response = await privateAxios.get('/project/finishedfeed', { 
      params: { timestamp } 
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getProjectDetails = async (projectId) => {
  try{
  return await privateAxios.get(`/project/${projectId}`);
  } catch(err){
    next(err);
  }
};

export const updatePinnedProjects = async (projectIds) => {
  try {
    const response = await privateAxios.put("/project/topprojects", {
      topProjectIds: projectIds, 
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update pinned projects:", error);
    throw error;
  }
};

export const deleteProject = async (projectid) => {
  try{
    return await privateAxios.post("/project/deleteproject", {projectid});
  }catch (err){
    next(err);
  }
};


export const updateProject = async (projectData) => {
  try {
    const response = await privateAxios.put('/project/editproject', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { error: "Project update failed" };
  }
};


// Fetch all top‐level comments + replies for a project
export const getProjectComments = async (projectId) => {
  try {
    const response = await privateAxios.get('/project/getprojectcomments', {
      params: { projectId }
    });
    return response.data;    // assume your controller res.json(comments)
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Error fetching comments');
  }
};

// Post a brand‐new comment
export const postProjectComment = async ({ projectId, content }) => {
  try {
    const response = await privateAxios.post('/project/createcomment', { projectId, content });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Error posting comment');
  }
};

// Post a reply to an existing comment
export const postProjectReply = async ({ projectId, content, parentCommentId }) => {
  try {
    const response = await privateAxios.post('/project/createcomment', { projectId, content, parentCommentId });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Error posting reply');
  }
};
