---
description: 
---

# Feature-Based Folder Structure Rules

**Purpose:** Organize code by business domain, not technical layer  
**Applies To:** Any codebase (Backend, Frontend, Fullstack)

---

## 10 Core Rules

### 1. Organize by Feature, Not Layer
Every feature owns its logic end-to-end: routes, controllers, services, repositories, schemas, types, tests.

❌ Bad: `controllers/`, `services/`, `models/`  
✅ Good: `auth/`, `posts/`, `users/`

---

### 2. Keep Structure Flat
**Max depth = 3 folders.** No deep nesting.

❌ Bad: `posts/services/v1/core/logic/service.ts`  
✅ Good: `posts/service.ts`

---

### 3. No Redundant Naming
Files inside a feature folder **don't repeat** the folder name.

❌ Bad:
```
posts/
  posts.controller.ts
  posts.service.ts
```

✅ Good:
```
posts/
  controller.ts
  service.ts
  repository.ts
  schema.ts
  types.ts
```

**Why:** Folder already provides context.

**Exception:** Multiple same-role files use descriptive prefixes:
```
posts/
  create.service.ts
  update.service.ts
  delete.service.ts
```

---

### 4. Features Are Self-Contained
No cross-feature imports except via barrel files.

❌ Bad: `import { AuthController } from '../auth/controller'`  
✅ Good: `import { authService } from '../auth'`

---

### 5. Shared Code Goes in `shared/`
Anything used by 2+ features:

```
shared/
  middlewares/
  exceptions/
  ui/
  utils/
```

Framework-agnostic utilities go in `lib/`.

---

### 6. Expose Public API via Barrel File
Each feature has **one** `index.ts` at root:

```typescript
// posts/index.ts
export { PostsService } from './service';
export { PostsController } from './controller';
export type { Post, CreatePostDTO } from './types';
```

---

### 7. Tests Live with Code
Tests go inside the feature folder:

```
posts/
  controller.ts
  controller.spec.ts
  service.ts
  service.spec.ts
```

---

### 8. Mirror Frontend ↔ Backend Names
**Backend:** `src/modules/posts/`  
**Frontend:** `src/features/posts/`

Same feature names across stack.

---

### 9. Barrel Files Only at Feature Root
Use `index.ts` only at feature root, not in subfolders.

❌ Bad: Barrel files in every subfolder  
✅ Good: Single barrel at root

---

### 10. Split When Feature Grows
**Split if:**
- File count > 10
- Any file > 300 lines
- Different teams own parts
- Logical sub-domains exist

```
posts/
  creation/
    controller.ts
    service.ts
    index.ts
  reading/
    service.ts
    repository.ts
    index.ts
  reactions/
    service.ts
    index.ts
  index.ts  # Re-exports all
```

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Folders | Plural, lowercase | `posts/`, `users/` |
| Role files | `{role}.ts` | `controller.ts`, `service.ts` |
| Multiple roles | `{action}.{role}.ts` | `create.service.ts` |
| Tests | `{file}.spec.ts` | `service.spec.ts` |
| Barrel | `index.ts` | `index.ts` |

---

## Quick Examples

### Backend
```
root/
  prisma/
    migrations/
    seed/
    schema.prisma
  src/
    infra/
      appGracefulShutdown.ts
      logger.ts
    configs/
      test/
      env.ts              # Spreads & re-exports feature envs
      initDotEnv.ts
      loadEnv.ts
    errors/
      appError.ts         # Base error class
      index.ts            # Re-exports all feature errors
    features/
      auth/
        __tests__/
        utils/
        controller.ts
        service.ts
        route.ts          # Register controller, and middleware to this feature-specific route
        types.ts
        errors.ts         # Feature-specific error codes
        cookieConfig.ts
        middleware.ts
        index.ts          # Barrel file - exports public API
      posts/
        __tests__/
        utils/
        controller.ts
        service.ts
        route.ts
        types.ts
        errors.ts
        middleware.ts
        index.ts          # Barrel file - exports public API
    routes/
      index.ts            # Base: Imports feature routes from index.ts and register here
    utils/                # App-specific utilities
      hash.ts
      validation.ts
      extractIP.ts
    middleware/
      validateAccessToken.ts
      globalErrorHandler.ts
    createApp.ts
    server.ts
```

### Frontend
```
src/
  app/
    layouts/
      AuthLayout.vue
    router/
      index.ts            # Re-exports all feature routes
  core/                   # App infrastructure (non-UI)
    api/
      axiosConfig.ts
      axiosInterceptor.ts
    config/
      loadEnv.ts
    errors/
      errorHandler.ts
      types.ts
    infra/
      errorMessages.ts
    utils/
      getCookie.ts
      getFingerprint.ts
  features/
    auth/
      components/
        BaseAuthComponent.vue
        AuthNavLink.vue
      composables/
        useAuth.ts
      errors/
        authErrorCodes.ts
      store/
        authStore.ts
      types/
        index.ts
      views/
        AuthLoginView.vue
        AuthSignupView.vue
      routes.ts           # Auth pages routes
      service.ts          # API routes
      index.ts            # Barrel file - exports public API
  shared/                 # Reusable UI & logic
    components/
      empty/
      error/
      loading/
      overlay/
      Toast.vue
    composables/
      useToast.ts         # Toast composable
      useToast.types.ts   # Toast types (flattened from toast/)
      useSomething.ts
    styles/
      appStyle.css        # Tailwind imports & custom styles
    types/
      types.ts            # Global shared types
    utils/
      someHelper.ts
    views/
      NotFoundView.vue
  App.vue
  env.d.ts
  main.ts
```

---

## Anti-Patterns

❌ Layer-based folders (`controllers/`, `services/`)  
❌ Deep nesting (>3 levels)  
❌ Redundant names (`posts/posts.service.ts`)  
❌ Direct cross-feature imports  
❌ Tests in separate folder  
❌ Barrel files everywhere

---

## Checklist

✅ Organize by domain, not layer  
✅ Max depth = 3 folders  
✅ No redundant file naming  
✅ Shared code in `shared/`  
✅ Public API via barrel files  
✅ Tests live with code  
✅ Mirror frontend ↔ backend names  
✅ Self-contained features  
✅ Split when >10 files or >300 lines