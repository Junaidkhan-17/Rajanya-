# Rajanya Project Flowchart and Architecture

This document maps the project exactly as it currently exists in the repository.
It separates implemented behavior from planned or placeholder functionality.

## 1. Project Snapshot
  
| Area | Current implementation |
| --- | --- |
| Application type | Single-page frontend application |
| Build tool | Vite 8 |
| UI framework | React 19 |
| Routing | React Router DOM |
| Global state | React Context plus `useReducer` |
| Form handling | React Hook Form |
| Styling | CSS modules by component, Bootstrap, Bootstrap Icons |
| Animation | Framer Motion, GSAP, React Parallax Tilt |
| Product source | Static JavaScript array |
| Authentication storage | Browser `localStorage` |
| Booking storage | Browser `localStorage` |
| Backend/API | Not implemented |
| Database | Not implemented |
| Payment gateway | Planned only |
| AI virtual try-on | UI concept only |
| Active routes | `/`, `/collection`, `/products/:slug` |

## 2. Complete System Architecture

```mermaid
flowchart TB
    Browser["Browser"]
    HTML["index.html<br/>root DOM node"]
    Main["src/main.jsx<br/>React application bootstrap"]

    subgraph GlobalProviders["Global Provider Layer"]
        Router["BrowserRouter"]
        AuthProvider["AuthProvider<br/>user, authentication, modal state"]
        ProductProvider["ProductLiveDataProvider<br/>catalog, filters, sorting, pagination"]
    end

    App["App.jsx"]

    subgraph PersistentBrowserData["Browser Persistence"]
        UserStore["localStorage: rajanya_user"]
        BookingStore["localStorage: rajanya_bookings"]
    end

    subgraph GlobalUI["Always Rendered UI"]
        Navbar["Navbar"]
        CategoryBar["CategoryInfoBar"]
        Footer["Footer"]
        RegisterModal["CreateAccountModal"]
        LoginModal["LoginModal"]
        BookingModal["BookForRentModal"]
    end

    subgraph ActiveRoutes["Active Route Views"]
        Home["/ → Home"]
        Collection["/collection → AllProducts"]
        Details["/products/:slug → ProductDetails"]
    end

    StaticCatalog["AllProductsCatalogData.js<br/>6 local products"]
    Assets["Local PNG, MP4, SVG, OTF assets"]
    BrowserFeatures["Browser APIs<br/>Share, Clipboard, Scroll, Alert"]

    Browser --> HTML --> Main
    Main --> Router --> AuthProvider --> ProductProvider --> App
    App --> GlobalUI
    App --> ActiveRoutes
    AuthProvider <--> UserStore
    BookingModal <--> BookingStore
    StaticCatalog --> ProductProvider
    Assets --> GlobalUI
    Assets --> ActiveRoutes
    Collection --> BrowserFeatures
    Details --> BrowserFeatures
```

## 3. Application Startup Flow

```mermaid
flowchart TD
    Start["User opens application"] --> LoadHTML["Browser loads index.html"]
    LoadHTML --> LoadEntry["Load /src/main.jsx"]
    LoadEntry --> LoadCSS["Load Bootstrap, icons, global CSS, custom fonts"]
    LoadCSS --> CreateRoot["Create React root at #root"]
    CreateRoot --> Strict["Enter React StrictMode"]
    Strict --> Router["Initialize BrowserRouter"]
    Router --> Auth["Initialize AuthProvider"]
    Auth --> ReadUser{"rajanya_user exists?"}
    ReadUser -- Yes --> ParseUser["Parse stored user"]
    ParseUser --> LoginAction["Dispatch LOGIN_SUCCESS"]
    ReadUser -- No --> Guest["Keep guest state"]
    LoginAction --> Products
    Guest --> Products["Initialize ProductLiveDataProvider"]
    Products --> Catalog["Load static product catalog"]
    Catalog --> Derived["Calculate searched, filtered, sorted, paginated products"]
    Derived --> RenderApp["Render App"]
    RenderApp --> GlobalShell["Render Navbar + Category Bar + Footer + global modals"]
    GlobalShell --> MatchRoute["React Router matches current URL"]
    MatchRoute --> Screen["Render Home, Collection, or Product Details"]
```

