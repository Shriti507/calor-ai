import React, { useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/common/Background";
import GlassCard from "../components/common/GlassCard";
import { useSwipeContext } from "../context/SwipeContext";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";
import foodData from "../data/foods.json";

const { width } = Dimensions.get("window");

function generateHighlights(liked, superLiked) {
  const all = [...superLiked, ...liked];
  const categoryCount = {};
  const tagCount = {};
  
  all.forEach((food) => {
    if (food.category) {
      const cat = food.category.toLowerCase();
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    }
    if (food.tags) {
      food.tags.forEach((t) => {
        const tag = t.toLowerCase();
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });

  const highlights = [];
  
  if ((categoryCount["protein"] || 0) >= 2) {
    highlights.push({ emoji: "🥩", label: "Protein Power" });
  }
  if ((categoryCount["vegetable"] || 0) >= 2) {
    highlights.push({ emoji: "🥬", label: "Veggie Lover" });
  }
  if ((categoryCount["carb"] || 0) >= 2) {
    highlights.push({ emoji: "🍝", label: "Carb Enthusiast" });
  }
  if ((tagCount["plant-based"] || 0) >= 1 || (tagCount["vegan"] || 0) >= 1) {
    highlights.push({ emoji: "🌱", label: "Plant-Powered" });
  }
  if ((tagCount["fish"] || 0) >= 1 || (tagCount["seafood"] || 0) >= 1) {
    highlights.push({ emoji: "🐟", label: "Seafood Lover" });
  }
  if ((tagCount["healthy"] || 0) >= 2) {
    highlights.push({ emoji: "🥗", label: "Clean Eater" });
  }
  if ((tagCount["comfort"] || 0) >= 2) {
    highlights.push({ emoji: "🍕", label: "Comfort Fan" });
  }
  if ((tagCount["dairy"] || 0) >= 1) {
    highlights.push({ emoji: "🧀", label: "Dairy Fan" });
  }

  let result = highlights.slice(0, 3);

  const defaultFallbacks = [
    { emoji: "🍽️", label: "Foodie" },
    { emoji: "🌍", label: "Adventurous" },
    { emoji: "✨", label: "Unique Taste" },
  ];
  for (const fb of defaultFallbacks) {
    if (result.length < 3 && !result.some((h) => h.label === fb.label)) {
      result.push(fb);
    }
  }

  return result;
}

function generateLifestyle(liked) {
  const traits = [];
  const hasHealthy = liked.some((f) => (f.tags || []).includes("healthy"));
  const hasProtein = liked.some((f) => f.category === "protein");
  const hasVeggie = liked.some((f) => f.category === "vegetable");
  const hasPlantBased = liked.some((f) => (f.tags || []).includes("plant-based"));

  if (hasHealthy) traits.push("Clean & Wholesome Focus");
  if (hasProtein) traits.push("High Protein Athletic Goal");
  if (hasVeggie) traits.push("Rich Micronutrient Diet");
  if (hasPlantBased) traits.push("Plant-Forward Lifestyle");
  traits.push("PCOS & GI Diet Friendly");

  return traits.slice(0, 4);
}

function generateCuisines(liked, superLiked, availableCuisines = []) {
  const all = [...superLiked, ...liked];
  const cuisineScore = {};
  
  availableCuisines.forEach((c) => {
    cuisineScore[c.name] = 0;
  });

  const cuisineTagMap = {
    Italian: ["italian"],
    Mexican: ["mexican"],
    Japanese: ["japanese"],
    Mediterranean: ["mediterranean", "fish", "omega-3", "salad", "seafood", "shellfish"],
    American: ["american", "burger", "steak", "potatoes", "comfort", "red-meat"],
  };

  all.forEach((food) => {
    const tags = food.tags || [];
    availableCuisines.forEach((c) => {
      const matchTags = cuisineTagMap[c.name] || [c.name.toLowerCase()];
      const hasMatch = tags.some((tag) => matchTags.includes(tag.toLowerCase()));
      if (hasMatch) {
        cuisineScore[c.name] += 1;
      }
    });
  });

  return availableCuisines
    .map((c) => ({ ...c, score: cuisineScore[c.name] }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function PagedSection({ pages, dotCount }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onScroll = (e) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / (width - 64));
    setActiveIndex(pageIndex);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.pagedContainer}
      >
        {pages.map((page, i) => (
          <View key={i} style={styles.pageItem}>
            {page}
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {Array.from({ length: dotCount }).map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

function FoodListItem({ food, icon = "💙" }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listIcon}>{icon}</Text>
      <Text style={styles.listText}>{food.name}</Text>
    </View>
  );
}

export default function ResultScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useSwipeContext();
  const { liked, disliked, superLiked, unsure } = state;

  const highlights = useMemo(
    () => generateHighlights(liked, superLiked),
    [liked, superLiked]
  );
  const lifestyle = useMemo(() => generateLifestyle(liked), [liked]);
  const cuisines = useMemo(
    () => generateCuisines(liked, superLiked, foodData.cuisines),
    [liked, superLiked]
  );

  const lovedFoods = [...superLiked, ...liked];
  const hatedFoods = disliked;

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        style={[styles.container, { paddingTop: insets.top + 12 }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            dispatch({ type: "RESET" });
            navigation.navigate("Intro");
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Your Taste Profile</Text>
        <Text style={styles.subtitle}>
          Tailored to your unique needs. We'll use this for recommendations and
          meals plans
        </Text>

        <Text style={styles.sectionLabel}>Key Highlights:</Text>
        <View style={styles.highlightsRow}>
          {highlights.map((h, i) => (
            <React.Fragment key={i}>
              {i > 0 && <View style={styles.highlightDivider} />}
              <View style={styles.highlightItem}>
                <Text style={styles.highlightEmoji}>{h.emoji}</Text>
                <Text style={styles.highlightLabel}>{h.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEmoji}>💪</Text>
            <View>
              <Text style={styles.sectionTitle}>Lifestyle & Goals</Text>
              <Text style={styles.sectionSubtitle}>
                We'll use this to tailor your advice & meal plan
              </Text>
            </View>
          </View>
          {lifestyle.map((trait, i) => (
            <View key={i} style={styles.traitRow}>
              <Text style={styles.checkGreen}>✅</Text>
              <Text style={styles.traitText}>{trait}</Text>
            </View>
          ))}
        </GlassCard>

        <PagedSection
          dotCount={3}
          pages={[
            <GlassCard style={styles.listCard} key="love">
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEmoji}>❤️</Text>
                <View>
                  <Text style={styles.sectionTitle}>Foods You Love</Text>
                  <Text style={styles.sectionSubtitle}>
                    We'll Recommend These
                  </Text>
                </View>
              </View>
              {lovedFoods.length > 0 ? (
                lovedFoods.map((food) => (
                  <FoodListItem key={food.id} food={food} icon="💙" />
                ))
              ) : (
                <Text style={styles.emptyText}>No loved foods yet</Text>
              )}
            </GlassCard>,

            <GlassCard style={styles.listCard} key="hate">
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEmoji}>🤮</Text>
                <View>
                  <Text style={styles.sectionTitle}>Foods You Hate</Text>
                  <Text style={styles.sectionSubtitle}>
                    These will never be on the menu
                  </Text>
                </View>
              </View>
              {hatedFoods.length > 0 ? (
                hatedFoods.map((food) => (
                  <FoodListItem key={food.id} food={food} icon="☑️" />
                ))
              ) : (
                <Text style={styles.emptyText}>No disliked foods</Text>
              )}
            </GlassCard>,

            <GlassCard style={styles.listCard} key="cuisines">
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEmoji}>🏆</Text>
                <View>
                  <Text style={styles.sectionTitle}>Your Favorite Cuisines</Text>
                  <Text style={styles.sectionSubtitle}>
                    Flavors you love, all in one place
                  </Text>
                </View>
              </View>
              {cuisines.length > 0 ? (
                cuisines.map((cuisine, i) => (
                  <View key={cuisine.id || i} style={styles.traitRow}>
                    <Text style={styles.checkBlue}>{cuisine.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.traitText}>{cuisine.name}</Text>
                      <Text style={styles.cuisineDesc}>{cuisine.description}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>Keep swiping to discover!</Text>
              )}
            </GlassCard>,
          ]}
        />

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.md,
  },
  backArrow: {
    color: COLORS.textPrimary,
    fontSize: 28,
    lineHeight: 32,
    marginTop: -2,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.h1,
    ...FONTS.bold,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.caption,
    lineHeight: 20,
    marginBottom: SIZES.lg,
  },
  sectionLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.caption,
    ...FONTS.medium,
    marginBottom: SIZES.md,
  },
  highlightsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(22, 25, 28, 0.8)",
    borderRadius: SIZES.cardBorderRadius,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  highlightItem: {
    alignItems: "center",
    flex: 1,
  },
  highlightEmoji: {
    fontSize: 36,
    marginBottom: SIZES.sm,
  },
  highlightLabel: {
    color: COLORS.textPrimary,
    fontSize: SIZES.small,
    ...FONTS.medium,
    textAlign: "center",
  },
  highlightDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginHorizontal: SIZES.sm,
  },
  sectionCard: {
    marginBottom: SIZES.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.md,
    gap: 10,
  },
  sectionEmoji: {
    fontSize: 22,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
    ...FONTS.bold,
  },
  sectionSubtitle: {
    color: COLORS.textTertiary,
    fontSize: SIZES.small,
    ...FONTS.regular,
    marginTop: 2,
  },
  traitRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  checkGreen: {
    fontSize: 18,
  },
  checkBlue: {
    fontSize: 18,
  },
  traitText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.caption,
    ...FONTS.medium,
  },
  pagedContainer: {
    gap: 16,
  },
  pageItem: {
    width: width - 64,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: SIZES.md,
    marginBottom: SIZES.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dotActive: {
    backgroundColor: COLORS.textPrimary,
  },
  listCard: {
    minHeight: 200,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  listIcon: {
    fontSize: 18,
  },
  listText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.caption,
    ...FONTS.medium,
    textTransform: "capitalize",
  },
  emptyText: {
    color: COLORS.textTertiary,
    fontSize: SIZES.caption,
    textAlign: "center",
    paddingVertical: SIZES.lg,
  },
  cuisineDesc: {
    color: COLORS.textTertiary,
    fontSize: SIZES.small,
    ...FONTS.regular,
    marginTop: 2,
  },
});