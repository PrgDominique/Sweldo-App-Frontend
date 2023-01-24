
const baseUrl = process.env.REACT_APP_BASE_URL

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    }
    const token = localStorage.getItem('token')
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return headers
}

// Auth
export const register = async (data) => await fetch(baseUrl + "/register", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })
export const login = async (data) => await fetch(baseUrl + "/login", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })
export const forgotPassword = async (data) => await fetch(baseUrl + "/forgot-password", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })
export const resetPassword = async (data) => await fetch(baseUrl + "/reset-password", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })

// Portal
export const getDashboard = async () => await fetch(baseUrl + "/dashboard", { method: "GET", headers: getHeaders() })

//clock in 
export const clockIn = async (data) => await fetch(baseUrl + "/dashboard/clock-in", { method: "POST", headers: getHeaders() })

//clock out
export const clockOut = async (data) => await fetch(baseUrl + "/dashboard/clock-out", { method: "POST", headers: getHeaders() })