## 4. Top-Level Component Tree

```mermaid
flowchart TD
    App["App"]
    App --> Navbar
    App --> CategoryInfoBar
    App --> Routes
    App --> Footer
    App --> CreateAccountModal
    App --> LoginModal
    App --> BookForRentModal

    Routes --> Home
    Routes --> AllProducts
    Routes --> ProductDetails

    Home --> Hero
    Hero --> AnimatedText
    Home --> MostRentedStyles
    Home --> FashionProcessSection
    Home --> PerfectStyleShowcase
    Home --> AIStylingTrustSection
    Home --> TrendingRentalCollection
    Home --> LimitedTimeDealsSection

    AllProducts --> AllProductsHeroSection
    AllProductsHeroSection --> ProductAnimatedText
    AllProducts --> AllProductsCatalogSection
    AllProductsCatalogSection --> AllProductsCategoryStrip
    AllProductsCatalogSection --> AllProductsSidebarFilters
    AllProductsCatalogSection --> AllProductsSortBar
    AllProductsCatalogSection --> AllProductsProductGrid
    AllProductsProductGrid --> AllProductsProductCard
    AllProductsCatalogSection --> AllProductsPagination

    ProductDetails --> ProductDetailsTopSection
    ProductDetailsTopSection --> ProductDetailsGallerySection
    ProductDetailsTopSection --> ProductDetailsInfoSection
    ProductDetailsTopSection --> ProductDetailsRentalSection
    ProductDetailsTopSection --> ProductDetailsPricingSection
    ProductDetailsTopSection --> ProductDetailsVariantsSection
    ProductDetailsTopSection --> ProductDetailsActionsSection
```

## 5. Active Route Flow

```mermaid
flowchart LR
    URL["Current browser URL"] --> Router{"Route match"}
    Router -- "/" --> Home["Home page"]
    Router -- "/collection" --> Catalog["All-products catalog"]
    Router -- "/products/:slug" --> ProductLookup["Product details lookup"]
    Router -- "Any other path" --> Empty["No matching route content<br/>Navbar and Footer still render"]

    Home --> HomeSections["Marketing and showcase sections"]
    Catalog --> Browse["Filter, sort, paginate, share, wishlist, compare"]
    ProductLookup --> Find{"Slug exists in product array?"}
    Find -- Yes --> ProductPage["Render product details"]
    Find -- No --> NotFound["Render Product Not Found"]
```

### Active navigation behavior

| Navigation item | Target | Status |
| --- | --- | --- |
| Home | `/` | Working |
| All Product | `/collection` | Working |
| Product card/title/image | `/products/:slug` | Working |
| About Us | `/about` | No active route |
| News | `/blog` | No active route |
| Contact Us | `/contact` | No active route |
| Category info bar links | Category-specific URLs | No active routes |
| Footer links | Mostly `/` | Placeholder |

## 6. Home Page Flow

```mermaid
flowchart TD
    Home["Home page"]
    Home --> Hero["Hero video<br/>animated Occasion Wear title"]
    Hero --> HeroCTA["Book for Rent button<br/>no click handler"]

    Home --> MostRented["Most Rented Styles<br/>6 static image cards"]
    MostRented --> MostCTA["See All and Book buttons<br/>no click handlers"]

    Home --> Process["AI fashion process explanation"]
    Process --> Upload["1. Upload photo concept"]
    Process --> Pick["2. Pick outfit concept"]
    Process --> Preview["3. AI preview concept"]

    Home --> Showcase["Perfect Style Showcase<br/>static category imagery"]
    Home --> Trust["AI Styling Trust section<br/>static feature claims"]
    Home --> Trending["Trending Rental Collection<br/>3 autoplay videos"]
    Trending --> TrendCTA["See All and Book buttons<br/>no click handlers"]
    Home --> Deals["Limited-Time Deals<br/>3 static deal cards"]
    Deals --> DealCTA["Browse Now buttons<br/>no click handlers"]
```

