import type { MediaRef, PortfolioEdition } from './types';
import { sseaypActs } from './gallery';

export const editions: PortfolioEdition[] = [
  {
    slug: 'project',
    index: '(01)',
    title: 'Project Portfolio',
    kicker: 'by Nhat Minh Nguyen',
    language: 'EN',
    context: 'UIC Admissions · Underwood International College, Yonsei University',
    summary:
      'My most outstanding and meaningful works from high school — luminescent. the double album, The Closet, and street work from Hà Nội — written for the UIC Yonsei Admissions Committee.',
    pdf: { href: '/pdf/project.pdf', label: 'Project_Portfolio_UIC.pdf', pages: 42, sizeMb: 10 },
    cover: { id: 'project-f588', alt: 'Minh in a blazer and red tie holding a compact camera' },
    palette: { accent: '#2f7bf5', label: 'Electric blue' },
  },
  {
    slug: 'sseayp',
    index: '(02)',
    title: 'SSEAYP 49th Photo Portfolio',
    kicker: 'Viet Nam Contingent’s',
    language: 'EN',
    context: 'Ship for Southeast Asian and Japanese Youth Program · 01–03/2026',
    summary:
      'A visual narrative in four acts — The Beginning, The Identity, The Connection and The Cradle — following the 49th Viet Nam Contingent.',
    pdf: { href: '/pdf/sseayp.pdf', label: 'SSEAYP_49th_Portfolio.pdf', pages: 16, sizeMb: 5 },
    cover: { id: 'sseayp-004-008', alt: 'Delegates raising Vietnamese flags on stage' },
    palette: { accent: '#e3262b', label: 'Signal red' },
  },
  {
    slug: 'nhan-quan-the-ky',
    index: '(03)',
    title: 'Nhãn Quan Thế Kỷ',
    kicker: 'một thế kỷ hoa lửa, một lăng kính trần trụi.',
    language: 'VI',
    context: 'Đại cương truyền thông quốc tế · Học viện Ngoại giao',
    summary:
      'Một tiểu luận thị giác về “Tính vật chất của truyền thông” — đặc tả các hiện vật của 100 năm báo chí cách mạng Việt Nam.',
    pdf: { href: '/pdf/nhan-quan-the-ky.pdf', label: 'Nhan_Quan_The_Ky.pdf', pages: 12, sizeMb: 7 },
    cover: { id: 'nqtk-005-009', alt: 'Wartime twin-lens cameras on red velvet' },
    palette: { accent: '#c8452f', label: 'Rust' },
  },
];

export const getEdition = (slug: PortfolioEdition['slug']) =>
  editions.find((e) => e.slug === slug)!;

const m = (id: string, alt: string, caption?: string): MediaRef => ({ id, alt, caption });

