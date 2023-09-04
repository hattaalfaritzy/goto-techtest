import clsx from 'clsx';
import Favorite from './icons/favorite';
import Trash from './icons/trash';
import ChevronLeft from './icons/chevron-left';
import ChevronRight from './icons/chevron-right';
import Menu from './icons/menu';
import Clip from './icons/clip';

export const icons: any = {
  favorite: Favorite,
  trash: Trash,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  menu: Menu,
  clip: Clip
};

export default function Icon({ className, name, ...props }: Props) {
  const Component = icons[name];

  if (!Component) return null;

  return <Component className={clsx(className || 'fill-[#A0A8B6]')} {...props} />;
}

type Props = JSX.IntrinsicElements['svg'] & {
    className?: string;
    name?: any;
};
