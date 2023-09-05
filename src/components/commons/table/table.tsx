import clsx from 'clsx';
import TableHeader from './table-header/table-header';
import { css } from '@emotion/react';

export default function Table({ classNameWrapper, className, columns, children, loading }: Props) {
    const loadingTableStyles = css`flex justify-center items-center w-full h-full`;
    const containerTableStyles = css`relative mb-4 overflow-x-auto`;
    const headTableStyles = css`sticky top-0 p-4 bg-[#F9FAFF] border-b border-[#F4F4F4]`;

    return (
        <div className={clsx(containerTableStyles.styles, classNameWrapper)}>
            {loading ? (
                <div className={clsx(loadingTableStyles.styles)}>Loading...</div>
            ) : (
                <table className={clsx('table', className)}>
                    <thead className={clsx(headTableStyles.styles)}>
                        <tr>
                            {columns.map((item: any, index: number | string) => (
                                <TableHeader key={index} label={item} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            )}
        </div>
    );
}

interface Props {
    classNameWrapper?: string;
    className?: string;
    columns?: any;
    children?: React.ReactNode;
    loading?: boolean;
}
