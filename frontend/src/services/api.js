const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function fetchProjects() {
  return request('/projects')
}

export function fetchExperiences() {
  return request('/experiences')
}

export function sendContactMessage(payload) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
