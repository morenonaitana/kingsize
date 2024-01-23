import Image from 'next/image';
import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="flex items-center justify-between px-24 py-8 text-white w-full fixed z-50 top-0 left-0 bg-black">
      <div className="w-[140px]">
        <Link href="/">
          <Image width={110} height={40} src="/kingsize-logo.png" />
        </Link>
      </div>
      <p className="text-center text-[10px] tracking-[.3em] leading-tight">
        BRANDING/CREATIVE<br />STUDIO
      </p>
      <div className="flex items-center space-x-4 w-[140px]">
        <Link href="#home">
          Home
        </Link>
        <Link href="#audit-section">
          Contact
        </Link>
      </div>
    </nav>
  );
};
