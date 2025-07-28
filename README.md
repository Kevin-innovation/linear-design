# Linear Design System

완전한 Linear.app 기반 디자인 시스템과 컴포넌트 라이브러리

## 🎨 개요

Linear.app의 실제 크롤링 데이터와 공식 디자인 시스템을 결합하여 제작된 완전한 테마와 재사용 가능한 React 컴포넌트들을 제공합니다.

## ✨ 주요 특징

- 🌙 **다크 모드 우선** - Linear의 특징인 다크 모드 우선 접근법
- 🎯 **실제 데이터 기반** - Linear.app에서 크롤링한 실제 디자인 토큰 사용
- 🧩 **재사용 가능한 컴포넌트** - 프로젝트 전반에서 일관된 디자인 유지
- ⚡ **TypeScript 지원** - 완전한 타입 안전성과 개발자 경험
- ♿ **접근성 준수** - WCAG AA 기준을 준수하는 높은 대비율
- 📱 **반응형 디자인** - 모든 디바이스에서 완벽한 사용자 경험

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인하세요.

## 📦 컴포넌트

### UI 컴포넌트

- **Button** - 3가지 variant (primary, secondary, ghost), 로딩 상태 지원
- **Card** - 기본/elevated/interactive 버전, 이미지 지원
- **Input/Textarea** - 라벨, 에러, 힌트, 아이콘 지원
- **Badge** - 상태 배지, 우선순위 배지, 상태 표시기
- **Carousel** - 자동 재생, 내비게이션, 인디케이터, 멀티아이템 지원

### 레이아웃 컴포넌트

- **Navbar** - 반응형 디자인, 모바일 메뉴, sticky 헤더
- **Footer** - 링크 섹션, 소셜 아이콘, 반응형 레이아웃
- **Hero** - CTA 버튼, 그라데이션, 이미지 배경 지원

## 🎨 디자인 토큰

### 컬러 시스템
- Primary: `#5e6ad2` (Linear의 실제 브랜드 컬러)
- LCH + RGB 하이브리드 컬러 시스템
- 다크/라이트 테마 완벽 지원

### 타이포그래피
- Inter Variable 폰트 시스템
- 9단계 타이틀 크기 (title1 ~ title9)
- 최적화된 line-height와 letter-spacing

### 간격 시스템
- 4px 기반 간격 시스템 (space-1: 4px ~ space-64: 256px)
- 일관된 여백과 패딩 사용

## 📱 페이지

- `/` - 홈페이지 (소개 및 기능 설명)
- `/components` - 완전한 컴포넌트 데모 페이지

## 🛠️ 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안전성
- **CSS Variables** - Linear 디자인 토큰
- **Responsive Design** - 모바일 우선 접근법

## 📋 개발 가이드

프로젝트의 `.cursorrules` 파일을 참조하여 일관된 컴포넌트 사용법을 확인하세요.

### 컴포넌트 사용 예시

```tsx
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

function Example() {
  return (
    <Card variant="elevated" padding="md">
      <CardHeader>
        <CardTitle level={3}>카드 제목</CardTitle>
      </CardHeader>
      <CardContent>
        <p>카드 내용</p>
        <Button variant="primary" size="md">
          액션 버튼
        </Button>
      </CardContent>
    </Card>
  );
}
```

## 🎯 디자인 철학

Linear의 디자인 철학을 따릅니다:

- **다크 모드 우선** 접근법
- **제품 개발을 위한 목적 지향적** 디자인
- **속도와 장인정신**의 균형
- **대담하면서도 읽기 쉬운** 타이포그래피
- **미묘한 글래스모피즘** 효과
- **높은 대비의 접근성**
- **최소한이지만 기능적인** UI

## 📄 라이선스

MIT License

## 🤝 기여

이슈 및 풀 리퀘스트를 환영합니다!