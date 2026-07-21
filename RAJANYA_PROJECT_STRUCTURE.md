# Rajanya Project Structure

This structure excludes generated dependency folders such as `node_modules`.

## Root

```text
Rajanya/
|-- backend/
|-- cloth/
|-- rajanyadashboard/
|-- postman/
|-- .postman/
|-- .agents/
|-- .snapshots/
`-- RAJANYA_PROJECT_STRUCTURE.md
```

## Backend API

```text
backend/
|-- package.json
|-- package-lock.json
|-- server.js
|-- generateHash.js
|-- testdns.js
|-- config/
|   |-- cloudinary.js
|   `-- db.js
|-- controllers/
|   |-- authController.js
|   |-- bookingController.js
|   |-- categoryController.js
|   |-- occasionController.js
|   |-- paymentController.js
|   |-- productController.js
|   |-- virtualTryOnController.js
|   `-- wishlistController.js
|-- middleware/
|   |-- adminMiddleware.js
|   |-- authMiddleware.js
|   |-- authorizeRoles.js
|   |-- errorMiddleware.js
|   `-- uploadMiddleware.js
|-- models/
|   |-- Booking.js
|   |-- Category.js
|   |-- Occasion.js
|   |-- Payment.js
|   |-- Product.js
|   |-- User.js
|   |-- VirtualTryOn.js
|   `-- Wishlist.js
`-- routes/
    |-- authRoutes.js
    |-- bookingRoutes.js
    |-- categoryRoutes.js
    |-- occasionRoutes.js
    |-- paymentRoutes.js
    |-- productRoutes.js
    |-- virtualTryOnRoutes.js
    `-- wishlistRoutes.js
