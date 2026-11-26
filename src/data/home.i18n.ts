/**
 * Home-page copy in VI / EN / KO. Rendered with <L t={…} /> so every block follows
 * the interface language. Keep the three languages in step when editing.
 */
export type Loc = { vi: string; en: string; ko: string };

export const city: Loc = { vi: 'Hà Nội, Việt Nam', en: 'Hanoi, Vietnam', ko: '베트남 하노이' };

export const lensesI18n = [
  {
    index: '(A)',
    label: { vi: 'Lăng kính A', en: 'Lens A', ko: '렌즈 A' } as Loc,
    title: { vi: 'Kinh tế Quốc tế', en: 'International Economics', ko: '국제경제학' } as Loc,
    sub: { vi: 'International Economics', en: 'Kinh tế Quốc tế', ko: 'International Economics' } as Loc,
    meta: 'DAV · KTQT52C1 · 2025 - 2029',
    body: [
      {
        vi: 'Cử nhân ngành Kinh tế Quốc tế tại Học viện Ngoại giao (2025–2029), tập trung vào kinh tế học, kinh doanh quốc tế và hệ thống thị trường - rèn luyện tư duy phân tích và ra quyết định qua phương pháp học tình huống.',
        en: 'Bachelor of International Economics at the Diplomatic Academy of Vietnam (2025–2029), focused on economics, international business and market systems - sharpening analysis and decision-making through case-study learning.',
        ko: '베트남 외교아카데미 국제경제학 학사 과정(2025–2029). 경제학, 국제경영, 시장 시스템을 중심으로 사례 연구 방식을 통해 분석력과 의사결정 역량을 키우고 있습니다.',
      },
      {
        vi: 'Phát triển bền vững không chỉ được đo bằng chính sách, dữ liệu hay chỉ số kinh tế, mà còn bằng những trải nghiệm sống, cảm xúc con người và những tiếng nói thường không được lắng nghe.',
        en: 'Sustainable development is not only measured through policies, data or economic indicators, but also through lived experiences, human emotions, and the voices that often go unheard.',
        ko: '지속가능한 발전은 정책, 데이터, 경제 지표만으로 측정되지 않습니다. 삶의 경험과 인간의 감정, 그리고 자주 외면받는 목소리로도 측정됩니다.',
      },
    ] as Loc[],
  },
  {
    index: '(B)',
    label: { vi: 'Lăng kính B', en: 'Lens B', ko: '렌즈 B' } as Loc,
    title: { vi: 'Truyền thông Quốc tế', en: 'International Communications', ko: '국제커뮤니케이션' } as Loc,
    sub: {
      vi: 'Chuyên sâu Truyền thông Marketing Quốc tế',
      en: 'Specialising in International Marketing Communications',
      ko: '국제 마케팅 커뮤니케이션 전공',
    } as Loc,
    meta: 'DAV · Double degree',
    body: [
      {
        vi: 'Văn bằng thứ hai ngành Truyền thông Quốc tế tại Học viện Ngoại giao, chuyên sâu Truyền thông Marketing Quốc tế - kể chuyện thương hiệu, truyền thông marketing tích hợp (IMC) và chiến lược hình ảnh sáng tạo.',
        en: 'A second bachelor’s degree in International Communications at the Diplomatic Academy of Vietnam, specialising in International Marketing Communications - brand storytelling, integrated marketing communications (IMC) and creative visual strategy.',
        ko: '베트남 외교아카데미 국제커뮤니케이션 복수학위 과정으로, 국제 마케팅 커뮤니케이션을 전공합니다. 브랜드 스토리텔링, 통합 마케팅 커뮤니케이션(IMC), 크리에이티브 비주얼 전략을 다룹니다.',
      },
      {
        vi: 'Tại đây, nhiếp ảnh trở thành một công cụ chiến lược: biến dữ liệu và thông điệp thương hiệu thành những câu chuyện thị giác mà công chúng toàn cầu có thể cảm nhận.',
        en: 'Here photography becomes a strategic tool: turning brand messages and insight into visual stories that global audiences can feel.',
        ko: '여기서 사진은 전략적 도구가 됩니다. 브랜드 메시지와 인사이트를 전 세계 관객이 느낄 수 있는 시각적 이야기로 바꿉니다.',
      },
    ] as Loc[],
  },
];

