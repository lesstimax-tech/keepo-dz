/* ══════════════════════════════════════════════════════════════════
   KEEPO DZ — Moteur i18n bilingue FR / AR (Algérie)
   ------------------------------------------------------------------
   <span data-i18n="cle">…</span>          → remplace le texte
   <h1 data-i18n-html="cle">…</h1>          → remplace le HTML (balises internes)
   <input data-i18n-attr="placeholder:cle"> → traduit un attribut
   Choix mémorisé (localStorage) + bascule dir="rtl"/lang="ar" en arabe.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const DICT = {
    /* ─── Navigation ─── */
    "nav.features":  { fr: "Fonctionnalités", ar: "الميزات" },
    "nav.marketing": { fr: "Marketing",       ar: "التسويق" },
    "nav.pricing":   { fr: "Tarifs",          ar: "الأسعار" },
    "nav.reviews":   { fr: "Avis",            ar: "الآراء" },
    "nav.faq":       { fr: "FAQ",             ar: "الأسئلة الشائعة" },
    "nav.login":     { fr: "Se connecter",    ar: "تسجيل الدخول" },
    "nav.trial":     { fr: "Créer un compte", ar: "إنشاء حساب" },
    "account.create":{ fr: "Créer un compte", ar: "إنشاء حساب" },
    "tag.pro":       { fr: "PRO",             ar: "PRO" },
    "tag.soon":      { fr: "BIENTÔT",         ar: "قريباً" },

    /* ─── Hero ─── */
    "hero.badge": { fr: "Nouveau — Vos cartes de fidélité prêtes en 2 minutes", ar: "جديد — بطاقات ولائك جاهزة في دقيقتين" },
    "hero.title": {
      fr: 'Offrez à votre commerce un vrai <span class="grad-text">programme de fidélité</span>.',
      ar: 'امنح متجرك <span class="grad-text">برنامج ولاء</span> حقيقياً.'
    },
    "hero.sub": {
      fr: 'Bouchers, coiffeurs, restaurateurs, boulangers… Donnez à vos clients les avantages des grandes enseignes — points, cartes à tampons, récompenses — directement dans leur téléphone. Et <strong>récupérez leur nom et leur e-mail dès la première visite</strong>.',
      ar: 'الجزّارون، الحلّاقون، أصحاب المطاعم، الخبّازون… امنح زبائنك مزايا العلامات الكبرى — نقاط، وبطاقات أختام، ومكافآت — مباشرةً في هواتفهم. و<strong>احصل على اسمهم وبريدهم الإلكتروني منذ أوّل زيارة</strong>.'
    },
    "hero.cta_start": { fr: "Créer mon compte", ar: "إنشاء حسابي" },
    "hero.cta_demo":  { fr: "Essayer la démo",          ar: "جرّب العرض التوضيحي" },
    "hero.proof_2min":{ fr: "Prêt en 2 minutes",        ar: "جاهز في دقيقتين" },
    "hero.proof_nomat":{ fr: "Sans matériel",           ar: "بدون أي معدات" },
    "hero.proof_trial":{ fr: "Sans engagement", ar: "بدون التزام" },
    "hero.stat1_l": { fr: "pour tout configurer",  ar: "لإعداد كل شيء" },
    "hero.stat2_l": { fr: "de matériel à acheter", ar: "معدات للشراء" },
    "hero.stat3_l": { fr: "par mois, tout inclus",  ar: "شهرياً، كل شيء مضمّن" },

    /* ─── Téléphone (visuel) ─── */
    "ph.chip":  { fr: "Carte Privilège",   ar: "بطاقة امتياز" },
    "ph.shop":  { fr: "Café des Artisans", ar: "مقهى الحرفيين" },
    "ph.pts":   { fr: "points",            ar: "نقطة" },
    "ph.next":  { fr: 'Plus que <b>60 pts</b> → 1 boisson offerte', ar: 'بقي <b>60 نقطة</b> ← مشروب مجاني' },
    "ph.scan":  { fr: '<b>Présentez ce code</b>à votre commerçant pour cumuler vos points', ar: '<b>اعرض هذا الرمز</b>على التاجر لتجميع نقاطك' },
    "ph.free":  { fr: "gratuit<br>pour vos clients", ar: "مجاني<br>لزبائنك" },
    "ph.stamp": { fr: '<b>+1 tampon crédité</b><span>Café des Artisans · à l\'instant</span>', ar: '<b>+1 ختم مُضاف</b><span>مقهى الحرفيين · الآن</span>' },

    /* ─── Bande de confiance ─── */
    "trust.data":  { fr: "Vos données 100% protégées",         ar: "بياناتك محمية 100%" },
    "trust.local": { fr: "Conçu pour les commerçants algériens", ar: "مصمّم للتجّار الجزائريين" },
    "trust.nomat": { fr: "Aucun matériel — votre smartphone suffit", ar: "بدون معدات — هاتفك يكفي" },
    "trust.roi":   { fr: "Rentable dès 8 clients fidèles",     ar: "مربح ابتداءً من 8 زبائن أوفياء" },

    /* ─── Fonctionnalités ─── */
    "feat.title": { fr: "Tout ce qu'il faut.<br>Rien de superflu.", ar: "كل ما تحتاجه.<br>لا شيء زائد." },
    "feat.sub":   { fr: "Pensé pour le comptoir, pas pour les informaticiens. Trois briques simples qui travaillent ensemble.", ar: "مصمّم للمحل التجاري، لا للمبرمجين. ثلاث أدوات بسيطة تعمل معاً." },
    "feat1.t": { fr: "La carte, toujours dans leur poche", ar: "البطاقة، دائماً في جيبهم" },
    "feat1.p": { fr: "Fini la carte introuvable au fond du sac : votre client ouvre KEEPO depuis son écran d'accueil et présente son QR code personnel.", ar: "انتهى زمن البطاقة الضائعة في الحقيبة: يفتح زبونك KEEPO من شاشته الرئيسية ويعرض رمز QR الخاص به." },
    "feat1.l1": { fr: "Aucune application à télécharger", ar: "لا حاجة لتحميل أي تطبيق" },
    "feat1.l2": { fr: "Raccourci magique sur l'écran d'accueil", ar: "اختصار سريع على الشاشة الرئيسية" },
    "feat1.l3": { fr: "Points ou carte à tampons, au choix", ar: "نقاط أو بطاقة أختام، حسب اختيارك" },
    "feat1.l4": { fr: "Apple Wallet &amp; Google Pay", ar: "Apple Wallet وGoogle Pay" },
    "feat2.t": { fr: "Vous scannez, en une seconde", ar: "أنت تمسح الرمز، في ثانية واحدة" },
    "feat2.p": { fr: "Votre propre smartphone (ou celui de votre équipe) devient le scanner. Vous flashez le code du client : ses points sont crédités instantanément.", ar: "هاتفك (أو هاتف فريقك) يتحوّل إلى ماسح. تمسح رمز الزبون: تُضاف نقاطه فوراً." },
    "feat2.l1": { fr: "Aucun risque de triche — c'est vous qui scannez", ar: "لا مجال للغش — أنت من يمسح الرمز" },
    "feat2.l2": { fr: "Notification immédiate côté client", ar: "إشعار فوري لدى الزبون" },
    "feat2.l3": { fr: "Mode caisse tablette, protégé par PIN", ar: "وضع الصندوق على لوحة، محمي برمز PIN" },
    "feat2.l4": { fr: "Multi-serveurs pour toute l'équipe", ar: "حسابات متعددة لكامل الفريق" },
    "feat3.t": { fr: "Chaque scan enrichit votre fichier client", ar: "كل مسح يُثري قاعدة زبائنك" },
    "feat3.p": { fr: "Nom, e-mail, visites, habitudes : votre tableau de bord vous dit qui sont vos meilleurs clients — et comment les faire revenir.", ar: "الاسم، البريد الإلكتروني، الزيارات، العادات: لوحة التحكّم تكشف لك أفضل زبائنك — وكيف تُعيدهم." },
    "feat3.l1": { fr: "Suivi automatique des visites", ar: "تتبّع تلقائي للزيارات" },
    "feat3.l2": { fr: "Historique complet des transactions", ar: "سجلّ كامل للمعاملات" },
    "feat3.l3": { fr: "Statistiques avancées &amp; prédictives", ar: "إحصائيات متقدّمة وتنبؤية" },
    "feat3.l4": { fr: "Export complet du fichier clients", ar: "تصدير كامل لقاعدة الزبائن" },

    /* ─── Marketing Pro ─── */
    "mkt.badge": { fr: "Inclus dans KEEPO Pro", ar: "مضمّن في KEEPO Pro" },
    "mkt.title": { fr: 'Le marketing qui ramène vos clients, <span class="grad-text">en pilote automatique</span>.', ar: 'تسويق يُعيد زبائنك، <span class="grad-text">تلقائياً</span>.' },
    "mkt.sub":   { fr: 'Une carte de fidélité enregistre des points. <strong>KEEPO Pro va beaucoup plus loin</strong> : il relance, récompense et fait revenir vos clients tout seul — pendant que vous tenez votre commerce.', ar: 'بطاقة الولاء تسجّل النقاط فقط. <strong>KEEPO Pro يذهب أبعد بكثير</strong>: يُذكّر، يكافئ، ويُعيد زبائنك وحده — بينما تدير أنت متجرك.' },
    "mkt.c1t": { fr: "Relances automatiques", ar: "تذكيرات تلقائية" },
    "mkt.c1p": { fr: "Un client n'est pas revenu depuis 30 jours ? Il reçoit un e-mail personnalisé — sans que vous ne fassiez rien.", ar: "زبون لم يعُد منذ 30 يوماً؟ يتلقّى بريداً مخصّصاً — دون أن تفعل شيئاً." },
    "mkt.c2t": { fr: "Parrainage", ar: "الإحالة" },
    "mkt.c2p": { fr: "Vos clients invitent leurs amis : les deux gagnent des points. Le bouche-à-oreille qui se récompense tout seul.", ar: "يدعو زبائنك أصدقاءهم: يربح الطرفان نقاطاً. تسويق شفهي يكافئ نفسه." },
    "mkt.c3t": { fr: "Cadeau d'anniversaire", ar: "هدية عيد الميلاد" },
    "mkt.c3p": { fr: "Le jour J, votre client reçoit un bonus automatique. La petite attention qui crée l'attachement.", ar: "في يومه، يتلقّى زبونك مكافأة تلقائية. لمسة صغيرة تصنع الولاء." },
    "mkt.c4t": { fr: "Roue de la fortune", ar: "عجلة الحظ" },
    "mkt.c4p": { fr: "Après quelques visites, vos clients tentent leur chance et gagnent un lot. Le jeu qui donne envie de revenir.", ar: "بعد بضع زيارات، يجرّب زبائنك حظّهم ويربحون جائزة. لعبة تُغري بالعودة." },
    "mkt.c5t": { fr: "Niveaux VIP", ar: "مستويات VIP" },
    "mkt.c5p": { fr: "Vos meilleurs clients montent en niveau et débloquent des avantages exclusifs. Le statut qui fidélise.", ar: "يرتقي أفضل زبائنك في المستويات ويفتحون مزايا حصرية. مكانة تعزّز الولاء." },
    "mkt.c6t": { fr: "Avis Google automatiques", ar: "تقييمات Google تلقائية" },
    "mkt.c6p": { fr: "Quelques minutes après l'achat, vos clients satisfaits sont invités à vous noter. Votre réputation grandit seule.", ar: "بعد دقائق من الشراء، يُدعى زبائنك الراضون لتقييمك. تكبر سمعتك وحدها." },
    "mkt.foot": { fr: '＋ <strong>Campagnes e-mail</strong> vers tout votre fichier client en un clic, et automatisations sur-mesure.', ar: '＋ <strong>حملات بريد إلكتروني</strong> إلى كامل قاعدة زبائنك بنقرة واحدة، وأتمتة حسب الطلب.' },
    "mkt.cta": { fr: "Activer le marketing Pro", ar: "فعّل تسويق Pro" },

    /* ─── Comment ça marche ─── */
    "how.eyebrow": { fr: "Comment ça marche", ar: "كيف يعمل" },
    "how.title": { fr: "En caisse demain matin", ar: "في الصندوق صباح الغد" },
    "how.sub": { fr: "Pas d'installation, pas de formation, pas de matériel. Trois étapes et c'est parti.", ar: "بدون تثبيت، بدون تدريب، بدون معدات. ثلاث خطوات وتنطلق." },
    "how.s1t": { fr: "Créez votre carte en 2 minutes", ar: "أنشئ بطاقتك في دقيقتين" },
    "how.s1p": { fr: "Nom, couleurs, récompenses : choisissez points ou tampons, fixez le palier (« 10 cafés = 1 offert ») et c'est prêt.", ar: "الاسم، الألوان، المكافآت: اختر النقاط أو الأختام، حدّد العتبة («10 قهوات = 1 مجانية») وكل شيء جاهز." },
    "how.s2t": { fr: "Vos clients scannent le QR du comptoir", ar: "يمسح زبائنك رمز QR من المنضدة" },
    "how.s2p": { fr: "Leur carte apparaît dans leur téléphone — et vous, vous récupérez leur nom et leur e-mail dès la première visite.", ar: "تظهر بطاقتهم في هواتفهم — وأنت تحصل على اسمهم وبريدهم منذ أول زيارة." },
    "how.s3t": { fr: "Scannez, récompensez, fidélisez", ar: "امسح، كافئ، اكسب الولاء" },
    "how.s3p": { fr: "Chaque passage crédite des points en un scan — et vos clients reviennent pour débloquer leurs récompenses.", ar: "كل زيارة تُضيف نقاطاً بمسح واحد — ويعود زبائنك لفتح مكافآتهم." },

    /* ─── Résultats ─── */
    "res.eyebrow": { fr: "Le calcul", ar: "الحساب" },
    "res.title": { fr: "Rentabilisé dès quelques clients fidèles", ar: "مربح ابتداءً من بضعة زبائن أوفياء" },
    "res.sub": { fr: "Pas besoin de miracle : il suffit que quelques clients reviennent un peu plus souvent.", ar: "لا حاجة لمعجزة: يكفي أن يعود بعض الزبائن أكثر قليلاً." },
    "res.r1l": { fr: "pour créer votre carte", ar: "لإنشاء بطاقتك" },
    "res.r2l": { fr: "de matériel ou d'installation", ar: "معدات أو تثبيت" },
    "res.r3l": { fr: "pour cumuler et fidéliser", ar: "لتجميع النقاط وكسب الولاء" },
    "res.r4l": { fr: "clients fidèles suffisent à le rentabiliser", ar: "زبائن أوفياء يكفون لتغطية التكلفة" },
    "res.note": { fr: "Le calcul est simple : <b>8 clients</b> qui reviennent une fois de plus chaque mois avec un panier de 2 000 DZD couvrent largement l'abonnement Pro. Tout le reste, c'est du gain.", ar: "الحساب بسيط: <b>8 زبائن</b> يعودون مرة إضافية كل شهر بسلة بـ 2000 دج يغطّون اشتراك Pro بسهولة. والباقي كله ربح." },

    /* ─── Avis ─── */
    "avis.eyebrow": { fr: "Nouveau", ar: "جديد" },
    "avis.title": { fr: "Soyez parmi les premiers", ar: "كن من الأوائل" },
    "avis.sub": { fr: "KEEPO démarre auprès des commerces indépendants. En rejoignant maintenant, vous prenez une longueur d'avance — et vous êtes accompagné de près.", ar: "ينطلق KEEPO مع التجّار المستقلّين. بانضمامك الآن تسبق غيرك — ونرافقك عن قرب." },
    "avis.c1t": { fr: "Accompagnement direct", ar: "مرافقة مباشرة" },
    "avis.c1p": { fr: "KEEPO est porté par son fondateur, pas par un centre d'appels. On configure votre carte avec vous, et on répond vite.", ar: "يقوده مؤسّسه، لا مركز اتصالات. نُعدّ بطاقتك معك، ونردّ بسرعة." },
    "avis.c2t": { fr: "Pensé pour le commerce local", ar: "مصمّم للتجارة المحلّية" },
    "avis.c2p": { fr: "Un outil simple, fait pour le comptoir : sans matériel, sans jargon, prêt en quelques minutes.", ar: "أداة بسيطة، مصنوعة للمحل: بدون معدات، بدون مصطلحات معقّدة، جاهزة في دقائق." },
    "avis.c3t": { fr: "Votre avis façonne KEEPO", ar: "رأيك يصنع KEEPO" },
    "avis.c3p": { fr: "En arrivant tôt, vos retours orientent les prochaines fonctionnalités. Vous construisez l'outil avec nous.", ar: "بقدومك مبكراً، تُوجّه ملاحظاتك الميزات القادمة. تبني الأداة معنا." },

    /* ─── Tarifs ─── */
    "pricing.eyebrow": { fr: "Tarifs", ar: "الأسعار" },
    "pricing.title": { fr: "Un tarif simple, sans engagement", ar: "سعر بسيط، بدون التزام" },
    "pricing.sub": { fr: "Un seul prix, tout inclus · sans engagement, résiliable à tout moment.", ar: "سعر واحد، كل شيء مضمّن · بدون التزام، يمكن الإلغاء في أي وقت." },
    "pricing.for": { fr: "Tout débloqué pour faire revenir vos clients", ar: "كل شيء مفتوح لإعادة زبائنك" },
    "pricing.pop": { fr: "Recommandé par les commerçants", ar: "موصى به من التجّار" },
    "pricing.d1": { fr: "1 mois", ar: "شهر" },
    "pricing.d3": { fr: "3 mois · −5%", ar: "3 أشهر · −5%" },
    "pricing.d6": { fr: "6 mois · −10%", ar: "6 أشهر · −10%" },
    "pricing.d12": { fr: "12 mois · −15%", ar: "12 شهراً · −15%" },
    "pricing.inc1": { fr: "Membres fidèles illimités", ar: "أعضاء أوفياء بلا حدود" },
    "pricing.inc2": { fr: "Points &amp; cartes à tampons", ar: "نقاط وبطاقات أختام" },
    "pricing.inc3": { fr: "Toutes les fonctions IA", ar: "جميع ميزات الذكاء الاصطناعي" },
    "pricing.inc4": { fr: "Analytics premium temps réel", ar: "إحصائيات متقدّمة فورية" },
    "pricing.inc5": { fr: "Mode caisse + multi-caissiers", ar: "وضع الصندوق + صرّافون متعددون" },
    "pricing.inc6": { fr: "Studio Design Card (cartes personnalisées)", ar: "استوديو تصميم البطاقات" },
    "pricing.inc7": { fr: "Export CSV illimité", ar: "تصدير CSV بلا حدود" },
    "pricing.inc8": { fr: "Support prioritaire", ar: "دعم ذو أولوية" },
    "pricing.pay": { fr: "🔒 Paiement sécurisé via Chargily · CIB &amp; EDAHABIA", ar: "🔒 دفع آمن عبر Chargily · CIB وEDAHABIA" },

    /* ─── FAQ ─── */
    "faq.eyebrow": { fr: "FAQ", ar: "الأسئلة الشائعة" },
    "faq.title": { fr: "Les questions qu'on nous pose", ar: "الأسئلة التي تُطرح علينا" },
    "faq.sub": { fr: "Tout le reste, on y répond sur le chat — 7j/7 pour les clients Pro.", ar: "الباقي نجيب عنه في الدردشة — 7/7 لعملاء Pro." },
    "faq.q1": { fr: "Mes clients doivent-ils installer une application ?", ar: "هل يجب على زبائني تثبيت تطبيق؟" },
    "faq.a1": { fr: "Non. KEEPO fonctionne directement dans le navigateur du téléphone : vos clients scannent votre QR de comptoir une fois, ajoutent le raccourci sur leur écran d'accueil, et leur carte est <b>toujours à portée de main</b> — sans App Store, sans téléchargement, sans espace de stockage.", ar: "لا. يعمل KEEPO مباشرةً في متصفّح الهاتف: يمسح زبائنك رمز QR مرة واحدة، يضيفون الاختصار إلى شاشتهم الرئيسية، وتبقى بطاقتهم <b>دائماً في متناول اليد</b> — بدون متجر تطبيقات، بدون تحميل، بدون مساحة تخزين." },
    "faq.q2": { fr: "Ai-je besoin de matériel (borne, tablette, douchette) ?", ar: "هل أحتاج إلى معدات (جهاز، لوحة، ماسح)؟" },
    "faq.a2": { fr: "Non plus. <b>Votre smartphone suffit</b> pour scanner les cartes de vos clients. Nous vous fournissons un QR de comptoir HD à imprimer. Si vous avez une tablette de caisse, le mode caisse Pro (protégé par code PIN pour votre équipe) s'y installe en 1 minute.", ar: "لا. <b>هاتفك يكفي</b> لمسح بطاقات زبائنك. نوفّر لك رمز QR عالي الدقة للطباعة. وإن كان لديك لوحة، يُثبَّت وضع الصندوق Pro (المحمي برمز PIN لفريقك) في دقيقة." },
    "faq.q3": { fr: "Comment fonctionne l'essai gratuit de 14 jours ?", ar: "كيف تعمل التجربة المجانية لـ 14 يوماً؟" },
    "faq.a3": { fr: "Vous profitez de <b>toutes les fonctionnalités gratuitement pendant 14 jours</b> : 0 DZD aujourd'hui. À la fin de l'essai, vous choisissez de continuer en payant via Chargily (carte CIB ou EDAHABIA). <b>Aucun prélèvement automatique</b> — vous ne payez que si vous décidez de continuer.", ar: "تستفيد من <b>كل الميزات مجاناً لمدة 14 يوماً</b>: بدون دفع اليوم. في نهاية التجربة، تختار الاستمرار بالدفع عبر Chargily (بطاقة CIB أو EDAHABIA). <b>لا خصم تلقائي</b> — لا تدفع إلا إذا قرّرت الاستمرار." },
    "faq.q4": { fr: "Combien de temps pour démarrer ?", ar: "كم من الوقت للانطلاق؟" },
    "faq.a4": { fr: "<b>2 minutes, montre en main.</b> Vous créez votre carte (nom, couleurs, récompense), vous imprimez votre QR de comptoir, et votre premier client peut scanner. Aucune formation nécessaire — si vous savez envoyer un SMS, vous savez utiliser KEEPO.", ar: "<b>دقيقتان، لا أكثر.</b> تُنشئ بطاقتك (الاسم، الألوان، المكافأة)، تطبع رمز QR، ويمكن لأول زبون أن يمسح. لا حاجة لأي تدريب — إن كنت تعرف إرسال رسالة، فأنت تعرف استخدام KEEPO." },
    "faq.q5": { fr: "Puis-je gérer plusieurs boutiques ?", ar: "هل يمكنني إدارة عدة محلات؟" },
    "faq.a5": { fr: "Oui. KEEPO gère le <b>multi-boutiques</b> : vos clients cumulent leurs points dans n'importe lequel de vos points de vente, et vous suivez chaque boutique depuis le même tableau de bord.", ar: "نعم. يدير KEEPO <b>عدة محلات</b>: يجمع زبائنك نقاطهم في أيّ من نقاط بيعك، وتتابع كل محل من نفس لوحة التحكّم." },
    "faq.q6": { fr: "Où sont stockées mes données et celles de mes clients ?", ar: "أين تُخزَّن بياناتي وبيانات زبائني؟" },
    "faq.a6": { fr: "Vos données sont <b>en sécurité et vous appartiennent</b> : exportables à tout moment (offre Pro), jamais revendues ni partagées. Le paiement est traité par Chargily — vos coordonnées bancaires ne transitent jamais par KEEPO.", ar: "بياناتك <b>آمنة وملك لك</b>: يمكنك تصديرها في أي وقت (عرض Pro) ولا تُباع أو تُشارَك أبداً. تتم المدفوعات عبر Chargily — لا تمرّ معلوماتك البنكية عبر KEEPO." },
    "faq.q7": { fr: "Et si je veux résilier ?", ar: "وماذا لو أردت الإلغاء؟" },
    "faq.a7": { fr: "Aucun engagement : vous arrêtez simplement de renouveler votre abonnement. Vos données restent conservées et vous récupérez votre fichier client quand vous voulez — il est à vous.", ar: "لا التزام: تتوقّف ببساطة عن تجديد اشتراكك. تبقى بياناتك محفوظة ويمكنك تصدير قاعدة زبائنك متى شئت — فهي ملك لك." },

    /* ─── CTA final ─── */
    "final.title": { fr: "La fidélité n'est plus réservée aux grandes enseignes.", ar: "الوفاء لم يعُد حكراً على العلامات الكبرى." },
    "final.sub": { fr: "Lancez votre programme de fidélité aujourd'hui et donnez à vos clients une vraie raison de revenir.", ar: "أطلق برنامج ولائك اليوم وامنح زبائنك سبباً حقيقياً للعودة." },
    "final.cta_start": { fr: "Créer mon compte", ar: "إنشاء حسابي" },
    "final.cta_demo": { fr: "Tester la démo d'abord", ar: "جرّب العرض أولاً" },
    "final.note": { fr: "Sans engagement · Résiliation à tout moment · Vos données protégées", ar: "بدون التزام · إلغاء في أي وقت · بياناتك محمية" },

    /* ─── Footer ─── */
    "foot.brand": { fr: "Le programme de fidélité des commerces indépendants. Simple, beau, automatique.", ar: "برنامج الولاء للتجّار المستقلّين. بسيط، أنيق، تلقائي." },
    "foot.badge_dz": { fr: "🇩🇿 Conçu pour l'Algérie", ar: "🇩🇿 مصمّم للجزائر" },
    "foot.badge_secure": { fr: "🔒 Données protégées", ar: "🔒 بيانات محمية" },
    "foot.badge_pay": { fr: "💳 Paiement Chargily", ar: "💳 دفع Chargily" },
    "foot.col_product": { fr: "Produit", ar: "المنتج" },
    "foot.link_marketing": { fr: "Marketing Pro", ar: "تسويق Pro" },
    "foot.link_demo": { fr: "Démo interactive", ar: "عرض تفاعلي" },
    "foot.link_install": { fr: "Installer l'app", ar: "تثبيت التطبيق" },
    "foot.col_resources": { fr: "Ressources", ar: "موارد" },
    "foot.link_reviews": { fr: "Avis clients", ar: "آراء الزبائن" },
    "foot.copy": { fr: "© 2026 KEEPO — Tous droits réservés.", ar: "© 2026 KEEPO — جميع الحقوق محفوظة." },
    "foot.tagline": { fr: "Fait avec soin pour les commerçants indépendants.", ar: "صُنع بعناية للتجّار المستقلّين." }
  };

  if (window.KEEPO_I18N_EXTRA && typeof window.KEEPO_I18N_EXTRA === "object") {
    Object.assign(DICT, window.KEEPO_I18N_EXTRA);
  }
  window.KEEPO_DICT = DICT;

  /* ══════════════════════════════════════════════════════════
     AUTO-TRADUCTION FR → AR (sans balisage data-i18n)
     Parcourt le DOM + attributs (placeholder/title/aria-label),
     remplace le texte français présent dans AR_MAP, et attrape le
     contenu généré par JS (toasts, dashboards…) via MutationObserver.
     Pour étendre la couverture : ajouter des paires "français exact":"arabe".
     ══════════════════════════════════════════════════════════ */
  const AR_MAP = {
    // ── Commun (boutons, actions, champs) ──
    "Se connecter": "تسجيل الدخول",
    "Créer un compte": "إنشاء حساب",
    "Créer mon compte": "إنشاء حسابي",
    "Déconnexion": "تسجيل الخروج",
    "Enregistrer": "حفظ",
    "Annuler": "إلغاء",
    "Confirmer": "تأكيد",
    "Fermer": "إغلاق",
    "Retour": "رجوع",
    "Suivant": "التالي",
    "Précédent": "السابق",
    "Modifier": "تعديل",
    "Supprimer": "حذف",
    "Ajouter": "إضافة",
    "Rechercher": "بحث",
    "Chargement...": "جارٍ التحميل...",
    "Oui": "نعم",
    "Non": "لا",
    "Adresse e-mail": "البريد الإلكتروني",
    "Mot de passe": "كلمة المرور",
    "Confirmer le mot de passe": "تأكيد كلمة المرور",
    "Votre nom": "اسمك",
    "Nom": "الاسم",
    "Téléphone": "الهاتف",
    // ── connexion.html ──
    "← Retour au site": "← العودة إلى الموقع",
    "Confirmez votre e-mail": "أكّد بريدك الإلكتروني",
    "Cliquez sur ce lien pour activer votre compte. Pensez à vérifier vos spams.": "انقر على هذا الرابط لتفعيل حسابك. تحقّق أيضاً من مجلّد الرسائل غير المرغوبة.",
    "Bienvenue": "مرحباً",
    "Connectez-vous à votre espace KEEPO": "سجّل الدخول إلى مساحتك في KEEPO",
    "Mot de passe oublié ?": "نسيت كلمة المرور؟",
    "Connexion protégée par vérification en 2 étapes": "دخول محمي بالتحقّق بخطوتين",
    "Code reçu par e-mail": "الرمز المُستلَم عبر البريد",
    "Un code de connexion à usage unique va être envoyé à votre adresse e-mail.": "سيُرسَل رمز دخول لمرة واحدة إلى بريدك الإلكتروني.",
    "Recevoir mon code": "استلام الرمز",
    "Renvoyer le code": "إعادة إرسال الرمز",
    "← Connexion par mot de passe": "← الدخول بكلمة المرور",
    "Pas encore de compte ?": "ليس لديك حساب بعد؟",
    "Je suis…": "أنا…",
    "Client": "زبون",
    "J'utilise mes cartes de fidélité": "أستعمل بطاقات ولائي",
    "Commerçant": "تاجر",
    "Je fidélise mes clients": "أكسب ولاء زبائني",
    "En créant un compte, vous acceptez nos conditions d'utilisation.": "بإنشاء حساب، أنت توافق على شروط الاستخدام.",
    "Vous êtes déjà connecté": "أنت مسجّل الدخول بالفعل",
    "Votre session est active et sécurisée.": "جلستك نشطة ومؤمّنة.",
    "La fidélité qui fait": "الولاء الذي يُعيد",
    "revenir vos clients": "زبائنك",
    // ── Navigation dashboard commerçant ──
    "Dashboard": "لوحة التحكّم",
    "Terminal de Scan": "محطة المسح",
    "Code QR": "رمز QR",
    "Récompenses": "المكافآت",
    "Historique": "السجلّ",
    "Studio Design Card": "استوديو تصميم البطاقة",
    "Mes Boutiques": "محلاتي",
    "Mode Caisse": "وضع الصندوق",
    "Paramètres": "الإعدادات",
    "Aide & Support": "المساعدة والدعم",
    "Principal": "الرئيسية",
    "Fidélité": "الولاء",
    "Établissement": "المؤسّسة",
    "Compte": "الحساب"
  };
  if (window.KEEPO_AR_EXTRA && typeof window.KEEPO_AR_EXTRA === "object") Object.assign(AR_MAP, window.KEEPO_AR_EXTRA);
  window.KEEPO_AR_MAP = AR_MAP;

  const _orig = new WeakMap();  // textNode → valeur FR d'origine (pour restaurer)
  const _ATTRS = ["placeholder", "title", "aria-label"];
  let _observer = null;

  function _skipText(node) {
    const p = node.parentElement;
    if (!p) return true;
    const tag = p.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return true;
    if (p.closest("#keepo-lang-toggle,[data-i18n],[data-i18n-html]")) return true;
    return false;
  }

  function _applyText(node, toAr) {
    const raw = node.nodeValue;
    if (toAr) {
      const key = raw.trim();
      if (!key) return;
      const ar = AR_MAP[key];
      if (ar) {
        if (!_orig.has(node)) _orig.set(node, raw);
        node.nodeValue = raw.replace(key, ar);
      }
    } else if (_orig.has(node)) {
      node.nodeValue = _orig.get(node);
    }
  }

  function _applyAttrs(el, toAr) {
    _ATTRS.forEach(a => {
      if (!el.hasAttribute || !el.hasAttribute(a)) return;
      const key = "fr_" + a.replace(/-/g, "_");
      if (toAr) {
        const ar = AR_MAP[(el.getAttribute(a) || "").trim()];
        if (ar) {
          if (!el.dataset[key]) el.dataset[key] = el.getAttribute(a);
          el.setAttribute(a, ar);
        }
      } else if (el.dataset[key]) {
        el.setAttribute(a, el.dataset[key]);
      }
    });
  }

  function autoTranslate(root, toAr) {
    if (!root) return;
    if (root.nodeType === 3) { if (!_skipText(root)) _applyText(root, toAr); return; }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (_skipText(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
    });
    const nodes = []; let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(t => _applyText(t, toAr));
    if (root.querySelectorAll) {
      root.querySelectorAll("[placeholder],[title],[aria-label]").forEach(el => {
        if (!el.closest("#keepo-lang-toggle")) _applyAttrs(el, toAr);
      });
    }
    if (root.nodeType === 1) _applyAttrs(root, toAr);
  }

  function startObserver() {
    if (_observer) return;
    let queued = [], scheduled = false;
    const flush = () => {
      scheduled = false;
      const batch = queued; queued = [];
      batch.forEach(node => autoTranslate(node, true));
    };
    _observer = new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === "childList") m.addedNodes.forEach(nd => queued.push(nd));
        else if (m.type === "characterData") queued.push(m.target);
      }
      if (queued.length && !scheduled) { scheduled = true; setTimeout(flush, 0); }
    });
    _observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  function stopObserver() { if (_observer) { _observer.disconnect(); _observer = null; } }

  const STORAGE_KEY = "keepo_lang";
  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "fr";
  }

  function translate(lang) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir  = (lang === "ar") ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const t = DICT[el.getAttribute("data-i18n")];
      if (t) el.textContent = t[lang] || t.fr;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const t = DICT[el.getAttribute("data-i18n-html")];
      if (t) el.innerHTML = t[lang] || t.fr;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
      el.getAttribute("data-i18n-attr").split(";").forEach(pair => {
        const [attr, key] = pair.split(":").map(s => s && s.trim());
        const t = DICT[key];
        if (attr && t) el.setAttribute(attr, t[lang] || t.fr);
      });
    });

    // Auto-traduction du reste de la page (texte + attributs + contenu dynamique)
    if (lang === "ar") { autoTranslate(document.body, true); startObserver(); }
    else { stopObserver(); autoTranslate(document.body, false); }

    localStorage.setItem(STORAGE_KEY, lang);
    updateToggle(lang);

    // Événement pour code applicatif (ex : reformater les prix)
    window.dispatchEvent(new CustomEvent("keepo:lang", { detail: { lang } }));
  }

  function buildToggle() {
    if (document.getElementById("keepo-lang-toggle")) return;
    const style = document.createElement("style");
    style.textContent = `
      #keepo-lang-toggle{position:fixed;bottom:18px;inset-inline-end:18px;z-index:9999;
        display:inline-flex;align-items:center;gap:2px;padding:5px;border-radius:100px;
        background:rgba(20,30,32,.86);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.14);
        box-shadow:0 8px 24px -8px rgba(0,0,0,.5);font-family:system-ui,sans-serif;cursor:default}
      #keepo-lang-toggle button{border:0;border-radius:100px;padding:6px 13px;font-size:13px;
        font-weight:700;cursor:pointer;background:transparent;color:#cfe0e2;font-family:inherit;line-height:1}
      #keepo-lang-toggle button.on{background:linear-gradient(135deg,#16B8C4,#0E9AA6);color:#fff}
      #keepo-lang-toggle button:focus-visible{outline:2px solid #16B8C4;outline-offset:2px}
    `;
    document.head.appendChild(style);

    const wrap = document.createElement("div");
    wrap.id = "keepo-lang-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Choix de la langue / اختيار اللغة");
    wrap.innerHTML =
      '<button type="button" data-lang="fr">FR</button>' +
      '<button type="button" data-lang="ar" lang="ar">ع</button>';
    wrap.addEventListener("click", e => {
      const b = e.target.closest("button[data-lang]");
      if (b) translate(b.getAttribute("data-lang"));
    });
    document.body.appendChild(wrap);
  }

  function updateToggle(lang) {
    const wrap = document.getElementById("keepo-lang-toggle");
    if (!wrap) return;
    wrap.querySelectorAll("button[data-lang]").forEach(b => {
      b.classList.toggle("on", b.getAttribute("data-lang") === lang);
    });
  }

  function init() {
    buildToggle();
    translate(currentLang());
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.KEEPO_setLang = translate;
  window.KEEPO_getLang = currentLang;
})();
