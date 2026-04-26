import { useMemo } from "react";
import { createSocketDataSource, CreateSocketDataSource } from "../../utils/datasource/socket.datasource";

export type UseSocketDataSourceProps = CreateSocketDataSource;

export function useSocketDataSource<T>(props: UseSocketDataSourceProps) {
    const dataSource = useMemo(() =>
        createSocketDataSource<T>(props),
        [props]
    );

    return dataSource;
}