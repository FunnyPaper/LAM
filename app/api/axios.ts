import axios from "axios";
import { useBackendConfigStore } from "../stores/backend-config.store";
import { useAuthStore } from "../stores/auth.store";
import qs from 'qs';

export const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',

    },
    paramsSerializer: {
        serialize: (params) => {
            return qs.stringify(params, {
                encodeValuesOnly: true,
                arrayFormat: 'brackets',
                allowEmptyArrays: false
            });
        }
    }
});

api.interceptors.request.use((config) => {
    const baseUrl = useBackendConfigStore.getState().baseUrl;

    if (baseUrl) {
        config.baseURL = baseUrl;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

api.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

let isRefreshing = false;
let queue: {
    resolve: (token: string | null) => void,
    reject: (e: any) => void
}[] = [];

function processQueue(error: any, accessToken: string | null) {
    queue.forEach(p => {
        if (error) {
            p.reject(error);
        } else {
            p.resolve(accessToken)
        }
    });

    queue = [];
}

api.interceptors.response.use(
    response => response,
    async (error) => {
        const original = error.config;

        if (error.response?.status == 401 && !original._retry) {
            original._retry = true;

            if (isRefreshing) {
                return new Promise<string | null>((resolve, reject) =>
                    queue.push({ resolve, reject }))
                    .then((accessToken) => {
                        original.headers.Authorization = `Bearer ${accessToken}`;

                        return api(original);
                    })
                    .catch(Promise.reject)
            }

            isRefreshing = true;

            try {
                const baseUrl = useBackendConfigStore.getState().baseUrl;
                const response = await axios.post<{ accessToken: string }>(`${baseUrl}/auth/refresh-token`, {}, {
                    withCredentials: true
                });

                const newAccessToken = response.data.accessToken;

                useAuthStore.getState().setAccessToken(newAccessToken);

                processQueue(null, newAccessToken);

                original.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(original)
            } catch (error) {
                processQueue(error, null);
                useAuthStore.getState().logout();
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
)