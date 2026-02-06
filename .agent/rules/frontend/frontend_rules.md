---
trigger: always_on
description: Vue 3 + TypeScript stack: Composition API, Pinia, Vue Router, VueUse, Headless UI,  Tailwind CSS. Enforces clean code, proper typing, performance optimization, and  production-ready patterns.
---

# Frontend Development Patterns – Vue 3 + TypeScript

## Tech Stack Assumptions

This guide assumes the following stack (adapt as needed):
- **Core**: Vue 3 (Composition API), TypeScript (strict mode)
- **State**: TanStack Vue Query (server state), VueUse, Pinia (client state) - *adaptable to other libraries*
- **Styling**: TailwindCSS v4, Headless UI - *principles apply to other utility frameworks*
- **HTTP**: Axios
- **Build**: Vite - *patterns work with any bundler*

## Code Structure & Organization

### Feature-Based Architecture
- Organize by feature: `/features/[feature]/` with `components/`, `composables/`, `views/`, `store/`, `types/`, `errors/`, `service.ts`, `routes.ts`
  - Example: `/features/posts/`, `/features/users/`, `/features/products/`
- Shared code: `/shared/` with `components/`, `composables/`, `store/`, `types/`, `utils/`
  - Use for: cross-feature UI components, global utilities, shared types
- Core: `/core/` with `api/`, `config/`, `errors/`, `infra/`, `utils/`
  - Use for: HTTP client config, error handlers, app-level infrastructure
- Organize files systematically: each file should contain only related content (exported components, subcomponents, helpers, static content, types)

### File Naming
- Vue components: PascalCase (`[Entity]ListView.vue`, `Toast.vue`)
- TypeScript: camelCase (`use[Feature][Action].ts`, `[feature]Store.ts`)
- Directories: lowercase with dashes (e.g., `components/auth-wizard`)
- Always `.ts` extension, never `.js`
- Use `index.ts` for barrel exports
- Favor named exports for functions

## Code Style

### Programming Patterns
- Use functional and declarative programming patterns; avoid classes
- Favor iteration and modularization to adhere to DRY principles
- Write concise, maintainable, technically accurate TypeScript code
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)

### Syntax and Formatting
- Use the `function` keyword for pure functions (benefits from hoisting and clarity)
- Always use Vue Composition API script setup style

## Component Patterns

### Vue 3 Script Setup (Mandatory)
- Always `<script setup lang="ts">` - never Options API
- Order: imports → defineProps/defineEmits → composables → reactive state → computed → functions
```vue
<script setup lang="ts">
import { computed } from "vue";
import { use[Feature][Action] } from "../composables";

const query = use[Feature][Action]("[param]");
const all[Entities] = computed(() => 
  query.data.value?.pages.flatMap(page => page.data) || []
);
</script>
```

### Props & Composition
- Use `withDefaults(defineProps<{}>(), {})` for defaults
- Type props explicitly with interfaces, prefer booleans for flags
- Build focused layout components with `<slot />`
- Feature components in `features/[feature]/components/`
- Shared in `shared/components/` by category

## State Management

### TanStack Query (Server State)
- `useInfiniteQuery` for cursor-based pagination
- `queryKey` as array: `['[resource]', { [param] }]`
- Set `refetchOnWindowFocus: false`, appropriate `staleTime`
- `retry: 3` with custom logic
- Extract to composables: `use[Feature][Purpose].ts`
```typescript
export const use[Feature]List = ([param]: MaybeRefOrGetter<string>) => {
  const query = useInfiniteQuery({
    queryKey: ['[resource]', { [param] }],
    queryFn: ({ pageParam }) => [feature]Service.get[Resource]WithCursor({
      cursor: pageParam, limit: 20, [param]: toValue([param])
    }),
    retry: 3,
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000
  })
  return { ...query, errorMessage }
}
```

### Pinia Stores (Mutations)
- `defineStore` with composition API
- `reactive()` for grouped states: `states.creating[Entity]`
- Separate `systemErrors` and `errors`
- `useMutation` for optimistic updates with rollback

### Optimistic Updates (Critical)
- Cancel queries in `onMutate`
- Store cache for rollback: `const [resource]Cache = []`
- Calculate delta based on current state
- Sync in `onSuccess`, revert in `onError`
- Update all related caches
```typescript
const toggle[Property]Mutation = useMutation({
  mutationFn: ({ [id] }) => [feature]Service.toggle[Property]({ [id] }),
  onMutate: async (variables) => {
    await queryClient.cancelQueries({ queryKey: ["[resource]"] })
    const previousData = queryClient.getQueriesData({ queryKey: ["[resource]"] })
    return { previousData }
  },
  onSuccess: (data) => queryClient.setQueryData(queryKey, serverData),
  onError: (_, __, context) => context?.previousData.forEach(
    ({ queryKey, data }) => queryClient.setQueryData(queryKey, data)
  )
})
```

