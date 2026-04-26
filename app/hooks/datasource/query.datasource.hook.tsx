import { useMemo } from "react";
import { createQueryDataSource, CreateQueryDataSourceOptions } from "../../utils/datasource/query.datasource";

export type UseQueryDataSourceProps = CreateQueryDataSourceOptions

export function useQueryDataSource<T>(props: UseQueryDataSourceProps) {
    const dataSource = useMemo(() =>
        createQueryDataSource<T>(props),
        [props]
    );

    return dataSource;
}