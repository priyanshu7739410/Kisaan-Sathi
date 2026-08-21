# CLAUDE.md (Kisan Sathi Guidelines)

Behavioral guidelines to reduce common LLM coding mistakes, customized for the Kisan Sathi codebase.

---

## 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
Before implementing:
- Inspect relevant existing code first to see established styles and components.
- State your assumptions explicitly. If uncertain about requirements or design, ask for clarification.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- Implement the smallest solution that fully satisfies the requirement.
- No features beyond what was asked. No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- Do not introduce microservices, unnecessary services, or external dependencies.
- If you write 200 lines and it could be 50, rewrite it.

## 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style exactly, even if you'd do it differently.
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

## 4. Goal-Driven Execution & Verification
**Define success criteria. Loop until verified.**
Transform tasks into verifiable goals:
- **Goal, Constraints, Plan, Implementation, Verification** lifecycle for every non-trivial task.
- State a brief step-by-step plan before making changes.
- After implementation, verify API behavior, frontend rendering, database migrations, and run relevant linting, type-checking, or tests.
- Inspect git status/diff before completion; verify no unrelated changes exist.

---

## KISAN SATHI SPECIFIC RULES

### Technology Stack
- **Frontend:** React + TypeScript (web application)
- **Backend:** Node.js (Express) + TypeScript
- **Database:** MongoDB + Mongoose (with GeoJSON 2dsphere mapping)
- **DevOps:** Docker
- **Architecture:** modular monolith as the initial architecture.

### AI Safety & Reliability
- **No data fabrication:** Never fabricate weather, market prices, government schemes, agricultural regulations, or pesticide/fertilizer dosages.
- **Autoritative Sources:** LLM is not the source of truth. Use actual APIs/tools. Preserve source references where appropriate.
- **Predictions vs Facts:** Distinguish facts from predictions. Communicate uncertainty and confidence bounds for AI crop disease detection.

### Git Safety
- Inspect git status and git diff before concluding. Do not commit unless explicitly asked.