/* ───────────── (01) Project Portfolio ───────────── */
export const projectEdition = {
  chapters: [
    { id: 'introduction', n: '1', label: 'Introduction' },
    { id: 'overview', n: '2', label: 'Project overview' },
    { id: 'luminescent', n: '3', label: 'luminescent.' },
    { id: 'closet', n: '4', label: 'The Closet' },
    { id: 'other', n: '5', label: 'Other projects' },
    { id: 'contact', n: '6', label: 'Contact' },
  ],
  introduction: [
    'Dear UIC Admissions Committee,',
    'My name is Nhat Minh Nguyen, but I go by Brian Nguyen. As a Korean major student at the Foreign Language Specialized School (54th class), I have had the opportunity to grow academically while actively engaging in extracurricular activities. Through this journey, I have gained valuable experience in media, specifically in photography and design, which have shaped my personal projects both in and outside of school.',
    'This portfolio presents my most outstanding and meaningful works, highlighting my creativity and dedication. I hope it provides you with a deeper understanding of who I am and helps you evaluate my application more effectively.',
    'Thank you for your time and consideration.',
  ],
  about: [
    'I grew up in a family deeply passionate about photography. My grandfather, a former photojournalist, sparked my love for street photography during my childhood.',
    'As I grew older, I became fascinated by K-dramas, music videos, and tech media from companies like Samsung and Apple. This led me to wonder — what if I could merge traditional street photography with the dynamic, creative world of media? The fusion of these two fields could create something truly unique.',
  ],
  events: [
    'Beyond photography, I have a deep passion for running events — especially recapping them. Through these events I encounter all kinds of people: young couples, groups of friends, my own teachers, and even unexpected VIP guests who energize the entire audience.',
    'Watching celebrities on stage and then stepping backstage to review my own photos fills me with satisfaction. As an “observer,” my responsibility is to capture these moments as truthfully as possible, allowing everyone to relive them with us.',
  ],
  eventsMedia: [
    m('project-007-029', 'Red light trails swirling in darkness'),
    m('project-007-030', 'Sparklers erupting at an outdoor stage'),
    m('project-007-033', 'Rapper in a yellow jersey under blue stage light'),
  ],
  overview: [
    'Throughout my three years of high school, I have participated in a total of 34 different projects, clubs, and organizations, taking on various roles such as Vice President, Head of Media, Design, and more — both within and outside of school, on a national and international scale. I have also carried out numerous personal projects, even serving as an Honorary Reporter for Korea.net to promote Korean culture and tourism.',
    'However, I do not take pride in the sheer number of activities I have engaged in. Instead, I am truly proud of the people I have met, the experiences I have gained, and the diverse academic and professional cultures I have been exposed to.',
    'Studying in a Korean-specialized class let me cook Korean dishes in class, translate Korean films together, practise Hangeul calligraphy with young Korean volunteers — and, most importantly, learn about Yonsei University, specifically UIC. On February 27, 2023, I met the UIC Yonsei admissions team: the moment I decided to pursue my dream of studying at Yonsei.',
  ],
  overviewMedia: [
    m('project-008-047', 'Student organisation on school steps'),
    m('project-008-052', 'Concert crew celebrating on stage'),
    m('project-009-057', 'Bão Fair 2024 group portrait on a basketball court'),
    m('project-008-049', 'Selfie with a crowd of classmates on a sports field'),
    m('project-009-060', 'Pillavia school-wide group portrait'),
  ],
  luminescent: {
    intro:
      'luminescent. is a conceptual photography project created for my 17th birthday, exploring the contrast and harmony between two opposing yet complementary aspects of human nature.',
    outro:
      'More than just a photography series, luminescent. is a personal narrative that visualizes the duality within each of us — how light and shadow, strength and vulnerability, coexist to form a complete and luminous whole — just as I step into a new chapter of my life at 17.',
    sides: [
      {
        key: 'red',
        name: 'Red Sun',
        part: 'pt.1 — be the son of devil.',
        tone: '#c2412d',
        text: [
          'A feverish glow, suffocating yet captivating. Red Sun is the embodiment of pressure, control, and emotional detachment. It’s the weight of expectations, the cold intensity of perfectionism. Deep shadows creep into every corner, red floods the frame like a warning, like a siren blaring in the night.',
          'It is the struggle, the madness, the nights spent chasing an image that may never exist. It is beautiful, but it is also merciless.',
        ],
        base: [
          ['Color palette', 'dark & warm tone'],
          ['Lighting', 'harsh, direct light'],
          ['Framing', 'dynamic, cinematic, deep & low angles'],
          ['Emotion', 'intense, passionate, bold'],
          ['Symbolism', 'devil, camera and cinematic action scenes'],
        ],
        setup: [
          ['Lighting setup', 'One backdrop, a hexagonal softbox with a grid, and a gobo casting a rectangular/circular orange shadow.'],
          ['Outfit', 'A vest with short baggy pants — a rebellious yet composed “child of the devil.”'],
          ['Software', 'Lightroom CC for post; Photoshop for typography and the “devil’s horn” effect.'],
        ],
        media: [
          m('project-f703', 'Red Sun — “red sun.” handwritten over a dark portrait'),
          m('project-f701', 'Red Sun — “minh.” handwritten over a dark portrait'),
          m('project-013-074', 'Red Sun — “crip walk / take a shot!” diptych'),
          m('project-014-079', 'Red Sun — “reach the climax” collage'),
          m('project-016-081', 'Red Sun — “antagonist? or a foil?”'),
          m('project-017-082', 'Red Sun — “to be continued.”'),
        ],
      },
      {
        key: 'blue',
        name: 'Blue Moon',
        part: 'pt.2',
        tone: '#6fa9e6',
        text: [
          'A fleeting moment, effortless and unbound. Blue Moon is where I breathe, where the weight of ambition dissolves into quiet ease — swaying to A Man Without Love, laughing along to The Tonight Show, letting life unfold as it will.',
          'If Red Sun is the relentless pursuit, then Blue Moon is the quiet surrender. One cannot exist without the other.',
        ],
        base: [
          ['Color palette', 'light & cool tones'],
          ['Lighting', 'soft, diffused glow'],
          ['Framing', 'calm, centered, symmetrical shots'],
          ['Emotion', 'serene, introspective, dreamy'],
          ['Symbolism', 'old TV frames, The Tonight Show'],
        ],
        setup: [
          ['Lighting setup', 'White background, gridded hexagonal softbox, gobo snoot casting blue light, white reflector for gradients, small octobox hair light.'],
          ['Outfit', 'Gray hoodie, varsity jacket and baggy joggers; layered hair styled with pomade.'],
          ['Software', 'Lightroom CC; Photoshop for typography and old TV frames arranged in consecutive boxes.'],
        ],
        media: [
          m('project-f749', 'Blue Moon — “brian.” handwritten over a sky-blue portrait'),
          m('project-f750', 'Blue Moon — portrait holding a sneaker'),
          m('project-019-090', 'Blue Moon — “grab a pic?” TV-frame grid'),
          m('project-021-095', 'Blue Moon — “boom!” bubble-gum portrait'),
          m('project-022-098', 'Blue Moon — “hi!!!!” collage'),
          m('project-023-099', 'Blue Moon — “The End.” TV-frame grid'),
        ],
      },
    ],
    credit:
      'Special thanks to my VAXcine media crew (Nghiêm Minh, Nhật Duy, Mai Quang Minh, Bùi Linh, Minh Sơn, Nguyễn Dương).',
  },
  closet: {
    concept: [
      'As a child, the old closet was more than just a piece of furniture — it was my secret world. Tucked away inside, I would hide with my grandparents, filling its shelves with my little dreams, hobbies, and treasures that only I understood.',
      'Now, as we stand on the edge of a new chapter, I realize that our class is just like that closet. Within its walls, we have stored not just our ambitions but also the friendships and moments that have shaped us. And as this door gently closes, it does not mark an end but rather the beginning of something even greater.',
    ],
    process:
      'Because this concept was designed for 45 people, the challenge was to make sure everyone’s ideas were considered while keeping one cohesive result. I built a five-question form — three multiple-choice questions to narrow stylistic preferences, two open-ended ones for personal input.',
    findings: [
      'contrasting background tones, both light and dark',
      'balanced style — mixing cool and cute clothes',
      'hot tones; specifically yellow and orange',
      'reference keywords: slumber party, Hong Kong',
    ],
    lighting:
      'Bright around the subject and dark behind — a cozy room that highlights the subject. One rectangular gobo as a spotlight, one background light for a vivid gradient, and one light inside the cabinet as the key.',
    media: [
      m('project-027-103', 'The empty closet set, lit warm'),
      m('project-028-106', 'Three classmates in the closet set'),
      m('project-028-107', 'Classmate in a pleated skirt on the phone'),
      m('project-028-108', 'Classmate seated cross-legged inside the closet'),
      m('project-028-109', 'Classmate with a red guitar'),
      m('project-029-125', 'Fisheye group portrait'),
      m('project-029-126', 'Group lounging on the floor in bright sweaters'),
      m('project-030-136', 'Wide fisheye of the full class'),
    ],
  },
  other: [
    {
      title: 'Lost in the Garden of Eden',
      media: [m('project-035-152', 'Close-up with blue petals and veil'), m('project-035-154', 'Portrait among blue hydrangeas'), m('project-035-155', 'Portrait resting on white sheets')],
    },
    {
      title: 'A Sunset Girl.',
      media: [m('project-036-169', 'Profile with earphones in golden light'), m('project-036-170', 'Portrait by the river at sunset'), m('project-036-171', 'Backlit silhouette at sunset')],
    },
    {
      title: 'Town of Light.',
      media: [m('project-037-180', 'Lantern-lit old town street at night'), m('project-037-181', 'Lantern stalls glowing'), m('project-037-183', 'Hanging lanterns in warm colours')],
    },
    {
      title: 'Long Biên — Footprints of Time',
      media: [m('project-038-192', 'Long Biên bridge over a busy intersection'), m('project-038-193', 'Train approaching on the rail line'), m('project-038-194', 'Train passing close to houses')],
    },
    {
      title: 'Memory Station K54 · HSSH — Life in Lens',
      media: [m('project-f917', 'Memory Station K54 hoodie'), m('project-f918', 'Media department hoodie back print'), m('project-f925', 'HSSH “Life in Lens” T-shirt')],
    },
  ],
  contact: {
    closing:
      'Thank you for your interest. Photography is not just my passion but my way of expressing perspectives and identities. I look forward to further exploring creativity and storytelling at UIC Yonsei.',
    links: [
      { label: 'IG photography', value: '@_wandergraph_', href: 'https://instagram.com/_wandergraph_' },
      { label: 'IG main', value: '@ntjst_brian', href: 'https://instagram.com/ntjst_brian' },
      { label: 'Email', value: 'nhatminh.brian@gmail.com', href: 'mailto:nhatminh.brian@gmail.com' },
    ],
  },
};

