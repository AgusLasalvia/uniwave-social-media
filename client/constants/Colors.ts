interface colorsPromps {
  primary: string;
  background: string; // Pure white
}

const defaultColors = {
  light: {
    primary: "#6366f1",
    background: "#ffffff",
  },
  dark: {
    primary: "#8b5cf6",
    background: "#0f172a",
  },
};

export const Colors = {
  light: {
    text: "#0f172a",
    background: defaultColors.light.background,
    tint: defaultColors.light.primary,
    icon: "#64748b",
    tabIconDefault: "#64748b",
    tabIconSelected: defaultColors.light.primary,
  },
  dark: {
    text: "#f8fafc",
    background: defaultColors.dark.background,
    tint: defaultColors.dark.primary,
    icon: "#94a3b8",
    tabIconDefault: "#94a3b8",
    tabIconSelected: defaultColors.dark.primary,
  },
};

export const applyThemedColors = (light: colorsPromps, dark: colorsPromps) => {
  Colors.light = {
    ...Colors.light,
    background: light.background,
    tint: light.primary,
    tabIconSelected: light.primary,
  };
  Colors.dark = {
    ...Colors.dark,
    background: dark.background,
    tint: dark.primary,
    tabIconSelected: dark.primary,
  };
};

export const applyDefaultTheme = () => {
  Colors.light = {
    ...Colors.light,
    background: defaultColors.light.background,
    tint: defaultColors.light.primary,
    tabIconSelected: defaultColors.light.primary,
  };
  Colors.dark = {
    ...Colors.dark,
    background: defaultColors.dark.background,
    tint: defaultColors.dark.primary,
    tabIconSelected: defaultColors.dark.primary,
  };
};
