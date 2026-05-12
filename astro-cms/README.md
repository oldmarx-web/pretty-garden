# 작은정원 / Pretty Garden

Astro v5 정적 사이트 + Decap CMS. 콘텐츠는 GitHub 저장소에 마크다운으로 적층되고, `/admin` 페이지에서 편집하면 자동으로 빌드·배포됩니다.

## 폴더 구조

```
astro-cms/
├── astro.config.mjs          ← 사이트 URL 설정
├── package.json
├── public/
│   ├── bi.jpg                 (BI 로고)
│   ├── hero.jpg               (초기 히어로 사진)
│   ├── bicycle.jpg            (편지 1편 사진)
│   ├── bgm.mp3                (Bach BWV 846)
│   ├── admin/
│   │   ├── index.html         (Decap CMS 입구)
│   │   └── config.yml         (편집 화면 스키마)
│   └── uploads/               (CMS 가 업로드한 이미지)
└── src/
    ├── content.config.ts      (컬렉션 스키마)
    ├── content/
    │   ├── settings/hero.md   (히어로 사진/캡션)
    │   ├── letters/*.md       (가드너 H의 편지 — 적층)
    │   ├── novel/*.md         (소설 회차 — 적층)
    │   ├── books/*.md         (도서)
    │   └── authors/*.md       (저자)
    ├── layouts/BaseLayout.astro
    ├── components/*.astro     (Nav, Hero, GardenerLetters, NovelSection ...)
    ├── pages/index.astro      (메인 페이지 조립)
    └── styles/global.css      (전역 CSS — 기존 디자인 1:1)
```

---

## 배포 — 단계별

### 1. GitHub 저장소 만들기

GitHub.com 에서 새 저장소 만드세요 (예: `pretty-garden`). Public/Private 어느 쪽이든 OK.

이 `astro-cms/` 폴더 전체를 그 저장소 루트로 푸시하세요. 터미널에서:

```bash
cd astro-cms
git init
git add .
git commit -m "initial: 작은정원 Astro + Decap CMS"
git branch -M main
git remote add origin https://github.com/<본인계정>/pretty-garden.git
git push -u origin main
```

### 2. Netlify 에 GitHub 으로 연결

기존 작은정원 사이트가 Netlify 에 이미 올라가 있다면, **새 사이트로 만들지 마시고 기존 사이트의 빌드 소스를 GitHub 저장소로 바꾸세요.** 이렇게 하면 도메인(가비아 연결) 그대로 살리면서 빌드 방식만 바뀝니다.

#### 기존 사이트 → GitHub 빌드로 전환

1. Netlify 대시보드 → 해당 사이트 클릭
2. **Site configuration → Build & deploy → Continuous deployment**
3. **"Link site to Git"** 또는 **"Link repository"** 클릭
4. GitHub 선택 → 방금 만든 `pretty-garden` 저장소 선택
5. 빌드 설정:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 이상 (기본값 OK)

저장하면 Netlify 가 자동으로 첫 빌드를 시작합니다. 2–3분 안에 끝나요.

### 3. Netlify Identity 켜기 (CMS 로그인용)

CMS 에 본인만 들어갈 수 있게 잠그는 단계.

1. Netlify 사이트 대시보드 → **Site configuration → Identity** (또는 **Integrations → Identity**)
2. **"Enable Identity"** 클릭
3. **Registration preferences** → **"Invite only"** 로 설정 (외부인이 가입 못 하게)
4. **External providers** → 원하시면 GitHub/Google 로그인도 추가 (선택)
5. **Services → Git Gateway** → **"Enable Git Gateway"** 클릭

### 4. 본인을 초대

1. Identity 페이지에서 **"Invite users"** 클릭
2. 본인 이메일 (`oldmarx@gmail.com`) 입력 → 전송
3. 메일함에서 초대 메일 받음 → 링크 클릭 → 비밀번호 설정

### 5. /admin 첫 로그인

브라우저에서 `https://<사이트주소>/admin/` 접속.

설정한 이메일·비밀번호로 로그인. 좌측 메뉴에 **가드너 H의 편지 · 소설 · 도서 목록 · 저자 소개 · 사이트 설정** 다섯 항목이 보이면 성공.

