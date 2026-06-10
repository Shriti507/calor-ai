

export const COLORS = {
  // Backgrounds
  background: "#0A0A0A",
  cardBackground: "rgba(25, 28, 30, 0.85)",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  surfaceDark: "#111314",

  // Primary accent (green)
  primary: "#4ADE80",
  primaryDark: "#22C55E",

  // Action buttons
  dislike: "#EF4444",
  notSure: "#6B7280",
  superLike: "#8B5CF6",
  like: "#4ADE80",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  textTertiary: "rgba(255, 255, 255, 0.4)",

  // Status
  checkBlue: "#3B82F6",
  checkGreen: "#4ADE80",

  // Gradients
  gradientStart: "rgba(10, 10, 10, 1)",
  gradientMid: "rgba(15, 25, 30, 1)",
  gradientEnd: "rgba(10, 10, 10, 1)",

  // Glassmorphism
  glassBackground: "rgba(255, 255, 255, 0.05)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
  glassOverlay: "rgba(0, 0, 0, 0.3)",

  // Bottom bar
  bottomBarBg: "rgba(20, 20, 22, 0.9)",
  tabActive: "#4ADE80",
  tabInactive: "rgba(255, 255, 255, 0.4)",
};

export const FONTS = {
  bold: {
    fontWeight: "700",
  },
  semiBold: {
    fontWeight: "600",
  },
  medium: {
    fontWeight: "500",
  },
  regular: {
    fontWeight: "400",
  },
};

export const SIZES = {
  // Font sizes
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  caption: 14,
  small: 12,

  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Border radius
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 20,
  radiusFull: 999,

  // Card
  cardPadding: 24,
  cardBorderRadius: 16,

  // Action buttons
  actionButtonSize: 64,
  actionButtonRadius: 32,

  // Bottom bar
  bottomBarHeight: 80,
};

export const SHADOWS = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  glow: {
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
};
