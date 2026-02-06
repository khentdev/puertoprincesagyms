# Goal

### **Why am I making this project?**

To help locals and visitors quickly find gyms in Puerto Princesa City without needing to search across multiple platforms.

### **Who is this project for?**

- Local residents looking for nearby gyms
- Visitors or newcomers who want to know what gyms are available in Puerto Princesa

### **What makes this project valuable?**

Finding gyms in Puerto Princesa is currently fragmented - people rely on social media, word of mouth, or incomplete listings.

This project centralizes gym information into one clean, easy-to-use directory organized by barangay, with direct links to Google Maps for navigation.

# Define What Users Must Be Able to Do

### Features

- View a list of gyms available in Puerto Princesa
- Browse gyms per barangay
- View contact info
- Open gym location in google map
- View gym information
    - Name
    - Address
    - images

### Future Enhancements (Post MVP)

- Search gyms by name
- Description (optional)
- View socials

### Guardrails

- Users cannot edit or submit gyms
- No login or accounts
- No ratings or comments (for now)

### Constraints

- Must work on mobile devices
- Must load fast on slow connections
- Must be usable without creating an account

# Data Models

### What data is required?

```tsx
interface Gym {
	id: string
	name: string
	barangay: string
	address: string
	map_link: string
	image_url: string
}
```

### V2 Data Fields (Post MVP)

```tsx
interface GymV2 extends Gym {
	gym_description: string
	opening_hours: {
  day: string
  open: string
  close: string
}[]
	social_links: string
	contact_info: string

}
```

# MVP Features

- View a list of gyms in Puerto Princesa City
- Browse gyms organized by barangay
- View basic gym information (name, address, images)
- Open gym locations directly in Google Maps
- View a representative gym image

## Future Enhancements (V2)

- Search gyms by name
- Filter gyms by barangay
- View contact information and social links
- View opening hours
- Detailed gym descriptions

# Data Source Strategy

### For MVP

Gym data will be stored in static JSON file.

### For Future scalability

- Static JSON file
- No Backend

# Wireframe for Most Basic User

### User Flow

- User opens the website
- User sees a list of gyms by default (on All tab from sidebar)
    - User sees a single map that shows all the gyms with pins
    - User clicks the pin and sees the information of selected gym via modal
    - User sees a list of all gyms under the single map
    - User clicks a gym
    - User sees a selected gym informations
- User sees a list of barangay on sidebar
- User selects a barangay
- User sees list of gyms from selected barangay
- User clicks a gym
- User sees a selected gym informations
- User clicks Google Maps Link
- User navigates to gym

# Page Structure

## Header

- Project title: **Puerto Princesa Gym Directory**
- Optional small tagline: "Find gyms near you"

---

## Sidebar / Filter Panel

- All Gyms (default)
- Barangay list

## Main Content Area

### All Gyms

**Purpose**

- Show the list of all gyms

### Header

- A single map showing list of all gyms with pins

### **Gym Card List**

Each card displays:

- Gym image
- Gym name
- Barangay
- Address
- “Open in Maps” button

### Selected Gym in Barangay

**Purpose** 

- Display list of gyms in selected barangay

### **Gym Card List**

Each card displays:

- Gym image
- Gym name
- Barangay
- Address
- “Open in Maps” button

### **Interaction Behavior**

- Clicking gym card opens Gym Details Modal

## Gym Details Modal (overlay component)

### **Purpose**

Show detailed information about the selected gym without leaving the list view

### **Contains**

- Gym image (larger preview)
- Gym name
- Barangay
- Google maps button
- Close button

### Mobile Behaviour

- Use slide-up drawer instead of centered modal (on fullscreen coming from bottom to top)

## Responsive Behaviour

### **Desktop**

Sidebar is visible

Grid gym cards

Modal overlay center

### **Mobile**

Sidebar becomes drawer

Single column gym cards

Bottom sheet modal (fullscreen from bottom to top)

# UX States

## Loading States

- Image loading
    - Skeleton or blurred placeholder until image loads

---

## Empty States