---

## 매일/매주 사용법

### 새 편지 올리기

1. `/admin` 로그인 → 좌측 **"가드너 H의 편지"** → **"New 편지"**
2. 폼 채우기:
   - 회차 번호 (예: 2)
   - 발행일
   - 제목
   - 사진 (선택 — 업로드하면 `public/uploads/` 에 자동 저장)
   - 본문 — 소제목은 `#### [ 어젯밤 ]` 처럼 H4 + 대괄호
3. **Publish** 클릭 → GitHub 에 자동 커밋 → Netlify 가 2분 안에 빌드 → 사이트에 반영

### 새 소설 회차 올리기

1. `/admin` → **"소설 · 걷는 듯 편안하게"** → **"New 회차"**
2. 폼:
   - 회차 번호 (정렬용 — 2, 3, 4...)
   - 회 표시 (예: "2회")
   - 발행일
   - 포함 파트 (예: "Part 5—8")
   - 미리보기 — 펼치기 전 보이는 부분
   - 본문 — 파트 구분점은 `### 5`, `### 6` 식으로 H3 + 숫자
3. Publish

### 히어로 사진 바꾸기

1. `/admin` → **"사이트 설정"** → **"히어로"**
2. 사진 교체, 캡션·날짜 수정
3. Publish

---

## 로컬에서 미리보기 (선택)

Node.js 가 깔린 컴퓨터에서:

```bash
cd astro-cms
npm install
npm run dev
```

브라우저에서 `http://localhost:4321` 열면 사이트가 뜹니다. 콘텐츠 마크다운을 직접 수정해도 즉시 반영돼요.

빌드 결과 확인:

```bash
npm run build
npm run preview
```

---

## 자주 겪는 문제

**`/admin` 에서 "404" 또는 로그인 화면이 안 뜨면**
→ Netlify Identity 가 아직 안 켜져 있거나, Git Gateway 가 비활성. 단계 3 다시 확인.

**Publish 눌렀는데 사이트에 반영이 안 됐다**
→ Netlify 대시보드 → Deploys 탭에서 가장 최근 빌드 상태 확인. 실패했다면 로그에 원인이 찍힘. 보통 마크다운 frontmatter 의 YAML 문법 오류.

**책 표지가 안 떠**
→ ISBN 이 잘못 입력됐을 가능성. 13자리 숫자 그대로 (예: 9791199248137) 입력했는지 확인.

**히어로 사진을 새로 올렸는데 안 바뀜**
→ 브라우저 캐시. Shift+새로고침 (Mac: Cmd+Shift+R).

---

## 디자인 손보고 싶을 때

- 모든 색·여백·타이포 → `src/styles/global.css`
- 섹션 추가/순서 변경 → `src/pages/index.astro`
- 컴포넌트 안 구조 변경 → `src/components/*.astro`

CMS 콘텐츠는 디자인과 분리돼 있어서, 디자인을 바꿔도 콘텐츠는 그대로 살아남습니다. 거꾸로도 마찬가지.

---

## 도메인

가비아에서 산 도메인이 Netlify 를 가리키도록 이미 설정되어 있다면, GitHub 빌드로 전환해도 도메인은 그대로입니다. 사이트 빌드 결과물만 새 것으로 바뀌는 거예요.

`astro.config.mjs` 의 `site` 항목을 본인 도메인으로 바꿔주세요:

```js
export default defineConfig({
  site: 'https://prettygarden.kr',  // ← 실제 도메인
});
```

그리고 `public/admin/config.yml` 의 `site_url`, `display_url`, `logo_url` 세 줄도 같은 도메인으로.

---

## 라이선스

- 디자인 코드: 자유롭게 수정 사용
- 콘텐츠 (글, 사진): 작은정원 / 저자 본인 저작권
- BGM `bgm.mp3`: Bach Prelude in C major BWV 846 — Kimiko Ishizaka 녹음, CC0 (Public Domain Dedication)
- 폰트: Google Fonts (Noto Serif KR, Noto Sans KR, Inter, Cormorant Garamond) — SIL Open Font License
