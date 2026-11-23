# Project notes

## Profile photo
- The site uses a placeholder avatar at `assets/profile.svg` (hero + About portrait).
- To use a real photo: drop it in as `assets/profile.jpg`, then update the two `src="assets/profile.svg"` in `index.html` to `src="assets/profile.jpg"`. The CSS (`object-fit: cover`) handles any aspect ratio.
