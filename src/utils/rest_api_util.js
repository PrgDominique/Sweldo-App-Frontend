
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

// Dashboard
export const getDashboard = async () => await fetch(baseUrl + "/dashboard", { method: "GET", headers: getHeaders() })
export const clockIn = async (data) => await fetch(baseUrl + "/dashboard/clock-in", { method: "POST", headers: getHeaders() })
export const clockOut = async (data) => await fetch(baseUrl + "/dashboard/clock-out", { method: "POST", headers: getHeaders() })

// Calendar
export const getMonthlyTasks = async (data) => await fetch(baseUrl + `/calendar/task/monthly/${data}`, { method: "GET", headers: getHeaders() })
export const getDailyTasks = async (data) => await fetch(baseUrl + `/calendar/task/daily/${data}`, { method: "GET", headers: getHeaders() })
export const addTask = async (data) => await fetch(baseUrl + `/calendar/task`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })
export const deleteTask = async (id) => await fetch(baseUrl + `/calendar/task/${id}/delete`, { method: "POST", headers: getHeaders() })

/*
    Admin routes
*/

// Dashboard
export const getAdminDashboard = async () => await fetch(baseUrl + "/admin", { method: "GET", headers: getHeaders() })

// Employee
export const getEmployees = async (page) => await fetch(baseUrl + `/admin/employee?page=${page}`, { method: "GET", headers: getHeaders() })
export const findEmployee = async (data) => await fetch(baseUrl + `/admin/employee/find`, { method: "GET", headers: getHeaders(), body: JSON.stringify(data) })
export const getEmployee = async (id) => await fetch(baseUrl + `/admin/employee/${id}`, { method: "GET", headers: getHeaders() })
export const updateEmployee = async (id, data) => await fetch(baseUrl + `/admin/employee/${id}`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) })