export const aboutI18n: Loc[] = [
  {
    vi: 'Mình lớn lên trong một gia đình gắn bó sâu sắc với nhiếp ảnh. Ông mình là một phóng viên ảnh, và chính nhờ ông mà mình biết trân trọng nhiếp ảnh đường phố cùng sức mạnh của việc ghi lại đời thực.',
    en: 'I grew up in a family with a deep connection to photography. My grandfather was a photojournalist, and it was through him that I first learned to appreciate street photography and the power of capturing real life.',
    ko: '저는 사진과 깊은 인연이 있는 가정에서 자랐습니다. 할아버지는 사진기자셨고, 할아버지를 통해 처음으로 거리 사진의 가치와 실제 삶을 담아내는 힘을 알게 되었습니다.',
  },
  {
    vi: 'Lớn hơn, mình mê K-drama, MV ca nhạc và ngôn ngữ hình ảnh của các thương hiệu công nghệ. Điều đó dẫn mình đến một câu hỏi: liệu sự chân thực thô mộc của nhiếp ảnh đường phố có thể hòa quyện với sự sáng tạo, cảm xúc mãnh liệt và nhịp độ của truyền thông hiện đại?',
    en: 'As I grew older, I became fascinated by K-dramas, music videos and the visual language of technology brands. That led me to a question: could the raw authenticity of street photography merge with the creativity, emotional intensity and pace of modern media?',
    ko: '자라면서 K-드라마, 뮤직비디오, 그리고 테크 브랜드의 시각 언어에 매료되었습니다. 그러다 질문이 생겼습니다. 거리 사진의 날것 그대로의 진정성이 현대 미디어의 창의성, 감정의 강도, 속도와 만날 수 있을까?',
  },
  {
    vi: 'Mình tin rằng giao điểm của hai thế giới ấy là nơi những câu chuyện thị giác ý nghĩa ra đời - không chỉ ghi lại khoảnh khắc, mà còn truyền tải cảm xúc, góc nhìn và tư duy đang đổi thay của người trẻ hôm nay.',
    en: 'I believe the intersection of these two worlds is where meaningful visual stories emerge - stories that do not merely capture moments, but convey emotions, perspectives and the evolving mindset of today’s youth.',
    ko: '저는 이 두 세계가 만나는 지점에서 의미 있는 시각적 이야기가 탄생한다고 믿습니다. 순간을 담는 데 그치지 않고, 감정과 시선, 그리고 변화하는 오늘날 청년들의 생각을 전하는 이야기입니다.',
  },
];

export const visionI18n: Loc = {
  vi: 'Nhiếp ảnh và quay phim không chỉ là ghi lại khoảnh khắc - đó là một ngôn ngữ kể chuyện, nơi cảm xúc, ký ức và bản sắc đan vào nhau trong từng khung hình. Trong tác phẩm của mình, mình nhấn mạnh sự tương phản và đối lập để làm hiện lên nhiều chiều kích của chính mình và thế giới quanh mình.',
  en: 'Photography and videography are more than capturing moments - they are a storytelling language where emotions, memories and identities intertwine in every frame. In my work, I emphasize contrasts and oppositions to reveal the multidimensional nature of both myself and the world around me.',
  ko: '사진과 영상은 순간을 담는 것 이상입니다. 감정과 기억, 정체성이 매 프레임마다 얽히는 이야기의 언어입니다. 저는 작업에서 대비와 대립을 강조해 저 자신과 주변 세계의 다층적인 모습을 드러냅니다.',
};

export const philosophyI18n: Loc[] = [
  { vi: 'Bắt đầu bằng đam mê và cam kết bằng niềm tin trọn vẹn.', en: 'Begin with passion and commit with full belief.', ko: '열정으로 시작하고, 온전한 믿음으로 끝까지 해낸다.' },
  { vi: 'Sáng tạo bằng sự chính trực - không bao giờ bóp méo hay bôi nhọ sự thật.', en: 'Create with integrity - never distort or defame the truth.', ko: '정직하게 창작한다. 진실을 왜곡하거나 훼손하지 않는다.' },
  { vi: 'Ưu tiên chất lượng hơn số lượng; đừng nhận quá sức mình.', en: 'Prioritize quality over quantity; don’t take on more than you can handle.', ko: '양보다 질을 우선한다. 감당할 수 있는 만큼만 맡는다.' },
  { vi: 'Tin tưởng cộng sự và cùng nhau hướng tới thành công.', en: 'Trust your partners and collaborate toward success.', ko: '파트너를 신뢰하고 함께 성공을 향해 협업한다.' },
  { vi: 'Tôn trọng tính nguyên bản - không đạo nhái hay nhận vơ tác phẩm của người khác.', en: 'Respect originality - never plagiarize or claim work that isn’t yours.', ko: '독창성을 존중한다. 표절하거나 남의 작업을 내 것이라 하지 않는다.' },
];