/* ───────────── (02) SSEAYP 49th ───────────── */
const sseRefs = (ids: string[], alt: string) => ids.map((id, i) => m(id, `${alt}, frame ${i + 1}`));

export const sseaypEdition = {
  welcome:
    'Welcome to the visual narrative of the SSEAYP 49th Viet Nam Contingent. This portfolio is more than a collection of images; it is a testament to youthful dedication, capturing the vibrant spirit and untold stories behind every milestone.',
  hello: [
    'I’m Nguyen Nhat Minh (Brian), an International Economics freshman at the Diplomatic Academy of Viet Nam (DAV) with a profound passion for visual storytelling.',
    'From the proud official Launching Ceremony at the Viet Nam Youth Academy, to the inspiring USSH talkshow “Xây dựng Thương hiệu Cá nhân, Giữ Bản lĩnh Số”, and the dynamic energy of the SSEAYP Unitour at VinUniversity’s Traditional Room, following the SSEAYP 49th Viet Nam Contingent has been a profound privilege.',
    'More than just a collection of images, this portfolio is my heartfelt gratitude to the mentors who guided me and the delegates who trusted me to be their silent storyteller.',
  ],
  definition: {
    term: 'SSEAYP 49th',
    phonetic: '/ˈsiː.ʌp – ˈfɔːr.ti.naɪnθ/ (n.)',
    body: 'The Ship for Southeast Asian and Japanese Youth Program. A floating home where individual identities merge into one Viet Nam, turning the heavy weight of cultural diplomacy into the proudest heartbeat of our youth.',
  },
  acts: [
    {
      key: 'beginning',
      n: 'Act 1',
      title: 'The Beginning',
      place: 'Launching Ceremony · Viet Nam Youth Academy',
      lede: 'To the world, SSEAYP is a diplomatic voyage. But through my viewfinder, it is an ecosystem of raw emotions. It’s where leaders are forged, cultures collide, and silent sacrifices are made behind the scenes.',
      notes: [
        { title: 'The first heartbeats', body: 'The first heartbeats of Vietnamese culture brought to life on stage. Every movement is not just a performance, but a fierce declaration of our identity, passion, and readiness to reach out to the world.' },
        { title: 'A – RI – GA – TO!', body: 'More than just a catchy chant, the “Arigato” cheer is a SSEAYP signature — a high-energy, full-hearted expression of gratitude to the program, the host country Japan, and every single person who made this voyage possible.' },
        { title: '“Thương chào, thương chào!”', body: 'More than just a greeting, it is a promise of unity — the clearest proof of our “floating home,” where unique individuals merge into one proud Viet Nam.' },
      ],
      media: sseRefs(sseaypActs.act1, 'Act 1 — Launching Ceremony'),
    },
    {
      key: 'identity',
      n: 'Act 2',
      title: 'The Identity',
      place: 'Talkshow · University of Social Sciences and Humanities',
      lede: 'Stepping away from the grand lights of the opening stage, the narrative shifts from collective national pride to the quiet, powerful forging of individual identities. In a world driven by constant connectivity, who are we, and what message do we bring to the global stage?',
      notes: [
        { title: 'Digital bravery', body: 'This act captures the moments where our contingent learns to craft steadfast personal brands and cultivate the “digital bravery” needed to navigate the modern era.' },
        { title: 'Beyond the speakers', body: 'Beyond the lens, I found attentive eyes, nodding heads, and the burning desire of young minds eager to assert their true value.' },
      ],
      media: sseRefs(sseaypActs.act2, 'Act 2 — USSH talkshow'),
    },
    {
      key: 'connection',
      n: 'Act 3',
      title: 'The Connection',
      place: 'Unitour · VinUniversity Traditional Room',
      lede: 'On a vibrant March afternoon, our voyage anchors at the elegant Traditional Room of VinUniversity — where the legacy of SSEAYP transcends the boundaries of our contingent and steps directly into the wider community.',
      notes: [
        { title: 'Youth without borders', body: 'No matter who you are or where you come from, barriers fade under the shared roof of the SSEAYP network.' },
        { title: 'Invisible threads', body: 'True diplomacy is not confined to international waters; it thrives in the shared conversations and authentic bonds we build right here at home.' },
      ],
      media: sseRefs(sseaypActs.act3, 'Act 3 — VinUniversity Unitour'),
    },
  ],
  coda: {
    n: 'Act 4',
    title: 'The Cradle',
    place: 'D.A.V Ho Chi Minh Communist Youth Union',
    lede: 'As this chapter of external connection concludes, it gently reminds us of the roots that made this flight possible — leading to the final, most meaningful destination: a place I deeply and proudly call “Home”.',
    body: 'Returning “Home”, I realize this voyage was never just about exploring the world; it is about bringing back the finest values to enrich the place that gave me the wings to fly. Thank you to my mentors, the delegates, and to all of you for walking this journey with me.',
    media: sseRefs(sseaypActs.act4, 'Act 4 — The Cradle'),
  },
};