The home page is currently a presentation layer. Its calls to action do not
connect to routing, product state, authentication, booking, or AI services.

## 7. Product Catalog Data Pipeline

```mermaid
flowchart LR
    Source["Static products array"] --> Search["Search by product.name"]
    Search --> Material["Material filter"]
    Material --> Category["Active category filter"]
    Category --> Price["First rental option price range"]
    Price --> Sort["Selected sort strategy"]
    Sort --> Page["Slice by currentPage and itemsPerPage"]
    Page --> Grid["Render product grid"]

    SearchState["state.search"] --> Search
    FilterState["state.filters"] --> Material
    FilterState --> Category
    FilterState --> Price
    SortState["state.sortBy"] --> Sort
    PageState["state.currentPage<br/>itemsPerPage = 6"] --> Page
```

### Product state

```text
products
search
filters.materials
filters.categories
filters.activeCategory
filters.priceRange
sortBy
currentPage
itemsPerPage
wishlist
compare
recentlyViewed
loading
error
```

### Catalog action flow

```mermaid
flowchart TD
    User["Catalog user action"] --> Action{"Action type"}

    Action -- Search --> SetSearch["SET_SEARCH<br/>reset page to 1"]
    Action -- Material or price --> SetFilters["SET_FILTERS<br/>merge filters, reset page"]
    Action -- Category --> SetCategory["SET_ACTIVE_CATEGORY<br/>reset page"]
    Action -- Clear --> Clear["CLEAR_FILTERS<br/>restore defaults"]
    Action -- Sort --> SetSort["SET_SORT<br/>reset page"]
    Action -- Page controls --> SetPage["SET_PAGE / NEXT / PREVIOUS / FIRST / LAST"]
    Action -- Heart --> Wishlist["ADD_TO_WISHLIST or REMOVE_FROM_WISHLIST"]
    Action -- Compare --> Compare["ADD_TO_COMPARE or REMOVE_FROM_COMPARE"]
    Action -- Open product --> Recent["ADD_TO_RECENTLY_VIEWED<br/>unique, newest first, max 10"]

    SetSearch --> Recompute["Recompute memoized product pipeline"]
    SetFilters --> Recompute
    SetCategory --> Recompute
    Clear --> Recompute
    SetSort --> Recompute
    SetPage --> Recompute
    Recompute --> Rerender["Re-render count, grid, filters, and pagination"]
```

### Sorting rules

| Sort value | Behavior |
| --- | --- |
| `default` | Keep filtered array order |
| `newest` | Reverse current order |
| `oldest` | Keep current order |
| `popular` | Descending `bookingCount` |
| `featured` | Featured products first |
| `priceLowToHigh` | First rental option price ascending |
| `priceHighToLow` | First rental option price descending |
| `highestRated` | Rating descending |

### Current catalog limitations

- The navbar search input is not connected to `state.search`.
- The compare handler exists, but no compare button is rendered on product cards.
- Quick View only records a recently viewed ID and logs it.
- Wishlist and compare state are memory-only and disappear after refresh.
- All six products use the `Lehengas` category, so other category filters return no products.
- Product cards display `product.rentalPrice`, but catalog records only contain `rentalOptions`.
- Sidebar prices use a dollar sign while product details use rupees.
- Category strip is hidden by its base CSS.

## 8. Product Card Interaction Flow

```mermaid
flowchart TD
    Card["Product card"] --> Choice{"User action"}

    Choice -- Click image/title/Book For Rent --> Recent["Add product ID to recentlyViewed"]
    Recent --> Navigate["Navigate to /products/product-slug"]

    Choice -- Heart --> WishState{"Already wishlisted?"}
    WishState -- Yes --> RemoveWish["Remove product ID"]
    WishState -- No --> AddWish["Add product ID"]

    Choice -- Eye --> Quick["Add to recentlyViewed"]
    Quick --> Log["Log Quick View only"]

    Choice -- Share --> ShareSupport{"navigator.share supported?"}
    ShareSupport -- Yes --> NativeShare["Open native share UI"]
    ShareSupport -- No --> Clipboard["Copy product URL to clipboard"]
    Clipboard --> Alert["Show copied alert"]
```