export const milestonesI18n: { year: string; text: Loc }[] = [
  {
    year: '2022',
    text: {
      vi: 'THPT Chuyên Ngoại ngữ - chuyên tiếng Hàn; bắt đầu hành trình qua hàng chục dự án & CLB.',
      en: 'Foreign Language Specialized School - Korean major; the start of dozens of projects and clubs.',
      ko: '외국어 전문 고등학교 한국어과 입학. 수십 개의 프로젝트와 동아리 활동을 시작했습니다.',
    },
  },
  {
    year: '2023',
    text: {
      vi: 'TOPIK II · Cấp 4. Phụ trách truyền thông & thiết kế cho các CLB trong trường.',
      en: 'TOPIK II · Level 4. Media and design roles across school clubs.',
      ko: 'TOPIK II 4급 취득. 교내 동아리에서 미디어·디자인을 담당했습니다.',
    },
  },
  {
    year: '2024',
    text: {
      vi: 'IELTS 8.5. luminescent. - album ảnh đôi cho sinh nhật tuổi 17.',
      en: 'IELTS 8.5. luminescent. - the double album, for my 17th birthday.',
      ko: 'IELTS 8.5. 17번째 생일을 위한 더블 앨범 〈luminescent.〉',
    },
  },
  {
    year: '2025',
    text: {
      vi: 'Thực tập tại Jan21st Studio; The Closet. Tốt nghiệp với GPA 9.4 → Học viện Ngoại giao.',
      en: 'Jan21st Studio internship; The Closet. Graduated with GPA 9.4 → Diplomatic Academy of Vietnam.',
      ko: 'Jan21st Studio 인턴십, 〈The Closet〉. GPA 9.4로 졸업 후 베트남 외교아카데미 입학.',
    },
  },
  {
    year: '2026',
    text: {
      vi: 'Cộng tác viên truyền thông SSEAYP 49; Nhãn Quan Thế Kỷ; Sinh viên 5 Tốt cấp Học viện.',
      en: 'SSEAYP 49th media collaborator; Nhãn Quan Thế Kỷ; “Five-Merit Student” at academy level.',
      ko: 'SSEAYP 49기 미디어 협력자, 〈Nhãn Quan Thế Kỷ〉, 아카데미 ‘5대 우수 학생’ 선정.',
    },
  },
];

/** Showcase/featured metadata terms that come from content (semesters, groups, courses). */
export const termsI18n: Record<string, Omit<Loc, 'vi'>> = {
  'Kì 1': { en: 'Semester 1', ko: '1학기' },
  'Kì 2': { en: 'Semester 2', ko: '2학기' },
  'Hè': { en: 'Summer', ko: '여름학기' },
  'Nhiếp ảnh': { en: 'Photography', ko: '사진' },
  'Truyền thông': { en: 'Communications', ko: '미디어·홍보' },
  'Quốc tế': { en: 'International', ko: '국제교류' },
  'Lãnh đạo': { en: 'Leadership', ko: '리더십' },
  'Học thuật': { en: 'Academic', ko: '학술' },
  'Cộng đồng': { en: 'Community', ko: '공익·봉사' },
  'Chứng chỉ': { en: 'Certifications', ko: '자격·어학' },
  'HVNG & Các Khoa': { en: 'DAV & Faculties', ko: '외교아카데미·학부' },
  'Triển lãm & Nghệ thuật': { en: 'Exhibitions & Art', ko: '전시·예술' },
  'Cấp 3 & Cộng đồng': { en: 'High School & Community', ko: '고등학교·커뮤니티' },
  'Street & Travel': { en: 'Street & Travel', ko: '거리·여행' },
  'Đại cương truyền thông quốc tế': { en: 'Intro to International Communication', ko: '국제커뮤니케이션 개론' },
  'Học viện Ngoại giao': { en: 'Diplomatic Academy of Vietnam', ko: '베트남 외교아카데미' },
  'Đoàn Thanh niên Học viện Ngoại giao': { en: 'DAV Youth Union', ko: '외교아카데미 청년연맹' },
  'Bảo tàng Báo chí Việt Nam': { en: 'Vietnam Press Museum', ko: '베트남 언론박물관' },
  'Lớp 12': { en: 'Grade 12', ko: '12학년' },
};

export const credentialLabels: Record<string, Loc> = {
  IELTS: { vi: 'IELTS', en: 'IELTS', ko: 'IELTS' },
  'TOPIK II': { vi: 'TOPIK II', en: 'TOPIK II', ko: 'TOPIK II' },
  'GPA · THPT Chuyên Ngoại ngữ': { vi: 'GPA · THPT Chuyên Ngoại ngữ', en: 'GPA · Foreign Language Specialized School', ko: 'GPA · 외국어 전문 고등학교' },
  'Clubs & projects led or joined': { vi: 'Dự án & CLB đã dẫn dắt / tham gia', en: 'Clubs & projects led or joined', ko: '이끌거나 참여한 동아리·프로젝트' },
};

export const interestsI18n: Loc[] = [
  { vi: 'Thương hiệu tiêu dùng toàn cầu', en: 'Global Consumer Brands', ko: '글로벌 소비자 브랜드' },
  { vi: 'Văn hóa giới trẻ', en: 'Youth Culture', ko: '청년 문화' },
  { vi: 'Truyền thông thị giác', en: 'Visual Communication', ko: '시각 커뮤니케이션' },
  { vi: 'Chiến lược kinh doanh sáng tạo', en: 'Creative Business Strategy', ko: '크리에이티브 비즈니스 전략' },
];
