import clsx from 'clsx';
import Icon from '../icon';

export default function Pagination({
    className,
    currentPage = 1,
    total = 100,
    itemsPerPage = 10,
    onClickPage = () => {},
}: Props) {
    const totalPages = Math.ceil(total / itemsPerPage);

    const getPageRange = () => {
        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        let range: any = [];
        if (currentPage > 4) {
            range.push(1);
        }
        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
            if (i > 0 && i <= totalPages) {
                range.push(i);
            }
        }
        if (currentPage < totalPages - 3) {
            range.push(totalPages);
        }
        return range;
    };

    const pageRange = getPageRange();

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onClickPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onClickPage(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onClickPage(page);
    };


    return (
        <div className={clsx('flex flex-wrap justify-start lg:justify-center space-x-2 w-full lg:w-auto', className)}>
            <button
                onClick={handlePrevClick}
                disabled={currentPage === 1}
                className={clsx('flex justify-center items-center h-6 w-6 rounded-full hover:bg-primary/10 on-hover')}
            >
                <Icon name='chevron-left' className='fill-[#A0A8B6]' width={8} />
            </button>

            {pageRange.map((page: number, idx: number) => (
                <div key={idx} className={clsx(pageRange[idx + 1] - page > 1 && 'flex flex-row space-x-2')}>
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        disabled={currentPage === page}
                        className={clsx(page !== currentPage ? 'flex justify-center items-center h-6 w-6 rounded-full hover:bg-primary/10 on-hover' : 'flex justify-center items-center h-6 w-6 bg-primary hover:bg-primary rounded-full')}
                    >
                        <span className={clsx('text-sm ', page == currentPage ? 'text-white' : 'text-[#A0A8B6]')}>{page.toString()}</span>
                    </button>
                    {pageRange[idx + 1] - page > 1 && <button className='w-10' disabled>...</button>}
                </div>
            ))}

            <button
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
                className={clsx('flex justify-center items-center h-6 w-6 rounded-full hover:bg-primary/10 on-hover')}
            >
                <Icon name='chevron-right' className='fill-[#A0A8B6]' width={8} />
            </button>

        </div>
    );
}

type Props = {
    className?: string;
    total?: number;
    currentPage?: number;
    itemsPerPage?: number;
    onClickPage: (page: number) => void;
};
