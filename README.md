# SmartHydrate

SmartHydrate is a modern web-based application that helps users track daily water intake and maintain proper hydration. The app provides personalized recommendations, visual feedback, weekly progress tracking, and contact information for support.

## Features

### Home Page
- Eye-catching hero section with large, centered SmartHydrate branding
- Daily recommended water intake (2.5-3L) with interactive hover effects
- "Why Hydration Matters" section with engaging color transitions
- Easy navigation to the tracker page with call-to-action button
- Smooth animations and gradient effects on hover

### Water Intake Tracker
- **User Registration**: Enter name (letters only), age, and email to track previous drinking habits
- **Strict Form Validation**: 
  - Real-time error messages for empty fields ("Please fill this field")
  - Name validation (letters only)
  - Age validation (1-120 range)
  - Email validation (proper format checking)
  - Visual feedback with error highlighting
- Track daily water consumption with interactive glass selectors
- View weekly progress, average intake, and completion percentage
- Save progress or reset the weekly tracker
- Water intake recommendations by age displayed in a reference table
- Dynamic stat cards showing daily stats and progress bars
- Color-coded daily status (red <4, orange 4-7, green 8+)

### About Us Page
- Brand mission and vision statement
- Feature highlights
- Commitment to health and wellness
- Contact section with email and phone number
- Professional design with hover effects on cards

### Responsive Design
- Fully responsive and mobile-friendly
- Adapts seamlessly to desktop and mobile screens
- Touch-friendly interface elements
- CSS animations and transitions for better UX

## Technologies Used

- **HTML5** – Structure of web pages
- **CSS3** – Styling, responsive layout, animations, and hover effects with gradients
- **JavaScript** – Dynamic form validation, water intake tracking, and progress calculations
- **LocalStorage** – Client-side data persistence for user info and weekly progress

## File Structure

```
SmartHydrate/
├── water.html      # Home page with hero section
├── tracker.html    # Water tracking page with form validation
├── about.html      # About Us page with contact information
├── water.css       # Styles for all pages with animations
└── water.js        # JavaScript for validation and tracker functionality
```

## How to Use

1. **Access Home Page**: Open `water.html` to see the home page with SmartHydrate branding and features
2. **Start Tracking**: Click "Start Tracking" button or navigate to `tracker.html`
3. **Register**: 
   - Enter your name (letters only)
   - Enter your age (1-120)
   - Enter your email address
   - Form will validate and show error messages if fields are incorrect
4. **Save User Info**: Click "Save User Info" to store your details
5. **Track Daily Water**: Click on water glasses to track your daily intake
6. **View Progress**: Monitor weekly summary, average intake, and completion rate
7. **Save/Reset**: Use buttons to save weekly progress or reset for a new week
8. **Learn More**: Visit "About Us" page for contact information and company details

## Key Features in Detail

### Form Validation
- All fields are required
- Name accepts only alphabetic characters and spaces
- Age must be between 1 and 120
- Email must follow standard email format
- Real-time error messages appear as users interact with fields
- Success feedback when information is saved

### Visual Feedback
- Hover effects on home page sections with color transitions
- Interactive glass buttons with animations when clicked
- Daily progress indicators with color coding
- Smooth animations for all interactions
- Gradient backgrounds for modern aesthetic

### Data Persistence
- User information saved to browser localStorage
- Weekly progress automatically saved
- Email tracked for habit analysis
- Data persists between sessions

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The tracker updates dynamically using JavaScript
- No external libraries required - pure HTML, CSS, and JavaScript
- LocalStorage provides client-side data persistence
- All animations are CSS-based for smooth performance
- Mobile-first responsive design approach