## 9. Product Details Flow

```mermaid
flowchart TD
    Route["/products/:slug"] --> Param["Read slug with useParams"]
    Param --> Lookup["getProductBySlug"]
    Lookup --> Exists{"Product found?"}
    Exists -- No --> Missing["Product Not Found"]
    Exists -- Yes --> Defaults["Select first rental option and first size"]

    Defaults --> Gallery["Gallery<br/>first image active"]
    Defaults --> Info["Breadcrumb, category, name, rating, description"]
    Defaults --> Rental["Rental duration selector"]
    Defaults --> Pricing["Original price, selected rental price, discount"]
    Defaults --> Size["Size selector"]
    Defaults --> Actions["Virtual Try-On, Book For Rent, Wishlist"]

    Gallery --> Thumbnail["Thumbnail click changes active image"]
    Rental --> RentalState["Update selectedRentalOption"]
    RentalState --> Pricing
    Size --> SizeState["Update selectedSize"]
    RentalState --> Payload["Rebuild booking payload"]
    SizeState --> Payload
    Payload --> Actions
```

### Booking payload created by product details

```text
product
productId
productName
selectedSize
rentalDuration
rentalPrice
securityDeposit
startDate
returnDate
```

### Product detail action status

| Action | Current behavior |
| --- | --- |
| Change gallery image | Implemented |
| Select rental duration | Implemented |
| Select size | Implemented |
| Dynamic rental price | Implemented |
| Virtual try-on | Console log only |
| Wishlist | Console log only |
| Size guide | Button only |
| Book for rent | Implemented after local authentication |

## 10. Authentication State Machine

```mermaid
stateDiagram-v2
    [*] --> LoadingStoredUser
    LoadingStoredUser --> Guest: no rajanya_user
    LoadingStoredUser --> Authenticated: valid stored user

    Guest --> RegisterModal: OPEN_CREATE_ACCOUNT_MODAL
    Guest --> LoginModal: OPEN_LOGIN_MODAL
    RegisterModal --> Guest: close, Escape, outside click
    LoginModal --> Guest: close, Escape, outside click
    RegisterModal --> LoginModal: switch to Sign In
    LoginModal --> RegisterModal: switch to Create Account

    RegisterModal --> Authenticated: valid registration
    LoginModal --> Authenticated: matching email and password
    Authenticated --> Guest: logout
    Authenticated --> BookingModal: booking payload plus OPEN_BOOK_FOR_RENT_MODAL
    BookingModal --> Authenticated: close or booking submitted
```

### Authentication state

```text
user
isAuthenticated
loading
error
showCreateAccountModal
showLoginModal
showBookForRentModal
bookForRentPayload
```

### Registration flow

```mermaid
flowchart TD
    Open["Open Create Account modal"] --> Form["Enter first name, last name, email, password, confirmation, terms"]
    Form --> Validate["React Hook Form validation"]
    Validate --> Valid{"Valid?"}
    Valid -- No --> Errors["Show field errors"]
    Valid -- Yes --> Existing["Read rajanya_user"]
    Existing --> SameEmail{"Same email already stored?"}
    SameEmail -- Yes --> Duplicate["Show account already exists"]
    SameEmail -- No --> Build["Build user with Date.now ID and createdAt"]
    Build --> Store["Save entire user, including password, to localStorage"]
    Store --> Success["Dispatch REGISTER_SUCCESS"]
    Success --> Authenticated["Authenticated; registration and booking modals close"]
```

### Login flow

```mermaid
flowchart TD
    Open["Open Login modal"] --> Form["Enter email and password"]
    Form --> Validate["Validate required fields and email format"]
    Validate --> Stored{"rajanya_user exists?"}
    Stored -- No --> NoAccount["Show no account error"]
    Stored -- Yes --> Email{"Email matches?"}
    Email -- No --> BadEmail["Show email not found"]
    Email -- Yes --> Password{"Plain-text password matches?"}
    Password -- No --> BadPassword["Show incorrect password"]
    Password -- Yes --> Login["Call login with stored user"]
    Login --> Persist["Write same user to localStorage"]
    Persist --> Success["Dispatch LOGIN_SUCCESS and close modal"]
```

