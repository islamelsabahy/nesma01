import { Link, useParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";

type LegalSlug = "shipping-policy" | "return-policy" | "privacy-policy" | "terms" | "faq";

const legalContent: Record<LegalSlug, {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  sections: { heading: { ar: string; en: string }; body: { ar: string[]; en: string[] } }[];
}> = {
  "shipping-policy": {
    title: { ar: "سياسة الشحن", en: "Shipping Policy" },
    description: { ar: "تعرف على مدة وتفاصيل شحن طلبات نسمة للعطور داخل مصر.", en: "Learn about NESMA Perfumes delivery times and shipping details across Egypt." },
    sections: [
      {
        heading: { ar: "مدة التوصيل", en: "Delivery time" },
        body: {
          ar: ["التوصيل داخل مصر عادة من 2 إلى 5 أيام عمل بعد تأكيد الطلب.", "قد تختلف المدة حسب المحافظة، توفر المنتج، وظروف شركات الشحن."],
          en: ["Delivery across Egypt usually takes 2 to 5 business days after order confirmation.", "Timing may vary by governorate, product availability, and courier conditions."],
        },
      },
      {
        heading: { ar: "تكلفة الشحن", en: "Shipping fees" },
        body: {
          ar: ["يتم تأكيد تكلفة الشحن قبل إرسال الطلب على واتساب أو مكالمة التأكيد.", "قد تتوفر عروض شحن مجانية في الحملات الموسمية."],
          en: ["Shipping fees are confirmed before dispatch via WhatsApp or confirmation call.", "Free shipping offers may be available during seasonal campaigns."],
        },
      },
    ],
  },
  "return-policy": {
    title: { ar: "سياسة الإرجاع والاستبدال", en: "Return & Exchange Policy" },
    description: { ar: "تفاصيل الإرجاع والاستبدال لطلبات نسمة للعطور.", en: "Return and exchange details for NESMA Perfumes orders." },
    sections: [
      {
        heading: { ar: "حالة المنتج", en: "Product condition" },
        body: {
          ar: ["يمكن طلب الاستبدال إذا وصل المنتج تالفاً أو مختلفاً عن الطلب.", "لا يتم قبول المنتجات المفتوحة أو المستخدمة لأسباب تتعلق بالنظافة والسلامة."],
          en: ["Exchange can be requested if the product arrives damaged or different from the order.", "Opened or used products cannot be accepted for hygiene and safety reasons."],
        },
      },
      {
        heading: { ar: "طريقة الطلب", en: "How to request" },
        body: {
          ar: ["يرجى التواصل خلال 24 ساعة من الاستلام مع صورة واضحة للمنتج والفاتورة أو تفاصيل الطلب."],
          en: ["Please contact us within 24 hours of delivery with a clear photo of the product and order details."],
        },
      },
    ],
  },
  "privacy-policy": {
    title: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
    description: { ar: "كيف نتعامل مع بيانات العملاء داخل موقع نسمة للعطور.", en: "How NESMA Perfumes handles customer data." },
    sections: [
      {
        heading: { ar: "البيانات التي نجمعها", en: "Data we collect" },
        body: {
          ar: ["نجمع البيانات اللازمة لتنفيذ الطلب مثل الاسم، رقم الهاتف، العنوان، وتفاصيل المنتجات.", "قد تُستخدم أدوات التحليل لفهم أداء الموقع وتحسين تجربة المستخدم."],
          en: ["We collect the data needed to process orders, such as name, phone, address, and order details.", "Analytics tools may be used to understand website performance and improve user experience."],
        },
      },
      {
        heading: { ar: "استخدام البيانات", en: "Data usage" },
        body: {
          ar: ["تُستخدم البيانات لتأكيد الطلب، التوصيل، خدمة العملاء، وتحسين العروض.", "لا نقوم ببيع بيانات العملاء لطرف ثالث."],
          en: ["Data is used for order confirmation, delivery, customer service, and offer improvement.", "We do not sell customer data to third parties."],
        },
      },
    ],
  },
  terms: {
    title: { ar: "الشروط والأحكام", en: "Terms & Conditions" },
    description: { ar: "الشروط العامة لاستخدام موقع نسمة للعطور والشراء منه.", en: "General terms for using and ordering from NESMA Perfumes." },
    sections: [
      {
        heading: { ar: "الأسعار والمنتجات", en: "Prices and products" },
        body: {
          ar: ["الأسعار قابلة للتحديث حسب العروض وتوفر المنتج.", "ألوان الصور قد تختلف قليلاً حسب شاشة الجهاز والإضاءة."],
          en: ["Prices may be updated based on offers and product availability.", "Image colors may vary slightly depending on device screen and lighting."],
        },
      },
      {
        heading: { ar: "تأكيد الطلب", en: "Order confirmation" },
        body: {
          ar: ["يعتبر الطلب مؤكداً بعد التواصل مع العميل وتأكيد تفاصيل الشحن والدفع."],
          en: ["An order is considered confirmed after contacting the customer and confirming shipping and payment details."],
        },
      },
    ],
  },
  faq: {
    title: { ar: "الأسئلة الشائعة", en: "FAQ" },
    description: { ar: "إجابات سريعة عن الشحن، الدفع، الهدايا، وطلبات نسمة للعطور.", en: "Quick answers about shipping, payment, gifts, and NESMA Perfumes orders." },
    sections: [
      {
        heading: { ar: "هل يوجد دفع عند الاستلام؟", en: "Is Cash on Delivery available?" },
        body: {
          ar: ["نعم، الدفع عند الاستلام متاح للطلبات داخل مصر حسب تأكيد الطلب."],
          en: ["Yes, Cash on Delivery is available for orders across Egypt after order confirmation."],
        },
      },
      {
        heading: { ar: "هل يمكن إرسال الطلب كهدية؟", en: "Can I send an order as a gift?" },
        body: {
          ar: ["نعم، يمكنك إضافة ملاحظة في صفحة إتمام الطلب وسنؤكد التفاصيل معك على واتساب."],
          en: ["Yes, you can add a note on the checkout page and we will confirm the details with you on WhatsApp."],
        },
      },
      {
        heading: { ar: "هل يوجد طلبات شركات؟", en: "Do you support corporate orders?" },
        body: {
          ar: ["نعم، يمكن تجهيز هدايا شركات حسب الكمية والمناسبة بعد التواصل مع فريق نسمة."],
          en: ["Yes, corporate gifts can be prepared based on quantity and occasion after contacting the NESMA team."],
        },
      },
    ],
  },
};

export function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const langKey = lang as "ar" | "en";
  const isAr = langKey === "ar";
  const key = (slug || "faq") as LegalSlug;
  const content = legalContent[key] || legalContent.faq;

  return (
    <>
      <SEO title={content.title[langKey]} description={content.description[langKey]} canonical={`/${key}`} />
      <main className="bg-ivory pt-28">
        <section className="container-main py-12 lg:py-20 max-w-4xl">
          <p className="text-gold text-xs uppercase tracking-[4px] mb-4">{siteConfig.brand}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-oud">{content.title[langKey]}</h1>
          <p className="mt-4 text-oud/65 leading-8">{content.description[langKey]}</p>

          <div className="mt-10 space-y-5">
            {content.sections.map((section) => (
              <article key={section.heading.en} className="rounded-2xl bg-white border border-gold/20 p-6">
                <h2 className="font-display text-2xl font-bold text-oud">{section.heading[langKey]}</h2>
                <ul className="mt-4 space-y-3 text-oud/70 leading-8 list-disc ps-6">
                  {section.body[langKey].map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-deep-black text-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white/70">{isAr ? "تحتاج مساعدة إضافية؟" : "Need more help?"}</p>
            <Link to="/contact" className="rounded bg-gold px-5 py-3 text-oud font-bold text-center">
              {isAr ? "تواصل معنا" : "Contact us"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
