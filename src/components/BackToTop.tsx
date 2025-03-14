import { IconArrowUp } from '@tabler/icons-react';
import { FC, memo, useEffect, useState } from 'react';

const BackToTop: FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

      if (bottomReached) {
        setShowButton(false);
      } else if (currentScrollY < prevScrollY) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`fixed bottom-4 right-4 bg-primary text-white rounded-full p-2 cursor-pointer transition-all ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={scrollToTop}
      data-testid="back-to-top"
    >
      <IconArrowUp size={32} />
    </button>
  )
};

export default memo(BackToTop);