### Authentication limitations

- Only one user can be stored.
- Passwords are stored and compared in plain text.
- There is no server session, token, authorization, or role enforcement.
- The navbar profile button does not open login, registration, or a profile menu.
- No visible UI currently dispatches the initial auth modal action before booking.
- Forgot Password only shows an alert.
- Google login is a visual button only.
- Logout exists in context but is not connected to visible UI.

## 11. Booking Flow

```mermaid
flowchart TD
    Start["User clicks Book For Rent on product details"] --> Auth{"Authenticated?"}
    Auth -- No --> Register["Open Create Account modal"]
    Register --> Stop["Booking action stops<br/>user must click Book again after registration"]
    Auth -- Yes --> Payload["Store booking payload in auth state"]
    Payload --> Open["Open BookForRentModal"]

    Open --> Prefill["Prefill selected size, rental duration, dates, email"]
    Prefill --> Form["User enters contact, address, size, duration, dates"]
    Form --> Validate["React Hook Form required validation"]
    Validate --> Size{"Size selected?"}
    Size -- No --> SizeAlert["Alert user"]
    Size -- Yes --> Duration{"Rental duration selected?"}
    Duration -- No --> DurationAlert["Alert user"]
    Duration -- Yes --> Build["Build booking object"]
    Build --> Existing["Read rajanya_bookings or empty array"]
    Existing --> Append["Append booking"]
    Append --> Store["Write array to localStorage"]
    Store --> Success["Alert success"]
    Success --> Close["Close modal and clear booking payload"]
```

### Stored booking schema

```mermaid
classDiagram
    class Booking {
      bookingId
      createdAt
      status = pending
      paymentStatus = pending
    }

    class BookingUser {
      userId
      fullName
      mobileNumber
      email
    }

    class Address {
      city
      state
      pinCode
    }

    class RentalPeriod {
      startDate
      returnDate
    }

    class BookedProduct {
      productId
      productName
      selectedSize
      rentalDuration
      rentalPrice
      securityDeposit
      image
    }

    Booking *-- BookingUser
    Booking *-- Address
    Booking *-- RentalPeriod
    Booking *-- BookedProduct
```

### Booking limitations

- No date validation checks that return date follows start date.
- No availability or stock validation occurs.
- No duplicate-booking or date-conflict check occurs.
- No server booking record exists.
- No payment is collected.
- Booking and payment statuses always start as `pending`.
- The planned Razorpay steps exist only in comments.
- Current-user name prefill expects `currentUser.name`, but registration stores first and last names separately.
- Booking image expects `product.image`, but catalog products store an `images` array.

## 12. Product Data Model

```mermaid
classDiagram
    class Product {
      _id
      name
      slug
      description
      shortDescription
      category
      subCategory
      brand
      material
      tags[]
      colors[]
      sizes[]
      images[]
      videos[]
      originalPrice
      securityDeposit
      stock
      rating
      reviewsCount
      bookingCount
      featured
      availabilityStatus
      vendorId
      seoTitle
      seoDescription
      createdAt
      updatedAt
    }

    class RentalOption {
      days
      price
    }

    Product "1" *-- "4" RentalOption
```

The current catalog contains six products. All are local objects and all belong
to the `Lehengas` category.

## 13. Global State Ownership

```mermaid
flowchart TB
    subgraph AuthContext["AuthContext"]
        AuthUser["User identity"]
        AuthFlags["Authentication/loading/error"]
        ModalFlags["Register/Login/Booking modal visibility"]
        BookingPayload["Pending booking payload"]
    end

    subgraph ProductContext["ProductLiveDataContext"]
        Catalog["Product catalog"]
        Query["Search, filters, sort"]
        Paging["Pagination"]
        Lists["Wishlist, compare, recently viewed"]
        Derived["Filtered, sorted, paginated products and category counts"]
    end

    Navbar --> AuthContext
    CreateAccountModal --> AuthContext
    LoginModal --> AuthContext
    BookForRentModal --> AuthContext
    ProductDetailsActionsSection --> AuthContext

    AllProductsSidebarFilters --> ProductContext
    AllProductsSortBar --> ProductContext
    AllProductsCategoryStrip --> ProductContext
    AllProductsProductGrid --> ProductContext
    AllProductsProductCard --> ProductContext
    AllProductsPagination --> ProductContext
    ProductDetails --> ProductContext
```

