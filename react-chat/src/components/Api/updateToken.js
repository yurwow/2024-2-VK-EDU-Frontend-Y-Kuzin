const refreshAccessToken = async () => {

    const refreshToken = JSON.parse(localStorage.getItem('authToken'))?.refresh;

    if (!refreshToken) {
        console.error("Refresh token отсутствует. Пользователь не авторизован.");
        return null;
    }

    try {
        const response = await fetch('https://vkedu-fullstack-div2.ru/api/auth/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', JSON.stringify(data));
            return data.access;
        } else {
            console.error("Не удалось обновить токен:", await response.json());
            return null;
        }
    } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
        return null;
    }
};


export const apiFetch = async (url, options = {}) => {
    const token = JSON.parse(localStorage.getItem('authToken'))?.access;

    if (!options.headers) {
        options.headers = {};
    }

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetch(url, options);

    if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            options.headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(url, options);
        }
    }

    return response;
};
