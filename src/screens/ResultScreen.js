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
import { LinearGradient } from "expo-linear-gradient";
import Background from "../components/common/Background";
import GlassCard from "../components/common/GlassCard";
import { useSwipeContext } from "../context/SwipeContext";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants/theme";
import foodData from "../data/foods.json";
import { Ionicons } from "@expo/vector-icons";

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
function FoodListItem({ food, isLast }) {
  return (
    <View>
      <View style={styles.foodItem}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={13} color="#FFFFFF" />
        </View>
        <Text style={styles.foodName}>{food.name}</Text>
      </View>
      {!isLast && <View style={styles.divider} />}
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

  const lovedFoods = [...liked];
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
        <GlassCard style={styles.highlightsCard}>
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
        </GlassCard>

        <GlassCard style={[styles.sectionCard, { padding: 0 }]}>
          <View style={styles.listCardInner}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                <Text style={styles.emojiText}>💪</Text> Lifestyle & Goals
              </Text>
              <Text style={styles.cardSub}>We'll tailor your advice & meal plan</Text>
            </View>
            {lifestyle.map((trait, i) => (
              <View key={i}>
                <View style={styles.foodItem}>
                  <View style={[styles.checkCircle, { backgroundColor: COLORS.primary || "#4ADE80" }]}>
                    <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                  </View>
                  <Text style={styles.foodName}>{trait}</Text>
                </View>
                {i < lifestyle.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </GlassCard>

        <PagedSection
          dotCount={3}
          pages={[
            <GlassCard key="love" style={{ padding: 0 }}>
              <View style={styles.listCardInner}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>
                    <Text style={styles.emojiText}>🧑‍🍳</Text> Foods You Love
                  </Text>
                  <Text style={styles.cardSub}>We'll Recommend These</Text>
                </View>
                {lovedFoods.length > 0 ? (
                  lovedFoods.map((food, idx) => (
                    <FoodListItem key={food.id} food={food} isLast={idx === lovedFoods.length - 1} />
                  ))
                ) : (
                  <Text style={styles.emptyText}>No loved foods yet</Text>
                )}
              </View>
            </GlassCard>,

            <GlassCard key="hate" style={{ padding: 0 }}>
              <View style={styles.listCardInner}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>
                    <Text style={styles.emojiText}>🤷‍♂️</Text> Foods You Hate
                  </Text>
                  <Text style={styles.cardSub}>These will never be on the menu</Text>
                </View>
                {hatedFoods.length > 0 ? (
                  hatedFoods.map((food, idx) => (
                    <FoodListItem key={food.id} food={food} isLast={idx === hatedFoods.length - 1} />
                  ))
                ) : (
                  <Text style={styles.emptyText}>No disliked foods</Text>
                )}
              </View>
            </GlassCard>,

            <GlassCard key="cuisines" style={{ padding: 0 }}>
              <View style={styles.listCardInner}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>
                    <Text style={styles.emojiText}>🏆</Text> Favorite Cuisines
                  </Text>
                  <Text style={styles.cardSub}>Flavors you love, all in one place</Text>
                </View>
                {cuisines.length > 0 ? (
                  cuisines.map((cuisine, idx) => (
                    <View key={cuisine.id || idx}>
                      <View style={styles.foodItem}>
                        <Text style={styles.cuisineEmoji}>{cuisine.emoji}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.foodName}>{cuisine.name}</Text>
                          <Text style={styles.cuisineDesc}>{cuisine.description}</Text>
                        </View>
                      </View>
                      {idx < cuisines.length - 1 && <View style={styles.divider} />}
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>Keep swiping to discover!</Text>
                )}
              </View>
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
    marginBottom: 25,
  },
  sectionLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.caption,
    ...FONTS.medium,
    marginBottom: 12,
  },
  highlightsCard: {
    marginBottom: 25,
  },
  highlightsInner: {
    padding: SIZES.lg,
  },
  highlightsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 15,
  },
  sectionCardInner: {
    padding: SIZES.cardPadding,
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
    gap: 8,
  },
  pageItem: {
    width: width - 64,
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#555",
  },
  dotActive: {
    backgroundColor: "#e5e5e5",
  },
  listCard: {
    width: 300,
  },
  listCardInner: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  cardHeader: {
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#3d3d3d",
  },
  cardTitle: {
    fontSize: 15,
    ...FONTS.semiBold,
    color: "#f0f0f0",
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  emojiText: {
    marginRight: 6,
  },
  cardSub: {
    fontSize: 12,
    color: "#888",
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 18,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  foodName: {
    fontSize: 14,
    color: "#e5e5e5",
    textTransform: "capitalize",
  },
  divider: {
    height: 0.5,
    backgroundColor: "#3a3a3a",
    marginHorizontal: 18,
  },
  cuisineEmoji: {
    fontSize: 18,
    marginRight: 2,
  },
  cuisineDesc: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  emptyText: {
    color: COLORS.textTertiary,
    fontSize: SIZES.caption,
    textAlign: "center",
    paddingVertical: SIZES.lg,
  },
});