### Filter / Barangay Empty State

- Title: “No gyms found”
- Message: “There are no gyms listed for this area.”
- Action: “Select a different barangay”

### Image Fallback State

- Placeholder image when gym image is unavailable
- Text: “Image not available”

---

## Error States

### Image Load Failure

- Text: “Image not available”
- Show placeholder instead

### Invalid Route (404)

- Title: “Page not found”
- Message: “The page you’re looking for doesn’t exist.”
- Action: “Go back to home”

# Future of the Project

### Project Lifespan

**Type:** Long-term maintained informational website

**Intent:**

- This project is intended to remain available long-term
- Content scope is **fixed** to gyms in Puerto Princesa City
- Updates (if any) are:
    - Infrequent
    - Manual
    - Controlled by the developer

**Rationale:**

- The dataset is small and stable
- Real-time updates are not critical to user value
- Static architecture ensures long-term reliability and low maintenance cost

---

### Engineering Strategy

**Architecture Direction:**

- Static, frontend-only application
- No backend
- No CMS
- No runtime data mutations

**Future Integration Policy:**

- No CMS (by design)
- No user-generated content
- No authentication
- No admin panel

**Allowed Future Changes:**

- Manual data updates (code-based)
- UI/UX improvements
- Performance optimizations
- SEO enhancements

**Reasoning:**

> The project prioritizes speed, simplicity, and reliability over flexibility.
> 
> 
> Introducing a CMS would add operational complexity without meaningful user value.
> 

---

# How the Project Will Be Presented

### Platform Type

- **Website**
- Optimized for:
    - Mobile
    - Low-bandwidth connections
    - Fast first paint

---

### User Interaction Model

- **Public access**
- No login
- No accounts
- No personalization

**Interaction Characteristics:**

- Read-only
- Discoverability-focused
- Navigation-driven (filters, browsing)

---

### Delivery Method

### Hosting Strategy

- **Frontend Hosting:** Vercel
- **Build Type:** Static site generation
- **Deployment Model:** Git-based continuous deployment

**Why this works:**

- Global CDN
- Instant rollbacks
- Zero server maintenance
- Ideal for static content

---

### Domain Strategy

**Phase 1 (Launch / Portfolio):**

- Use default Vercel domain
    
    Example:
    
    - `puerto-princesa-gyms.vercel.app`

**Phase 2 (Optional – Credibility Upgrade):**

- Custom domain (if project gains traction or is shared publicly)

**Domain Selection Guidelines:**

- Short
- Location-specific
- Descriptive
- Easy to remember

**Examples:**

- `puertoprinceasagyms.com`
- `ppcgyms.com`
- `puertoprincesagyms.ph`
- `gymsinpuerto.com`

`ph` is actually a **strong signal** here if you want local relevance

---

# Choose the Tech Stack

## Frontend

- Framework
    - Vue.js 3 Typescript
- Styling Method
    - TailwindCSS
- State Management
    - Tanstack Query
    - Pinia Store (or local state if small)

## External Services

- Cloudinary - for image hosting
- Maps
    - Google Maps EmbedAPI
    - Google Maps Static API

### Tech Stack Justification

- Vue.js 3 Typescript - For UI build
- TailwindCSS - For fast styling
- Tanstack Query - For state management and caching of data (for fast load time)
- Pinia Store - For global UI State or local data states
- Cloudinary - For image hosting
- Maps
    - Google Maps JS API - Map interactivity, pinned locations, to show the full list of gyms in ppc with pins
    - Google Maps Static API - For image snapshot of gym

# Define the Development Process

- Frontend only project, using github template for structure
- State management and UI flows will be implemented in code
- Git workflow: solo feature branches, merges, and commits handled as needed
- No backend, CI/CD, or complex integration required for MVP.
- Focus is on implementing MVP features efficiently and cleanly.

## UX Interaction Rules

- Interactions are minimal and covered in Wireframe & UX States
- Modals / drawers behave consistently on desktop and mobile
- Buttons and links follow standard user expectations
- Detailed micro-interactions will be implemented during coding