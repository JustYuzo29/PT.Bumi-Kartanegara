// Helper file untuk menambahkan template bahasa baru
// Gunakan file ini sebagai referensi untuk menambahkan terjemahan lengkap

export const languageNames = {
  ENGLISH: "English",
  INDONESIA: "Indonesia",
  MANDARIN: "中文",
  JAPANESE: "日本語",
  KOREAN: "한국어",
  SPANISH: "Español",
  FRENCH: "Français",
  GERMAN: "Deutsch",
  ARABIC: "العربية",
  PORTUGUESE: "Português",
  RUSSIAN: "Русский",
  HINDI: "हिन्दी",
};

// Template dasar untuk setiap bahasa - copy struktur dari ENGLISH/INDONESIA
// dan ganti teks dengan terjemahan yang sesuai
export const basicPhrases = {
  MANDARIN: {
    readMore: "阅读更多",
    learnMore: "了解更多",
    contactUs: "联系我们",
    ourServices: "我们的服务",
  },
  JAPANESE: {
    readMore: "続きを読む",
    learnMore: "詳しく見る",
    contactUs: "お問い合わせ",
    ourServices: "サービス",
  },
  KOREAN: {
    readMore: "더 읽기",
    learnMore: "더 알아보기",
    contactUs: "문의하기",
    ourServices: "서비스",
  },
  SPANISH: {
    readMore: "LEER MÁS",
    learnMore: "SABER MÁS",
    contactUs: "CONTÁCTENOS",
    ourServices: "NUESTROS SERVICIOS",
  },
  FRENCH: {
    readMore: "EN SAVOIR PLUS",
    learnMore: "APPRENDRE PLUS",
    contactUs: "NOUS CONTACTER",
    ourServices: "NOS SERVICES",
  },
  GERMAN: {
    readMore: "MEHR LESEN",
    learnMore: "MEHR ERFAHREN",
    contactUs: "KONTAKTIEREN SIE UNS",
    ourServices: "UNSERE DIENSTLEISTUNGEN",
  },
  ARABIC: {
    readMore: "اقرأ المزيد",
    learnMore: "معرفة المزيد",
    contactUs: "اتصل بنا",
    ourServices: "خدماتنا",
  },
  PORTUGUESE: {
    readMore: "LEIA MAIS",
    learnMore: "SAIBA MAIS",
    contactUs: "ENTRE EM CONTATO",
    ourServices: "NOSSOS SERVIÇOS",
  },
  RUSSIAN: {
    readMore: "ЧИТАТЬ ДАЛЕЕ",
    learnMore: "УЗНАТЬ БОЛЬШЕ",
    contactUs: "СВЯЖИТЕСЬ С НАМИ",
    ourServices: "НАШИ УСЛУГИ",
  },
  HINDI: {
    readMore: "और पढ़ें",
    learnMore: "और जानें",
    contactUs: "संपर्क करें",
    ourServices: "हमारी सेवाएं",
  },
};

/**
 * Helper function to create fallback translations
 * Untuk file-file yang belum memiliki terjemahan lengkap,
 * fungsi ini akan menggunakan ENGLISH sebagai fallback sementara
 */
export const createFallbackTranslations = (baseTranslations, languages) => {
  const result = { ...baseTranslations };
  const englishBase = baseTranslations.ENGLISH;

  languages.forEach(lang => {
    if (!result[lang]) {
      result[lang] = { ...englishBase };
      console.warn(`Using English fallback for ${lang}`);
    }
  });

  return result;
};

// List semua bahasa yang didukung
export const supportedLanguages = [
  "ENGLISH",
  "INDONESIA", 
  "MANDARIN",
  "JAPANESE",
  "KOREAN",
  "SPANISH",
  "FRENCH",
  "GERMAN",
  "ARABIC",
  "PORTUGUESE",
  "RUSSIAN",
  "HINDI"
];