## Error Handling

### Typed Error Codes
- Feature codes in `errors/[Feature]ErrorCodes.ts`
- `export const [YOUR_ERROR_CODE] = "[YOUR_ERROR_CODE]" as const`
- Common codes: `RESOURCE_NOT_FOUND`, `VALIDATION_FAILED`, `RATE_LIMIT_EXCEEDED`
- Type: `AxiosError<ErrorResponse<[FEATURE_ERROR_CODES].Type>>`

### Centralized Handler
- Use `errorHandler<T>()` from `core/errors/errorHandler.ts`
- Returns: `{ type, code, message, data, field, retryable, logout, error }`
- Types: `"offline"`, `"timeout"`, `"unreachable"`, `"server_error"`, `""`
```typescript
const { type, code, data } = errorHandler(axiosError)
if (type === "offline") toast.error(message)
if (code === [YOUR_ERROR_CODE]) startCountdown(data?.['retryAfter'])
```

### Display & Toast
- Toast for transient: `toast.error(message, { dedup: true })`
- Field errors: `errors.[fieldName]Error`
- Max 3 toasts, auto-dismiss 5s, dedup by default
- Types: `success`, `error`, `warning`, `info`

## TypeScript

### Strict Typing
- Strict mode always enabled
- Never `any`, use `unknown` with guards
- Type all params and returns
- **Prefer `interface` over `type`** for extendability and ability to merge
- **Avoid enums; use maps instead** for better type safety and flexibility
- Co-locate types: `features/[feature]/types/`

### Patterns
- API types: `Create[Entity]Params`, `Get[Resource]Response`
- Props: inline `defineProps<{ ... }>()`
- Contexts: `type [Action]MutationContext = { ... }`
- Reactive args: `MaybeRefOrGetter<T>`

## Styling

### TailwindCSS v4 + CSS Variables
- Utility classes only, no CSS modules
- Define semantic tokens in global stylesheet with `@theme`
- Mobile-first responsive design approach
- `.dark` selector: `@custom-variant dark (&:where(.dark, .dark *))`
- Semantic naming: `bg-[surface-name]`, `text-[semantic-name]`

### Classes & Animations
- Descriptive combos: `class="flex gap-3 mb-3"`
- Responsive: `md:px-0`
- Transitions: `transition-all duration-200`
- Active feedback: `active:scale-90`, `hover:bg-[semantic]`
- Keyframes in `<style scoped>` only
- TransitionGroup for lists

## API Integration

### Service Layer
- Centralize in `[feature]/service.ts`
- Export object: `export const [feature]Service = { ... }`
- Use configured HTTP client from `core/api/`
```typescript
export const [feature]Service = {
  async get[Resource]WithCursor(q: Get[Resource]Query) {
    const res = await httpClient.get('/api/[resource]', { params: q })
    return getTypedResponse<Get[Resource]Response>(res)
  }
}
```

### Interceptors & Session
- Request: add auth headers, fingerprints, CSRF tokens
- Response: unwrap data, handle 401 with token refresh
- Store access token in state, refresh in http-only cookie
- Singleton refresh promise with exponential backoff

## Performance

### Lazy Loading & Optimization
- Route splitting: `component: () => import("../../views/[Feature].vue")`
- Never eager-import routes
- **Wrap asynchronous components in Suspense with fallback UI**
- **Use dynamic loading for non-critical components**
- **Optimize images**: WebP format, include size data, lazy loading
- **Implement optimized chunking** (code splitting) in Vite build

### Query & Reactivity Optimization
- Cursor pagination (never offset)
- Appropriate `staleTime` based on data volatility
- Disable `refetchOnWindowFocus` for static content
- `computed()` over watchers
- **Leverage VueUse functions** for enhanced reactivity and performance
- Flat structures for large lists
- `reactive()` for groups, `ref()` for primitives

### Key Conventions
- **Optimize Web Vitals** (LCP, CLS, FID) using Lighthouse or WebPageTest

## Accessibility

### Semantic HTML
- Use `<button>`, `<nav>`, not styled `<div>`
- Single `<h1>`, proper hierarchy
- `<label>` with `for`

### Interactive
- Keyboard accessible
- Visual feedback: hover, active, focus, disabled
- `cursor-pointer`, `disabled:opacity-50 disabled:cursor-not-allowed`

### ARIA
- Minimal, semantic HTML first
- `aria-label` for icon buttons

---

**Adapt these patterns to your domain. Replace placeholders with actual entity/feature names.**