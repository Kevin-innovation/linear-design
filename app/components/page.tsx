'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge, StatusIndicator, PriorityBadge } from '@/components/ui/Badge';
import { Carousel, CarouselItem, CarouselCard } from '@/components/ui/Carousel';
import { CardImage, ImageCard } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navbar';
import { Footer, SocialIcons } from '@/components/layout/Footer';
import { Hero, GradientHero, MinimalHero } from '@/components/layout/Hero';
import { ThemeToggle } from '@/components/ThemeProvider';

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  return (
    <main style={{
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: 'var(--linear-bg-primary)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--linear-border-subtle)',
        }}>
          <div>
            <Link href="/" style={{
              display: 'inline-block',
              marginBottom: '1rem',
              color: 'var(--linear-text-link)',
              fontSize: 'var(--linear-text-regular)',
            }}>
              ← 홈으로 돌아가기
            </Link>
            <h1 style={{
              fontSize: 'var(--linear-text-title4)',
              fontWeight: 'var(--linear-font-weight-semibold)',
              color: 'var(--linear-text-primary)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.022em',
            }}>
              컴포넌트 데모
            </h1>
            <p style={{
              fontSize: 'var(--linear-text-regular)',
              color: 'var(--linear-text-secondary)',
              lineHeight: '1.6',
            }}>
              Linear.app 디자인 시스템 기반의 재사용 가능한 컴포넌트들
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Components Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
        }}>
          
          {/* Button Components */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>Button 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '0.5rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Variants
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '0.5rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Sizes
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '0.5rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    States
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button 
                      onClick={handleLoadingDemo}
                      loading={buttonLoading}
                    >
                      Loading Demo
                    </Button>
                    <Button disabled>Disabled</Button>
                    <Button 
                      icon={<span>👍</span>} 
                      iconPosition="left"
                    >
                      With Icon
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Components */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>Input 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Input
                  label="기본 입력"
                  placeholder="텍스트를 입력하세요"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                
                <Input
                  label="아이콘이 있는 입력"
                  placeholder="검색어를 입력하세요"
                  leftIcon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  }
                />
                
                <Input
                  label="에러 상태"
                  placeholder="이메일을 입력하세요"
                  error="올바른 이메일 주소를 입력해주세요"
                />
                
                <Input
                  label="힌트가 있는 입력"
                  placeholder="비밀번호"
                  type="password"
                  hint="최소 8자 이상, 영문과 숫자를 포함해주세요"
                />
                
                <Textarea
                  label="텍스트 영역"
                  placeholder="내용을 입력하세요"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Badge Components */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>Badge 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '0.5rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Status Badges
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '0.5rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Sizes & Dots
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                    <Badge dot>With Dot</Badge>
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '0.5rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Status Indicators
                  </h4>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <StatusIndicator status="online" showLabel />
                    <StatusIndicator status="offline" showLabel />
                    <StatusIndicator status="busy" showLabel />
                    <StatusIndicator status="away" showLabel />
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '0.5rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Priority Badges
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <PriorityBadge priority="urgent" />
                    <PriorityBadge priority="high" />
                    <PriorityBadge priority="medium" />
                    <PriorityBadge priority="low" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Components */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>Card 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Card variant="default" padding="md">
                  <CardContent>
                    <strong>Default Card</strong> - 기본 카드 스타일
                  </CardContent>
                </Card>
                
                <Card variant="elevated" padding="md">
                  <CardContent>
                    <strong>Elevated Card</strong> - 그림자가 있는 카드
                  </CardContent>
                </Card>
                
                <Card variant="interactive" padding="md" hover onClick={() => alert('Card clicked!')}>
                  <CardContent>
                    <strong>Interactive Card</strong> - 클릭 가능한 카드
                  </CardContent>
                </Card>

                <Card variant="default" padding="md">
                  <CardHeader>
                    <CardTitle level={4}>완전한 카드 예제</CardTitle>
                  </CardHeader>
                  <CardContent>
                    이 카드는 헤더, 콘텐츠, 푸터를 모두 포함한 완전한 구조를 보여줍니다.
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="secondary">취소</Button>
                    <Button size="sm">확인</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Typography Examples */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h1 style={{
                    fontSize: 'var(--linear-text-title4)',
                    fontWeight: 'var(--linear-font-weight-semibold)',
                    color: 'var(--linear-text-primary)',
                    margin: 0,
                    letterSpacing: '-0.022em',
                  }}>
                    Title 4 (32px)
                  </h1>
                </div>
                <div>
                  <h2 style={{
                    fontSize: 'var(--linear-text-title3)',
                    fontWeight: 'var(--linear-font-weight-semibold)',
                    color: 'var(--linear-text-primary)',
                    margin: 0,
                    letterSpacing: '-0.012em',
                  }}>
                    Title 3 (24px)
                  </h2>
                </div>
                <div>
                  <h3 style={{
                    fontSize: 'var(--linear-text-title2)',
                    fontWeight: 'var(--linear-font-weight-semibold)',
                    color: 'var(--linear-text-primary)',
                    margin: 0,
                    letterSpacing: '-0.012em',
                  }}>
                    Title 2 (21px)
                  </h3>
                </div>
                <div>
                  <p style={{
                    fontSize: 'var(--linear-text-regular)',
                    color: 'var(--linear-text-primary)',
                    margin: 0,
                    lineHeight: '1.6',
                  }}>
                    Regular Text (15px) - 본문에 사용되는 기본 텍스트입니다.
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-text-secondary)',
                    margin: 0,
                    lineHeight: '1.5',
                  }}>
                    Small Text (13px) - 부가 정보나 설명에 사용됩니다.
                  </p>
                </div>
                <div>
                  <code style={{
                    fontFamily: 'var(--linear-font-mono)',
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-accent)',
                    backgroundColor: 'var(--linear-accent-subtle)',
                    padding: '2px 6px',
                    borderRadius: 'var(--linear-radius-sm)',
                  }}>
                    Code Text - 코드나 기술적 내용
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: 'var(--linear-accent)',
                    borderRadius: 'var(--linear-radius-md)',
                    marginBottom: '0.5rem',
                  }} />
                  <span style={{
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-text-secondary)',
                  }}>
                    Primary
                  </span>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: 'var(--linear-status-success)',
                    borderRadius: 'var(--linear-radius-md)',
                    marginBottom: '0.5rem',
                  }} />
                  <span style={{
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-text-secondary)',
                  }}>
                    Success
                  </span>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: 'var(--linear-status-warning)',
                    borderRadius: 'var(--linear-radius-md)',
                    marginBottom: '0.5rem',
                  }} />
                  <span style={{
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-text-secondary)',
                  }}>
                    Warning
                  </span>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: 'var(--linear-status-error)',
                    borderRadius: 'var(--linear-radius-md)',
                    marginBottom: '0.5rem',
                  }} />
                  <span style={{
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-text-secondary)',
                  }}>
                    Error
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: 'var(--linear-bg-elevated)',
                    border: '1px solid var(--linear-border-primary)',
                    borderRadius: 'var(--linear-radius-md)',
                    marginBottom: '0.5rem',
                  }} />
                  <span style={{
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-text-secondary)',
                  }}>
                    Surface
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: 'var(--linear-bg-secondary)',
                    borderRadius: 'var(--linear-radius-md)',
                    marginBottom: '0.5rem',
                  }} />
                  <span style={{
                    fontSize: 'var(--linear-text-small)',
                    color: 'var(--linear-text-secondary)',
                  }}>
                    Background
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carousel Component */}
          <Card variant="default" padding="lg" style={{ gridColumn: '1 / -1' }}>
            <CardHeader>
              <CardTitle level={3}>Carousel 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    기본 카루셀 (자동 재생)
                  </h4>
                  <Carousel
                    autoPlay
                    autoPlayInterval={3000}
                    items={[
                      {
                        id: '1',
                        content: (
                          <CarouselCard
                            title="Linear.app Design System"
                            description="실제 Linear.app에서 크롤링한 데이터를 기반으로 제작된 완전한 디자인 시스템입니다."
                            action={<Button size="sm">자세히 보기</Button>}
                          />
                        ),
                      },
                      {
                        id: '2',
                        content: (
                          <CarouselCard
                            title="다크 모드 우선"
                            description="Linear의 특징인 다크 모드 우선 접근법을 기반으로 한 완벽한 테마 시스템을 제공합니다."
                            action={<Button size="sm">테마 변경</Button>}
                          />
                        ),
                      },
                      {
                        id: '3',
                        content: (
                          <CarouselCard
                            title="TypeScript 지원"
                            description="완전한 타입 안전성과 개발자 경험을 위한 TypeScript 기반 컴포넌트를 제공합니다."
                            action={<Button size="sm">문서 보기</Button>}
                          />
                        ),
                      },
                    ]}
                  />
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    멀티 아이템 카루셀 (수동 조작)
                  </h4>
                  <Carousel
                    itemsPerView={2}
                    gap={24}
                    autoPlay={false}
                    items={[
                      {
                        id: '1',
                        content: (
                          <Card variant="elevated" padding="md">
                            <CardContent>
                              <strong>컴포넌트 1</strong><br />
                              재사용 가능한 UI 컴포넌트
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: '2',
                        content: (
                          <Card variant="elevated" padding="md">
                            <CardContent>
                              <strong>컴포넌트 2</strong><br />
                              일관된 디자인 시스템
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: '3',
                        content: (
                          <Card variant="elevated" padding="md">
                            <CardContent>
                              <strong>컴포넌트 3</strong><br />
                              TypeScript 타입 지원
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: '4',
                        content: (
                          <Card variant="elevated" padding="md">
                            <CardContent>
                              <strong>컴포넌트 4</strong><br />
                              접근성 준수 인터페이스
                            </CardContent>
                          </Card>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Card Component */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>이미지 카드 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    기본 이미지 카드
                  </h4>
                  <ImageCard
                    image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop"
                    imageAlt="Code on screen"
                    imageAspectRatio="video"
                    title="개발 환경 설정"
                    description="Linear 디자인 시스템을 사용하여 효率적인 개발 환경을 구축하는 방법을 알아보세요."
                    footer={
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Badge variant="info" size="sm">개발</Badge>
                        <Button size="sm" variant="secondary">읽기</Button>
                      </div>
                    }
                    variant="elevated"
                    hover
                  />
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    오버레이가 있는 이미지 카드
                  </h4>
                  <ImageCard
                    image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
                    imageAlt="Design workspace"
                    imageAspectRatio="tall"
                    imageOverlay={
                      <Button variant="primary" size="sm">
                        더 보기
                      </Button>
                    }
                    title="디자인 워크스페이스"
                    description="창의적인 디자인 작업을 위한 완벽한 환경을 만들어보세요."
                    variant="interactive"
                    onClick={() => alert('이미지 카드가 클릭되었습니다!')}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <h5 style={{ 
                      fontSize: 'var(--linear-text-small)', 
                      color: 'var(--linear-text-primary)', 
                      marginBottom: '0.5rem',
                      fontWeight: 'var(--linear-font-weight-medium)',
                    }}>
                      Square (1:1)
                    </h5>
                    <CardImage
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop"
                      alt="Square image"
                      aspectRatio="square"
                    />
                  </div>
                  <div>
                    <h5 style={{ 
                      fontSize: 'var(--linear-text-small)', 
                      color: 'var(--linear-text-primary)', 
                      marginBottom: '0.5rem',
                      fontWeight: 'var(--linear-font-weight-medium)',
                    }}>
                      Video (16:9)
                    </h5>
                    <CardImage
                      src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop"
                      alt="Video aspect ratio"
                      aspectRatio="video"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Layout Components */}
          <Card variant="default" padding="lg" style={{ gridColumn: '1 / -1' }}>
            <CardHeader>
              <CardTitle level={3}>레이아웃 컴포넌트</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Hero 컴포넌트
                  </h4>
                  <div style={{ border: '1px solid var(--linear-border-primary)', borderRadius: 'var(--linear-radius-xl)', overflow: 'hidden' }}>
                    <MinimalHero
                      title="Linear Design System"
                      subtitle="완전한 디자인 시스템"
                      description="Linear.app의 실제 크롤링 데이터를 기반으로 제작된 재사용 가능한 컴포넌트 라이브러리입니다."
                      actions={[
                        {
                          label: '시작하기',
                          variant: 'primary',
                          size: 'md',
                          onClick: () => alert('시작하기 버튼 클릭!'),
                        },
                        {
                          label: '문서 보기',
                          variant: 'secondary',
                          size: 'md',
                          onClick: () => alert('문서 보기 클릭!'),
                        },
                      ]}
                      compact
                    />
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Navbar 컴포넌트
                  </h4>
                  <div style={{ border: '1px solid var(--linear-border-primary)', borderRadius: 'var(--linear-radius-xl)', overflow: 'hidden' }}>
                    <Navbar
                      brand={{ name: 'Linear Design', href: '/' }}
                      items={[
                        { label: '홈', href: '/', active: false },
                        { label: '컴포넌트', href: '/components', active: true },
                        { label: '문서', href: '/docs', active: false },
                        { label: 'GitHub', href: 'https://github.com', external: true },
                      ]}
                      actions={<Button size="sm">로그인</Button>}
                      sticky={false}
                      compact
                    />
                  </div>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--linear-text-regular)', 
                    color: 'var(--linear-text-primary)', 
                    marginBottom: '1rem',
                    fontWeight: 'var(--linear-font-weight-medium)',
                  }}>
                    Footer 컴포넌트
                  </h4>
                  <div style={{ border: '1px solid var(--linear-border-primary)', borderRadius: 'var(--linear-radius-xl)', overflow: 'hidden' }}>
                    <Footer
                      brand={{
                        name: 'Linear Design',
                        href: '/',
                        description: 'Linear.app 기반의 완전한 디자인 시스템',
                      }}
                      sections={[
                        {
                          title: '제품',
                          links: [
                            { label: '컴포넌트', href: '/components' },
                            { label: '테마', href: '/themes' },
                            { label: '아이콘', href: '/icons' },
                          ],
                        },
                        {
                          title: '리소스',
                          links: [
                            { label: '문서', href: '/docs' },
                            { label: '예제', href: '/examples' },
                            { label: '블로그', href: '/blog' },
                          ],
                        },
                        {
                          title: '커뮤니티',
                          links: [
                            { label: 'GitHub', href: 'https://github.com', external: true },
                            { label: 'Discord', href: 'https://discord.com', external: true },
                            { label: '피드백', href: '/feedback' },
                          ],
                        },
                      ]}
                      socialLinks={[
                        { name: 'GitHub', href: 'https://github.com', icon: SocialIcons.GitHub },
                        { name: 'Twitter', href: 'https://twitter.com', icon: SocialIcons.Twitter },
                        { name: 'Figma', href: 'https://figma.com', icon: SocialIcons.Figma },
                      ]}
                      compact
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}