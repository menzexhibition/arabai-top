export type TutorialScene = {
  title: string;
  body: string;
  bullets?: string[];
  accent?: string;
};

export type TutorialVideoConfig = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  scenes: TutorialScene[];
};

export const tutorialVideos: TutorialVideoConfig[] = [
  {
    id: 'arabai-intro-ar',
    title: 'ابدأ مع ARABAI',
    subtitle: 'دليل بسيط للمستخدم العربي الذي يريد أن يفهم AI ثم يستخدمه خطوة بخطوة.',
    cta: 'arabai.top',
    scenes: [
      {
        title: 'ما الذي يقدمه ARABAI؟',
        body: 'بدلا من أن تحتار بين عشرات الأدوات، يشرح لك ARABAI الفكرة بلغة بسيطة ثم ينقلك مباشرة إلى التجربة العملية.',
        bullets: ['مقالات سهلة', 'خطوات واضحة', 'تجربة داخل الموقع'],
        accent: '#008c95'
      },
      {
        title: 'كيف تبدأ؟',
        body: 'ابدأ بمقال قصير: ما هو AI، ما هو الـ Prompt، وما الفرق بين الاستخدام المجاني والمدفوع.',
        bullets: ['AI beginner', 'Prompt basics', 'Cost basics'],
        accent: '#d6a84f'
      },
      {
        title: 'ثم ماذا؟',
        body: 'سجل حسابك، احفظ رصيدك، واختر المهمة التي تريدها: كتابة، صورة، عرض، أو سكربت فيديو.',
        bullets: ['Register', 'Credits', 'Choose a task'],
        accent: '#2a91bf'
      }
    ]
  },
  {
    id: 'arabai-prompt-ar',
    title: 'كيف تكتب Prompt يفهمه AI؟',
    subtitle: 'حول فكرتك المبعثرة إلى طلب واضح يمكن نسخه واستخدامه فورا.',
    cta: 'arabai.top/ar/articles/what-is-a-prompt.html',
    scenes: [
      {
        title: 'ابدأ بالمهمة',
        body: 'لا تقل فقط: اكتب لي شيئا. قل: ما المهمة؟ ولمن؟ وما الشكل النهائي الذي تريده؟',
        bullets: ['المهمة', 'الجمهور', 'النتيجة'],
        accent: '#008c95'
      },
      {
        title: 'أضف الأسلوب',
        body: 'اختر أسلوبا واضحا: رسمي، بسيط، سريع، تجاري، أو مناسب لمبتدئ.',
        bullets: ['Formal', 'Simple', 'Business'],
        accent: '#6a5acd'
      },
      {
        title: 'اطلب التعديل',
        body: 'إذا لم تعجبك النتيجة، لا تبدأ من الصفر. اطلب تعديلا واحدا محددا في كل مرة.',
        bullets: ['اجعله أقصر', 'اجعله أوضح', 'أعطني 3 بدائل'],
        accent: '#d6a84f'
      }
    ]
  },
  {
    id: 'arabai-api-flow-ar',
    title: 'كيف يعمل ARABAI خلف الستار؟',
    subtitle: 'فهم بسيط لطريق التسجيل، الرصيد، واستخدام AI داخل الموقع.',
    cta: 'arabai.top/app/',
    scenes: [
      {
        title: '1. سجل حسابك',
        body: 'التسجيل يحفظ رقم المستخدم، كود الدعوة، ورصيدك في مكان واحد.',
        bullets: ['Email or phone', 'User number', 'Referral code'],
        accent: '#008c95'
      },
      {
        title: '2. اختر المهمة',
        body: 'بدلا من اختيار النموذج بنفسك، تختار ما تريد فعله فقط، وARABAI يختار الطريق المناسب في الخلفية.',
        bullets: ['Writing', 'Image', 'Slides', 'Video script'],
        accent: '#d6a84f'
      },
      {
        title: '3. شاهد النتيجة',
        body: 'بعد التشغيل، ترى الناتج وسجل الاستهلاك من داخل نفس الصفحة.',
        bullets: ['Result', 'Credits used', 'History'],
        accent: '#2a91bf'
      }
    ]
  }
];