```

## Customer Frontend: `cloth`

```text
cloth/
|-- README.md
|-- PROJECT_FLOWCHART.md
|-- eslint.config.js
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
`-- src/
    |-- App.css
    |-- App.jsx
    |-- index.css
    |-- main.jsx
    |-- Pages/
    |   |-- masterPrompt.txt
    |   |-- AllProducts/
    |   |   |-- AllProducts.css
    |   |   `-- AllProducts.jsx
    |   |-- Authentication/
    |   |   |-- Authentication.css
    |   |   `-- Authentication.jsx
    |   |-- ContactUs/
    |   |   |-- ContactUs.css
    |   |   `-- ContactUs.jsx
    |   |-- Home/
    |   |   |-- Home.css
    |   |   `-- Home.jsx
    |   |-- MensWear/
    |   |   |-- MensWear.css
    |   |   `-- MensWear.jsx
    |   |-- ProductDetails/
    |   |   |-- ProductDetails.css
    |   |   `-- ProductDetails.jsx
    |   |-- VirtualTryOnUnlock/
    |   |   |-- VirtualTryOnUnlock.css
    |   |   `-- VirtualTryOnUnlock.jsx
    |   |-- Wishlist/
    |   |   |-- Wishlist.css
    |   |   `-- Wishlist.jsx
    |   `-- WomensWear/
    |       |-- WomensWear.css
    |       `-- WomensWear.jsx
    |-- contexts/
    |   |-- AuthContext.jsx
    |   |-- MensWearContext.jsx
    |   |-- ProductLiveDataContext.jsx
    |   |-- VirtualTryOnContext.jsx
    |   `-- WomensWearContext.jsx
    |-- layouts/
    |   |-- AdminLayout/
    |   |   |-- AdminLayout.css
    |   |   `-- AdminLayout.jsx
    |   |-- CustomerLayout/
    |   |   |-- CustomerLayout.css
    |   |   `-- CustomerLayout.jsx
    |   |-- PublicLayout/
    |   |   |-- PublicLayout.css
    |   |   `-- PublicLayout.jsx
    |   `-- VendorLayout/
    |       |-- VendorLayout.css
    |       `-- VendorLayout.jsx
    |-- services/
    |   |-- api.js
    |   |-- authService.js
    |   |-- bookingAvailabilityService.js
    |   |-- bookingService.js
    |   |-- categoryService.js
    |   |-- paymentService.js
    |   |-- productService.js
    |   |-- reviewService.js
    |   `-- tryOnService.js
    |-- SharedComponents/
    |   |-- AnnouncementBar/
    |   |   |-- AnnouncementBar.css
    |   |   `-- AnnouncementBar.jsx
    |   |-- CategoryInfoBar/
    |   |   |-- CategoryInfoBar.css
    |   |   |-- CategoryInfoBar.jsx
    |   |   `-- CategoryInfoBarData.js
    |   |-- Footer/
    |   |   |-- Footer.css
    |   |   `-- Footer.jsx
    |   |-- Navbar/
    |   |   |-- Navbar.css
    |   |   |-- Navbar.jsx
    |   |   `-- NavbarData.js
    |   |-- PageLoader/
    |   |   |-- PageLoader.css
    |   |   `-- PageLoader.jsx
    |   |-- PageTransition/
    |   |   |-- PageTransition.css
    |   |   `-- PageTransition.jsx
    |   `-- ScrollToTop/
    |       |-- ScrollToTop.css
    |       `-- ScrollToTop.jsx
    `-- PagesComponents/
        |-- AuthenticationComponents/
        |   |-- BookForRentModal.css
        |   |-- BookForRentModal.jsx
        |   |-- CreateAccountModal.css
        |   |-- CreateAccountModal.jsx
        |   |-- LoginModal.css
        |   `-- LoginModal.jsx
        |-- ContactUsComponents/
        |   |-- ContactAnimatedText.css
        |   |-- ContactAnimatedText.jsx
        |   |-- ContactFAQSection.css
        |   |-- ContactFAQSection.jsx
        |   |-- ContactGetInTouchSection.css
        |   |-- ContactGetInTouchSection.jsx
        |   |-- ContactHeroSection.css
        |   |-- ContactHeroSection.jsx
        |   |-- ContactShowroomSection.css
        |   `-- ContactShowroomSection.jsx
        |-- HomeComponents/
        |   |-- AIStylingTrustSection.css
        |   |-- AIStylingTrustSection.jsx
        |   |-- AnimatedText.css
        |   |-- AnimatedText.jsx
        |   |-- FashionProcessSection.css
        |   |-- FashionProcessSection.jsx
        |   |-- Hero.css
        |   |-- Hero.jsx
        |   |-- LimitedTimeDealsData.js
        |   |-- LimitedTimeDealsSection.css
        |   |-- LimitedTimeDealsSection.jsx
        |   |-- MostRentedStyles.css
        |   |-- MostRentedStyles.jsx
        |   |-- MostRentedStylesData.js
        |   |-- PerfectStyleShowcase.css
        |   |-- PerfectStyleShowcase.jsx
        |   |-- TrendingRentalCollection.css
        |   |-- TrendingRentalCollection.jsx
        |   `-- TrendingRentalCollectionData.js
        |-- MensWearComponents/
        |   |-- MenAnimatedText.css
        |   |-- MenAnimatedText.jsx
        |   |-- MensWearCatalogData.js
        |   |-- MensWearCategoryData.js
        |   |-- MensWearCategoryStrip.css
        |   |-- MensWearCategoryStrip.jsx
        |   |-- MensWearHeroData.js
        |   |-- MensWearHeroSection.css
        |   |-- MensWearHeroSection.jsx
        |   |-- MensWearSidebarFilters.css
        |   `-- MensWearSidebarFilters.jsx
        |-- WomensWearComponents/
        |   |-- WomenAnimatedText.css
        |   |-- WomenAnimatedText.jsx
        |   |-- WomensWearCatalogData.js
        |   |-- WomensWearCategoryData.js
        |   |-- WomensWearCategoryStrip.css
        |   |-- WomensWearCategoryStrip.jsx
        |   |-- WomensWearHeroSection.css
        |   |-- WomensWearHeroSection.jsx
        |   |-- WomensWearSidebarFilters.css
        |   `-- WomensWearSidebarFilters.jsx
        |-- Wishlist/
        |   |-- WishlistCard.css
        |   |-- WishlistCard.jsx
        |   |-- WishlistEmptyState.css
        |   |-- WishlistEmptyState.jsx
        |   |-- WishlistGrid.css
        |   |-- WishlistGrid.jsx
        |   |-- WishlistHeader.css
        |   `-- WishlistHeader.jsx
        |-- VirtualTryOnStudioDrawer/
        |   |-- BestResultCard.css
        |   |-- BestResultCard.jsx
        |   |-- GeneratedResultCard.css
        |   |-- GeneratedResultCard.jsx
        |   |-- GenerateTryOnSection.css
        |   |-- GenerateTryOnSection.jsx
        |   |-- SelectedOutfitCard.css
        |   |-- SelectedOutfitCard.jsx
        |   |-- TryOnInfoCard.css
        |   |-- TryOnInfoCard.jsx
        |   |-- UploadPhotoCard.css
        |   |-- UploadPhotoCard.jsx
        |   |-- VirtualTryOnStudioDrawer.css
        |   `-- VirtualTryOnStudioDrawer.jsx
        |-- VirtualTryOnUnlockComponents/
        |   |-- VirtualTryOnUnlockDrawer.css
        |   `-- VirtualTryOnUnlockDrawer.jsx
        `-- AllProductsComponets/
            |-- AllProductsHeroData.js
            |-- AllProductsHeroSection.css
            |-- AllProductsHeroSection.jsx
            |-- ProductAnimatedText.css
            |-- ProductAnimatedText.jsx
            |-- AllProductsCatalogSection/
            |   |-- AllProductsCatalogData.js
            |   |-- AllProductsCatalogSection.css
            |   |-- AllProductsCatalogSection.jsx
            |   |-- AllProductsCategoryStrip.css
            |   |-- AllProductsCategoryStrip.jsx
            |   |-- AllProductsPagination.css
            |   |-- AllProductsPagination.jsx
            |   |-- AllProductsProductCard.css
            |   |-- AllProductsProductCard.jsx
            |   |-- AllProductsProductGrid.css
            |   |-- AllProductsProductGrid.jsx
            |   |-- AllProductsSidebarFilters.css
            |   |-- AllProductsSidebarFilters.jsx
            |   |-- AllProductsSortBar.css
            |   `-- AllProductsSortBar.jsx
            `-- ProductDetailsComponents/
                |-- ProductDetailsActionsSection.css
                |-- ProductDetailsActionsSection.jsx
                |-- ProductDetailsGallerySection.css
                |-- ProductDetailsGallerySection.jsx
                |-- ProductDetailsInfoSection.css
                |-- ProductDetailsInfoSection.jsx
                |-- ProductDetailsPricingSection.css
                |-- ProductDetailsPricingSection.jsx
                |-- ProductDetailsRelatedProducts.css
                |-- ProductDetailsRelatedProducts.jsx
                |-- ProductDetailsRentalSection.css
                |-- ProductDetailsRentalSection.jsx
                |-- ProductDetailsTabsSection.css
                |-- ProductDetailsTabsSection.jsx
                |-- ProductDetailsTopSection.css
                |-- ProductDetailsTopSection.jsx
                |-- ProductDetailsVariantsSection.css
                |-- ProductDetailsVariantsSection.jsx
                |-- RentalIncludesCard.css
                |-- RentalIncludesCard.jsx
                |-- WhyChooseRajanyaSection.css
                `-- WhyChooseRajanyaSection.jsx
```

