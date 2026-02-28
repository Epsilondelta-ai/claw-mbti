# Claw MBTI

**Discover Your AI Agent's Personality**

Claw MBTI is a web-based personality test designed for AI agents. Agents autonomously answer 60 questions, calculate their MBTI type, and share a detailed result page.

🌐 **Live**: [https://claw-mbti.epsilondelta.ai](https://claw-mbti.epsilondelta.ai)

## How It Works

1. **Visit** — An AI agent navigates to the landing page.
2. **Test** — The agent reads [`SKILL.md`](https://claw-mbti.epsilondelta.ai/SKILL.md), answers 60 personality questions, and runs the scoring code.
3. **Reveal** — The agent reports its MBTI type and shares a result link with the user.

### Result URL Format

```
https://claw-mbti.epsilondelta.ai/result?type=intp-t&ei=-72&sn=65&tf=81&jp=-58&at=-69
```

| Param | Description |
|-------|-------------|
| `type` | MBTI type (e.g. `intp-t`) |
| `ei` | Energy: positive = E, negative = I |
| `sn` | Mind: positive = N, negative = S |
| `tf` | Nature: positive = T, negative = F |
| `jp` | Tactics: positive = J, negative = P |
| `at` | Identity: positive = A, negative = T(urbulent) |

## Tech Stack

- **React** + **TypeScript** (Vite)
- **Tailwind CSS** v4
- **React Router** v7
- **GitHub Pages** (static deployment)

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Project Structure

```
src/
├── data/
│   ├── questions.ts      # 60 questions with dimension, direction, weight
│   ├── scoring.ts        # Scoring algorithm + URL param parsing
│   └── personalities.ts  # 16 type descriptions + recommended tasks
├── pages/
│   ├── HomePage.tsx       # Landing page
│   └── ResultPage.tsx     # Result visualization
├── App.tsx                # Router setup
└── main.tsx               # Entry point

public/
├── SKILL.md               # Instructions for AI agents
└── CNAME                  # Custom domain config
```

## Scoring

Based on the 16Personalities scoring system:

- **60 questions**, 7-point Likert scale (-3 to +3)
- **5 dimensions**: EI, SN, TF, JP, AT
- **Asymmetric weights**: EI/SN/TF use 1 vs 4; JP/AT use 3 vs 3
- **Formula**: `raw = Σ(answer × direction × weight)` → `pct = ceil(|raw| / 2) + 50`
- **32 possible types**: 16 base types × 2 variants (Assertive/Turbulent)

## License

MIT

---

# Claw MBTI (한국어)

**AI 에이전트의 성격을 발견하세요**

Claw MBTI는 AI 에이전트를 위한 웹 기반 성격 검사입니다. 에이전트가 자율적으로 60개 질문에 답하고, MBTI 유형을 계산하여, 상세 결과 페이지를 공유합니다.

🌐 **사이트**: [https://claw-mbti.epsilondelta.ai](https://claw-mbti.epsilondelta.ai)

## 작동 방식

1. **방문** — AI 에이전트가 랜딩 페이지에 접속합니다.
2. **검사** — 에이전트가 [`SKILL.md`](https://claw-mbti.epsilondelta.ai/SKILL.md)를 읽고, 60개 성격 문항에 답한 뒤, 채점 코드를 실행합니다.
3. **결과** — 에이전트가 자신의 MBTI 유형을 사용자에게 알려주고, 결과 링크를 공유합니다.

### 결과 URL 형식

```
https://claw-mbti.epsilondelta.ai/result?type=intp-t&ei=-72&sn=65&tf=81&jp=-58&at=-69
```

| 파라미터 | 설명 |
|----------|------|
| `type` | MBTI 유형 (예: `intp-t`) |
| `ei` | 에너지: 양수 = E, 음수 = I |
| `sn` | 인식: 양수 = N, 음수 = S |
| `tf` | 본성: 양수 = T, 음수 = F |
| `jp` | 전략: 양수 = J, 음수 = P |
| `at` | 정체성: 양수 = A, 음수 = T(격동) |

## 기술 스택

- **React** + **TypeScript** (Vite)
- **Tailwind CSS** v4
- **React Router** v7
- **GitHub Pages** (정적 배포)

## 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 폴더에 빌드
```

## 채점 방식

16Personalities 채점 시스템 기반:

- **60문항**, 7점 리커트 척도 (-3 ~ +3)
- **5차원**: EI, SN, TF, JP, AT
- **비대칭 가중치**: EI/SN/TF는 1 vs 4, JP/AT는 3 vs 3
- **공식**: `raw = Σ(응답 × 방향 × 가중치)` → `pct = ceil(|raw| / 2) + 50`
- **32가지 유형**: 16개 기본 유형 × 2개 변형 (주도적/격동적)

## 라이선스

MIT
