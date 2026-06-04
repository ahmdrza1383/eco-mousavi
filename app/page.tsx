export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
        
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 border-4 border-blue-500 overflow-hidden flex items-center justify-center">
          <span className="text-gray-400 text-sm">محل عکس شما</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">نام شما</h1>
        <h2 className="text-lg text-blue-600 mb-6 font-medium">مدرس و تحلیلگر اقتصادی | بازار بورس</h2>

        <p className="text-gray-600 mb-8 leading-relaxed text-justify">
          به وب‌سایت شخصی من خوش آمدید. در این پلتفرم قصد داریم با نگاهی تخصصی و مهندسی‌شده، به تحلیل بازارهای مالی، آموزش سرمایه‌گذاری در بورس ایران و بررسی مسائل کلان اقتصادی بپردازیم.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="font-bold block text-gray-900 mb-1">تجربه در بازار:</span>
            <span>+۵ سال فعالیت مستمر</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="font-bold block text-gray-900 mb-1">دوره‌های آموزشی:</span>
            <span>در حال آماده‌سازی</span>
          </div>

        </div>

      </div>
      
    </main>
  );
}