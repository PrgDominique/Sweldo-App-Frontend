
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

/* 
    Auth routes
*/
export const register = async (data) => await fetch(baseUrl + "/register", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })
export const login = async (data) => await fetch(baseUrl + "/login", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })
export const forgotPassword = async (data) => await fetch(baseUrl + "/forgot-password", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })
export const resetPassword = async (data) => await fetch(baseUrl + "/reset-password", { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })

/* 
    Authenticated routes
*/
export const getDashboard = async () => await fetch(baseUrl + "/dashboard", { method: "GET", headers: getHeaders() })
export const clockIn = async (data) => await fetch(baseUrl + "/dashboard/clock-in", { method: "POST", headers: getHeaders() })
export const clockOut = async (data) => await fetch(baseUrl + "/dashboard/clock-out", { method: "POST", headers: getHeaders() })

/*
    Admin routes
*/
export const getAdminDashboard = async () => await fetch(baseUrl + "/admin", { method: "GET", headers: getHeaders() })