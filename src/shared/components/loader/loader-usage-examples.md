# Loader Component Usage Examples

## Basic Usage

```html
<!-- Simple spinner -->
<app-loader></app-loader>

<!-- With text -->
<app-loader text="Loading..."></app-loader>

<!-- Different variants -->
<app-loader variant="dots"></app-loader>
<app-loader variant="pulse"></app-loader>
<app-loader variant="bars"></app-loader>
```

## Size Variants

```html
<app-loader size="small"></app-loader>
<app-loader size="medium"></app-loader>
<app-loader size="large"></app-loader>
```

## Color Variants

```html
<app-loader color="primary"></app-loader>
<app-loader color="secondary"></app-loader>
<app-loader color="white"></app-loader>
<app-loader color="dark"></app-loader>
```

## Button Loading State

```html
<button [disabled]="isLoading">
  <app-loader 
    *ngIf="isLoading" 
    size="small" 
    variant="spinner" 
    color="white">
  </app-loader>
  <span *ngIf="!isLoading">Submit</span>
</button>
```

## Overlay Loading

```html
<div class="form-container" style="position: relative;">
  <!-- Your form content -->
  
  <app-loader 
    *ngIf="isSubmitting"
    overlay="true"
    text="Saving changes...">
  </app-loader>
</div>
```

## Full Screen Loading

```html
<app-loader 
  *ngIf="isPageLoading"
  fullScreen="true"
  variant="pulse"
  text="Loading page...">
</app-loader>
```

## Custom Styling

```scss
.custom-loader {
  .loader-container {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
  }
}
```