## 14. Browser and External Boundary

```mermaid
flowchart LR
    App["Rajanya frontend"] --> LocalStorage["Browser localStorage"]
    App --> Share["Web Share API"]
    App --> Clipboard["Clipboard API"]
    App --> Scroll["window.scrollTo"]
    App --> Alerts["Browser alert dialogs"]
    App --> CDN["Bootstrap CSS/JS CDN from index.html"]
    App --> LocalMedia["Bundled images, video, fonts"]

    Backend["Backend API"] -. not connected .- App
    Database["Database"] -. not connected .- Backend
    Payment["Razorpay/payment gateway"] -. planned only .- App
    AIService["AI virtual try-on service"] -. planned only .- App
    GoogleAuth["Google OAuth"] -. visual button only .- App
```

Although packages such as Axios, React Query, Yup, Day.js, UUID, Auto Animate,
React Hot Toast, and React CountUp are installed, they are not part of the
current runtime flow.

## 15. Responsive Layout Flow

```mermaid
flowchart TD
    Viewport["Viewport width"] --> Desktop{"Desktop or smaller?"}
    Desktop -- Large desktop --> Full["Full navbar, category/contact bar, multi-column grids"]
    Desktop -- Below about 1200px --> Reduce["Reduce spacing and grid widths"]
    Reduce --> Tablet{"Below about 992px?"}
    Tablet -- Yes --> HideNav["Hide main navigation links"]
    Tablet -- Yes --> Stack["Stack booking/product layouts and content sections"]
    Tablet -- Yes --> HideContact["Hide category-bar contact information"]
    Stack --> Mobile{"Below 768px/576px?"}
    Mobile -- Yes --> Single["Single-column cards and smaller typography"]
    Mobile -- Yes --> HideSearch["Navbar search hidden on small screens"]
    Mobile -- Yes --> ModalFit["Authentication and booking modals fit mobile width"]
```

There is no implemented mobile menu to replace the hidden desktop navigation.

## 16. Implemented Versus Planned Modules

```mermaid
flowchart TB
    Project["Rajanya"]

    subgraph Implemented["Implemented now"]
        PublicStore["Public storefront"]
        HomePage["Home marketing page"]
        CatalogPage["Catalog browsing"]
        ProductPage["Product details"]
        LocalAuth["Local registration/login"]
        LocalBooking["Local booking creation"]
    end

    subgraph Planned["Declared or described, not implemented"]
        PublicFuture["About, categories, blog, contact, pricing, FAQ, policies"]
        AuthFuture["Forgot/reset password, OTP"]
        Customer["Dashboard, profile, wishlist, cart, orders, rentals, settings"]
        Vendor["Dashboard, products, inventory, orders, customers, analytics"]
        Admin["Users, vendors, products, categories, orders, payments, CMS"]
        AI["Virtual try-on and AI stylist"]
        Payments["Payment integration"]
        BackendAPI["API, database, real authentication"]
    end

    Project --> Implemented
    Project --> Planned
```

## 17. Planned Role Architecture From Commented Routes

```mermaid
flowchart LR
    Visitor["Visitor"] --> Public["Public pages"]
    Visitor --> Auth["Authentication"]
    Auth --> Role{"User role"}

    Role -- Customer --> CustomerArea["Dashboard, profile, wishlist, cart,<br/>orders, rentals, saved looks,<br/>notifications, settings"]
    Role -- Vendor --> VendorArea["Dashboard, products, add/edit product,<br/>inventory, orders, customers,<br/>analytics, notifications, settings"]
    Role -- Admin --> AdminArea["Dashboard, users, vendors, products,<br/>categories, orders, payments, coupons,<br/>reviews, notifications, CMS, analytics, settings"]

    CustomerArea -. not implemented .-> FutureBackend["Future backend and database"]
    VendorArea -. not implemented .-> FutureBackend
    AdminArea -. not implemented .-> FutureBackend
```

