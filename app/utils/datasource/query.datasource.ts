import { DataSource } from "@lam/frontend";
import { QueryClient, QueryKey, QueryObserver } from "@tanstack/react-query";
import { api } from "../../api/axios";

export type CreateQueryDataSourceOptions = {
    queryClient: QueryClient;
    queryKey: QueryKey;
    endpoint: string;
    queryParams?: Record<string, any>;
}

export function createQueryDataSource<T>({
    queryClient,
    queryKey,
    endpoint,
    queryParams = {}
}: CreateQueryDataSourceOptions): DataSource<T> {
    const observer = new QueryObserver<T>(queryClient, {
        queryKey,
        queryFn: async () => {
            const { data } = await api.get<T>(endpoint, { params: queryParams });
            return data;
        }
    });

    return {
        subscribe: (resolve, error) => {
            const unsubscribe = observer.subscribe(result => {
                if (result.isSuccess && result.data !== undefined) {
                    resolve(result.data);
                }

                if (result.isError && error) {
                    error(result.error.message);
                }
            });

            observer.refetch();

            return unsubscribe;
        },
        invalidate: async () => {
            // await queryClient.invalidateQueries({ queryKey });
            observer.refetch();
        }
    }
}