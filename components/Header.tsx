import Link from 'next/link';
import { cookies } from 'next/headers';
import { ThemeToggle } from './ThemeToggle';
import { decrypt as verifyJwt } from '@/lib/jwt';
import { LogIn, LogOut } from 'lucide-react';

export default async function Header() {
  const cookieStore = await cookies();
  // در کدهای قبلی نام کوکی را session گذاشته بودیم، اینجا هم session و هم token بررسی می‌شود
  const token = cookieStore.get('session')?.value || cookieStore.get('token')?.value; 
  
  let isLoggedIn = false;
  let isAdmin = false;

  if (token) {
    try {
      const payload = await verifyJwt(token);
      
      if (payload) {
        isLoggedIn = true;
        isAdmin = payload.role === 'ADMIN'; 
      }
    } catch (error) {
      isLoggedIn = false;
    }
  }

  const defaultLinks = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'تحلیل‌ها و مقالات', href: '/articles' },
    { name: 'دوره‌های آموزشی', href: '/courses' },
  ];

  const adminLinks = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'نوشتن مقاله جدید', href: '/admin/articles/new' },
    { name: 'مدیریت مقالات', href: '/admin/articles' },
    { name: 'دوره‌های آموزشی', href: '/courses' },
  ];

  const navLinks = isAdmin ? adminLinks : defaultLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
            اکو فایننس
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          
          {!isLoggedIn ? (
            <Link 
              href="/login" 
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              ورود / ثبت‌نام
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <form action="/api/auth/logout" method="POST">
                <button 
                  type="submit" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}