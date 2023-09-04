import clsx from 'clsx';
// import { MdCheckCircle, MdError, MdInfo, MdInfoOutline } from 'react-icons/md';

export default function Message({ type = 'error', label, className, onClick = () => {} }: Props) {
    if (!label) return null;

    // const Icon = {
    //     primary: MdInfoOutline,
    //     informative: MdInfo,
    //     success: MdCheckCircle,
    //     warning: MdError,
    //     error: MdError,
    // }[type];

    const style = {
        primary: 'bg-primary text-primary',
        success: 'bg-success text-success',
        informative: 'bg-informative text-informative',
        warning: 'bg-warning text-warning',
        error: 'bg-error text-error',
    }[type];

    return (
        <div className={clsx('flex justify-center items-center rounded-lg px-3 py-1.5 bg-opacity-20 w-full', style, className)} onClick={onClick}>
            {/* <Icon className='text-sm' /> */}
            <div className='flex-1 px-1 text-xs'>{label}</div>
        </div>
    );
}

interface Props {
    className?: string,
    label?: string,
    type?: 'primary' | 'informative' | 'success' | 'warning' | 'error',
    onClick?: () => void;
}
