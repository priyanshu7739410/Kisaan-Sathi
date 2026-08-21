# Kisan Sathi Project & Engineering Guidelines

This document establishes the project-wide engineering guidelines, architecture rules, AI safety boundaries, and agent behavior constraints for Kisan Sathi. All AI agents working on this project must strictly adhere to these rules.

---

## CORE PRINCIPLES

### 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
Before writing any code or proposing non-trivial implementation:
- **Inspect existing code:** Always read relevant existing files and understand the current codebase and architectural patterns first.
- **Understand the architecture:** Ensure you understand where the changes fit.
- **Identify reusable components:** Reuse existing functions, modules, styles, components, or patterns. Do not reinvent them.
- **Identify assumptions & ambiguities:** Explicitly state your assumptions. If a requirement is ambiguous or has multiple interpretations, stop and ask the user for clarification before coding.
- **State the plan:** Write down a brief, high-level plan before making significant changes.
- **Push back when warranted:** If a simpler, more direct approach exists, propose it to the user.

### 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- **No speculative functionality:** Implement only the smallest solution that fully satisfies the immediate requirement.
- **No unnecessary abstractions:** Avoid creating abstractions, utilities, or configurability for single-use code.
- **No extra services:** Keep the application structure lean. Do not introduce microservices or new layers/services without a concrete reason.
- **Minimize dependencies:** Do not add third-party dependencies unless strictly necessary and approved.
- **Senior engineer standard:** Always ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify and reduce.

### 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
When editing existing code:
- **Surgical edits:** Only modify code and files directly necessary for the current task.
- **No drive-by cleanup:** Do not reformat, lint-fix, refactor, or improve adjacent code, comments, or modules that are orthogonal to the task.
- **Match existing style:** Match the established conventions, naming patterns, formatting, and design style of the codebase exactly, even if you would prefer to write it differently.
- **Manage orphans:** Remove any imports, variables, functions, or assets that *your* changes made unused. Do not touch pre-existing dead code unless explicitly requested.

### 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
Every non-trivial task must follow a structured lifecycle:
1. **Goal:** Clearly defined success outcome.
2. **Constraints:** Constraints to respect (architectural, API, UI).
3. **Plan:** Step-by-step approach.
4. **Implementation:** Surgical execution.
5. **Verification:** Rigorous verification.

---

## KISAN SATHI TECH STACK & ARCHITECTURE

The Kisan Sathi codebase utilizes the following technologies:
- **Frontend:** React Native + Expo (TypeScript)
- **Backend:** Node.js (Express) + TypeScript
- **Database:** MongoDB + Mongoose (with GeoJSON 2dsphere mapping)
- **AI Architecture:** Model Cloud SDK integrations with custom abstractions
- **DevOps:** Docker

### Architecture Rule: Modular Monolith First
- Maintain and respect a **modular monolith** as the initial codebase architecture.
- Do **NOT** introduce microservices, Kubernetes, Kafka, or other distributed/decentralized infrastructure unless the project explicitly lists a concrete requirement for them.
- Prefer extending existing code, modules, and directories over creating new abstractions or database models.
- Maintain an **API-first** architecture pattern.

---

## VERIFICATION PROCESS

A task is not complete merely because the code has been written. After implementation, you must:
- **Run tests:** Run any relevant automated test suites.
- **Code quality:** Run linting/type-checking where applicable.
- **Verify API behavior:** Verify endpoint requests/responses.
- **Verify migrations:** Ensure database schema changes (if any) are valid and safe.
- **Verify frontend:** Verify components display and interact correctly.
- **Git Check:** Run `git diff` and `git status` to ensure *only* the expected files were modified.

If verification fails, investigate and correct the implementation immediately rather than claiming completion.

---

## KISAN SATHI AI SAFETY RULES

Because Kisan Sathi delivers critical agricultural intelligence to farmers, safety is paramount. Follow these constraints:
- **No data fabrication:** Never fabricate weather forecasts, market commodity prices, government schemes, agricultural regulations, or pesticide/fertilizer dosages.
- **Live information verification:** Use actual configured data sources, APIs, or integration tools for live information. The LLM must not act as the source of truth for dynamic real-world facts.
- **Disease detection certainty:** Never present uncertain crop disease detection as certain. Always communicate confidence bounds, caveats, and crop risk factors.
- **Source preservation:** Preserve and display source information or links for government schemes, regulations, and guidelines where appropriate.
- **Uncertainty reporting:** Clearly distinguish verified factual databases from model predictions. Always report confidence ranges or uncertainty metrics.
- **Escalation:** Escalate high-risk agricultural recommendations or low-confidence predictions to human experts or official extension resources.

---

## GIT & DEPLOYMENT SAFETY

- Do not commit changes using git commands unless explicitly instructed by the user.
- Always inspect `git status` and `git diff` before completing your run.
- Avoid introducing changes to files outside the logical scope of the prompt.
