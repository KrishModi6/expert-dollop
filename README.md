# EcoScan Mobile App 🌱

A React Native mobile application for scanning receipts and calculating their environmental impact.

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Navigate to the mobile app directory:
```bash
cd EcoScanMobile
```

2. Install dependencies:
```bash
npm install
```

3. Install missing packages (if needed):
```bash
npm install expo-image-picker @tanstack/react-query expo-camera
```

### Running the App

1. Start the Expo development server:
```bash
npx expo start
```

2. Choose your platform:
   - Press `a` for Android (requires Android emulator or device)
   - Press `i` for iOS (requires iOS simulator or device, macOS only)
   - Press `w` for web browser

### Features

- **Home Screen**: Dashboard with scan statistics and recent scans
- **Scan Screen**: Camera and gallery integration for receipt scanning
- **Processing Screen**: Real-time progress indication during OCR processing
- **Results Screen**: Detailed sustainability analysis and alternatives
- **History Screen**: View all previous scans
- **Explore Screen**: Sustainability tips and education

### Key Packages Used

- **Expo Router**: File-based navigation
- **React Query**: Data fetching and caching
- **Expo Image Picker**: Camera and gallery access
- **Expo Camera**: Camera functionality
- **React Native**: Core mobile framework

### Project Structure

```
EcoScanMobile/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx      # Home screen
│   │   ├── scan.tsx       # Scan screen
│   │   ├── history.tsx    # History screen
│   │   └── explore.tsx    # Tips screen
│   ├── _layout.tsx        # Root layout
│   ├── processing.tsx     # Processing screen
│   └── results.tsx        # Results screen
├── components/            # Reusable components
├── hooks/                 # Custom hooks
├── lib/                   # Utility libraries
└── assets/               # Images and fonts
```

### Configuration

The app is configured with:
- Camera permissions for receipt scanning
- Gallery permissions for photo selection
- React Query for API integration
- TypeScript for type safety

### Development Notes

1. The app currently uses mock data for demonstration
2. Backend integration points are prepared but not connected
3. Authentication is simulated for development
4. All screens are fully functional with proper navigation
