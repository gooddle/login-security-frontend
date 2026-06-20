# Login Security Frontend

Next.js 기반 로그인 보안 프론트엔드. FastAPI GraphQL 백엔드와 연동.

## 스택
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- graphql-request (GraphQL 클라이언트)
- Vitest + React Testing Library (단위 테스트)
- Playwright (E2E 테스트)
- Husky + lint-staged (pre-commit hook)

## 백엔드 연동
- GraphQL 엔드포인트: `NEXT_PUBLIC_GRAPHQL_URL`
- Mutation: `signup`, `login`

## 테스트 실행
```bash
npm test          # Vitest 단위 테스트
npm run test:e2e  # Playwright E2E 테스트
```

## TDD 규칙
- 기능 추가 전 반드시 실패하는 테스트 먼저 작성 (RED)
- 최소한의 코드로 테스트 통과 (GREEN)
- 리팩토링 (REFACTOR)
- 테스트 없는 코드는 머지 금지

## 문서화 규칙
- 기능 추가/변경 시 `docs/YYYY-MM-DD.md` 파일에 항상 기록
- 파일이 없으면 오늘 날짜로 새로 생성

## 환경변수 (.env.local)
- `NEXT_PUBLIC_GRAPHQL_URL` - GraphQL 백엔드 URL
