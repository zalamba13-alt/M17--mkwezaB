# Project notes

## Profile photo
- The site uses a placeholder avatar at `assets/profile.svg`, shown only in the hero (top).
- Tapping it opens the existing certificate lightbox (`#certLightbox`) to view it larger.
- To use a real photo: drop it in as `assets/profile.jpg`, then update the `src="assets/profile.svg"` in `index.html` (hero avatar only). The CSS (`object-fit: cover`) handles any aspect ratio.