These routes are comments in `App.jsx`; there are no corresponding page
implementations in the current repository.

## 18. Repository Structure

```text
cloth/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- assets/
|   |   |-- fonts/
|   |   |-- video/
|   |   `-- product and promotional images
|   |-- contexts/
|   |   |-- AuthContext.jsx
|   |   `-- ProductLiveDataContext.jsx
|   |-- layouts/
|   |   |-- AdminLayout/
|   |   |-- CustomerLayout/
|   |   |-- PublicLayout/
|   |   `-- VendorLayout/
|   |-- Pages/
|   |   |-- Authentication/
|   |   |-- Home/
|   |   |-- AllProducts/
|   |   `-- ProductDetails/
|   |-- PagesComponents/
|   |   |-- AuthenticationComponents/
|   |   |-- HomeComponents/
|   |   `-- AllProductsComponets/
|   |-- SharedComponents/
|   |   |-- AnnouncementBar/
|   |   |-- CategoryInfoBar/
|   |   |-- Footer/
|   |   |-- Navbar/
|   |   |-- PageLoader/
|   |   |-- PageTransition/
|   |   `-- ScrollToTop/
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- vite.config.js
`-- eslint.config.js
```

The layout components and several shared components currently contain no
runtime implementation. They are structural placeholders for later work.

## 19. End-to-End User Journey

```mermaid
flowchart TD
    Visit["Visit Rajanya"] --> Home["View home presentation"]
    Home --> Collection["Navigate to All Product"]
    Collection --> Filter["Optionally filter/sort catalog"]
    Filter --> Choose["Choose a product"]
    Choose --> Details["View gallery, details, duration, price, size"]
    Details --> Book["Click Book For Rent"]
    Book --> Auth{"Already authenticated?"}

    Auth -- No --> Register["Create local account"]
    Register --> Retry["Return to product and click Book again"]
    Retry --> Booking

    Auth -- Yes --> Booking["Open booking form"]
    Booking --> Contact["Enter contact and address"]
    Contact --> Schedule["Choose size, rental duration, start and return dates"]
    Schedule --> Confirm["Confirm booking"]
    Confirm --> LocalSave["Save pending booking in localStorage"]
    LocalSave --> Done["Show success alert and close modal"]
```

## 20. Main Technical Risks

1. Authentication is not secure because credentials are stored in plain text in
   browser storage.
2. Bookings are local to one browser and cannot be managed by a real business.
3. Product and booking property names are inconsistent in several components.
4. Many visible links and buttons have no active destination or handler.
5. There is no fallback route or dedicated 404 page.
6. No backend, database, payment, stock, availability, or authorization layer
   exists.
7. Global search is visually present but disconnected from product state.
8. Some text contains mojibake characters caused by encoding issues.
9. Bootstrap is loaded from both npm imports and CDN tags.
10. Dark-mode variables remain from the Vite starter and may conflict with the
    intended design.

## 21. Recommended Production Target Flow

```mermaid
flowchart LR
    React["React frontend"] --> API["Authenticated REST or GraphQL API"]
    API --> AuthService["Authentication and roles"]
    API --> ProductService["Products, inventory, categories"]
    API --> BookingService["Booking and date availability"]
    API --> PaymentService["Payment orders and webhooks"]
    API --> AIService["Virtual try-on jobs"]

    AuthService --> DB[("Database")]
    ProductService --> DB
    BookingService --> DB
    PaymentService --> DB
    AIService --> ObjectStore[("Image/object storage")]

    PaymentService --> Gateway["Razorpay or another gateway"]
    AuthService --> OAuth["Google OAuth"]
    React --> CDN["Media CDN"]
```

This final diagram is a recommendation, not a description of the current
implementation.
