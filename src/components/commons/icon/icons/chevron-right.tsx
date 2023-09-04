export default function ChevronRight({ width = 20, ...props }: Props) {
    return (
        <svg width={width} height={width * 2} {...props} {...props} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.17205 7.00001L0.222045 2.05001L1.63604 0.636013L8.00005 7.00001L1.63605 13.364L0.222046 11.95L5.17205 7.00001Z" />
        </svg>        
        
    );
}

type Props = {
    width?: any;
} & React.ComponentPropsWithoutRef<'svg'>;
