// =============================================================
// 작은정원 — 콘텐츠 컬렉션 스키마
// Decap CMS 가 이 스키마에 맞춰 마크다운 파일을 만들고 갱신합니다.
// =============================================================
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 가드너 H의 편지 — 비정기 연재
const letters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/letters' }),
  schema: z.object({
    no: z.number(),
    date: z.coerce.date(),
    title: z.string(),
    photo: z.string().optional(),           // /uploads/xxx.jpg 또는 /bicycle.jpg
    photoAlt: z.string().optional(),
    signoff: z.string().default('Gardener H'),
  }),
});

// 소설 [걷는 듯 편안하게] — 약 30회 연재
const novel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/novel' }),
  schema: z.object({
    no: z.number(),           // 정렬용 일련번호 (1, 2, 3, ...)
    episode: z.string(),      // 표시용 (예: "1회")
    date: z.coerce.date(),
    parts: z.string(),        // (예: "Part 1—4")
    preview: z.string(),      // 펼치기 전 미리보기 (마크다운)
  }),
});

// 도서 (Catalogue)
const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    order: z.number(),         // 표시 순서 (작을수록 상단)
    title: z.string(),
    author: z.string(),
    authorRole: z.string().default('글'),  // "글", "사진·글" 등
    genre: z.string(),
    publishDate: z.coerce.date(),
    isbn: z.string(),
    price: z.number(),                      // 원 단위
    kyoboId: z.string(),                    // 교보 상품 ID (예: S000219084109)
    coverIsbn: z.string(),                  // 표지 이미지 ISBN (대부분 isbn 과 동일)
    tag: z.string().optional(),             // 추가 태그
    isNew: z.boolean().default(false),
    description: z.string(),                // 책 소개
  }),
});

// 저자
const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    role: z.string(),
    works: z.array(z.string()),
  }),
});

// 사이트 전역 설정 (히어로 사진 / 캡션)
const settings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/settings' }),
  schema: z.object({
    heroPhoto: z.string(),
    heroPhotoAlt: z.string(),
    heroPhotoCaption: z.string(),
    heroPhotoDate: z.string(),
  }),
});

export const collections = { letters, novel, books, authors, settings };
