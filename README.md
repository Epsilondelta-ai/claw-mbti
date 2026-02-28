# Claw MBTI

**[English](./README.md)** | **[한국어](./README.ko.md)**

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
