import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ThemeProvider';

export default function Home() {
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
            <h1 style={{
              fontSize: 'var(--linear-text-title4)',
              fontWeight: 'var(--linear-font-weight-semibold)',
              color: 'var(--linear-text-primary)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.022em',
            }}>
              Linear Design System
            </h1>
            <p style={{
              fontSize: 'var(--linear-text-regular)',
              color: 'var(--linear-text-secondary)',
              lineHeight: '1.6',
            }}>
              Complete component library based on Linear.app's actual design system
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <section style={{
          marginBottom: '4rem',
          textAlign: 'center' as const,
        }}>
          <Card variant="elevated" padding="lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <CardHeader>
              <CardTitle level={2}>
                컴포넌트 데모
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ marginBottom: '2rem' }}>
                Linear.app의 실제 크롤링 데이터와 공식 디자인 시스템을 결합한 완전한 테마를 기반으로 
                제작된 재사용 가능한 컴포넌트들을 확인해보세요.
              </p>
              <Link href="/components">
                <Button size="lg" style={{ width: '100%' }}>
                  컴포넌트 둘러보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>
                🎨 Linear.app 기반 테마
              </CardTitle>
            </CardHeader>
            <CardContent>
              실제 Linear.app에서 크롤링한 데이터를 기반으로 제작된 정확한 컬러 시스템과 타이포그래피를 제공합니다.
            </CardContent>
          </Card>

          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>
                🌓 다크/라이트 테마 지원
              </CardTitle>
            </CardHeader>
            <CardContent>
              Linear의 특징인 다크 모드 우선 접근법을 기반으로 한 완벽한 테마 시스템을 제공합니다.
            </CardContent>
          </Card>

          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>
                🧩 재사용 가능한 컴포넌트
              </CardTitle>
            </CardHeader>
            <CardContent>
              프로젝트 전반에서 일관된 디자인을 유지할 수 있도록 중앙화되고 일반화된 컴포넌트를 제공합니다.
            </CardContent>
          </Card>

          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>
                ⚡ TypeScript 지원
              </CardTitle>
            </CardHeader>
            <CardContent>
              완전한 타입 안전성과 개발자 경험을 위한 TypeScript 기반 컴포넌트를 제공합니다.
            </CardContent>
          </Card>

          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>
                🎯 접근성 준수
              </CardTitle>
            </CardHeader>
            <CardContent>
              WCAG AA 기준을 준수하는 높은 대비율과 키보드 내비게이션을 지원합니다.
            </CardContent>
          </Card>

          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle level={3}>
                🚀 성능 최적화
              </CardTitle>
            </CardHeader>
            <CardContent>
              부드러운 마이크로 인터랙션과 최적화된 애니메이션으로 뛰어난 사용자 경험을 제공합니다.
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}