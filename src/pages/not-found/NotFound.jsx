import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom';
import { LanguagesContext } from "../../context/languageContext"; // تأكد من المسار الصح للملف ده

function NotFound() {
  const { language } = useContext(LanguagesContext);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white dark:bg-[#000000] transition-colors px-4 overflow-hidden">
      <h1 className="text-[120px] md:text-[250px] font-bold text-slate-100 dark:text-[#0a0a0a] absolute select-none z-0">
        404
      </h1>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-[#f6e7bf]">
          {language === "ar" ? "عفواً، الصفحة غير موجودة" : "Oops! Page Not Found"}
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">
          {language === "ar" 
            ? "يبدو أنك سلكت طريقاً خاطئاً، الصفحة التي تبحث عنها قد تم نقلها أو حذفها." 
            : "The page you are looking for might have been removed or is temporarily unavailable."}
        </p>

        <Link
          to="/"
          className="inline-block px-10 py-3 rounded-full bg-slate-900 dark:bg-[#f6e7bf] text-white dark:text-black font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl active:scale-95"
        >
          {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
      </div>

      <div className="mt-12 w-24 h-1 bg-[#f6e7bf] rounded-full opacity-30 animate-pulse"></div>
    </div>
  );
}

export default NotFound;