## Admin Dashboard: `rajanyadashboard`

```text
rajanyadashboard/
|-- README.md
|-- eslint.config.js
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
`-- src/
    |-- App.jsx
    |-- index.css
    |-- main.jsx
    |-- context/
    |   `-- AuthContext.jsx
    |-- pages/
    |   |-- AdminForgotPassword.jsx
    |   |-- AdminLogin.jsx
    |   |-- AdminSignup.jsx
    |   |-- CategoriesPage.jsx
    |   |-- DashboardPage.jsx
    |   |-- NotificationsPage.jsx
    |   |-- PaymentsPage.jsx
    |   |-- ProductPage.jsx
    |   |-- RentBookingsPage.jsx
    |   |-- VirtualTryOnPage.jsx
    |   |-- bookings/
    |   |   |-- EditBookings.jsx
    |   |   `-- ViewBookings.jsx
    |   |-- categoryPage/
    |   |   |-- AddCategoryPage.jsx
    |   |   |-- EditCategoryPage.jsx
    |   |   `-- ViewCategoryPage.jsx
    |   |-- paymentPage/
    |   |   `-- ViewPaymentPage.jsx
    |   |-- productPage/
    |   |   |-- AddProductPage.jsx
    |   |   |-- EditProductPage.jsx
    |   |   `-- ViewProductPage.jsx
    |   `-- tryOnPage/
    |       `-- ViewTryOnPage.jsx
    `-- components/
        |-- ProtectedRoute.jsx
        |-- addCategoryPage/
        |   |-- CategoryActions.jsx
        |   |-- CategoryDescription.jsx
        |   |-- CategoryImageUpload.jsx
        |   |-- CategoryInformation.jsx
        |   |-- CategorySettings.jsx
        |   |-- CategoryStatus.jsx
        |   `-- ImageGuidelines.jsx
        |-- addProductPage/
        |   |-- PricingInformation.jsx
        |   |-- ProductActions.jsx
        |   |-- ProductAttributes.jsx
        |   |-- ProductDescription.jsx
        |   |-- ProductImage.jsx
        |   |-- ProductInformation.jsx
        |   `-- ProductStatus.jsx
        |-- bookings/
        |   |-- BookingFilters.jsx
        |   |-- BookingPagination.jsx
        |   |-- BookingTable.jsx
        |   `-- Bookingstats.jsx
        |-- category/
        |   |-- CategoryFilters.jsx
        |   |-- CategoryPagination.jsx
        |   |-- CategoryRow.jsx
        |   |-- CategoryStats.jsx
        |   `-- CategoryTable.jsx
        |-- dashboard/
        |   |-- CategoryDonutChart.jsx
        |   |-- RecentBookingsTable.jsx
        |   |-- RecentTryOnTable.jsx
        |   |-- RevenueChart.jsx
        |   `-- StatsCards.jsx
        |-- delete/
        |   |-- CancelBooking.jsx
        |   |-- DeleteCategory.jsx
        |   |-- DeleteProduct.jsx
        |   `-- DeleteTryOn.jsx
        |-- editCategory/
        |   |-- ECategoryActions.jsx
        |   |-- ECategoryDescription.jsx
        |   |-- ECategoryImageGuide.jsx
        |   |-- ECategoryImages.jsx
        |   |-- ECategoryInformation.jsx
        |   |-- ECategorySettings.jsx
        |   `-- ECategoryStatus.jsx
        |-- EditBookings/
        |   |-- EditActionButtons.jsx
        |   |-- EditBookStatusNote.jsx
        |   |-- EditCustomerInfo.jsx
        |   |-- EditProductInfo.jsx
        |   `-- EditRentalInfo.jsx
        |-- editProduct/
        |   |-- BottomSection.jsx
        |   |-- PricingCard.jsx
        |   |-- ProductAttributesCard.jsx
        |   |-- ProductDescriptionCard.jsx
        |   |-- ProductImagesCard.jsx
        |   |-- ProductInfoCard.jsx
        |   |-- ProductPreviewCard.jsx
        |   `-- StatusCard.jsx
        |-- layout/
        |   |-- DashboardLayout.jsx
        |   |-- Footer.jsx
        |   |-- NavBar.jsx
        |   |-- NotificationsDropdown.jsx
        |   `-- SideBar.jsx
        |-- payments/
        |   |-- PaginationPayment.jsx
        |   |-- PaymentCard.jsx
        |   |-- PaymentFilter.jsx
        |   |-- PaymentTable.jsx
        |   `-- TotalRevenue.jsx
        |-- products/
        |   |-- AddProductButton.jsx
        |   |-- Pagination.jsx
        |   |-- ProductFilters.jsx
        |   |-- ProductRow.jsx
        |   |-- ProductStats.jsx
        |   `-- ProductTable.jsx
        |-- viewBookings/
        |   |-- BookingInfoCard.jsx
        |   |-- BookingStats.jsx
        |   |-- BookingsDetailsAction.jsx
        |   |-- CancelInfoCard.jsx
        |   |-- CustomerInfoCard.jsx
        |   |-- ProductInfoCard.jsx
        |   `-- RentalInfoCard.jsx
        |-- viewCategoryPage/
        |   |-- VCategoryAction.jsx
        |   |-- VCategoryDescription.jsx
        |   |-- VCategoryInformation.jsx
        |   |-- VCategoryMetaCard.jsx
        |   |-- VCategoryPreview.jsx
        |   |-- VCategorySettings.jsx
        |   `-- VCategoryStatus.jsx
        |-- viewPaymentPage/
        |   |-- AdditionalInfo.jsx
        |   |-- AmountBreakDown.jsx
        |   |-- CustomerInfo.jsx
        |   |-- InvoiceInfo.jsx
        |   |-- PaymentAction.jsx
        |   |-- PaymentStatusTimeline.jsx
        |   `-- ServiceDetails.jsx
        |-- viewProductPage/
        |   |-- BottomSection.jsx
        |   |-- PricingCard.jsx
        |   |-- ProductActionsButtons.jsx
        |   |-- ProductAttributesCard.jsx
        |   |-- ProductDescriptionCard.jsx
        |   |-- ProductImagesCard.jsx
        |   |-- ProductInfoCard.jsx
        |   `-- ProductPreviewCard.jsx
        |-- viewTryOn/
        |   |-- TryOnCustomerCard.jsx
        |   |-- TryOnDetailPage.jsx
        |   |-- TryOnPaymentCard.jsx
        |   |-- TryOnPhotoSection.jsx
        |   |-- TryOnProductCard.jsx
        |   `-- TryOnProgressCard.jsx
        `-- virtualTryOn/
            |-- TryOnActions.jsx
            |-- TryOnPagination.jsx
            |-- TryOnRow.jsx
            |-- TryOnTable.jsx
            `-- TryStatsOn.jsx
```

## Postman

```text
postman/
|-- environments/
|   `-- Rajanya Local.environment.yaml
`-- globals/
    `-- workspace.globals.yaml
```