/* ───────────── (03) Nhãn Quan Thế Kỷ ───────────── */
export type Hotspot = { x: number; y: number; label: string; body: string };

export const nqtkEdition = {
  title: 'Nhãn Quan Thế Kỷ',
  subtitle: 'một thế kỷ hoa lửa, một lăng kính trần trụi.',
  student: 'Nguyễn Nhật Minh · KTQT52C10465',
  course: 'Đại cương truyền thông quốc tế · Học viện Ngoại giao',
  cover: m('nqtk-001-000', 'Phòng trưng bày Bảo tàng Báo chí Việt Nam với lá cờ đỏ sao vàng'),
  preface: {
    kicker: 'Lời tựa · Creative Rationale',
    title: 'Tuyên ngôn sáng tạo',
    salutation: 'Kính gửi thầy Nguyễn Minh Tuấn,',
    body: [
      'Trong lý thuyết truyền thông quốc tế, hiện vật không chỉ là những vật thể tĩnh lặng; chúng là những “chủ thể” tham gia trực tiếp vào quá trình kiến tạo diễn ngôn quốc gia. Dự án nhiếp ảnh “Nhãn Quan Thế Kỷ” được thực hiện nhằm giải mã “Tính vật chất của truyền thông” thông qua lăng kính của một sinh viên Ngoại giao.',
      'Thay vì tiếp cận bằng những góc máy toàn cảnh mang tính chất tư liệu, bộ ảnh tập trung khai thác các góc máy đặc tả (Macro/Close-up) để làm nổi bật những nếp hằn của thời gian. Đó là độ nhám rỉ sét của chiếc loa đại 500W, lớp sơn bong tróc trên vỏ máy ảnh Hacoflex, hay những vết xước cơ học trên bàn phím máy chữ Hermes Baby.',
      'Mỗi bức ảnh là một nỗ lực thị giác hóa Quyền lực mềm. Khi rào cản ngôn ngữ bị xóa bỏ, chính sự trần trụi của hiện vật sẽ trở thành thứ ngôn ngữ ngoại giao mạnh mẽ nhất, kết nối cảm xúc của công chúng toàn cầu với hành trình 100 năm dấn thân của báo chí cách mạng Việt Nam.',
    ],
    epigraph: 'Mỗi vết xước, một thế kỷ.',
    media: m('nqtk-002-003', 'Máy quay phim thời chiến dưới ánh đèn vàng trong tủ kính'),
  },
  acts: [
    {
      n: 'Hồi I',
      title: 'Phá vỡ sự bất đối xứng',
      body: 'Trước khi có họng súng, chúng ta chiến đấu bằng những con chữ. Việc giải phóng không gian thông tin bắt đầu từ những tờ báo mỏng manh nhất, nơi người Việt tự giành lại quyền định hình bản sắc của chính mình.',
      captions: ['Viết giữa cơn mưa thép.', 'Ống kính không chớp trước tử thần.'],
      feature: m('nqtk-004-008', 'Tờ báo cổ ố vàng trong tủ kính', 'Ống kính không chớp trước tử thần.'),
      hotspots: [
        { x: 50, y: 48, label: 'Tờ báo thời kỳ đầu', body: 'Những tờ báo mỏng manh nhất — nơi người Việt tự giành lại quyền định hình bản sắc của chính mình.' },
      ] as Hotspot[],
      media: [
        m('nqtk-003-005', 'Gian trưng bày “Việt Nam Độc Lập” — tờ báo đầu tiên của Mặt trận Việt Minh'),
        m('nqtk-003-004', 'Bản in báo cổ dưới ánh đèn'),
        m('nqtk-003-006', 'Chiếc xe đạp của phóng viên chiến trường', 'Viết giữa cơn mưa thép.'),
        m('nqtk-004-007', 'Ngòi bút khổng lồ trong không gian tối'),
      ],
    },
    {
      n: 'Hồi II',
      title: 'Ngôn ngữ của khói lửa và rỉ sét',
      body: 'Không có cảm biến kỹ thuật số, không có lấy nét tự động. Mỗi khung hình, mỗi bản tin được đánh đổi bằng máu. Từng vết xước cơ học trên những cỗ máy phương Tây này chính là bằng chứng thép cho một mặt trận không tiếng súng.',
      captions: ['Mắt thép nhìn xuyên khói lửa.', 'Gõ nhịp tử sinh.'],
      feature: m('nqtk-005-009', 'Máy ảnh hai ống kính và máy ảnh xếp trên nền nhung đỏ', 'Mắt thép nhìn xuyên khói lửa.'),
      hotspots: [
        { x: 50, y: 42, label: 'Máy ảnh Hacoflex', body: 'Lớp sơn bong tróc trên vỏ máy ảnh hai ống kính — không cảm biến kỹ thuật số, không lấy nét tự động.' },
        { x: 78, y: 58, label: 'Máy ảnh xếp', body: 'Từng vết xước cơ học là bằng chứng thép cho một mặt trận không tiếng súng.' },
        { x: 13, y: 70, label: 'Ống kính rời', body: 'Mỗi khung hình được đánh đổi bằng máu.' },
      ] as Hotspot[],
      media: [
        m('nqtk-005-010', 'Bàn phòng tối với khay tráng ảnh, máy phóng và máy truyền ảnh', 'Gõ nhịp tử sinh.'),
        m('nqtk-006-011', 'Tạp chí cổ màu xanh lục'),
        m('nqtk-006-012', 'Phòng hội thảo của bảo tàng'),
        m('nqtk-006-013', 'Hành lang trưng bày dưới ánh đèn vàng'),
      ],
    },
    {
      n: 'Hồi III',
      title: 'Tọa độ toàn cầu',
      body: 'Vượt qua ranh giới của bom đạn, báo chí cách mạng bước lên bục kim cương của nền văn minh nhân loại. Không còn là sự áp đặt từ bên ngoài, chúng ta tự mình kể “Câu chuyện Việt Nam” bằng ngôn ngữ toàn cầu.',
      captions: ['Chân lý nảy mầm từ mảnh đạn.', 'Họng loa gầm, vĩ tuyến rẽ.', 'Chớp sáng đèn át bóng tối.', 'Trang giấy nở từ tro tàn.'],
      feature: m('nqtk-008-021', 'Chiếc loa đại trong không gian trưng bày tối', 'Họng loa gầm, vĩ tuyến rẽ.'),
      hotspots: [
        { x: 48, y: 30, label: 'Loa đại 500W', body: 'Độ nhám rỉ sét của chiếc loa đại — vũ khí tạc bằng âm thanh.' },
        { x: 52, y: 80, label: 'Tủ kính trưng bày', body: 'Di sản vật chất nằm lại trong tủ kính, nhưng dòng chảy truyền thông vẫn tiếp diễn.' },
      ] as Hotspot[],
      media: [
        m('nqtk-008-019', 'Bìa tạp chí INDOCHINE ố vàng', 'Chớp sáng đèn át bóng tối.'),
        m('nqtk-008-020', 'Máy ghi âm cổ phát sáng trong bóng tối'),
        m('nqtk-008-022', 'Chiếc tivi đời đầu dưới ánh xanh'),
        m('nqtk-007-015', 'Gian “Người cùng khổ” với tranh biếm họa'),
        m('nqtk-007-017', 'Báo Thanh Niên trong hộp đèn'),
        m('nqtk-007-018', 'Báo Thanh Niên trên giá đỡ'),
      ],
    },
  ],
  epilogue: {
    n: 'Vĩ thanh',
    title: 'Người quan sát',
    body: [
      'Di sản vật chất đã nằm lại trong tủ kính, nhưng dòng chảy của truyền thông vẫn tiếp diễn. Từ những cỗ máy rỉ sét đến lăng kính đa phương tiện hôm nay, sứ mệnh bảo vệ sự thật và lan tỏa quyền lực mềm giờ đây nằm trong tay những công dân số.',
      'Đối với em, nhiếp ảnh không đơn thuần là một niềm đam mê cá nhân, mà còn là lăng kính quan trọng để em định hình bản sắc và thể hiện nhân sinh quan của mình dưới tư cách là một sinh viên ngành Kinh tế Quốc tế.',
    ],
    captions: ['Vũ khí tạc bằng giấy và âm thanh.', 'Tiếng vọng từ ranh giới tử sinh.'],
    media: [
      m('nqtk-009-023', 'Sinh viên chăm chú trước bảng thông tin'),
      m('nqtk-009-024', 'Bàn trưng bày tròn giữa phòng'),
      m('nqtk-009-026', 'Hướng dẫn viên thuyết minh cho sinh viên'),
      m('nqtk-010-028', 'Bóng người lướt qua gian trưng bày'),
      m('nqtk-011-030', 'Sinh viên chụp ảnh hiện vật'),
      m('nqtk-011-031', 'Nhóm sinh viên đọc báo cổ'),
      m('nqtk-011-032', 'Sinh viên chụp ảnh tủ kính bằng điện thoại'),
      m('nqtk-012-033', 'Ảnh tập thể lớp tại bảo tàng'),
    ],
  },
  closing: {
    title: 'Xin cảm ơn!',
    lines: ['Khép lại Nhãn Quan Thế Kỷ.', 'Mở ra diễn ngôn của thời đại.'],
    body: 'Hành trình thị giác hóa lịch sử khép lại, nhưng hành trình sáng tạo chỉ vừa mới bắt đầu.',
  },
};
