import api from './client';

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
  me: () => api.get('/auth/me')
};

export const genericCrud = (path) => ({
  list: (params) => api.get(path, { params }),
  get: (id) => api.get(`${path}/${id}`),
  create: (payload) => api.post(path, payload),
  update: (id, payload) => api.put(`${path}/${id}`, payload),
  remove: (id) => api.delete(`${path}/${id}`)
});

export const usersApi = genericCrud('/users');
export const careersApi = genericCrud('/careers');
export const periodsApi = genericCrud('/academic-periods');
export const projectTypesApi = genericCrud('/project-types');
export const projectsApi = genericCrud('/projects');
export const rubricsApi = genericCrud('/rubrics');
export const assignmentsApi = { list: () => api.get('/assignments'), create: (payload) => api.post('/assignments', payload) };
export const evaluationsApi = { list: () => api.get('/evaluations'), get: (id) => api.get(`/evaluations/${id}`), update: (id, payload) => api.put(`/evaluations/${id}`, payload) };
export const resultsApi = { list: (params) => api.get('/results', { params }), students: () => api.get('/results/students/summary') };
export const dashboardApi = { get: () => api.get('/dashboard') };
